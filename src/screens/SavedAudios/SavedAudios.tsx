import { View, Text } from "react-native";
import React, { useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../App";
import { getAllAudios, removeAudio } from "../../storage/storage";
import AudioItem from "./AudioItem";
import { AudioType } from "../../types/types";

type SavedAudiosScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "SavedAudios"
>;

const SavedAudios: React.FC<SavedAudiosScreenProps> = ({ navigation }) => {
  const [audios, setAudios] = useState([...getAllAudios()]);
  const [audioPlayingId, setAudioPlayingId] = useState<number | undefined>();

  const removeHandler = (item: AudioType) => {
    removeAudio(item);
    setAudios([...getAllAudios()]);
  };
  return (
    <View className="flex-1 p-4">
      {audios.length === 0 ? (
        <Text className="p-4">Audios Not Found</Text>
      ) : (
        <View className="w-full  gap-3">
          {audios.map((a) => (
            <AudioItem
              key={a.id}
              audio={a}
              setAudioPlayingId={setAudioPlayingId}
              audioPlayingId={audioPlayingId}
              removeHandler={removeHandler}
            />
          ))}
        </View>
      )}
    </View>
  );
};

export default SavedAudios;
