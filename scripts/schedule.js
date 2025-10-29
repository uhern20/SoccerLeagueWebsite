import { db, storage } from "../firebase.js";
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

uploadForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const ageGroup = document.getElementById("ageGroup").value;
  const file = document.getElementById("scheduleFile").files[0];
  const publishTime = document.getElementById("publishTime").value;

  if (!ageGroup || !file || !publishTime) {
    alert("Please fill all fields.");
    return;
  }

  try {
    // Upload file to Firebase Storage
    const fileRef = ref(storage, `schedules/${ageGroup}/${file.name}`);
    await uploadBytes(fileRef, file);
    const fileURL = await getDownloadURL(fileRef);

    // Save metadata to Firestore
    await addDoc(collection(db, "schedules"), {
      ageGroup,
      fileURL,
      publishTime,
      fileName: file.name,
      uploadedAt: new Date(),
    });

    alert("✅ Schedule uploaded successfully!");
    uploadForm.reset();
  } catch (err) {
    console.error(err);
    alert("❌ Error uploading schedule.");
  }
});
