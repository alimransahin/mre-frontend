"use client";
import React, { useEffect } from "react";
import { Skeleton } from "@nextui-org/skeleton";
import { toast } from "sonner";

import { useGetCurrentUser, useUpdateFollow } from "@/src/hooks/auth.hook";
import { useUser } from "@/src/context/UserProvider";

const FollowingPage = () => {
  const { mutate: handleGetUser, data } = useGetCurrentUser();
  const { mutate: handleFollow } = useUpdateFollow();
  const { user } = useUser();

  useEffect(() => {
    if (user?.email) {
      handleGetUser({ email: user.email });
    }
  }, [user?.email, handleGetUser]);

  const followingData = data?.data?.following || []; 

  const loading = !data; 

  const onFollowClick = async (authorId: string) => {
    if (!user?._id) {
      toast.error("User is not authenticated");

      return; 
    }

    try {
      await handleFollow({ authId: authorId, userId: user._id });
      handleGetUser({ email: user.email }); 
    } catch (error) {
      toast.error("Failed to update follow status");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center py-10">
      <h2 className="text-2xl font-semibold mb-5">Following List</h2>

      {/* Skeleton Loader */}
      {loading ? (
        <div className="w-full max-w-4xl">
          <Skeleton className="mb-2 h-10 w-full" />
          <Skeleton className="mb-2 h-10 w-full" />
          <Skeleton className="mb-2 h-10 w-full" />
        </div>
      ) : (
        <div className="overflow-x-auto w-full max-w-4xl">
          <table className="min-w-full bg-default-300 shadow-lg rounded-lg">
            <thead>
              <tr className="bg-blue-100 text-left text-gray-700">
                <th className="py-3 px-5">#</th>
                <th className="py-3 px-5">Image</th>
                <th className="py-3 px-5">Name</th>
                <th className="py-3 px-5">Email</th>
                <th className="py-3 px-5">Action</th>{" "}
                {/* New column for actions */}
              </tr>
            </thead>
            <tbody>
              {followingData.length > 0 ? (
                followingData.map((following: any, index: number) => (
                  <tr
                    key={following._id}
                    className="border-b hover:bg-default-400"
                  >
                    <td className="py-3 px-5">{index + 1}</td>
                    <td className="py-3 px-5">
                      <img
                        alt={following.name}
                        className="w-10 h-10 rounded-full"
                        src={
                          following.profilePicture ||
                          "/path/to/default/image.jpg"
                        }
                      />
                    </td>
                    <td className="py-3 px-5">{following.name}</td>
                    <td className="py-3 px-5">{following.email}</td>
                    <td className="py-3 px-5">
                      <button
                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                        onClick={() => onFollowClick(following._id)} 
                      >
                        Unfollow
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="py-4 text-center text-gray-500" colSpan={5}>
                    No following found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default FollowingPage;
