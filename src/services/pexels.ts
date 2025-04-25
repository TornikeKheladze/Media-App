import { createClient } from "pexels";
import Constants from "expo-constants";

const { PEXELS_API_KEY } = Constants.expoConfig?.extra as {
  PEXELS_API_KEY: string;
};

const client = createClient(PEXELS_API_KEY);

export const getPopularVideos = () => {
  return client.videos.popular({ per_page: 10 }).then((videos) => videos);
};
