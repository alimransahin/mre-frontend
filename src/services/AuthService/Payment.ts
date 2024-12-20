"use client";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import axiosInstance from "@/src/lib/AxiosInstance";

export const makePayment = async (userData: FieldValues) => {
  try {
    const { data } = await axiosInstance.post(
      `/user/${userData.userId}`,
      userData.data
    );
    if (data.errors && data.errors.length > 0) {
      toast.error(data.errors[0]);

      return;
    }

    if (data?.data?.payment_url) {
      if (window !== undefined) {
        window.location.href = data.data.payment_url;
      }
    } else {
      toast.error("Payment URL not found. Please try again.");
    }

    return data;
  } catch (error: any) {
    toast.error(
      "An error occurred during the payment process. Please try again."
    );
    throw new Error(error.response?.data?.message || "Unknown error occurred.");
  }
};
export const paymentInfo = async (paymenturl: any) => {
  try {
    const { data } = await axiosInstance.post(
      "/payment/confirmation",
      paymenturl
    );

    if (data.success) {
      //  cookies().set("accessToken", data?.data?.accessToken);
      //  cookies().set("refreshToken", data?.data?.refreshToken);
    }

    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};
