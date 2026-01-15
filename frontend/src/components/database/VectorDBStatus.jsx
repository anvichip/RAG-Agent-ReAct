import React from 'react';
import { Database } from 'lucide-react';

export const VectorDBStatus = ({ documentCount, selectedPdf }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
      <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
        <Database className="w-5 h-5 mr-2 text-blue-600" />
        Vector Database
      </h3>
      
      <div className="space-y-2">
        <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-xs text-blue-900 font-medium">Status: Active</p>
          <p className="text-xs text-blue-700 mt-1">
            {documentCount} document{documentCount !== 1 ? 's' : ''} indexed
          </p>
        </div>

        {selectedPdf && (
          <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg">
            <p className="text-xs font-medium text-gray-700 mb-1">Currently Viewing:</p>
            <p className="text-xs text-gray-600 truncate">{selectedPdf.filename}</p>
          </div>
        )}
      </div>
    </div>
  );
};