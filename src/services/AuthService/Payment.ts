"use client";
import axiosInstance from "@/src/lib/AxiosInstance";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

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
      window.location.href = data.data.payment_url;
    } else {
      toast.error("Payment URL not found. Please try again.");
    }

    console.log(data);
    return data;
  } catch (error: any) {
    console.error("Error during payment:", error);
    toast.error(
      "An error occurred during the payment process. Please try again."
    );
    throw new Error(error.response?.data?.message || "Unknown error occurred.");
  }
};
