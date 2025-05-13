import React from "react";
import { GestureResponderEvent, Text, TouchableOpacity } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

type BtnColor = "#12CBC4" | "#1289A7" | "#9980FA" | "#EE5A24" | "#6F1E51";
type IconName = "cloud-upload-outline" | "videocam-outline" | "save-outline";

type HomeBtnProps = {
  color: BtnColor;
  text: string;
  onPress: (event: GestureResponderEvent) => void;
  iconName: IconName;
};

const HomeBtn: React.FC<HomeBtnProps> = ({
  color,
  text,
  onPress,
  iconName,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{ backgroundColor: color }}
      className="rounded-lg p-2 flex-row justify-between items-center gap-4 w-1/2"
    >
      <Text className="text-white text-xl">{text}</Text>
      <Ionicons name={iconName} size={30} color="white" />
    </TouchableOpacity>
  );
};

export default HomeBtn;
