import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { ProgressBar } from "react-native-paper";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useVideoDownloader } from "./useVideoDownloader";

const VideoDownloader: React.FC<{ videoUrl: string }> = ({ videoUrl }) => {
  const {
    isDownloading,
    error,
    downloadProgress,
    downloadAndSaveVideo,
    setError,
  } = useVideoDownloader(videoUrl);

  return (
    <View className="rounded-xl bg-gray-200">
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
          {error && (
            <TouchableOpacity
              className="absolute right-1"
              onPress={() => setError(null)}
            >
              <Ionicons name="close-circle" size={14} color="#ef4444" />
            </TouchableOpacity>
          )}
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
  progressBar: {
    position: "absolute",
    top: -2,
    left: 0,
    height: 18,
    borderRadius: 12,
  },
});

export default VideoDownloader;
