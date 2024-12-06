import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [files, setFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState("");
  const [extractedText, setExtractedText] = useState("");
  const [oldText, setOldText] = useState("");
  const [newText, setNewText] = useState("");
  const [uploadFiles, setUploadFiles] = useState([]);
  const [updatedFileUrl, setUpdatedFileUrl] = useState("");

  // Fetch the list of uploaded files
  const fetchFiles = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/files");
      setFiles(response.data.files);
    } catch (error) {
      console.error("Error fetching files:", error);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  // Handle file uploads
  const handleFileUpload = async () => {
    const formData = new FormData();
    uploadFiles.forEach((file) => formData.append("files", file));

    try {
      await axios.post("http://127.0.0.1:8000/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Files uploaded successfully!");
      fetchFiles(); // Refresh the file list
    } catch (error) {
      console.error("File upload failed:", error);
    }
  };

  // Extract text from a selected file
  const handleExtractText = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/extract-text", {
        params: { file_name: selectedFile },
      });
      setExtractedText(response.data.text || "No text found.");
    } catch (error) {
      console.error("Error extracting text:", error);
    }
  };

  // Replace text in a selected file
  const handleReplaceText = async () => {
    try {
      const response = await axios.post("http://127.0.0.1:8000/replace-text", {
        file_name: selectedFile,
        old_text: oldText,
        new_text: newText,
      });
      alert(response.data.message || "Text replacement failed.");
      setUpdatedFileUrl(response.data.file_url); // Set the URL of the updated file
      fetchFiles(); // Refresh the file list
    } catch (error) {
      console.error("Error replacing text:", error);
    }
  };

  return (
    <div className="App" style={{ padding: "20px" }}>
      <h1>PDF Tool</h1>

      {/* File Upload Section */}
      <section style={{ marginBottom: "20px" }}>
        <h2>Upload Files</h2>
        <input
          type="file"
          multiple
          onChange={(e) => setUploadFiles([...e.target.files])}
        />
        <button onClick={handleFileUpload}>Upload</button>
      </section>

      {/* File List Section */}
      <section style={{ marginBottom: "20px" }}>
        <h2>Uploaded Files</h2>
        <ul>
          {files.map((file, index) => (
            <li
              key={index}
              onClick={() => setSelectedFile(file)}
              style={{
                cursor: "pointer",
                textDecoration: selectedFile === file ? "underline" : "none",
              }}
            >
              {file}
            </li>
          ))}
        </ul>
      </section>

      {/* Text Extraction Section */}
      {selectedFile && (
        <section style={{ marginBottom: "20px" }}>
          <h2>Extract Text</h2>
          <p>
            <strong>Selected File:</strong> {selectedFile}
          </p>
          <button onClick={handleExtractText}>Extract Text</button>
          <div style={{ marginTop: "10px", border: "1px solid #ccc", padding: "10px" }}>
            <h3>Extracted Text:</h3>
            <pre>{extractedText}</pre>
          </div>
        </section>
      )}

      {/* Text Replacement Section */}
      {selectedFile && (
        <section>
          <h2>Replace Text</h2>
          <p>
            <strong>Selected File:</strong> {selectedFile}
          </p>
          <input
            type="text"
            placeholder="Text to replace"
            value={oldText}
            onChange={(e) => setOldText(e.target.value)}
            style={{ marginRight: "10px" }}
          />
          <input
            type="text"
            placeholder="New text"
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
            style={{ marginRight: "10px" }}
          />
          <button onClick={handleReplaceText}>Replace Text</button>
        </section>
      )}

      {/* Download Button Section */}
      {updatedFileUrl && (
        <section style={{ marginTop: "20px" }}>
          <h3>Download Updated File</h3>
          <a href={`http://127.0.0.1:8000${updatedFileUrl}`} download>
            <button>Download</button>
          </a>
        </section>
      )}
    </div>
  );
}

export default App;
