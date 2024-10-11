// import envConfig from "@/src/config/envconfig";
import envConfig from "@/src/config/envConfig";

export const getAllPost = async () => {
  const res = await fetch(`${envConfig.baseApi}/post?sortBy=-createdAt`);
  return res.json();
};
