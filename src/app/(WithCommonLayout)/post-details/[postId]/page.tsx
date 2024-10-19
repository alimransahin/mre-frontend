"use client";
import { NextPage } from "next";
import CommentsPage from "@/src/components/UI/post/Comment";
import PostDetails from "@/src/components/UI/post/PostDetails";
import PostCard from "@/src/components/UI/Card";
import { useEffect, useState } from "react";
import { getSinglePost } from "@/src/services/RecentPost";
import Loading from "@/src/components/UI/Loading";
// import { useRouter } from "next/router";

interface Params {
  postId: string;
}
interface DynamicPostPageProps {
  params: Params;
}

const DynamicPostPage: NextPage<DynamicPostPageProps> = ({ params }) => {
  const [post, setPost] = useState<any>(null);
  const postId = params?.postId;
  useEffect(() => {
    const fetchData = async () => {
      if (postId) {
        const { data } = await getSinglePost(postId);
        console.log("data:", data);
        setPost(data);
      }
    };
    fetchData();
  }, [params]);
  console.log("post:", post);
  if (post === null) return <Loading />;
  return (
    <>
      <PostCard post={post} paramsId={params?.postId} />
      {/* <PostDetails postId={params.postId} /> */}
      <CommentsPage postId={params.postId} />
    </>
  );
};

export default DynamicPostPage;
