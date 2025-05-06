import { MMKV } from "react-native-mmkv";
import { AudioType, VideoType } from "../types/types";
import { Alert } from "react-native";

export const storage = new MMKV();
const AUDIO_KEY = "audios";
const VIDEO_KEY = "videos";

export const getallVideos = () => {
  const videosJson = storage.getString(VIDEO_KEY);
  const videos = videosJson ? JSON.parse(videosJson) : [];

  return videos as VideoType[];
};

export const getAllAudios = () => {
  const audiosJson = storage.getString(AUDIO_KEY);
  const audios = audiosJson ? JSON.parse(audiosJson) : [];

  return audios as AudioType[];
};

export const addVideo = (newVideo: VideoType) => {
  const existingVideos = getallVideos();
  if (existingVideos.map((v) => v.id).includes(newVideo.id)) {
    // const updated = existingVideos.filter((v) => v.id !== newVideo.id);
    // storage.set("videos", JSON.stringify(updated));
    Alert.alert("Error", "Video Is Already Saved", [{ text: "OK" }]);
  } else {
    const updated = [...existingVideos, newVideo];
    storage.set(VIDEO_KEY, JSON.stringify(updated));
    Alert.alert("Success", "Video Saved", [{ text: "OK" }]);
  }
};

export const removeVideo = (video: VideoType) => {
  const existingVideos = getallVideos();
  if (existingVideos.map((v) => v.id).includes(video.id)) {
    const updated = existingVideos.filter((v) => v.id !== video.id);
    storage.set(VIDEO_KEY, JSON.stringify(updated));
    Alert.alert("Success", "Video Removed", [{ text: "OK" }]);
  }
};

export const removeAudio = (audio: AudioType) => {
  const existingAudios = getAllAudios();
  if (existingAudios.map((a) => a.id).includes(audio.id)) {
    const updated = existingAudios.filter((a) => a.id !== audio.id);
    storage.set(AUDIO_KEY, JSON.stringify(updated));
    Alert.alert("Success", "Audio Removed", [{ text: "OK" }]);
  }
};

export const addAudio = (newAudio: AudioType) => {
  const existingAudios = getAllAudios();
  const updated = [...existingAudios, newAudio];
  storage.set(AUDIO_KEY, JSON.stringify(updated));
  Alert.alert("Success", "Audio Saved", [{ text: "OK" }]);
};
