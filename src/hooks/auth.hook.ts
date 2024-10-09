import { useMutation } from "@tanstack/react-query";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import {
  changePassword,
  forgetPassword,
  getCurrentUser,
  loginUser,
  resetPassword,
  signUpUser,
  UpdateUserProfile,
} from "../services/AuthService";
import { makePayment } from "../services/AuthService/Payment";

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
export const useChangePassword = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["Change_Password"],
    mutationFn: async (data) => await changePassword(data),
    onSuccess: () => {
      toast.success("Password Updated successfull");
    },
    onError: (error) => {
      console.error(error);
      toast.error(error?.message);
    },
  });
};

export const useForgetPassword = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["Forget_password"],
    mutationFn: async (data) => await forgetPassword(data),
    onSuccess: () => {
      toast.success("A Reset link sent in your email");
    },
    onError: (error) => {
      toast.error(error?.message);
    },
  });
};

export const useResetPassword = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["Reset_Password"],
    mutationFn: async (data) => await resetPassword(data),
    onSuccess: () => {
      toast.success("Password Updated successfull");
    },
    onError: (error) => {
      console.error(error);
      toast.error(error?.message);
    },
  });
};

export const useGetCurrentUser = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["Get_User_Info"],
    mutationFn: async (data) => await getCurrentUser(data.email), // Assuming 'email' is part of the form values

    onError: (error) => {
      console.error(error);
      toast.error("Something wants wrong!");
    },
  });
};

export const useUpdateProfile = () => {
  return useMutation<any, Error, { data: FieldValues; userId: string }>({
    mutationKey: ["Update_Profile"],
    mutationFn: async ({ data, userId }) => {
      return await UpdateUserProfile(data, userId);
    },
    onSuccess: () => {
      toast.success("Update successful!");
    },
    onError: (error) => {
      toast.error(error?.message);
    },
  });
};

export const usePayment = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["Payment"],
    mutationFn: async (data) => {
      await makePayment(data);
      // console.log(data);
    },
    onSuccess: () => {
      toast.success("Login successfull");
    },
    onError: (error) => {
      toast.error(error?.message);
    },
  });
};
