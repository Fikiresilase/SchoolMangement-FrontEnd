import React from 'react';

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  actionType: 'delete' | 'update';
  message: string;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  actionType,
  message,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50"
      onClick={onClose}
    >
      <div
        className="bg-white p-6 rounded-lg shadow-md w-80"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-xl font-semibold text-gray-700 mb-4">
          {message}
        </h3>
        <div className="flex justify-between">
          <button
            onClick={onConfirm}
            className={`${
              actionType === 'delete' ? 'bg-red-500' : 'bg-green-500'
            } text-white px-4 py-2 rounded hover:bg-opacity-80`}
          >
            Yes, {actionType === 'delete' ? 'Delete' : 'Update'}
          </button>
          <button
            onClick={onClose}
            className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
