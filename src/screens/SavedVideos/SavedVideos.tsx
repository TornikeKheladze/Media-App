import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../App";
import { getallVideos, removeVideo } from "../../storage/storage";
import { MasonryFlashList } from "@shopify/flash-list";
import VideoItem from "../../components/Video/VideoItem";
import Ionicons from "@expo/vector-icons/Ionicons";
import VideoDownloader from "../../components/VideoDownloader/VideoDownloader";

type SavedVideosScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "SavedVideos"
>;

const SavedVideos: React.FC<SavedVideosScreenProps> = ({ navigation }) => {
  const [videos, setVideos] = useState([...getallVideos()]);
  const [videoPlayingId, setVideoPlayingId] = useState<number | undefined>();
  return (
    <View className="flex-1">
      {videos.length === 0 ? (
        <Text className="p-4">Videos Not Found</Text>
      ) : (
        <MasonryFlashList
          data={videos}
          numColumns={2}
          renderItem={({ item }) => (
            <VideoItem
              video={item}
              setVideoPlayingId={setVideoPlayingId}
              videoPlayingId={videoPlayingId}
              actionBtn={
                <View className="absolute top-1 right-1 flex-row gap-1 z-50 items-center justify-center">
                  <VideoDownloader videoUrl={item.url} />
                  <TouchableOpacity
                    onPress={() => {
                      removeVideo(item);
                      setVideos([...getallVideos()]);
                    }}
                    className="bg-gray-200  rounded-lg p-[2px] flex-row items-center gap-1"
                  >
                    <Text className="text-xs">Delete</Text>
                    <Ionicons name="trash-outline" size={14} color="black" />
                  </TouchableOpacity>
                </View>
              }
            />
          )}
          estimatedItemSize={200}
          contentContainerStyle={{
            paddingLeft: 10,
          }}
          onEndReachedThreshold={0.5}
        />
      )}
    </View>
  );
};

export default SavedVideos;
