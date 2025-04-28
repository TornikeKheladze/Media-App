import { View, Text, Button } from "react-native";
import React, { useEffect, useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../App";

type HomeScreenProps = NativeStackScreenProps<RootStackParamList, "Home">;

const Home: React.FC<HomeScreenProps> = ({ navigation }) => {
  return (
    <View>
      <Text>Home</Text>
      <Button
        title="Videos"
        onPress={() => navigation.navigate("PexelsVideos")}
      />
    </View>
  );
};

export default Home;
