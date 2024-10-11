"use client";
import {
  AwaitedReactNode,
  JSXElementConstructor,
  Key,
  ReactElement,
  ReactNode,
  ReactPortal,
  useEffect,
  useState,
} from "react";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useGetSinglePost, useUserComment } from "@/src/hooks/post.hook";
import { useUser } from "@/src/context/UserProvider";
import { toast } from "sonner";
import Loading from "@/src/components/UI/Loading";

interface IComment {
  id: string;
  userId: {
    profilePicture: string;
    name: string;
  };
  comment: string;
}
// Sample data for comments

export default function CommentsPage() {
  // getuserComment
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
  // const [comments, setComments] = useState(sampleComments);
  console.log(comments);
  // post Comment
  const { register, handleSubmit, reset } = useForm();
  const { user } = useUser();
  const [newComment, setNewComment] = useState("");
  const { mutate: handleComment, isSuccess, isError } = useUserComment();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const commentData = {
        ...data,
        postId: "67079c09862111098e650cde",
        userId: user?._id,
      };

      await handleComment(commentData);

      // Display success message after mutation succeeds
      if (isSuccess) {
        toast.success("Comment posted successfully");
        reset(); // Reset the form after successful submission
        setNewComment(""); // Clear the comment input field
      } else if (isError) {
        toast.error("Failed to post comment");
      }
    } catch (error) {
      // Handle error if necessary
      console.error("Error posting comment:", error);
      toast.error("Failed to post comment");
    }
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
            <Card key={comment.id} className="mb-4 p-2">
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
            </Card>
          ))}

          {/* Comment Form */}
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
        </Card>
      </div>
    );
  }
}
