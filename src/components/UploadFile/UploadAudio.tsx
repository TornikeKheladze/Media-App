import { View, Text, Button } from "react-native";
import React from "react";
import * as DocumentPicker from "expo-document-picker";
import { uploadFileToServer } from "../../services/api";
import { addAudio } from "../../storage/storage";

const UploadAudio = () => {
  const pickDocument = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: ["audio/*"],
      copyToCacheDirectory: true,
    });

    if (result.canceled || !result.assets?.length) return;
    const file = result.assets[0];
    const res = await uploadFileToServer(file);
    if (res) {
      addAudio({
        id: Math.random(),
        name: res.name,
        url: res.filePath,
      });
    }
  };
  return (
    <View>
      <Button title="upload mp3" onPress={pickDocument} />
    </View>
  );
};

export default UploadAudio;
