"use client";
import React, { useEffect } from "react";
import { Skeleton } from "@nextui-org/skeleton";
import { toast } from "sonner";
import { useGetAllUser, useUpdateStatus } from "@/src/hooks/auth.hook";

type TAction = {
  userId: string;
  action: string;
};
const ManageAdminPage = () => {
  const { mutate: handleGetAllUser, data } = useGetAllUser();
  const { mutate: handleAction } = useUpdateStatus();

  useEffect(() => {
    handleGetAllUser();
  }, [handleGetAllUser]);

  const userData = data?.data || [];

  const loading = !data;

  const onActionClick = async (actionData: TAction) => {
    const userId = actionData.userId;
    const action = actionData.action;
    try {
      await handleAction({ userId, action });
      handleGetAllUser();
    } catch (error) {
      toast.error("Failed to update follow status");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center py-10">
      <h2 className="text-2xl font-semibold mb-5">All User List</h2>

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
                <th className="py-3 px-5">Role</th>
                <th className="py-3 px-5">Action</th>
              </tr>
            </thead>
            <tbody>
              {userData.length > 0 ? (
                userData.map((user: any, index: number) => (
                  <tr key={user._id} className="border-b hover:bg-default-400">
                    <td className="py-3 px-5">{index + 1}</td>
                    <td className="py-3 px-5">
                      <img
                        alt={user.name}
                        className="w-10 h-10 rounded-full"
                        src={
                          user.profilePicture || "/path/to/default/image.jpg"
                        }
                      />
                    </td>
                    <td className="py-3 px-5">{user.name}</td>
                    <td className="py-3 px-5">{user.email}</td>
                    <td className="py-3 px-5">{user.role}</td>
                    <td className="py-3 px-5">
                      {user?.role === "user" ? (
                        <button
                          className="bg-primary-500 text-white px-4 py-2 rounded hover:bg-primary-600"
                          onClick={() =>
                            onActionClick({ userId: user._id, action: "admin" })
                          }
                        >
                          Make Admin
                        </button>
                      ) : (
                        <button
                          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                          onClick={() =>
                            onActionClick({ userId: user._id, action: "user" })
                          }
                        >
                          Remove admin
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="py-4 text-center text-gray-500" colSpan={6}>
                    No Users found.
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

export default ManageAdminPage;
