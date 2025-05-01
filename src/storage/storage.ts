import { MMKV } from "react-native-mmkv";
import { VideoType } from "../types/types";
import { Alert } from "react-native";

export const storage = new MMKV();

export const getallVideos = () => {
  const videosJson = storage.getString("videos");
  const videos = videosJson ? JSON.parse(videosJson) : [];

  return videos as VideoType[];
};

export const addVideo = (newVideo: VideoType) => {
  const existingVideos = getallVideos();
  if (existingVideos.map((v) => v.id).includes(newVideo.id)) {
    // const updated = existingVideos.filter((v) => v.id !== newVideo.id);
    // storage.set("videos", JSON.stringify(updated));
    Alert.alert("Error", "Video Is Already Saved", [{ text: "OK" }]);
  } else {
    const updated = [...existingVideos, newVideo];
    storage.set("videos", JSON.stringify(updated));
    Alert.alert("Success", "Video Saved", [{ text: "OK" }]);
  }
};

export const removeVideo = (video: VideoType) => {
  const existingVideos = getallVideos();
  if (existingVideos.map((v) => v.id).includes(video.id)) {
    const updated = existingVideos.filter((v) => v.id !== video.id);
    storage.set("videos", JSON.stringify(updated));
    Alert.alert("Success", "Video Removed", [{ text: "OK" }]);
  }
};
