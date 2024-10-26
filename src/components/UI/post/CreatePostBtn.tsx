"use client";
import { useEffect, useState } from "react";
import { Camera } from "lucide-react";

import Container from "../Container";

import QuillEditor from "./Editor";

import { useUser } from "@/src/context/UserProvider";
import { useGetCurrentUser } from "@/src/hooks/auth.hook";
import { toast } from "sonner";

const CreatePostBtn = () => {
  const { user } = useUser();
  const { mutate: handleGetUser, data } = useGetCurrentUser();

  useEffect(() => {
    if (user?.email) {
      handleGetUser({ email: user.email });
    }
  }, [user?.email, handleGetUser]);
  const currentUser = data?.data;

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    if (!user) {
      toast.error("Please Login First");
    } else {
      setIsModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <Container>
      <div className="max-w-2xl mx-auto p-4">
        <div
          className="bg-default-100 rounded-lg p-3 shadow-lg"
          role="button"
          onClick={handleOpenModal}
        >
          <div className="flex items-center ">
            {currentUser?.profilePicture && (
              <img
                alt="Profile"
                className="w-10 h-10 rounded-full mr-3"
                src={currentUser.profilePicture}
              />
            )}
            <input
              className="flex-1 bg-default-50 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="What's on your mind, Md?"
              type="text"
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
    </Container>
  );
};

export default CreatePostBtn;
