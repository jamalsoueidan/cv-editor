/* eslint-disable jsx-a11y/label-has-associated-control */
import { Box, Button, Card, Group, Slider, Stack } from "@mantine/core";
import { useOutletContext } from "@remix-run/react";
import { api } from "convex/_generated/api";
import { useMutation } from "convex/react";
import { FunctionReturnType } from "convex/server";
import React, { useEffect, useState } from "react";
import { usePhotoEditor } from "../hooks/usePhotoEditor";

export default function Upload() {
  const { data } = useOutletContext<{
    data: FunctionReturnType<typeof api.resumes.get>;
  }>();
  const generateUploadUrl = useMutation(api.resumes.generateUploadUrl);
  const sendImage = useMutation(api.resumes.sendImage);

  const [file, setFile] = useState<File>();

  const setFileData = (e: React.ChangeEvent<HTMLInputElement> | null) => {
    if (e?.target?.files && e.target.files.length > 0) {
      resetFilters();
      setFile(e.target.files[0]);
    }
  };

  const {
    canvasRef,
    imageSrc,
    rotate,
    setRotate,
    zoom,
    setZoom,
    handlePointerDown,
    handlePointerUp,
    handlePointerMove,
    handleWheel,
    resetFilters,
    generateEditedFile,
  } = usePhotoEditor({ file });

  const saveCanvasImage = async () => {
    if (canvasRef.current) {
      const blob = await generateEditedFile();
      const postUrl = await generateUploadUrl();

      if (blob) {
        try {
          const response = await fetch(postUrl, {
            method: "POST",
            headers: { "Content-Type": blob!.type },
            body: blob,
          });

          if (!response.ok) {
            throw new Error("Failed to save image");
          }
          console.log("Image saved successfully");
          const { storageId } = await response.json();

          await sendImage({ storageId, id: data._id });
        } catch (error) {
          console.error("Error saving image:", error);
        }
      }
    }
  };

  useEffect(() => {
    if (data.photoUrl) {
      fetch(data.photoUrl)
        .then((response) => response.blob())
        .then((blob) => {
          const newFile = new File([blob], "image.jpg", { type: blob.type });
          setFile(newFile);
        })
        .catch((error) => console.error("Error loading image:", error));
    }
  }, [data.photoUrl]);

  return (
    <Box w="100%" style={{ overflow: "hidden" }}>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setFileData(e)}
        multiple={false}
      />
      {imageSrc && (
        <Card withBorder p="0" my="md">
          <canvas
            ref={canvasRef}
            style={{
              maxHeight: "22rem",
              maxWidth: "36rem",
            }}
            onMouseDown={handlePointerDown}
            onMouseMove={handlePointerMove}
            onMouseUp={handlePointerUp}
            onWheel={handleWheel}
          />
        </Card>
      )}

      <Stack gap="xl">
        <Slider
          label="Rotate"
          value={rotate}
          min={-180}
          max={180}
          marks={[
            { value: -180, label: "-180%" },
            { value: -90, label: "-90%" },
            { value: 0, label: "0%" },
            { value: 90, label: "90%" },
            { value: 180, label: "180%" },
          ]}
          onChange={(e) => setRotate(e)}
          w="100%"
        />

        <Slider
          label="Zoom"
          value={zoom}
          min={1}
          max={3}
          step={0.1}
          marks={[
            { value: 0, label: "100%" },
            { value: 1.5, label: "150%" },
            { value: 3, label: "300%" },
          ]}
          onChange={(e) => setZoom(e)}
        />
      </Stack>

      <Group justify="space-between" mt="xl">
        <Button onClick={resetFilters}>Reset</Button>
        <Button onClick={saveCanvasImage}>Save</Button>
      </Group>
    </Box>
  );
}
