import { uploadFileToServer } from "../../services/api";
import { addAudio, addVideo } from "../../storage/storage";
import * as DocumentPicker from "expo-document-picker";
import * as VideoThumbnails from "expo-video-thumbnails";
import * as ImagePicker from "expo-image-picker";

export const pickAndSaveAudio = async () => {
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

export const pickVideoAndSave = async () => {
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
