"use client";
import { useState } from "react";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";

// Sample data for comments
const sampleComments = [
  {
    id: 1,
    user: {
      name: "John Doe",
      profilePicture: "https://placehold.co/40x40",
    },
    comment: "This is an awesome post! Keep it up!",
    createdAt: "2023-10-10",
  },
  {
    id: 2,
    user: {
      name: "Jane Smith",
      profilePicture: "https://placehold.co/40x40",
    },
    comment: "I completely agree with your thoughts.",
    createdAt: "2023-10-11",
  },
];

export default function CommentsPage() {
  const [comments, setComments] = useState(sampleComments);
  const [newComment, setNewComment] = useState("");

  const handleCommentSubmit = () => {
    if (newComment.trim()) {
      const newCommentData = {
        id: comments.length + 1,
        user: {
          name: "Current User", // Replace with actual user data
          profilePicture: "https://placehold.co/40x40", // Replace with actual user profile pic
        },
        comment: newComment,
        createdAt: new Date().toISOString(),
      };
      setComments([newCommentData, ...comments]); // Add new comment at the top
      setNewComment(""); // Reset input field
    }
  };

  return (
    <div className="flex flex-col items-center">
      <Card className="max-w-2xl w-full shadow-lg p-4 bg-default-100 mb-6">
        <div className="mb-4">
          <h3 className="text-lg text-center font-semibold">Comments</h3>
        </div>

        {/* Comments List */}
        {comments.map((comment) => (
          <Card key={comment.id} className="mb-4 p-2">
            <CardHeader className="p-0 flex items-center gap-3">
              <img
                src={comment.user.profilePicture}
                alt="Profile"
                className="w-10 h-10 rounded-full"
              />
              <div className="flex flex-col gap-1">
                <h4 className="font-semibold">{comment.user.name}</h4>
                <p className="text-gray-400 text-xs">
                  {new Date(comment.createdAt).toLocaleDateString("en-GB", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
              </div>
            </CardHeader>
            <CardBody className="p-4">{comment.comment}</CardBody>
          </Card>
        ))}

        {/* Comment Form */}
        <Card className="w-full shadow-lg p-4 bg-default-100 mt-6 border-1 border-default-200">
          <CardHeader className="p-0">
            <h4 className="font-semibold">Leave your Comment</h4>
          </CardHeader>
          <CardBody className="p-4 ">
            <Input
              placeholder="Type your comment here..."
              fullWidth
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="border-3 border-default-200 rounded-2xl" // Change to any custom background color
            />
          </CardBody>
          <CardFooter className="p-0">
            <Button onClick={handleCommentSubmit} className="mt-4" fullWidth>
              Post Comment
            </Button>
          </CardFooter>
        </Card>
      </Card>
    </div>
  );
}
