import { useEffect } from "react";
import { useVideoPlayer, VideoView } from "expo-video";
import { StyleSheet } from "react-native";
import { VideoType } from "../../types/types";

type Props = {
  video: VideoType;
  videoPlayingId: number | undefined;
};

const VideoPlayerView = ({ video, videoPlayingId }: Props) => {
  const player = useVideoPlayer(video.url, (player) => {
    player.loop = true;
  });
  console.log();
  useEffect(() => {
    if (videoPlayingId === video.id) {
      player.play();
    } else {
      player.pause();
    }
  }, [videoPlayingId]);

  return (
    <VideoView
      style={styles.video}
      player={player}
      allowsFullscreen
      allowsPictureInPicture
    />
  );
};

export default VideoPlayerView;

const styles = StyleSheet.create({
  video: {
    width: "100%",
    height: "100%",
    borderRadius: 20,
  },
});
