import React from "react";
import { View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../App";
import HomeBtn from "./HomeBtn";
import { pickAndSaveAudio, pickVideoAndSave } from "./helpers";

type HomeScreenProps = NativeStackScreenProps<RootStackParamList, "Home">;

const Home: React.FC<HomeScreenProps> = ({ navigation }) => {
  return (
    <View className="flex-1 p-4 gap-5 items-center">
      <HomeBtn
        color="#12CBC4"
        iconName="videocam-outline"
        text="Browse Videos"
        onPress={() => navigation.navigate("PexelsVideos")}
      />
      <HomeBtn
        color="#1289A7"
        iconName="save-outline"
        text="Saved Videos"
        onPress={() => navigation.navigate("SavedVideos")}
      />
      <HomeBtn
        color="#9980FA"
        iconName="save-outline"
        text="Saved Audios"
        onPress={() => navigation.navigate("SavedAudios")}
      />
      <HomeBtn
        color="#6F1E51"
        iconName="cloud-upload-outline"
        text="Upload Video"
        onPress={pickVideoAndSave}
      />
      <HomeBtn
        color="#EE5A24"
        iconName="cloud-upload-outline"
        text="Upload Audio"
        onPress={pickAndSaveAudio}
      />
    </View>
  );
};

export default Home;
