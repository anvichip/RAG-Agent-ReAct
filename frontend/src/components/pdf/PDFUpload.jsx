import React, { useRef, useState } from "react";

export default function PDFUpload({ onUpload }) {
  const inputRef = useRef(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // allow only pdf
    if (file.type !== "application/pdf") {
      alert("Please upload a PDF file only.");
      e.target.value = "";
      return;
    }

    setUploading(true);

    try {
      // send file to parent handler
      await onUpload(file);
    } catch (err) {
      console.error("Upload failed:", err);
      alert("Upload failed. Please try again.");
    } finally {
      setUploading(false);
      e.target.value = ""; // reset input for re-upload
    }
  };

  return (
    <div className="flex items-center gap-2">
      <input
        ref={inputRef}
        type="file"
        accept="application/pdf"
        onChange={handleFileChange}
        disabled={uploading}
        className="text-sm"
      />

      {uploading && (
        <span className="text-xs text-gray-500">Uploading...</span>
      )}
    </div>
  );
}
