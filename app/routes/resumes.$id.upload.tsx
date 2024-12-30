import { Box } from "@mantine/core";

import Uppy from "@uppy/core";
import "@uppy/core/dist/style.min.css";
import "@uppy/dashboard/dist/style.min.css";

import ImageEditor from "@uppy/image-editor";
import "@uppy/image-editor/dist/style.min.css";
import { Dashboard } from "@uppy/react";
import XHR from "@uppy/xhr-upload";
import { api } from "convex/_generated/api";
import { useMutation } from "convex/react";
import type { FunctionReturnType } from "convex/server";
import { useEffect, useState } from "react";
import { useOutletContext } from "react-router";

export default function Upload() {
  const { data } = useOutletContext<{
    data: FunctionReturnType<typeof api.resumes.get>;
  }>();
  const generateUploadUrl = useMutation(api.resumes.generateUploadUrl);
  const sendImage = useMutation(api.resumes.sendImage);

  const [uppy, setUppy] = useState<Uppy>();

  const createUppy = async () => {
    const endpoint = await generateUploadUrl();
    setUppy(() =>
      new Uppy({
        allowMultipleUploads: false,
        allowMultipleUploadBatches: false,
        restrictions: {
          maxFileSize: 10000000,
          maxNumberOfFiles: 1,
          minNumberOfFiles: 1,
          allowedFileTypes: ["image/*"],
        },
      })
        .use(ImageEditor)
        .use(XHR, {
          endpoint,
          formData: false,
          async onAfterResponse(xhr) {
            const parsed = JSON.parse(xhr.response);
            const storageId = parsed.storageId;
            await sendImage({ storageId, id: data._id });
          },
        })
    );
  };

  useEffect(() => {
    createUppy();
  }, []);

  return (
    <Box w="100%" style={{ overflow: "hidden" }}>
      {uppy ? <Dashboard uppy={uppy} /> : null}
    </Box>
  );
}
