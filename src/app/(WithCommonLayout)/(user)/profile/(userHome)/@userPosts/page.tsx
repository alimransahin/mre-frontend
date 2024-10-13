"use client";
import { useEffect, useState } from "react";

import { getAllPost } from "@/src/services/RecentPost";
import Container from "@/src/components/UI/Container";
import PostCard from "@/src/components/UI/Card";
import { useUser } from "@/src/context/UserProvider";

const UserPost = () => {
  const { user } = useUser();
  const [userPosts, setUserPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        const { data: allPosts } = await getAllPost();
        const filteredPosts = allPosts.filter(
          (post: any) => post.user.email === user?.email
        );

        setUserPosts(filteredPosts);
      }
    };

    fetchData();
  }, [user]);

  return (
    <Container>
      <div className="max-w-2xl mx-auto p-4 grid justify-center gap-2 sm:grid-cols-1">
        {userPosts.map((post: any) => (
          <PostCard key={post._id} post={post} />
        ))}
      </div>
    </Container>
  );
};

export default UserPost;
