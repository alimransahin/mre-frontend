"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import "quill/dist/quill.snow.css";
import Container from "./Container";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const toolbarOptions = [
  [{ header: "1" }, { header: "2" }, { font: [] }],
  [{ list: "ordered" }, { list: "bullet" }],
  ["bold", "italic", "underline", "strike"],
  ["link", "image"],
  ["clean"],
];

const QuillEditor = () => {
  const [editorContent, setEditorContent] = useState<string>("");

  const handleChange = (content: string) => {
    setEditorContent(content);
  };

  const modules = {
    toolbar: {
      container: toolbarOptions,
    },
  };

  const handleSubmit = () => {
    console.log("Content submitted:", editorContent);
  };

  return (
    <Container>
      <div className="max-w-3xl mx-auto p-6  rounded-lg shadow-lg bg-default-50">
        {/* Quill Editor */}
        <div className="mb-6">
          <ReactQuill
            value={editorContent}
            onChange={handleChange}
            modules={modules}
            className="border border-gray-300 rounded-lg"
            placeholder="Write something amazing..."
          />
        </div>

        <button
          onClick={handleSubmit}
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded w-full"
        >
          Submit
        </button>
      </div>
    </Container>
  );
};

export default QuillEditor;
