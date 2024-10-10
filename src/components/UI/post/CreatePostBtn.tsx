"use client";
import { useState } from "react";
// import PostModal from "./PostModal"; // Import the modal component
import { Camera, Video, Smile } from "lucide-react";
import QuillEditor from "./Editor";

const CreatePostBtn = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div
        onClick={handleOpenModal}
        className="bg-default-100 rounded-lg p-3 shadow-lg"
      >
        <div className="flex items-center ">
          <img
            src="your-profile-pic-url"
            alt="Profile"
            className="w-10 h-10 rounded-full mr-3"
          />
          <input
            type="text"
            placeholder="What's on your mind, Md?"
            className="flex-1 bg-default-50  p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>
        <div className="flex justify-between mt-4">
          <button className="flex items-center text-default-400 hover:text-default-600">
            <Camera className="mr-1" />
            Photo/video
          </button>
        </div>
      </div>

      <QuillEditor isOpen={isModalOpen} onClose={handleCloseModal} />
    </div>
  );
};

export default CreatePostBtn;
