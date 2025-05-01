import { useEvent } from "expo";
import { useVideoPlayer, VideoView } from "expo-video";
import { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
  Text,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { addVideo } from "../../storage/storage";
import { VideoType } from "../../types/types";

type VideoItemProps = {
  video: VideoType;
  setVideoPlayingId: React.Dispatch<React.SetStateAction<number | undefined>>;
  videoPlayingId: number | undefined;
  actionBtn: React.ReactNode;
};

const VideoItem: React.FC<VideoItemProps> = ({
  video,
  setVideoPlayingId,
  videoPlayingId,
  actionBtn,
}) => {
  const [isVideo, setIsVideo] = useState(false);

  const player = useVideoPlayer(video.url, (player) => {
    player.loop = true;
  });

  const spacing = 6;
  const windowWidth = Dimensions.get("window").width;
  const columnWidth = (windowWidth - spacing * 3) / 2;

  const { isPlaying } = useEvent(player, "playingChange", {
    isPlaying: player.playing,
  });

  const ratio = +video.height / +video.width;
  const width = columnWidth - spacing;
  const height = width * ratio;

  const handlePress = () => {
    setVideoPlayingId(video.id);
    if (!isVideo) {
      setIsVideo(true);
      player.play();
    }
  };

  useEffect(() => {
    if (isPlaying) {
      if (videoPlayingId !== video.id) {
        player.pause();
      }
    }
  }, [videoPlayingId]);

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
        <VideoView
          style={styles.video}
          player={player}
          allowsFullscreen
          allowsPictureInPicture
        />
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
