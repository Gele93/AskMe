import { useEffect, useState } from 'react'
import './styles/App.css'

function App() {

  const upload = async (e: any) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("name", "name");
    formData.append("description", "description");
    formData.append("file", file);

    try {
      const response = await fetch("/api/set/formated", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        console.error("Failed to upload file");
      } else {
        console.log("File uploaded successfully");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };


  return (
    <div>
      <input type="file" id="file" name="file" accept=".txt" onChange={(e) => upload(e)} />
    </div>
  )
}

export default App
