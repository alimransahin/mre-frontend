import { useMutation } from "@tanstack/react-query";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

import {
  deleteUserComment,
  getUserSinglePost,
  UpdateUserComment,
  userComment,
  userPost,
  userUpvote,
} from "../services/AuthService/Post";

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
export const useUserComment = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["User_Comment"],
    mutationFn: async (data) => await userComment(data),
    onError: (error) => {
      toast.error(error?.message);
    },
  });
};

export const useGetSinglePost = () => {
  return useMutation<any, Error, { postId: string }>({
    mutationKey: ["Get_User_Comment"],
    mutationFn: async ({ postId }) => await getUserSinglePost(postId),
    onError: (error) => {
      toast.error(error?.message);
    },
  });
};
export const useUpdateComment = () => {
  return useMutation<any, Error, { data: FieldValues; commentId: string }>({
    mutationKey: ["Update_Comment"],
    mutationFn: async ({ data, commentId }) => {
      return await UpdateUserComment(data, commentId);
    },
    onSuccess: () => {
      toast.success("Comment updated successfully");
    },
    onError: (error) => {
      toast.error(error?.message);
    },
  });
};
export const useDeleteComment = () => {
  return useMutation<any, Error, { commentId: string }>({
    mutationKey: ["Delete_Comment"],
    mutationFn: async ({ commentId }) => {
      return await deleteUserComment(commentId);
    },
    onSuccess: () => {
      toast.success("Comment Deleted successfully");
    },
    onError: (error) => {
      toast.error(error?.message);
    },
  });
};
