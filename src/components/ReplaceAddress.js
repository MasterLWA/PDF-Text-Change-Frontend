import React, { useState } from "react";
import api from "../api";

const ReplaceAddress = ({ selectedFile }) => {
  const [oldAddress, setOldAddress] = useState("");
  const [newAddress, setNewAddress] = useState("");

  const handleReplace = async () => {
    try {
      const response = await api.post("/replace-address", {
        file_name: selectedFile,
        old_address: oldAddress,
        new_address: newAddress,
      });
      const fileURL = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = fileURL;
      link.setAttribute("download", `updated_${selectedFile}`);
      document.body.appendChild(link);
      link.click();
      alert("Address replaced successfully!");
    } catch (error) {
      console.error("Error replacing address:", error);
      alert("Failed to replace address.");
    }
  };

  return (
    <div>
      <h2>Replace Address in {selectedFile}</h2>
      <input
        type="text"
        placeholder="Old Address"
        value={oldAddress}
        onChange={(e) => setOldAddress(e.target.value)}
      />
      <input
        type="text"
        placeholder="New Address"
        value={newAddress}
        onChange={(e) => setNewAddress(e.target.value)}
      />
      <button onClick={handleReplace}>Replace Address</button>
    </div>
  );
};

export default ReplaceAddress;
