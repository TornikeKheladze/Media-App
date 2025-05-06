import { View, Text, Button } from "react-native";
import React, { useEffect, useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../App";
import { getallVideos } from "../../storage/storage";
import UploadScreen from "../../components/UploadFile/UploadFile";
import UploadAudio from "../../components/UploadFile/UploadAudio";

type HomeScreenProps = NativeStackScreenProps<RootStackParamList, "Home">;

const Home: React.FC<HomeScreenProps> = ({ navigation }) => {
  return (
    <View>
      <Text>Home</Text>
      <Button
        title="Videos"
        onPress={() => navigation.navigate("PexelsVideos")}
      />
      <Button
        title="Saved Videos"
        onPress={() => navigation.navigate("SavedVideos")}
      />
      <Button
        title="Saved Audios"
        onPress={() => navigation.navigate("SavedAudios")}
      />
      <UploadScreen />
      <UploadAudio />
    </View>
  );
};

export default Home;
