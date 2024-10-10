"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import "quill/dist/quill.snow.css";
import envConfig from "@/src/config/envConfig";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const toolbarOptions = [
  [{ header: "1" }, { header: "2" }, { font: [] }],
  [{ list: "ordered" }, { list: "bullet" }],
  ["bold", "italic", "underline", "strike"],
  ["link"],
  ["clean"],
];

interface QuillEditorProps {
  isOpen: boolean;
  onClose: () => void;
}

const QuillEditor: React.FC<QuillEditorProps> = ({ isOpen, onClose }) => {
  const [editorContent, setEditorContent] = useState<string>("");
  const [isPremium, setIsPremium] = useState<boolean>(false);

  const handleChange = (content: string) => {
    setEditorContent(content);
  };

  // Image upload logic
  const imgbbApiKey = envConfig.imgbb_api;
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      // await handleUpload(selectedFile); // Replace with your upload logic
    }
  };

  const handleSubmit = () => {
    console.log("Post submitted:", {
      editorContent,
      selectedCategory,
      isPremium,
    });
    onClose();
  };

  const modules = {
    toolbar: {
      container: toolbarOptions,
    },
  };

  return (
    isOpen && (
      <div className="h-screen bg-default-900/5 z-50 backdrop-blur-md fixed inset-0 flex items-center justify-center">
        <div className="bg-default-100 rounded-lg shadow-lg p-4 w-full max-w-xl md:max-w-2xl lg:max-w-3xl mx-4 sm:mx-6 md:mx-8">
          <div className="flex justify-between items-center">
            <h2 className="text-lg mb-2">Create a Post</h2>
            <button className="p-2" onClick={onClose}>
              X
            </button>
          </div>

          <div className="p-4 sm:p-6 bg-default-50 rounded-lg shadow-lg">
            {/* Text Editor */}
            <ReactQuill
              value={editorContent}
              onChange={handleChange}
              modules={modules}
              className="rounded-lg h-40 sm:h-60 lg:h-72 mb-20 sm:mb-12"
              placeholder="Write something amazing..."
            />
            <div className="grid grid-cols-2 gap-8">
              {/* Image Upload */}
              <div className="rounded-md">
                <input
                  type="file"
                  name="photo"
                  id="fileInput"
                  className="hidden"
                  onChange={handleFileChange}
                />
                <label
                  htmlFor="fileInput"
                  className="bg-default-200 block  p-2 cursor-pointer rounded-md "
                >
                  Attach Photo
                </label>
              </div>
              {/* Category Selector */}
              <select className="bg-default-200 rounded-md   p-2" required>
                <option value="" disabled selected>
                  Select a category
                </option>
                <option value="Web">Web</option>
                <option value="Software Engineering">
                  Software Engineering
                </option>
                <option value="AI">AI</option>
                <option value="Data Science">Data Science</option>
              </select>
            </div>

            {/* Premium Toggle */}
            <div className="flex items-center my-4">
              <input
                type="checkbox"
                id="premium"
                checked={isPremium}
                onChange={(e) => setIsPremium(e.target.checked)}
                className="mr-2"
              />
              <label htmlFor="premium" className="text-sm">
                Mark as Premium (accessible to verified users only)
              </label>
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              className="bg-primary-500 hover:bg-primary-400 font-bold py-2 px-4 rounded w-full"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default QuillEditor;
