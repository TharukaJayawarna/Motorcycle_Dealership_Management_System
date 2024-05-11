import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "./firebase";

const uploadFileToFirebase = async (file) => {
  try {
    const timestamp = Date.now();
    const filename = `${file.name}_${timestamp}`;
    const imageRef = ref(storage, `user/${file.name + filename}`);

    // Upload the file
    const snapshot = await uploadBytes(imageRef, file);

    // Get the download URL
    const downloadURL = await getDownloadURL(snapshot.ref);

    console.log("File uploaded successfully. Download URL:", downloadURL);

    return downloadURL;
  } catch (error) {
    console.error("Error uploading file:", error);
    throw error;
  }
};

export default uploadFileToFirebase;
