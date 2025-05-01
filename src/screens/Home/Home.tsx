import { View, Text, Button } from "react-native";
import React, { useEffect, useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../App";
import { getallVideos } from "../../storage/storage";
import UploadScreen from "../../components/UploadFile/UploadFile";

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
      {/* <UploadScreen />
      <Button
        title="download an save"
        onPress={() => {
          fetch("http://localhost:3000/download/31794148");
        }}
      /> */}
    </View>
  );
};

export default Home;
