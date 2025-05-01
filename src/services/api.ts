const BASEURL = "http://localhost:3000";

export const storeVideoOnServer = async (mediaId: string) => {
  try {
    const response = await fetch(`${BASEURL}/download/${mediaId}`);

    if (response.ok) {
      const data = await response.json();
      console.log("Video uploaded successfully:", data);
    } else {
      console.error("Failed to upload video:", response.statusText);
    }
  } catch (error) {
    console.error("Error uploading video:", error);
  }
};
