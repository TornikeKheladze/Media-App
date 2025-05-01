// UploadScreen.tsx
import React from "react";
import { Button, View, Alert, Platform } from "react-native";
import * as DocumentPicker from "expo-document-picker";
import { useMutation } from "@tanstack/react-query";

const localUrl = Platform.OS === "ios" ? "localhost:3000" : "10.0.2.2:3000";

const uploadFile = async (fileUri) => {
  const formData = new FormData();
  formData.append("file", {
    uri: fileUri,
    name: "video.mp4", // or audio.mp3
    type: "video/mp4", // or audio/mpeg
  });

  const res = await fetch(`http://${localUrl}/upload`, {
    method: "POST",
    body: formData,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  })
    .then((res) => {
      console.log(res);
      return res.json();
    })
    .catch((err) => console.log(err));
  const json = await res.json();
  console.log(json);
};

export default function UploadScreen() {
  const pickDocument = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: ["audio/*", "video/*"],
      //   copyToCacheDirectory: true,
    });

    if (result.canceled || !result.assets?.length) return;

    const file = result.assets[0];
    uploadFile(file);
    console.log(file);
  };
  const fetchFiles = async () => {
    const res = await fetch(`http://${localUrl}/media`)
      .then((res) => {
        console.log(res);
        return res.json();
      })
      .catch((err) => console.log(err));
    const files = await res.json();
    console.log(files); // [{ filename, url }]
  };

  return (
    <View style={{ padding: 20 }}>
      <Button title={"Select and Upload Video/Audio"} onPress={pickDocument} />
      <Button title="fetch" onPress={fetchFiles} />
    </View>
  );
}
