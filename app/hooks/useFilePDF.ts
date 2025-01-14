import { getDocument } from "pdfjs-dist";
import type { TextItem } from "pdfjs-dist/types/src/display/api";
import { useState } from "react";

export const useFilePDF = () => {
  const [status, setStatus] = useState<"NO_FILE" | "DONE">("NO_FILE");
  const [text, setText] = useState<string | null>(null);
  const [file, _setFile] = useState<File | null>(null);

  const setFile = async (payload: File | File[] | null) => {
    if (!payload || (Array.isArray(payload) && payload.length === 0)) {
      setStatus("NO_FILE");
      _setFile(null);
      setText(null);
      return;
    }

    const file = Array.isArray(payload) ? payload[0] : payload;
    _setFile(file);
    const arrayBuffer = await file.arrayBuffer();

    const loadingTask = getDocument(arrayBuffer);

    const pdf = await loadingTask.promise;
    let text = "";

    for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
      const page = await pdf.getPage(pageNum);
      const textContent = await page.getTextContent();

      const pageText = textContent.items
        .filter((item): item is TextItem => "str" in item)
        .map((item) => item.str)
        .join(" ");

      text += pageText + " ";
    }

    setText(text);
    setStatus("DONE");
  };

  return { status, file, text, setFile };
};
