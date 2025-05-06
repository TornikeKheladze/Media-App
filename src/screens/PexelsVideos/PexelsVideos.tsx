import {
  View,
  Text,
  TextInput,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../App";
import VideoItem from "../../components/Video/VideoItem";
import { InfiniteData, useInfiniteQuery } from "@tanstack/react-query";
import { searchVideos } from "../../services/pexels";
import { Videos } from "pexels";
import { MasonryFlashList } from "@shopify/flash-list";
import { useDebounce } from "../../hooks/useDebounce";
import { VideoType } from "../../types/types";
import { addVideo } from "../../storage/storage";
import Ionicons from "@expo/vector-icons/Ionicons";
import ActionButtons from "./ActionButtons";

type PexelsVideosScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "PexelsVideos"
>;

const PexelsVideos: React.FC<PexelsVideosScreenProps> = () => {
  const [searchText, setSearchText] = useState("trend");
  const [videoPlayingId, setVideoPlayingId] = useState<number | undefined>();

  const debouncedSearch = useDebounce(searchText, 500);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error,
  } = useInfiniteQuery<
    Videos,
    Error,
    InfiniteData<Videos>,
    [string, string],
    number
  >({
    queryKey: ["videos", debouncedSearch],
    queryFn: ({ pageParam = 1 }) => searchVideos(debouncedSearch, pageParam),
    getNextPageParam: (lastPage) => {
      if (
        lastPage.page < Math.ceil(lastPage.total_results / lastPage.per_page)
      ) {
        return lastPage.page + 1;
      }
      return undefined;
    },
    initialPageParam: 1,
  });

  const videos: VideoType[] =
    data?.pages.flatMap((page) =>
      page.videos.map((v) => ({
        id: v.id,
        width: v.width,
        height: v.height,
        url: v.video_files[0].link,
        image: v.image,
      }))
    ) ?? [];

  const loadMore = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };
  return (
    <View className="flex-1">
      <View className="p-3">
        <Text className="text-xl mb-2">Search Videos</Text>
        <TextInput
          value={searchText}
          onChangeText={setSearchText}
          placeholder="Search for videos..."
          className="rounded-lg bg-gray-300 p-2 h-12"
        />
      </View>

      {isLoading ? (
        <ActivityIndicator size="large" className="mt-10" />
      ) : videos.length === 0 ? (
        <Text className="p-4">Videos Not Found</Text>
      ) : (
        <MasonryFlashList
          data={videos}
          onEndReached={loadMore}
          numColumns={2}
          renderItem={({ item }) => (
            <VideoItem
              video={item}
              setVideoPlayingId={setVideoPlayingId}
              videoPlayingId={videoPlayingId}
              actionBtn={<ActionButtons item={item} />}
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

export default PexelsVideos;
