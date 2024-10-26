"use client";
import { useState, useEffect, useCallback } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import RecentPosts from "./loading";
import { getAllPost } from "@/src/services/RecentPost";
import Container from "@/src/components/UI/Container";
import PostCard from "@/src/components/UI/post/Card";
import { debounce } from "lodash";
import { useUser } from "@/src/context/UserProvider";

interface IPost {
  _id: string;
  content: string;
  upvotes: number;
  createdAt: Date;
  isPremium: boolean;
}

const RecentPost = () => {
  const [allPosts, setAllPosts] = useState<IPost[]>([]);
  const [posts, setPosts] = useState<IPost[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState<string | undefined>(undefined);
  const [sortBy, setSortBy] = useState<"upvotes" | "createdAt">("createdAt");
  const { user } = useUser();

  const fetchPosts = async (
    page: number,
    search: string = "",
    category?: string,
    sortBy: "upvotes" | "createdAt" = "createdAt"
  ) => {
    setLoading(true);
    const { data } = await getAllPost(page, search, category, sortBy);

    const filteredPosts = user?.isVerified
      ? data
      : data.filter((post: IPost) => !post.isPremium);

    if (filteredPosts.length === 0) {
      setHasMore(false);
    }

    setAllPosts((prevPosts) => [...prevPosts, ...filteredPosts]);
    setLoading(false);
  };

  useEffect(() => {
    fetchPosts(page, searchTerm, category, sortBy);
  }, [page, searchTerm, category, sortBy]);

  const loadMorePosts = () => {
    if (!loading) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const debouncedSearch = useCallback(
    debounce((value) => {
      setSearchTerm(value);
      setPage(1);
      setAllPosts([]);
    }, 500),
    []
  );

  useEffect(() => {
    const sortedPosts = [...allPosts].sort((a, b) => {
      if (sortBy === "upvotes") {
        return b.upvotes - a.upvotes;
      } else {
        const dateA = new Date(a.createdAt);
        const dateB = new Date(b.createdAt);

        if (isNaN(dateA.getTime())) return 1;
        if (isNaN(dateB.getTime())) return -1;

        return dateB.getTime() - dateA.getTime();
      }
    });

    setPosts(sortedPosts);
  }, [allPosts, sortBy]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    debouncedSearch(e.target.value);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value as "upvotes" | "createdAt";
    setSortBy(value);
    setPage(1);
    setAllPosts([]);
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.target.value || undefined);
    setPage(1);
    setAllPosts([]);
  };

  return (
    <Container>
      {/* Search, Filter, and Sort Options */}
      <div className="hidden xl:flex flex-col top-20 mx-6 gap-2 fixed">
        <input
          type="text"
          placeholder="Search tips and tricks..."
          className="border p-2 rounded"
          onChange={handleSearchChange}
        />
        <select className="border p-2 rounded" onChange={handleCategoryChange}>
          <option value="">All Categories</option>
          <option value="Web">Web</option>
          <option value="Software Engineering">Software Engineering</option>
          <option value="AI">AI</option>
          <option value="Data Science">Data Science</option>
        </select>
        <select className="border p-2 rounded" onChange={handleSortChange}>
          <option value="createdAt">Sort By</option>
          <option value="upvotes">Most Upvoted</option>
          <option value="createdAt">Newest</option>
        </select>
      </div>

      <InfiniteScroll
        dataLength={posts.length}
        hasMore={hasMore}
        loader={<RecentPosts />}
        next={loadMorePosts}
      >
        <div className="max-w-2xl mx-auto p-4 grid justify-center gap-2 sm:grid-cols-1">
          <div className="grid grid-cols-3 xl:hidden top-20  gap-2">
            <input
              type="text"
              placeholder="Search tips and tricks..."
              className="border p-2 rounded"
              onChange={handleSearchChange}
            />
            <select
              className="border p-2 rounded"
              onChange={handleCategoryChange}
            >
              <option value="">All Categories</option>
              <option value="Web">Web</option>
              <option value="Software Engineering">Software Engineering</option>
              <option value="AI">AI</option>
              <option value="Data Science">Data Science</option>
            </select>
            <select className="border p-2 rounded" onChange={handleSortChange}>
              <option value="createdAt">Sort By</option>
              <option value="upvotes">Most Upvoted</option>
              <option value="createdAt">Newest</option>
            </select>
          </div>
          {posts.map((post, index) => (
            <PostCard key={`${post._id}-${index}`} post={post} />
          ))}
        </div>
      </InfiniteScroll>
    </Container>
  );
};

export default RecentPost;
