import { useMutation } from "@tanstack/react-query";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import { loginUser, signUpUser } from "../services/AuthService";

export const useUserSignup = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["User_Signup"],
    mutationFn: async (data) => await signUpUser(data),
    onSuccess: () => {
      toast.success("create successfull");
    },
    onError: (error) => {
      toast.error(error?.message);
    },
  });
};

export const useUserLogin = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["User_Login"],
    mutationFn: async (data) => await loginUser(data),
    onSuccess: () => {
      toast.success("Login successfull");
    },
    onError: (error) => {
      toast.error(error?.message);
    },
  });
};
