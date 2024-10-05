// import envConfig from "@/src/config/envconfig";
import { delay } from "@/src/utils/delay";

export const getRecentPost = async () => {
  const res = await fetch(
    "https://swift-car-backend.vercel.app/api/cars"
    // `${envConfig.baseApi}/items?sortBy=-createdAt&limit=9`
  );
  await delay(5000);
  return res.json();
};
