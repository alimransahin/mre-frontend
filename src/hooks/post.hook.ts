import { useMutation } from "@tanstack/react-query";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import { userPost, userUpvote } from "../services/AuthService/Post";

export const useUserPost = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["User_Signup"],
    mutationFn: async (data) => await userPost(data),
    onSuccess: () => {
      toast.success("Post create successfull");
    },
    onError: (error) => {
      toast.error(error?.message);
    },
  });
};
export const useUserUpvote = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["User_Upvote"],
    mutationFn: async (data) => await userUpvote(data),
    onError: (error) => {
      toast.error(error?.message);
    },
  });
};
