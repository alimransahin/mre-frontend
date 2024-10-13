"use client";
import React, { useEffect, useRef, useState } from "react";
import { getSinglePost } from "@/src/services/RecentPost";
import Loading from "../Loading";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
import { useUser } from "@/src/context/UserProvider";
import { useUserUpvote } from "@/src/hooks/post.hook";
import { toast } from "sonner";
import html2pdf from "html2pdf.js";
import { useRouter } from "next/navigation";
import { useUpdateFollow } from "@/src/hooks/auth.hook";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowBigDown,
  ArrowBigUp,
  Download,
  Forward,
  MessageSquareMore,
} from "lucide-react";

interface CommentsPageProps {
  postId: string;
}

const PostDetails: React.FC<CommentsPageProps> = ({ postId }) => {
  const [post, setPost] = useState<any>(null);
  const { user } = useUser();
  const { mutate: handleUpvote, isSuccess } = useUserUpvote();
  const { mutate: handleFollow } = useUpdateFollow();
  const [upvotes, setUpvotes] = useState(0);
  const [downvotes, setDownvotes] = useState(0);
  const [follow, setFollow] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (postId) {
        const { data } = await getSinglePost(postId);
        setPost(data);
        setUpvotes(data?.upvotes || 0);
        setDownvotes(data?.downvotes || 0);
      }
    };
    fetchData();
  }, [postId]);

  useEffect(() => {
    if (Array.isArray(post?.user?.followers) && user?._id) {
      setFollow(post.user.followers.includes(user._id));
    }
  }, [post?.user?.followers, user?._id]);

  const onUpvote = (postId: string) => {
    handleUpvote({ userId: user?._id, postId, voteType: "Upvote" });
    setDownvotes((prev) => Math.max(prev - 1, 0));
    setUpvotes((prev) => prev + 1);
    isSuccess && toast.success("Upvoted");
  };

  const onDownvote = (postId: string) => {
    handleUpvote({ userId: user?._id, postId, voteType: "Downvote" });
    setUpvotes((prev) => Math.max(prev - 1, 0));
    setDownvotes((prev) => prev + 1);
    isSuccess && toast.success("Downvoted");
  };

  const handleFollowClick = async () => {
    if (!user?._id) {
      toast.error("User is not authenticated");
      return;
    }
    try {
      await handleFollow({ authId: post.user._id, userId: user._id });
      setFollow(!follow);
    } catch (error) {
      toast.error("Failed to update follow status");
    }
  };

  const handleComment = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: "smooth",
      });
    }
  };

  if (!post) return <Loading />;

  return (
    // <p>lp</p>
    <div className="flex justify-center">
      <Card className="max-w-2xl shadow-lg p-4 bg-default-100">
        <CardHeader className="p-0">
          <img
            alt="Profile"
            className="w-10 h-10 rounded-full mr-3"
            src={post?.user?.profilePicture}
          />
          <div className="flex items-center">
            <div>
              <div className="flex flex-row gap-1 items-center">
                <h4 className="font-semibold inline-block">
                  {post?.user?.name}
                </h4>
                <button
                  className="text-blue-500 text-sm font-semibold cursor-pointer inline-block"
                  onClick={handleFollowClick}
                >
                  {follow ? "Unfollow" : "Follow"}
                </button>
              </div>
              <p className="text-blue-500 text-sm">{post.category}</p>
              <p className="text-default-500 text-sm">
                {post?.user?.createdAt &&
                  new Date(post.user.createdAt).toLocaleDateString("en-GB", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
              </p>
            </div>
          </div>
        </CardHeader>

        <CardBody className="p-0 py-3">
          <div>
            <span
              dangerouslySetInnerHTML={{ __html: post?.description }}
              className="custom-description"
            />
          </div>
          <Image
            alt="Post Image"
            className="object-cover w-full"
            height={280}
            src={post.image}
            width={500}
          />
        </CardBody>

        <CardBody className="p-4 flex flex-row justify-between">
          <p className="text-default-500 text-sm">{upvotes} Upvotes</p>
          <p className="text-default-500 text-sm">{downvotes} Downvotes</p>
          <p className="text-default-500 text-sm">
            {post.comments?.length || 0} Comments
          </p>
        </CardBody>

        <CardFooter className="border-t border-gray-200 p-2 flex justify-around">
          <button
            className="text-center p-1 cursor-pointer rounded-md hover:bg-default-200"
            onClick={() => onUpvote(post._id)}
          >
            <ArrowBigUp className="mx-auto" /> Upvote
          </button>
          <button
            className="text-center p-1 cursor-pointer rounded-md hover:bg-default-200"
            onClick={() => onDownvote(post._id)}
          >
            <ArrowBigDown className="mx-auto" /> Downvote
          </button>
          <button
            className="text-center p-1 cursor-pointer rounded-md hover:bg-default-200"
            onClick={handleComment}
          >
            <MessageSquareMore className="mx-auto" /> Comment
          </button>
          <span className="text-center p-1 cursor-pointer rounded-md hover:bg-default-200">
            <Forward className="mx-auto" /> Share
          </span>
        </CardFooter>
      </Card>
    </div>
  );
};

export default PostDetails;
