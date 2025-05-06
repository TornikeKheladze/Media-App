import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { VideoType } from "../../types/types";
import { addVideo } from "../../storage/storage";
import VideoDownloader from "../../components/VideoDownloader/VideoDownloader";

const ActionButtons: React.FC<{ item: VideoType }> = ({ item }) => {
  return (
    <View className="absolute top-1 right-1 flex-row gap-1 z-50 items-center justify-center">
      <VideoDownloader videoUrl={item.url} />
      <TouchableOpacity
        onPress={() => addVideo(item)}
        className="bg-gray-200 rounded-lg p-[2px] flex-row items-center gap-1"
      >
        <Text className="text-xs">Save</Text>
        <Ionicons name="save-outline" size={14} color="black" />
      </TouchableOpacity>
    </View>
  );
};

export default ActionButtons;
