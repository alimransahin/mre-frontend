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
import { useRef, useState } from "react";
import html2pdf from "html2pdf.js";
import { useUser } from "@/src/context/UserProvider";
import { useUserUpvote } from "@/src/hooks/post.hook";
import { toast } from "sonner";

const PostCard = ({ post }: { post: any }) => {
  const { user } = useUser();
  const description = post?.description;
  const smallDescription = description?.slice(0, 300);
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

  // Generate PDF function
  const postRef = useRef(null);
  const handleGeneratePdf = () => {
    const opt = {
      margin: 1,
      filename: "myfile.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    };

    html2pdf().from(postRef.current).set(opt).save();
  };

  return (
    <div className="flex justify-center ">
      <Card className="max-w-2xl shadow-lg p-4 bg-default-100">
        <div ref={postRef}>
          {/* Header Section */}
          <CardHeader className="p-0">
            <img
              src={post?.user?.profilePicture}
              alt="Profile"
              className="w-10 h-10 rounded-full mr-3"
            />
            <div className="flex items-center">
              <div>
                <h4 className="text-blue-500 font-semibold">
                  {post?.user?.name}
                </h4>
                <p className="text-gray-400 text-sm">
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

          {/* Main Image */}
          <CardBody className="p-0">
            <div>
              <span
                className="custom-description"
                dangerouslySetInnerHTML={{ __html: smallDescription }}
              ></span>
              {description?.length > 300 && (
                <Link href={"/"} className="text-primary-600 inline ml-1">
                  See More
                </Link>
              )}
            </div>
            <Image
              src={post.image}
              alt="Post Image"
              width={500}
              height={280}
              className="object-cover w-full"
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
          <span
            onClick={() => onUpvote(post._id)}
            className="text-center p-1 cursor-pointer rounded-md hover:bg-default-200 "
          >
            <ArrowBigUp className="mx-auto" /> Upvote
          </span>
          <span
            onClick={() => onDownvote(post._id)}
            className="text-center p-1 cursor-pointer rounded-md hover:bg-default-200 "
          >
            <ArrowBigDown className="mx-auto" /> Down vote
          </span>
          <span className="text-center p-1 cursor-pointer rounded-md hover:bg-default-200 ">
            <MessageSquareMore className="mx-auto" />
            Comment
          </span>
          <span className="text-center p-1 cursor-pointer rounded-md hover:bg-default-200 ">
            <Forward className="mx-auto" /> Share
          </span>
          <span
            className="text-center p-1 cursor-pointer rounded-md hover:bg-default-200 "
            onClick={handleGeneratePdf}
          >
            <Download className="mx-auto" /> Save
          </span>
        </CardFooter>
      </Card>
    </div>
  );
};

export default PostCard;
