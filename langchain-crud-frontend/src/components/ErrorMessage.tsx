import React from "react";

interface ErrorMessageProps {
  message: string;
  onClose?: () => void;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, onClose }) => {
  return (
    <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
      <div className="flex justify-between items-center">
        <p className="text-red-800">{message}</p>
        {onClose && (
          <button onClick={onClose} className="text-red-600 hover:text-red-800">
            ×
          </button>
        )}
      </div>
    </div>
  );
};

export default ErrorMessage;
