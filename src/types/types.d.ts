export type VideoType = {
  id: number;
  width: number;
  height: number;
  url: string;
  image: string;
};

export type AudioType = {
  id: number;
  url: string;
  name: string;
};

export type UploadResponse = {
  filePath: string;
  message: string;
};
