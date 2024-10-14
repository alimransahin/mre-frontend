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

    handleChangePassword(newData);
  };

  return (
    <>
      {isPending && <Loading />}
      <div className="flex  w-full flex-col items-center justify-center">
        <h3 className="my-2 text-2xl font-bold">Update Password</h3>

        <div className="w-[35%]">
          <MraForm
            resolver={zodResolver(changePasswordValidationSchema)}
            onSubmit={onSubmit}
          >
            <div className="py-3">
              <MraInput label="Old Password" name="password" type="password" />
            </div>
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
              Change Password
            </Button>
          </MraForm>
        </div>
      </div>
    </>
  );
};

export default ChangePassword;
