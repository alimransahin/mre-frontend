"use client";

import { Button } from "@nextui-org/button";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, SubmitHandler } from "react-hook-form";
import MraForm from "@/src/components/modules/home/form/MraForm";
import MraInput from "@/src/components/modules/home/form/MraInput";
import signUpValidationSchema from "@/src/schemas/signup.schema";
import { useUserSignup } from "@/src/hooks/auth.hook";
import Loading from "@/src/components/UI/Loading";

const SignUpPage = () => {
  const {
    mutate: handleSignUp,
    isError,
    isIdle,
    isPending,
    isSuccess,
    data,
  } = useUserSignup();
  // console.log(isError, isIdle, isPending, isSuccess, data);
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    handleSignUp(data);
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
            resolver={zodResolver(signUpValidationSchema)}
          >
            <div className="py-3">
              <MraInput name="name" label="Name" />
            </div>
            <div className="py-3">
              <MraInput name="phone" label="Phone Number" />
            </div>
            <div className="py-3">
              <MraInput name="email" label="Email" type="email" />
            </div>
            <div className="py-3">
              <MraInput name="address" label="Address" />
            </div>
            <div className="py-3">
              <MraInput name="password" label="Password" type="password" />
            </div>
            <div className="py-3">
              <MraInput
                name="con_password"
                label="Confirm Password"
                type="password"
              />
            </div>

            <Button
              className="my-3 w-full rounded-md bg-default-900 font-semibold text-default"
              size="lg"
              type="submit"
            >
              Sign Up
            </Button>
          </MraForm>
          <div className="text-center">
            Already have account ? <Link href={"/login"}>Login</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUpPage;
