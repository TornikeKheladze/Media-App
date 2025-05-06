import * as DocumentPicker from "expo-document-picker";
import * as ImagePicker from "expo-image-picker";
import { Platform } from "react-native";
import { UploadResponse } from "../types/types";

const localUrl = Platform.OS === "ios" ? "localhost:3000" : "10.0.2.2:3000";

export const uploadFileToServer = async (
  file: DocumentPicker.DocumentPickerAsset | ImagePicker.ImagePickerAsset
) => {
  const formData = new FormData();
  const name = "name" in file ? file.name : file.fileName || "upload-file";
  formData.append("file", {
    uri: file.uri,
    name,
    type: file.mimeType || "video/mp4",
  } as any);

  try {
    const response = await fetch(`http://${localUrl}/upload`, {
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      body: formData,
    });

    const data: UploadResponse = await response.json();

    console.log("Upload successful:", { ...data, name });
    return { ...data, name };
  } catch (err) {
    console.log(" Upload error:", err);
  }
};
