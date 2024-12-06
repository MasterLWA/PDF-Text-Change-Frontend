import React, { useState } from "react";
import api from "../api";

const FileUpload = ({ onUploadComplete }) => {
  const [files, setFiles] = useState([]);
  const [uploadProgress, setUploadProgress] = useState({});

  const handleFileChange = (event) => {
    setFiles(Array.from(event.target.files));
  };

  const handleUpload = async () => {
    const formData = new FormData();
    files.forEach((file) => {
      formData.append("files", file);
    });

    try {
      const response = await api.post("/upload", formData, {
        onUploadProgress: (event) => {
          const progress = Math.round((100 * event.loaded) / event.total);
          setUploadProgress({ ...uploadProgress, total: progress });
        },
      });
      alert("Files uploaded successfully!");
      onUploadComplete(response.data.files);
    } catch (error) {
      console.error("Error uploading files:", error);
      alert("Failed to upload files.");
    }
  };

  return (
    <div>
      <h2>Upload PDFs</h2>
      <input type="file" multiple onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      <div>
        {files.map((file, index) => (
          <p key={index}>
            {file.name} - {uploadProgress[index] || 0}%
          </p>
        ))}
      </div>
    </div>
  );
};

export default FileUpload;
