import React from 'react';
import { Trash2 } from 'lucide-react';

export const PDFListItem = ({ pdf, isSelected, onSelect, onDelete }) => {
  return (
    <div
      className={`p-2 border rounded-lg cursor-pointer transition ${
        isSelected
          ? 'border-blue-500 bg-blue-50'
          : 'border-gray-200 hover:bg-gray-50'
      }`}
      onClick={onSelect}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <p className="text-xs font-medium text-gray-900 truncate">{pdf.filename}</p>
          <p className="text-xs text-gray-500 truncate">{pdf.path}</p>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete(pdf.filename);
          }}
          className="ml-2 p-1 text-red-600 hover:bg-red-50 rounded transition"
        >
          <Trash2 className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
};