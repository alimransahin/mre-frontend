"use client";
import React, { useEffect } from "react";
import { Skeleton } from "@nextui-org/skeleton";
import { useGetAllActivity } from "@/src/hooks/auth.hook";

const LoginActivity = () => {
  const { mutate: handleGetAllActivity, data } = useGetAllActivity();

  useEffect(() => {
    handleGetAllActivity();
  }, [handleGetAllActivity]);
  const allLoginActivity = data?.data || [];
  const loading = !data;

  function convertISOToReadableDate(isoDate: string): string {
    const date = new Date(isoDate);

    // Formatting options
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      timeZoneName: "short",
    };

    // Convert to local date and time
    return date.toLocaleDateString(undefined, options);
  }

  return (
    <div className="flex flex-col items-center justify-center py-10">
      <h2 className="text-2xl font-semibold mb-5">Login Activity</h2>
      {/* time, role and user information like name and email. */}
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
                <th className="py-3 px-5">Login TIme</th>
              </tr>
            </thead>
            <tbody>
              {allLoginActivity.length > 0 ? (
                allLoginActivity.map((activity: any, index: number) => (
                  <tr
                    key={activity._id}
                    className="border-b hover:bg-default-400 text-sm"
                  >
                    <td className="py-3 px-5">{index + 1}</td>
                    <td className="py-3 px-5">
                      <img
                        alt={activity.userId.name}
                        className="w-10 h-10 rounded-full"
                        src={
                          activity.userId.profilePicture ||
                          "/path/to/default/image.jpg"
                        }
                      />
                    </td>
                    <td className="py-3 px-5">{activity.userId.name}</td>
                    <td className="py-3 px-5">{activity.userId.email}</td>
                    <td className="py-3 px-5">{activity.userId.role}</td>
                    <td className="py-3 px-5">
                      {convertISOToReadableDate(activity?.createdAt)}
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

export default LoginActivity;
