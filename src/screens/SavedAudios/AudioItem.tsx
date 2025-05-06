import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect } from "react";
import { useAudioPlayer, useAudioPlayerStatus } from "expo-audio";
import { AudioType } from "../../types/types";
import Ionicons from "@expo/vector-icons/Ionicons";

type AudioItemProps = {
  audio: AudioType;
  setAudioPlayingId: React.Dispatch<React.SetStateAction<number | undefined>>;
  audioPlayingId: number | undefined;
  removeHandler: (item: AudioType) => void;
};

const AudioItem: React.FC<AudioItemProps> = ({
  audio,
  audioPlayingId,
  setAudioPlayingId,
  removeHandler,
}) => {
  const player = useAudioPlayer(audio.url);
  const audioEvent = useAudioPlayerStatus(player);

  useEffect(() => {
    if (audioEvent.playing) {
      if (audioPlayingId !== audio.id) {
        player.pause();
      }
    }
    if (!audioEvent.playing && audioPlayingId === audio.id) {
      player.play();
    }
  }, [audioPlayingId]);

  return (
    <View className="bg-gray-200 p-3 flex-row justify-between rounded-lg">
      <Text>{audio.name}</Text>
      <View className="flex-row gap-2">
        {audioEvent.playing ? (
          <TouchableOpacity
            onPress={() => {
              setAudioPlayingId(undefined);
            }}
          >
            <Ionicons name="pause-circle" size={24} color="black" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => {
              setAudioPlayingId(audio.id);
            }}
          >
            <Ionicons name="play" size={24} color="black" />
          </TouchableOpacity>
        )}
        <TouchableOpacity onPress={() => removeHandler(audio)}>
          <Ionicons name="trash-bin" size={22} color="red" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AudioItem;
