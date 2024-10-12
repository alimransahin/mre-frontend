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
export const userComment = async (postData: FieldValues) => {
  try {
    const { data } = await axiosInstance.post("/comment/", postData);
    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};
export const getUserSinglePost = async (postId: string) => {
  try {
    const { data } = await axiosInstance.get(`/post/${postId}`);
    return data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Failed to retrieve user information"
    );
  }
};
export const UpdateUserComment = async (
  userData: FieldValues,
  commentId: string
) => {
  try {

    const { data } = await axiosInstance.put(
      `/comment/update-comment/${commentId}`,
      userData
    );
    return data;
  } catch (error: any) {
    console.error("Update failed:", error);
    throw new Error(error);
  }
};
export const deleteUserComment = async (commentId: string) => {
  try {
    const { data } = await axiosInstance.delete(`/comment/${commentId}`);
    return data;
  } catch (error: any) {
    console.error("Delete failed:", error);
    throw new Error(error);
  }
};
