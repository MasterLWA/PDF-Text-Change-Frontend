import React, { useState } from "react";
import axios from "axios";

const ExtractText = () => {
  const [fileName, setFileName] = useState("");
  const [text, setText] = useState("");

  const handleExtract = async () => {
    const response = await axios.get("http://127.0.0.1:8000/extract-text", {
      params: { file_name: fileName },
    });
    setText(response.data.text || "No text found.");
  };

  return (
    <div>
      <h1>Extract Text from PDF</h1>
      <input
        type="text"
        placeholder="Enter file name"
        value={fileName}
        onChange={(e) => setFileName(e.target.value)}
      />
      <button onClick={handleExtract}>Extract Text</button>
      <div>
        <h2>Extracted Text:</h2>
        <p>{text}</p>
      </div>
    </div>
  );
};

export default ExtractText;
