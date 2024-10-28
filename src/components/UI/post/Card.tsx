"use client";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import {
  ArrowBigDown,
  ArrowBigUp,
  Download,
  Forward,
  MessageSquareMore,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { useUser } from "@/src/context/UserProvider";
import { useGetSinglePost, useUserUpvote } from "@/src/hooks/post.hook";
import { useUpdateFollow } from "@/src/hooks/auth.hook";

interface PostCardProps {
  post: any;
  paramsId?: string;
}

const PostCard: React.FC<PostCardProps> = ({ post, paramsId }) => {
  // Hooks at the top level of the component
  const { data: voteInfo, error, mutate } = useGetSinglePost();
  const { user } = useUser();
  const { mutate: handleUpvote, isSuccess } = useUserUpvote();
  const { mutate: handleFollow } = useUpdateFollow();

  const [upvotes, setUpvotes] = useState(post?.upvotes || 0);
  const [downvotes, setDownvotes] = useState(post?.downvotes || 0);
  const [follow, setFollow] = useState(false);

  const followStatus = post?.user?.followers || []; // Fallback to an empty array if undefined
  const description = post?.description;
  const smallDescription =
    description?.length > 300 && !paramsId
      ? description.slice(0, 300)
      : description;

  useEffect(() => {
    if (paramsId) {
      mutate({ postId: paramsId });
    }
  }, [paramsId, mutate]);

  useEffect(() => {
    setUpvotes(voteInfo?.data?.upvotes);
    setDownvotes(voteInfo?.data?.downvotes);
  }, [voteInfo]);

  useEffect(() => {
    if (Array.isArray(followStatus) && user?._id) {
      setFollow(followStatus.includes(user._id));
    }
  }, [user?._id, followStatus]);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  // Handlers
  const onUpvote = (postId: string) => {
    if (!user) {
      toast.error("Please Login First");
      return;
    }
    const data = { userId: user._id, postId, voteType: "Upvote" };
    handleUpvote(data);
    if (isSuccess) {
      toast.success("Upvoted");
      mutate({ postId });
    }
  };

  const onDownvote = (postId: string) => {
    if (!user) {
      toast.error("Please Login First");
      return;
    }
    const data = { userId: user._id, postId, voteType: "Downvote" };
    handleUpvote(data);
    if (isSuccess) {
      toast.success("Downvoted");
      mutate({ postId });
    }
  };

  const onFollowClick = async () => {
    if (!user?._id) {
      toast.error("Please Login First");
      return;
    }
    try {
      await handleFollow({ authId: post.user._id, userId: user._id });
      setFollow(!follow);
    } catch {
      toast.error("Failed to update follow status");
    }
  };

  const handleGeneratePdf = () => {
    // Add PDF generation logic here
  };

  const handleShare = async (postId: string) => {
    const postUrl = `${window.location.origin}/post-details/${postId}`;
    const title = post?.user?.name || "Check out this post!";
    if (navigator.share) {
      try {
        await navigator.share({ title, url: postUrl });
        toast.success("Post shared successfully!");
      } catch {
        toast.error("Failed to share the post");
      }
    } else {
      toast.info("Sharing is not supported on this browser");
    }
  };

  return (
    <Card
      className={`max-w-2xl w-full mx-auto shadow-lg p-4 bg-default-50 ${paramsId ? "rounded-b-none" : "rounded-none"}`}
    >
      <div>
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
                  onClick={onFollowClick}
                >
                  {follow ? "Unfollow" : "Follow"}
                </button>
              </div>
              <p className="text-blue-500 text-sm">
                {post.category} {post.isPremium && "(Premium)"}
              </p>
              <p className="text-default-500 text-sm">
                {post?.createdAt &&
                  new Date(post.createdAt).toLocaleDateString("en-GB", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
              </p>
            </div>
          </div>
        </CardHeader>

        <CardBody className="p-0 py-3">
          <div
            dangerouslySetInnerHTML={{ __html: smallDescription }}
            className="custom-description"
          />
          {description?.length > 300 && !paramsId && (
            <Link
              className="text-primary-600 inline ml-1"
              href={`/post-details/${post._id}`}
            >
              See More
            </Link>
          )}
          {post.image && (
            <Image
              alt="Post Image"
              className="object-cover w-full"
              height={280}
              src={post.image}
              width={500}
            />
          )}
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
            <ArrowBigDown className="mx-auto" /> Down vote
          </button>
          {!paramsId && (
            <Link
              href={`/post-details/${post._id}`}
              className="text-center p-1 cursor-pointer rounded-md hover:bg-default-200"
            >
              <MessageSquareMore className="mx-auto" /> Comment
            </Link>
          )}
          <button
            className="text-center p-1 cursor-pointer rounded-md hover:bg-default-200"
            onClick={() => handleShare(post._id)}
          >
            <Forward className="mx-auto" /> Share
          </button>
          <button
            className="text-center p-1 cursor-pointer rounded-md hover:bg-default-200"
            onClick={handleGeneratePdf}
          >
            <Download className="mx-auto" /> Save
          </button>
        </CardFooter>
      </div>
    </Card>
  );
};

export default PostCard;
