import React, { useState } from "react";
import { View, Alert, Text, StyleSheet, TouchableOpacity } from "react-native";
import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";
import { ProgressBar } from "react-native-paper";
import Ionicons from "@expo/vector-icons/Ionicons";

const VideoDownloader: React.FC<{ videoUrl: string }> = ({ videoUrl }) => {
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [isDownloading, setIsDownloading] = useState(false);

  const downloadAndSaveVideo = async () => {
    try {
      setIsDownloading(true);
      setDownloadProgress(0);

      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permission required",
          "We need permission to save videos to your gallery"
        );
        return;
      }

      const fileUri =
        FileSystem.documentDirectory + "video_" + Date.now() + ".mp4";

      const downloadResumable = FileSystem.createDownloadResumable(
        videoUrl,
        fileUri,
        {},
        (downloadProgress) => {
          const progress =
            downloadProgress.totalBytesWritten /
            downloadProgress.totalBytesExpectedToWrite;
          setDownloadProgress(progress);
        }
      );

      const res = await downloadResumable.downloadAsync();

      if (res) {
        const asset = await MediaLibrary.createAssetAsync(res.uri);
        await MediaLibrary.createAlbumAsync("Downloads", asset, false);
      }

      Alert.alert("Success", "Video saved to gallery!");
    } catch (error) {
      console.error("Error:", error);
      Alert.alert("Error", "Failed to download and save video");
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <View style={styles.container}>
      {isDownloading ? (
        <View className="">
          <ProgressBar
            progress={downloadProgress}
            color="#6200ee"
            style={styles.progressBar}
          />
          <Text className="text-xs w-20 justify-center items-center text-center">
            {Math.round(downloadProgress * 100)}%
          </Text>
        </View>
      ) : (
        <TouchableOpacity
          onPress={downloadAndSaveVideo}
          disabled={isDownloading}
          className="flex-row items-center p-[2px]"
        >
          <Text className="text-xs">Download</Text>
          <Ionicons name="download-outline" size={14} color="black" />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#e5e7eb",
    borderRadius: 12,
  },
  progressBar: {
    position: "absolute",
    top: -2,
    left: 0,
    backgroundColor: "transparent",
    height: 18,
    borderRadius: 12,
  },
  progressText: {
    fontSize: 12,
  },
});

export default VideoDownloader;
