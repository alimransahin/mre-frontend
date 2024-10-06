"use client";

import { Button } from "@nextui-org/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, SubmitHandler } from "react-hook-form";
import MraForm from "@/src/components/modules/home/form/MraForm";
import MraInput from "@/src/components/modules/home/form/MraInput";
import { useChangePassword } from "@/src/hooks/auth.hook";
import Loading from "@/src/components/UI/Loading";
import { useUser } from "@/src/context/UserProvider";
import changePasswordValidationSchema from "@/src/schemas/changePassword.schema";

const ChangePassword = () => {
  const { user } = useUser();
  const { mutate: handleChangePassword, isPending } = useChangePassword();
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    const newData = {
      ...data,
      email: user?.email,
    };
    console.log(newData);
    handleChangePassword(newData);
  };

  return (
    <>
      {isPending && <Loading />}
      <div className="flex  w-full flex-col items-center justify-center">
        <h3 className="my-2 text-2xl font-bold">Login with FoundX</h3>
        <p className="mb-4">Welcome Back! Let&lsquo;s Get Started</p>
        <div className="w-[35%]">
          <MraForm
            onSubmit={onSubmit}
            resolver={zodResolver(changePasswordValidationSchema)}
          >
            <div className="py-3">
              <MraInput name="password" label="Old Password" type="password" />
            </div>
            <div className="py-3">
              <MraInput
                name="newPassword"
                label="New Password"
                type="password"
              />
            </div>
            <div className="py-3">
              <MraInput
                name="con_newPassword"
                label="Confirm New Password"
                type="password"
              />
            </div>

            <Button
              className="my-3 w-full rounded-md bg-default-900 font-semibold text-default"
              size="lg"
              type="submit"
            >
              Change Password
            </Button>
          </MraForm>
        </div>
      </div>
    </>
  );
};

export default ChangePassword;
