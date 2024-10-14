// import envConfig from "@/src/config/envconfig";
import envConfig from "@/src/config/envConfig";

export const getAllPost = async (
  page = 1,
  search = "",
  category?: string,
  sortBy: "upvotes" | "createdAt" = "createdAt"
) => {
  let query = `?page=${page}&limit=10&sortBy=${sortBy === "createdAt" ? "-createdAt" : sortBy}`;

  if (search.trim()) {
    query += `&search=${encodeURIComponent(search)}`;
  }

  if (category) {
    query += `&category=${encodeURIComponent(category)}`;
  }

  const res = await fetch(`${envConfig.baseApi}/post${query}`);
  if (!res.ok) {
    throw new Error("Failed to fetch posts");
  }

  return res.json();
};

export const getSinglePost = async (postId: string) => {
  const res = await fetch(`${envConfig.baseApi}/post/${postId}`);

  return res.json();
};
