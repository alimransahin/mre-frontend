"use client";

import { Button } from "@nextui-org/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

import MraForm from "@/src/components/modules/home/form/MraForm";
import MraInput from "@/src/components/modules/home/form/MraInput";
import { useResetPassword } from "@/src/hooks/auth.hook";
import Loading from "@/src/components/UI/Loading";
import resetPasswordValidationSchema from "@/src/schemas/resetPassword.schema";

const ResetPassword = () => {
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const token = searchParams.get("token");
  const router = useRouter();
  const {
    mutate: handleResetPassword,
    isPending,
    isSuccess,
  } = useResetPassword();
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    const newData = {
      ...data,
      email,
      token,
    };

    handleResetPassword(newData);
  };

  useEffect(() => {
    if (!isPending && isSuccess) {
      router.push("/login");
    }
  }, [isPending, isSuccess]);

  return (
    <>
      {isPending && <Loading />}
      <div className="flex h-[calc(100vh-200px)] w-full flex-col items-center justify-center">
        <h3 className="my-2 text-2xl font-bold">Reset Password</h3>
        <div className="w-[35%]">
          <MraForm
            resolver={zodResolver(resetPasswordValidationSchema)}
            onSubmit={onSubmit}
          >
            <div className="py-3">
              <MraInput
                label="New Password"
                name="newPassword"
                type="password"
              />
            </div>
            <div className="py-3">
              <MraInput
                label="Confirm New Password"
                name="con_newPassword"
                type="password"
              />
            </div>

            <Button
              className="my-3 w-full rounded-md bg-default-900 font-semibold text-default"
              size="lg"
              type="submit"
            >
              Update Password
            </Button>
          </MraForm>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
