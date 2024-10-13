"use client";
import React, { useEffect, useState } from "react";

import PostCard from "../Card";

import { getAllPost } from "@/src/services/RecentPost";
interface CommentsPageProps {
  postId: string;
}
const PostDetails: React.FC<CommentsPageProps> = ({ postId }) => {
  const [userPosts, setUserPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      if (postId) {
        const { data: allPosts } = await getAllPost();
        const filteredPosts = allPosts.filter(
          (post: any) => post._id === postId,
        );

        setUserPosts(filteredPosts);
      }
    };

    fetchData();
  }, [postId]);

  return (
    <div>
      {userPosts.map((post: any) => (
        <PostCard key={post._id} paramsId={postId} post={post} />
      ))}
    </div>
  );
};

export default PostDetails;
