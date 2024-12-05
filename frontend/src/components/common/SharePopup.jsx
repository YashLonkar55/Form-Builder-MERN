import React from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';

const SharePopup = ({ shareId, onClose }) => {
  const shareUrl = `${window.location.origin}/form/${shareId}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareUrl);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Form Saved Successfully!</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>
        <p className="mb-4">Share this form with others using the link below:</p>
        <div className="flex gap-2">
          <input
            type="text"
            value={shareUrl}
            readOnly
            className="flex-1 p-2 border rounded bg-gray-50"
          />
          <button
            onClick={copyToClipboard}
            className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
          >
            Copy
          </button>
        </div>
      </div>
    </div>
  );
};

export default SharePopup;