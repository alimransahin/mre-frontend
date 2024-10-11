"use server";

import axiosInstance from "@/src/lib/AxiosInstance";
import { FieldValues } from "react-hook-form";

export const userPost = async (postData: FieldValues) => {
  try {
    const { data } = await axiosInstance.post("/post/create-post", postData);
    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};
export const userUpvote = async (postData: FieldValues) => {
  try {
    const { data } = await axiosInstance.post("/vote", postData);
    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};
