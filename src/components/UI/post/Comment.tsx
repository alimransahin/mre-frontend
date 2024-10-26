"use client";
import { useEffect, useState } from "react";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

import {
  useDeleteComment,
  useGetSinglePost,
  useUpdateComment,
  useUserComment,
} from "@/src/hooks/post.hook";
import { useUser } from "@/src/context/UserProvider";

interface IComment {
  _id: string;
  comment: string;
  userId: {
    profilePicture: string;
    name: string;
  };
}
interface CommentsPageProps {
  postId: string;
}
const CommentsPage: React.FC<CommentsPageProps> = ({ postId }) => {
  const { register, handleSubmit, reset } = useForm();
  const [newComment, setNewComment] = useState("");
  const [currentComment, setCurrentComment] = useState<IComment | null>(null);
  const { mutate: handleComment } = useUserComment();
  const {
    register: updateRegister,
    handleSubmit: handleEditSubmit,
    formState: {},
    reset: editReset,
    watch,
  } = useForm<{ comment: string }>({
    defaultValues: {
      comment: "",
    },
  });

  useEffect(() => {
    if (currentComment) {
      editReset({
        comment: currentComment.comment,
      });
    }
  }, [currentComment, editReset]);
  const { user } = useUser();
  const { data: sampleComments, error, mutate } = useGetSinglePost();
  const { mutate: handleEdit } = useUpdateComment();
  const { mutate: handleDelete } = useDeleteComment();

  useEffect(() => {
    if (postId) {
      mutate({ postId });
    }
  }, [postId, mutate]);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const comments = sampleComments?.data?.comments;
  // create comment

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const commentData = {
        ...data,
        postId: postId,
        userId: user?._id,
      };

      await handleComment(commentData);

      toast.success("Comment posted successfully");
      reset();
      setNewComment("");
      mutate({ postId });
    } catch (error) {
      toast.error("Failed to post comment");
    }
  };
  // update comment

  const handleEditComment = (commentId: string) => {
    const findCurrentComment = comments.find(
      (comment: IComment) => comment._id === commentId
    );

    if (findCurrentComment) {
      setCurrentComment(findCurrentComment);
    }
  };

  const onSubmitEdit = async (formData: any) => {
    try {
      if (currentComment)
        await handleEdit({ data: formData, commentId: currentComment._id });
      reset();
      setCurrentComment(null);
      mutate({ postId });
    } catch (error) {
      toast.error("Failed to update comment");
    }
  };
  // delete comment

  const handleDeleteComment = (commentId: string) => {
    handleDelete({ commentId });
    mutate({ postId });
  };

  if (comments) {
    return (
      <div className="flex flex-col items-center">
        <Card className="max-w-2xl w-full rounded-t-none shadow-lg p-4 bg-default-50 mb-6">
          {/* Edit Comment Form (if currentComment is selected) */}
          {currentComment ? (
            <form onSubmit={handleEditSubmit(onSubmitEdit)}>
              <Card className="w-full shadow-lg p-4 bg-default-50 border-1 border-default-200 my-2">
                <CardHeader className="p-0">
                  <h4 className="font-semibold">Edit Comment</h4>
                </CardHeader>
                <CardBody className="p-0 pt-3">
                  <Input
                    fullWidth
                    placeholder="Update your comment here..."
                    {...updateRegister("comment", { required: true })}
                    className="border-3 border-default-200 rounded-2xl"
                    value={watch("comment")}
                  />
                </CardBody>
                <CardFooter className="px-0 flex space-x-4">
                  <Button fullWidth className="mt-4" type="submit">
                    Update Comment
                  </Button>
                  <Button
                    fullWidth
                    className="mt-4 bg-red-500 hover:bg-red-600 text-white"
                    type="button"
                    onClick={() => {
                      editReset();
                      setCurrentComment(null); // Exits edit mode
                    }}
                  >
                    Cancel
                  </Button>
                </CardFooter>
              </Card>
            </form>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)}>
              <Card className="w-full shadow-lg p-4 bg-default-50  border-1 border-default-200 my-2 ">
                <CardHeader className="p-0">
                  <h4 className="font-semibold">Leave your Comment</h4>
                </CardHeader>
                <CardBody className="p-0 pt-3">
                  <Input
                    fullWidth
                    placeholder="Type your comment here..."
                    {...register("comment", { required: true })}
                    className="border-3 border-default-200 rounded-2xl"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                  />
                </CardBody>
                <CardFooter className="px-0">
                  <Button fullWidth type="submit">
                    Post Comment
                  </Button>
                </CardFooter>
              </Card>
            </form>
          )}
          {/* Comments List */}
          {comments.map((comment: IComment) => (
            <Card key={comment._id} className="my-2 p-2 bg-default-50">
              <CardHeader className="p-0 flex items-center gap-3">
                <img
                  alt="Profile"
                  className="w-10 h-10 rounded-full"
                  src={comment?.userId?.profilePicture}
                />
                <div className="flex flex-col gap-1">
                  <h4 className="font-semibold">{comment?.userId?.name}</h4>
                </div>
              </CardHeader>
              <CardBody className="px-4">{comment.comment}</CardBody>
              <CardFooter className="py-0">
                <button
                  className="cursor-pointer p-2"
                  onClick={() => handleEditComment(comment._id)}
                >
                  Edit
                </button>
                <button
                  className="cursor-pointer p-2"
                  onClick={() => handleDeleteComment(comment._id)}
                >
                  Delete
                </button>
              </CardFooter>
            </Card>
          ))}
        </Card>
      </div>
    );
  }

  return null;
};

export default CommentsPage;
