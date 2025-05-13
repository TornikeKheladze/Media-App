import { useState } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import { VideoType } from "../../types/types";
import VideoPlayerView from "./VideoPlayerView";

type VideoItemProps = {
  video: VideoType;
  setVideoPlayingId: React.Dispatch<React.SetStateAction<number | undefined>>;
  videoPlayingId: number | undefined;
  actionBtn: React.ReactNode;
};

const spacing = 6;
const windowWidth = Dimensions.get("window").width;
const columnWidth = (windowWidth - spacing * 3) / 2;

const VideoItem: React.FC<VideoItemProps> = ({
  video,
  setVideoPlayingId,
  videoPlayingId,
  actionBtn,
}) => {
  const [isVideo, setIsVideo] = useState(false);

  const ratio = +video.height / +video.width;
  const width = columnWidth - spacing;
  const height = width * ratio;

  const handlePress = () => {
    setVideoPlayingId(video.id);
    setIsVideo(true);
  };

  return (
    <View style={{ width, height, marginTop: 10 }}>
      {actionBtn}
      {!isVideo ? (
        <TouchableOpacity activeOpacity={0.9} onPress={handlePress}>
          <Image
            style={styles.video}
            source={{ uri: video.image }}
            resizeMode="cover"
          />
        </TouchableOpacity>
      ) : (
        <VideoPlayerView video={video} videoPlayingId={videoPlayingId} />
      )}
    </View>
  );
};

export default VideoItem;

const styles = StyleSheet.create({
  video: {
    width: "100%",
    height: "100%",
    borderRadius: 20,
  },
});
