import { useMutation } from "@tanstack/react-query";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

import {
  changePassword,
  forgetPassword,
  getAllUser,
  getCurrentUser,
  loginUser,
  resetPassword,
  signUpUser,
  UpdateUserFollow,
  UpdateUserProfile,
  UpdateUserStatus,
  getAllActivity,
} from "../services/AuthService";
import { makePayment, paymentInfo } from "../services/AuthService/Payment";

type PaymentUrl = {
  transactionId: string | null;
  status: string | null;
  userId: string | null;
};
export const useUserSignup = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["User_Signup"],
    mutationFn: async (data) => await signUpUser(data),
    onSuccess: () => {
      toast.success("Sign up successfull");
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
      toast.error(error?.message);
    },
  });
};

export const useGetCurrentUser = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["Get_User_Info"],
    mutationFn: async (data) => await getCurrentUser(data.email), // Assuming 'email' is part of the form values

    onError: () => {
      toast.error("Something wants wrong!");
    },
  });
};
export const useGetAllUser = () => {
  return useMutation<any, Error>({
    mutationKey: ["Get_User_Info"],
    mutationFn: async () => await getAllUser(), // Assuming 'email' is part of the form values

    onError: () => {
      toast.error("Something wants wrong!");
    },
  });
};
export const useGetAllActivity = () => {
  return useMutation<any, Error>({
    mutationKey: ["Get_User_Login_Activity"],
    mutationFn: async () => await getAllActivity(), // Assuming 'email' is part of the form values

    onError: () => {
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
export const useUpdateStatus = () => {
  return useMutation<any, Error, { userId: string; action: string }>({
    mutationKey: ["Update_User_Status"],
    mutationFn: async ({ action, userId }) => {
      return await UpdateUserStatus(action, userId);
    },
    onSuccess: () => {
      toast.success("Update successful!");
    },
    onError: (error) => {
      toast.error(error?.message);
    },
  });
};
export const useUpdateFollow = () => {
  return useMutation<any, Error, { authId: string; userId: string }>({
    mutationKey: ["Update_Follow"],
    mutationFn: async ({ authId, userId }) => {
      return await UpdateUserFollow(authId, userId);
    },
    onSuccess: () => {
      toast.success("Successful!");
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
    },
    onSuccess: () => {
      // toast.success("Payment successfull");
    },
    onError: (error) => {
      toast.error(error?.message);
    },
  });
};
export const usePaymentInfo = () => {
  return useMutation<any, Error, PaymentUrl>({
    mutationKey: ["User_Payment_Info"],
    mutationFn: async (paymenturl) => await paymentInfo(paymenturl),

    onError: (error) => {
      toast.error(error?.message);
    },
  });
};
