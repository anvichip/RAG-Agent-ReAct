import React from 'react';
import { FileText } from 'lucide-react';
import PDFUpload from "./PDFUpload";
import { PDFListItem } from './PDFListItem';

export const PDFList = ({ pdfs, selectedPdf, onSelect, onUpload, onDelete, loading }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
      <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
        <FileText className="w-5 h-5 mr-2 text-blue-600" />
        PDF Documents
      </h3>
      
      <PDFUpload onUpload={onUpload} loading={loading} />

      <div className="space-y-2 max-h-60 overflow-y-auto">
        {pdfs.length === 0 ? (
          <p className="text-xs text-gray-400 text-center py-4">No PDFs yet</p>
        ) : (
          pdfs.map((pdf, idx) => (
            <PDFListItem
              key={idx}
              pdf={pdf}
              isSelected={selectedPdf?.filename === pdf.filename}
              onSelect={() => onSelect(pdf)}
              onDelete={onDelete}
            />
          ))
        )}
      </div>
    </div>
  );
};