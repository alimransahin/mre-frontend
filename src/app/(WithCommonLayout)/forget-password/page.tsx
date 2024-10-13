"use client";

import { Button } from "@nextui-org/button";
import { FieldValues, SubmitHandler } from "react-hook-form";

import MraForm from "@/src/components/modules/home/form/MraForm";
import MraInput from "@/src/components/modules/home/form/MraInput";
import { useForgetPassword } from "@/src/hooks/auth.hook";
import Loading from "@/src/components/UI/Loading";
import { useUser } from "@/src/context/UserProvider";

const ForgetPassword = () => {
  const { mutate: handleForgetPasword, isPending } = useForgetPassword();
  const { setIsLoading: userLoading } = useUser();

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    handleForgetPasword(data);
    userLoading(true);
  };

  return (
    <>
      {isPending && <Loading />}
      <div className="flex h-[calc(100vh-200px)] w-full flex-col items-center justify-center">
        <h3 className="my-2 text-2xl font-bold">Reset Password</h3>
        <div className="w-[35%]">
          <MraForm onSubmit={onSubmit}>
            <div className="py-3">
              <MraInput label="Email" name="email" type="email" />
            </div>
            <Button
              className="my-3 w-full rounded-md bg-default-900 font-semibold text-default"
              size="lg"
              type="submit"
            >
              Reset Password
            </Button>
          </MraForm>
        </div>
      </div>
    </>
  );
};

export default ForgetPassword;
