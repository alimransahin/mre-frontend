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
  const { mutate: handleSignUp, isPending } = useUserSignup();
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
            resolver={zodResolver(signUpValidationSchema)}
            onSubmit={onSubmit}
          >
            <div className="py-3">
              <MraInput label="Name" name="name" />
            </div>
            <div className="py-3">
              <MraInput label="Phone Number" name="phone" />
            </div>
            <div className="py-3">
              <MraInput label="Email" name="email" type="email" />
            </div>
            <div className="py-3">
              <MraInput label="Address" name="address" />
            </div>
            <div className="py-3">
              <MraInput label="Password" name="password" type="password" />
            </div>
            <div className="py-3">
              <MraInput
                label="Confirm Password"
                name="con_password"
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
