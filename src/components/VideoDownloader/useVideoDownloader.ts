import { useState } from "react";
import { Alert } from "react-native";
import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";
import * as Network from "expo-network";

export const useVideoDownloader = (videoUrl: string) => {
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [isDownloading, setIsDownloading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const checkStorageAvailability = async (requiredSize: number) => {
    try {
      const storageInfo = await FileSystem.getFreeDiskStorageAsync();
      return storageInfo > requiredSize * 1.2;
    } catch (error) {
      console.error("Storage check failed:", error);
      return false;
    }
  };

  const checkInternetConnection = async () => {
    try {
      const networkState = await Network.getNetworkStateAsync();
      return networkState.isConnected && networkState.isInternetReachable;
    } catch (error) {
      console.error("Network check failed:", error);
      return false;
    }
  };

  const getFileSize = async () => {
    try {
      const response = await fetch(videoUrl, { method: "HEAD" });
      const contentLength = response.headers.get("content-length");
      return contentLength ? parseInt(contentLength, 10) : 0;
    } catch (error) {
      console.warn("Couldn't estimate file size:", error);
      return 0;
    }
  };

  const downloadAndSaveVideo = async () => {
    try {
      setIsDownloading(true);
      setDownloadProgress(0);
      setError(null);

      if (!(await checkInternetConnection())) {
        throw new Error("No internet connection");
      }

      const fileSize = await getFileSize();
      if (fileSize > 0 && !(await checkStorageAvailability(fileSize))) {
        throw new Error("Not enough storage space");
      }

      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status !== "granted") {
        throw new Error("Gallery permission denied");
      }

      const fileUri =
        FileSystem.documentDirectory + "video_" + Date.now() + ".mp4";
      let downloadResumable: FileSystem.DownloadResumable | null = null;

      downloadResumable = FileSystem.createDownloadResumable(
        videoUrl,
        fileUri,
        {},
        (progress) => {
          setDownloadProgress(
            progress.totalBytesWritten / progress.totalBytesExpectedToWrite
          );
        }
      );

      const result = await downloadResumable.downloadAsync();

      if (!result) {
        throw new Error("Download failed");
      }

      const fileInfo = await FileSystem.getInfoAsync(result.uri);
      if (!fileInfo.exists || fileInfo.size === 0) {
        await FileSystem.deleteAsync(result.uri);
        throw new Error("Downloaded file is corrupted");
      }

      const asset = await MediaLibrary.createAssetAsync(result.uri);
      await MediaLibrary.createAlbumAsync("Downloads", asset, false);

      Alert.alert("Success", "Video saved to gallery!");
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Download failed";
      setError(errorMessage);
      Alert.alert("Error", errorMessage);
    } finally {
      setIsDownloading(false);
    }
  };

  return {
    isDownloading,
    error,
    downloadProgress,
    downloadAndSaveVideo,
    setError,
  };
};
