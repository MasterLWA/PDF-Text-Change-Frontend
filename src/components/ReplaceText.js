import React, { useState } from "react";
import axios from "axios";

const ReplaceText = () => {
  const [fileName, setFileName] = useState("");
  const [oldText, setOldText] = useState("");
  const [newText, setNewText] = useState("");

  const handleReplace = async () => {
    const response = await axios.post("http://127.0.0.1:8000/replace-text", {
      file_name: fileName,
      old_text: oldText,
      new_text: newText,
    });
    alert(response.data.message || "Text replacement failed.");
  };

  return (
    <div>
      <h1>Replace Text in PDF</h1>
      <input
        type="text"
        placeholder="Enter file name"
        value={fileName}
        onChange={(e) => setFileName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Text to replace"
        value={oldText}
        onChange={(e) => setOldText(e.target.value)}
      />
      <input
        type="text"
        placeholder="New text"
        value={newText}
        onChange={(e) => setNewText(e.target.value)}
      />
      <button onClick={handleReplace}>Replace Text</button>
    </div>
  );
};

export default ReplaceText;
