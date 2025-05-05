// UploadScreen.tsx
import React from "react";
import { Button, View, Alert, Image } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { uploadFileToServer } from "../../services/api";
import { addVideo } from "../../storage/storage";
import * as VideoThumbnails from "expo-video-thumbnails";

export default function UploadScreen() {
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["videos"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const file = result.assets[0];
      const { uri: thumbnail } = await VideoThumbnails.getThumbnailAsync(
        file.uri,
        {
          time: 3000,
        }
      );
      const fileResponse = await uploadFileToServer(file);
      console.log(fileResponse);
      if (fileResponse) {
        addVideo({
          height: file.height,
          id: Math.random(),
          url: fileResponse?.filePath,
          width: file.width,
          image: thumbnail,
        });
      }
    }
  };

  return (
    <View>
      <Button title="Upload Video" onPress={pickImage} />
    </View>
  );
}
