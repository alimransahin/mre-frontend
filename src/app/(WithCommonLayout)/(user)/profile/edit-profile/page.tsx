"use client";

import { Button } from "@nextui-org/button";
import { useForm } from "react-hook-form";
import { useGetCurrentUser, useUpdateProfile } from "@/src/hooks/auth.hook";
import { useUser } from "@/src/context/UserProvider";
import { useEffect } from "react";
import { Input } from "@nextui-org/input";

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
    formState: { errors },
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
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col space-y-4"
        >
          <Input
            {...register("name", {})}
            type="text"
            placeholder="Name"
            variant="bordered"
            size="md"
            fullWidth
            isClearable
            value={watch("name")}
            label="Name"
          />
          <Input
            {...register("phone", {})}
            type="text"
            placeholder="Phone"
            variant="bordered"
            size="md"
            fullWidth
            isClearable
            value={watch("phone")}
            label="Phone"
          />
          <Input
            {...register("address", {})}
            type="text"
            placeholder="Address"
            variant="bordered"
            size="md"
            fullWidth
            isClearable
            value={watch("address")}
            label="Address"
          />

          <Button
            className="my-3 w-full rounded-md bg-default-900 font-semibold text-default"
            size="lg"
            type="submit"
            isLoading={isPending}
          >
            Update Profile
          </Button>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfile;
