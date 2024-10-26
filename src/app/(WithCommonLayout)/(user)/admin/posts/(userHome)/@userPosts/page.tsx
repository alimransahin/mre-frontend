"use client";
import { useState, useEffect, useCallback } from "react";
import RecentPosts from "./loading";
import { getAllPost } from "@/src/services/RecentPost";
import Container from "@/src/components/UI/Container";
import PostCard from "@/src/components/UI/post/Card";
import { debounce } from "lodash";
import { useUser } from "@/src/context/UserProvider";
import Loading from "@/src/components/UI/Loading";

interface IPost {
  _id: string;
  content: string;
  upvotes: number;
  createdAt: Date;
  isPremium: boolean;
  user: { email: string };
}

const RecentPost = () => {
  const [allPosts, setAllPosts] = useState<IPost[]>([]);
  const [posts, setPosts] = useState<IPost[]>([]);
  const [userPosts, setUserPosts] = useState<IPost[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState<string | undefined>(undefined);
  const [sortBy, setSortBy] = useState<"upvotes" | "createdAt">("createdAt");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
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

    const totalPosts = data.length;
    setTotalPages(Math.ceil(totalPosts / 10));

    setAllPosts((prevPosts) => [...prevPosts, ...filteredPosts]);
    setLoading(false);
  };

  useEffect(() => {
    const fetchUserPosts = async () => {
      if (user) {
        const { data: allPosts } = await getAllPost();
        const filteredPosts = allPosts.filter(
          (post: IPost) => post.user?.email === user.email
        );
        setUserPosts(filteredPosts);
      }
    };

    fetchUserPosts();
  }, [user]);

  useEffect(() => {
    fetchPosts(page, searchTerm, category, sortBy);
  }, [page, searchTerm, category, sortBy]);

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

  const displayedPosts = user ? userPosts : posts;

  return (
    <Container>
      {/* Search, Filter, and Sort Options */}
      <div className="flex flex-row top-20 mx-6 gap-2 justify-center">
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

      <div className="max-w-2xl mx-auto p-4 grid justify-center gap-2 sm:grid-cols-1">
        {loading ? (
          <Loading />
        ) : (
          displayedPosts.map((post, index) => (
            <PostCard key={`${post._id}-${index}`} post={post} />
          ))
        )}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center mt-4">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className="border px-4 py-2 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span className="mx-2">
          Page {page} of {totalPages}
        </span>
        <button
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={page === totalPages}
          className="border px-4 py-2 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </Container>
  );
};

export default RecentPost;
