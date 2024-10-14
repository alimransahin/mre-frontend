"use client";

import { Button } from "@nextui-org/button";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { Input } from "@nextui-org/input";

import { useGetCurrentUser, useUpdateProfile } from "@/src/hooks/auth.hook";
import { useUser } from "@/src/context/UserProvider";

const UpdateProfile = () => {
  const { user } = useUser();
  const { mutate: handleGetUser, data } = useGetCurrentUser();

  useEffect(() => {
    if (user?.email) {
      handleGetUser({ email: user.email });
    }
  }, [user?.email, handleGetUser]);

  const currentUser = data?.data;
  const userId = currentUser?._id;

  const { mutate: handleUpdateProfile, isPending } = useUpdateProfile();

  const {
    register,
    handleSubmit,
    formState: {},
    reset,
    watch,
  } = useForm({
    defaultValues: {
      name: "",
      phone: "",
      address: "",
    },
  });

  useEffect(() => {
    if (currentUser) {
      reset({
        name: currentUser?.name || "",
        phone: currentUser?.phone || "",
        address: currentUser?.address || "",
      });
    }
  }, [currentUser, reset]);

  const onSubmit = (formData: any) => {
    handleUpdateProfile({ data: formData, userId });
    handleGetUser({ email: user?.email });
  };

  return (
    <div className="flex w-full flex-col items-center justify-center">
      <h3 className="my-2 text-2xl font-bold">Update Profile</h3>
      <div className="w-full">
        <form
          className="flex flex-col space-y-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Input
            {...register("name", {})}
            fullWidth
            isClearable
            label="Name"
            placeholder="Name"
            size="md"
            type="text"
            value={watch("name")}
            variant="bordered"
          />
          <Input
            {...register("phone", {})}
            fullWidth
            isClearable
            label="Phone"
            placeholder="Phone"
            size="md"
            type="text"
            value={watch("phone")}
            variant="bordered"
          />
          <Input
            {...register("address", {})}
            fullWidth
            isClearable
            label="Address"
            placeholder="Address"
            size="md"
            type="text"
            value={watch("address")}
            variant="bordered"
          />

          <Button
            className="my-3 w-full rounded-md bg-default-900 font-semibold text-default"
            isLoading={isPending}
            size="lg"
            type="submit"
          >
            Update Profile
          </Button>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfile;
