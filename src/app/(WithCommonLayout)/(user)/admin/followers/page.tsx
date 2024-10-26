"use client";
import React, { useEffect } from "react";
import { Skeleton } from "@nextui-org/skeleton";

import { useUser } from "@/src/context/UserProvider";
import { useGetCurrentUser } from "@/src/hooks/auth.hook";

const FollowersPage = () => {
  const { mutate: handleGetUser, data } = useGetCurrentUser();
  const { user } = useUser();

  useEffect(() => {
    if (user?.email) {
      handleGetUser({ email: user.email });
    }
  }, [user?.email, handleGetUser]);

  const followersData = data?.data?.followers || [];
  const loading = !data; 

  return (
    <div className="flex flex-col items-center justify-center py-10">
      <h2 className="text-2xl font-semibold mb-5">Followers List</h2>

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
              </tr>
            </thead>
            <tbody>
              {followersData.length > 0 ? (
                followersData.map((follower: any, index: number) => (
                  <tr
                    key={follower._id}
                    className="border-b hover:bg-default-400"
                  >
                    <td className="py-3 px-5">{index + 1}</td>
                    <td className="py-3 px-5">
                      <img
                        alt={follower.name}
                        className="w-10 h-10 rounded-full"
                        src={
                          follower.profilePicture ||
                          "/path/to/default/image.jpg"
                        }
                      />
                    </td>
                    <td className="py-3 px-5">{follower.name}</td>
                    <td className="py-3 px-5">{follower.email}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="py-4 text-center text-gray-500" colSpan={4}>
                    No followers found.
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

export default FollowersPage;
