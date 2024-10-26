"use client";
import { Button } from "@nextui-org/button";
import Link from "next/link";
import Image from "next/image";
import { useEffect } from "react";
import { Check, ClipboardEdit, ShieldCheck } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";
import { Skeleton } from "@nextui-org/skeleton";

import { SidebarOptions } from "./SidebarOptions";
import { adminLinks, userLinks } from "./constants";

import { useUser } from "@/src/context/UserProvider";
import { useGetCurrentUser, useUpdateProfile } from "@/src/hooks/auth.hook";
import envConfig from "@/src/config/envConfig";

const Sidebar = () => {
  const { user } = useUser();
  const { mutate: handleUpdateProfile } = useUpdateProfile();
  const { mutate: handleGetUser, data } = useGetCurrentUser();
  const userId = user?._id;

  useEffect(() => {
    if (user?.email) {
      handleGetUser({ email: user.email });
    }
  }, [user?.email, handleGetUser]);

  const currentUser = data?.data;

  // Image upload

  const imgbbApiKey = envConfig.imgbb_api;

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];

    if (selectedFile) {
      await handleUpload(selectedFile); // Call the upload function directly
    }
  };

  const handleUpload = async (file: File) => {
    const formData = new FormData();

    formData.append("image", file);

    try {
      const response = await axios.post(
        `https://api.imgbb.com/1/upload?key=${imgbbApiKey}`,
        formData
      );
      const directLink = response.data.data.url;
      const profilePicture = { profilePicture: directLink };

      userId && handleUpdateProfile({ data: profilePicture, userId });
      handleGetUser({ email: user?.email });
      toast.success("Image uploaded successfully!");
    } catch (error) {
      toast.error("Error uploading image");
    }
  };

  return (
    <div>
      <div className="rounded-b-lg md:rounded-lg bg-default-100 p-2">
        <div className="h-40 w-40 lg:h-80 lg:w-80 rounded-md relativ  mx-auto">
          {currentUser?.profilePicture ? (
            <Image
              alt="profile"
              className="h-full w-full object-cover rounded-full"
              height={100}
              src={currentUser?.profilePicture as string}
              width={100}
            />
          ) : (
            <Skeleton className="h-full w-full rounded-full" />
          )}
          {/* Edit profile photo */}
          <div className="relative rounded-lg flex items-center justify-center">
            {currentUser?.isVerified && (
              <div className="bg-blue-500 p-2 rounded-full inline-flex items-center justify-center absolute bottom-0">
                <ShieldCheck color="white" size={20} strokeWidth={3} />
              </div>
            )}

            <input
              accept="image/*"
              className="hidden"
              id="upload-photo"
              type="file"
              onChange={handleFileChange} // Call the function directly on change
            />
            <Button
              as="label"
              className="absolute bottom-0 right-0 bg-transparent"
              htmlFor="upload-photo"
            >
              <ClipboardEdit />
            </Button>
          </div>
          {/* Profile info */}
        </div>
        <div className="my-3">
          <h1 className="text-2xl font-semibold relative inline-flex items-center">
            {currentUser?.name}
            {currentUser?.isVerified && (
              <span className="bg-blue-500  rounded-full inline-flex items-center justify-center ml-1">
                <Check size={12} strokeWidth={3} />
              </span>
            )}
          </h1>

          <p className="break-words text-sm">Email: {currentUser?.email}</p>
          <p className="break-words text-sm">Phone: {currentUser?.phone}</p>
          <p className="break-words text-sm">Address: {currentUser?.address}</p>
        </div>
        <Button
          as={Link}
          className="mt-2 w-full rounded-md"
          href={"/profile/edit-profile"}
        >
          Edit Profile
        </Button>
      </div>
      <div className="mt-3 space-y-2 rounded-xl bg-default-100 p-2">
        <SidebarOptions
          links={user?.role === "admin" ? adminLinks : userLinks}
        />
      </div>
    </div>
  );
};

export default Sidebar;
