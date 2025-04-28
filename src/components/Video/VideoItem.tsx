import { useEvent } from "expo";
import { useVideoPlayer, VideoView } from "expo-video";
import { Video } from "pexels";
import { useState } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";

type VideoItemProps = {
  video: Video;
};

const VideoItem: React.FC<VideoItemProps> = ({ video }) => {
  const [isVideo, setIsVideo] = useState(false);

  const player = useVideoPlayer(video.video_files[0].link, (player) => {
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
    if (!isVideo) {
      setIsVideo(true);
      player.play();
    } else {
      if (isPlaying) {
        player.pause();
      } else {
        player.play();
      }
    }
  };

  return (
    <View style={{ width, height, marginTop: 10 }}>
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
