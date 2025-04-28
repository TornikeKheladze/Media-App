import { createClient } from "pexels";
import Constants from "expo-constants";

const { PEXELS_API_KEY } = Constants.expoConfig?.extra as {
  PEXELS_API_KEY: string;
};

const client = createClient(PEXELS_API_KEY);

export const getPopularVideos = async (page: number = 1) => {
  const res = await client.videos.popular({ per_page: 10, page });
  console.log(res);
  return res;
};

export const searchVideos = async (query: string, page: number = 1) => {
  const res = await client.videos.search({ query, page, per_page: 10 });

  if ("error" in res) {
    throw new Error(res.error);
  }

  return res;
};
