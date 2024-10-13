"use client";
import { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import RecentPosts from "./loading";
import { getAllPost } from "@/src/services/RecentPost";
import Container from "@/src/components/UI/Container";
import PostCard from "@/src/components/UI/Card";

interface IPost {
  _id: string;
  title: string;
  content: string;
}

const RecentPost = () => {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchPosts = async (page: number) => {
    setLoading(true);
    const { data } = await getAllPost(page);

    if (data.length === 0) {
      setHasMore(false);
    }
    setPosts((prevPosts) => [...prevPosts, ...data]);
    setLoading(false);
  };

  useEffect(() => {
    fetchPosts(page);
  }, [page]);

  const loadMorePosts = () => {
    if (!loading) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <Container>
      <InfiniteScroll
        dataLength={posts.length}
        hasMore={hasMore}
        loader={<RecentPosts />}
        next={loadMorePosts}
      >
        <div className="max-w-2xl mx-auto p-4 grid justify-center gap-2 sm:grid-cols-1">
          {posts.map((post, index) => (
            <PostCard key={`${post._id}-${index}`} post={post} />
          ))}
        </div>
      </InfiniteScroll>
    </Container>
  );
};

export default RecentPost;
