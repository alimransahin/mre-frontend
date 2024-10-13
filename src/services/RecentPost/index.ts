// import envConfig from "@/src/config/envconfig";
import envConfig from "@/src/config/envConfig";

export const getAllPost = async (page = 1) => {
  const res = await fetch(`${envConfig.baseApi}/post?sortBy=-createdAt`);

  return res.json();
};
export const getSinglePost = async (postId: string) => {
  const res = await fetch(`${envConfig.baseApi}/post/${postId}`);

  return res.json();
};
