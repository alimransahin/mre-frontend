"use client";

import { Button } from "@nextui-org/button";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import loginValidationSchema from "@/src/schemas/login.schema";
import MraForm from "@/src/components/modules/home/form/MraForm";
import MraInput from "@/src/components/modules/home/form/MraInput";
import { useUserLogin } from "@/src/hooks/auth.hook";
import Loading from "@/src/components/UI/Loading";
import { useUser } from "@/src/context/UserProvider";

const LoginPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const redirect = searchParams.get("redirect");
  const { mutate: handleLogin, isPending, isSuccess } = useUserLogin();
  const { setIsLoading: userLoading } = useUser();

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    handleLogin(data);
    userLoading(true);
  };

  useEffect(() => {
    if (!isPending && isSuccess) {
      if (redirect) {
        router.push(redirect);
      } else {
        router.push("/");
      }
    }
  }, [isPending, isSuccess]);

  return (
    <>
      {isPending && <Loading />}
      <div className="flex h-[calc(100vh-200px)] w-full flex-col items-center justify-center">
        <h3 className="my-2 text-2xl font-bold">Login with MRA</h3>
        <p className="mb-4">Welcome Back! Let&lsquo;s Get Started</p>
        <div className="w-[35%]">
          <MraForm
            resolver={zodResolver(loginValidationSchema)}
            onSubmit={onSubmit}
          >
            <div className="py-3">
              <MraInput label="Email" name="email" type="email" />
            </div>
            <div className="py-3">
              <MraInput label="Password" name="password" type="password" />
            </div>

            <Button
              className="my-3 w-full rounded-md bg-default-900 font-semibold text-default"
              size="lg"
              type="submit"
            >
              Login
            </Button>
          </MraForm>
          <div className="text-center">
            Don&lsquo;t have account ? <Link href={"/signup"}>Sign Up</Link>
          </div>
          <div className="text-center text-rose-600">
            <Link href={"/forget-password"}>Forget Password?</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
