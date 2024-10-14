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
import { useUserUpvote } from "@/src/hooks/post.hook";
import { useUpdateFollow } from "@/src/hooks/auth.hook";

interface PostCardProps {
  post: any; // You can replace `any` with a more specific type if possible
  paramsId?: string; // Optional prop
}
const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const { user } = useUser();
  const description = post?.description;
  let smallDescription;

  if (description <= 300) {
    smallDescription = description;
  } else {
    smallDescription = description?.slice(0, 300);
  }

  const { mutate: handleUpvote, isSuccess } = useUserUpvote();

  // State for upvotes and downvotes
  const [upvotes, setUpvotes] = useState(post?.upvotes ? post.upvotes : 0);
  const [downvotes, setDownvotes] = useState(post?.upvotes ? post.upvotes : 0);

  // Upvote and downvote handlers
  const onUpvote = (postId: string) => {
    const data = { userId: user?._id, postId, voteType: "Upvote" };

    handleUpvote(data);

    setDownvotes((prev: number) => Math.max(prev - 1, 0)); // Decrease downvotes safely
    setUpvotes((prev: number) => prev + 1);
    isSuccess && toast.success("Upvoted");
  };

  const onDownvote = (postId: string) => {
    const data = { userId: user?._id, postId, voteType: "Downvote" };

    handleUpvote(data);
    setUpvotes((prev: number) => Math.max(prev - 1, 0)); // Decrease downvotes safely
    setDownvotes((prev: number) => prev + 1);
    isSuccess && toast.success("Downvoted");
  };

  // comment

  const followStatus = post?.user?.followers || []; // Fallback to an empty array if undefined
  const [follow, setFollow] = useState(false); // Initialize to false by default
  const { mutate: handleFollow } = useUpdateFollow();

  useEffect(() => {
    // Check if followStatus is an array and user._id exists
    if (Array.isArray(followStatus) && user?._id) {
      setFollow(followStatus.includes(user._id));
    }
  }, [user?._id, followStatus]);

  const onFollowClick = async () => {
    if (!user?._id) {
      toast.error("User is not authenticated");

      return; // Stop execution if user ID is not available
    }

    try {
      const result = await handleFollow({
        authId: post.user._id,
        userId: user._id,
      });
      setFollow(!follow); // Toggle follow state
    } catch (error) {
      toast.error("Failed to update follow status");
    }
  };

  // Generate PDF function
  const postRef = useRef(null);
  const handleGeneratePdf = () => {
    // const opt = {
    //   margin: 1,
    //   filename: "myfile.pdf",
    //   image: { type: "jpeg", quality: 0.98 },
    //   html2canvas: { scale: 2 },
    //   jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    // };
    // html2pdf().from(postRef.current).set(opt).save();
  };
  // share
  const handleShare = async (postId: string) => {
    const postUrl = `${window.location.origin}/post-details/${postId}`;
    const title = post?.user?.name || "Check out this post!";

    if (navigator.share) {
      try {
        await navigator.share({
          title,
          url: postUrl,
        });
        toast.success("Post shared successfully!");
      } catch (error) {
        toast.error("Failed to share the post");
      }
    } else {
      toast.info("Sharing is not supported on this browser");
    }
  };

  return (
    <div className="flex justify-center ">
      <Card className={`max-w-2xl shadow-lg p-4 bg-default-100 `}>
        <div ref={postRef}>
          {/* Header Section */}
          <CardHeader className="p-0">
            <img
              alt="Profile"
              className="w-10 h-10 rounded-full mr-3"
              src={post?.user?.profilePicture}
            />
            <div className="flex items-center">
              <div>
                <div className="flex flex-row gap-1 items-center">
                  <h4 className=" font-semibold inline-block">
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

          {/* Main Image */}
          <CardBody className="p-0 py-3">
            <div>
              <span
                dangerouslySetInnerHTML={{ __html: smallDescription }}
                className="custom-description"
              />
              {description?.length > 300 && (
                <Link
                  className="text-primary-600 inline ml-1"
                  href={`/post-details/${post._id}`}
                >
                  See More
                </Link>
              )}
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
              {post.comments?.length ? post.comments.length : 0} Comments
            </p>
          </CardBody>
        </div>
        {/* Footer Buttons */}
        <CardFooter className="border-t border-gray-200 p-2 flex justify-around">
          <button
            className="text-center p-1 cursor-pointer rounded-md hover:bg-default-200 "
            onClick={() => onUpvote(post._id)}
          >
            <ArrowBigUp className="mx-auto" /> Upvote
          </button>
          <button
            className="text-center p-1 cursor-pointer rounded-md hover:bg-default-200 "
            onClick={() => onDownvote(post._id)}
          >
            <ArrowBigDown className="mx-auto" /> Down vote
          </button>
          <Link
            className="text-center p-1 cursor-pointer rounded-md hover:bg-default-200 "
            href={`/post-details/${post._id}`}
          >
            <MessageSquareMore className="mx-auto" />
            Comment
          </Link>
          <button
            className="text-center p-1 cursor-pointer rounded-md hover:bg-default-200"
            onClick={() => handleShare(post._id)}
          >
            <Forward className="mx-auto" /> Share
          </button>
          <button
            className="text-center p-1 cursor-pointer rounded-md hover:bg-default-200 "
            onClick={handleGeneratePdf}
          >
            <Download className="mx-auto" /> Save
          </button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default PostCard;
