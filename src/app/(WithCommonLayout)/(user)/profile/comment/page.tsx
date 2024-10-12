"use client";
import { useEffect, useState } from "react";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import {
  useGetSinglePost,
  useUpdateComment,
  useUserComment,
} from "@/src/hooks/post.hook";
import { useUser } from "@/src/context/UserProvider";
import { toast } from "sonner";

interface IComment {
  _id: string;
  comment: string;
  userId: {
    profilePicture: string;
    name: string;
  };
}

export default function CommentsPage() {
  const postId = "67079c09862111098e650cde";
  const { data: sampleComments, error, mutate } = useGetSinglePost();

  useEffect(() => {
    if (postId) {
      mutate({ postId });
    }
  }, [postId, mutate]);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const comments = sampleComments?.data?.comments;
  const { register, handleSubmit, reset } = useForm();
  const { user } = useUser();
  const [newComment, setNewComment] = useState("");
  const { mutate: handleComment } = useUserComment();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const commentData = {
        ...data,
        postId: "67079c09862111098e650cde",
        userId: user?._id,
      };

      await handleComment(commentData);

      toast.success("Comment posted successfully");
      reset();
      setNewComment("");
      mutate({ postId });
    } catch (error) {
      console.error("Error posting comment:", error);
      toast.error("Failed to post comment");
    }
  };

  const { mutate: handleEdit, isPending } = useUpdateComment();
  const [currentComment, setCurrentComment] = useState<IComment | null>(null);

  const {
    register: updateRegister,
    handleSubmit: handleEditSubmit,
    formState: { errors },
    reset: editReset,
    watch,
  } = useForm<{ comment: string }>({
    defaultValues: {
      comment: "",
    },
  });

  const handleEditComment = (commentId: string) => {
    const findCurrentComment = comments.find(
      (comment: IComment) => comment._id === commentId
    );
    if (findCurrentComment) {
      setCurrentComment(findCurrentComment);

      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    if (currentComment) {
      editReset({
        comment: currentComment.comment,
      });
    }
  }, [currentComment, editReset]);

  const onSubmitEdit = async (formData: any) => {
    try {
      if (currentComment)
        await handleEdit({ data: formData, commentId: currentComment._id });
      reset();
      setCurrentComment(null);
      mutate({ postId });
    } catch (error) {
      console.error("Error updating comment:", error);
      toast.error("Failed to update comment");
    }
  };
  const handleDeleteComment = (commentId: string) => {
    console.log("Delete comment with ID:", commentId);
  };

  if (comments) {
    return (
      <div className="flex flex-col items-center">
        <Card className="max-w-2xl w-full shadow-lg p-4 bg-default-100 mb-6">
          <div className="mb-4">
            <h3 className="text-lg text-center font-semibold">Comments</h3>
          </div>

          {/* Comments List */}
          {comments.map((comment: IComment) => (
            <Card key={comment._id} className="mb-4 p-2">
              <CardHeader className="p-0 flex items-center gap-3">
                <img
                  src={comment?.userId?.profilePicture}
                  alt="Profile"
                  className="w-10 h-10 rounded-full"
                />
                <div className="flex flex-col gap-1">
                  <h4 className="font-semibold">{comment?.userId?.name}</h4>
                </div>
              </CardHeader>
              <CardBody className="p-4">{comment.comment}</CardBody>
              <CardFooter>
                <span
                  className="cursor-pointer p-2"
                  onClick={() => handleEditComment(comment._id)}
                >
                  Edit
                </span>
                <span
                  className="cursor-pointer p-2"
                  onClick={() => handleDeleteComment(comment._id)}
                >
                  Delete
                </span>
              </CardFooter>
            </Card>
          ))}

          {/* Edit Comment Form (if currentComment is selected) */}
          {currentComment ? (
            <form onSubmit={handleEditSubmit(onSubmitEdit)}>
              <Card className="w-full shadow-lg p-4 bg-default-100 mt-6 border-1 border-default-200">
                <CardHeader className="p-0">
                  <h4 className="font-semibold">Edit Comment</h4>
                </CardHeader>
                <CardBody className="p-4 ">
                  <Input
                    placeholder="Update your comment here..."
                    fullWidth
                    {...updateRegister("comment", { required: true })}
                    value={watch("comment")}
                    className="border-3 border-default-200 rounded-2xl"
                  />
                </CardBody>
                <CardFooter className="p-0">
                  <Button type="submit" className="mt-4" fullWidth>
                    Update Comment
                  </Button>
                </CardFooter>
              </Card>
            </form>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)}>
              <Card className="w-full shadow-lg p-4 bg-default-100 mt-6 border-1 border-default-200">
                <CardHeader className="p-0">
                  <h4 className="font-semibold">Leave your Comment</h4>
                </CardHeader>
                <CardBody className="p-4 ">
                  <Input
                    placeholder="Type your comment here..."
                    fullWidth
                    {...register("comment", { required: true })}
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    className="border-3 border-default-200 rounded-2xl"
                  />
                </CardBody>
                <CardFooter className="p-0">
                  <Button type="submit" className="mt-4" fullWidth>
                    Post Comment
                  </Button>
                </CardFooter>
              </Card>
            </form>
          )}
        </Card>
      </div>
    );
  }

  return null;
}
