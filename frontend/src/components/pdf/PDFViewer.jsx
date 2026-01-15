import React from "react";

export default function PDFViewer({ pdf }) {
  if (!pdf) {
    return (
      <div className="border rounded-lg p-3 text-sm text-gray-500">
        No PDF selected
      </div>
    );
  }

  // If backend provides a URL like pdf.url
  const url = pdf.url || pdf.fileUrl || null;

  return (
    <div className="border rounded-lg overflow-hidden h-72">
      {url ? (
        <iframe
          title="PDF Viewer"
          src={url}
          className="w-full h-full"
        />
      ) : (
        <div className="p-3 text-sm text-gray-500">
          PDF selected: <b>{pdf.name || pdf.filename || pdf.id}</b>
          <br />
          (No `url` found to render it)
        </div>
      )}
    </div>
  );
}
