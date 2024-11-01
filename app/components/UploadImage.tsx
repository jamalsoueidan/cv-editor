import { Image } from "@mantine/core";
import { useParams } from "@remix-run/react";
import { api } from "convex/_generated/api";
import { FunctionReturnType } from "convex/server";
import { FormEvent, useRef, useState } from "react";

export function UploadImage({
  data,
}: {
  data: FunctionReturnType<typeof api.resumes.get>;
}) {
  const params = useParams();
  const imageInput = useRef<HTMLInputElement>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  async function handleSendImage(event: FormEvent) {
    event.preventDefault();

    // e.g. https://happy-animal-123.convex.site/sendImage?author=User+123
    const sendImageUrl = new URL(
      `https://accomplished-cassowary-576.convex.site/sendImage`
    );
    sendImageUrl.searchParams.set("id", params.id || "");

    await fetch(sendImageUrl, {
      method: "POST",
      headers: { "Content-Type": selectedImage!.type },
      body: selectedImage,
    });

    setSelectedImage(null);
    imageInput.current!.value = "";
  }

  return (
    <form onSubmit={handleSendImage} style={{ width: "100%" }}>
      <Image src={data.photoUrl || ""} maw="60px" radius="md" />
      <input
        type="file"
        accept="image/*"
        ref={imageInput}
        onChange={(event) => setSelectedImage(event.target.files![0])}
        disabled={selectedImage !== null}
      />
      <input
        type="submit"
        value="Send Image"
        disabled={selectedImage === null}
      />
    </form>
  );
}
