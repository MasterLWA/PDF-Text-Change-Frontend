import React, { useEffect, useState } from "react";
import axios from "axios";

const FileList = () => {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    const fetchFiles = async () => {
      const response = await axios.get("http://127.0.0.1:8000/files");
      setFiles(response.data.files);
    };
    fetchFiles();
  }, []);

  return (
    <div>
      <h1>Uploaded Files</h1>
      <ul>
        {files.map((file, index) => (
          <li key={index}>{file}</li>
        ))}
      </ul>
    </div>
  );
};

export default FileList;
