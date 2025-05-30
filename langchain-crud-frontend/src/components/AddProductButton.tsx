import React from "react";
import { Plus } from "lucide-react";

interface AddProductButtonProps {
  onClick: () => void;
}

const AddProductButton: React.FC<AddProductButtonProps> = ({ onClick }) => {
  return (
    <div className="mb-6">
      <button
        onClick={onClick}
        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2"
      >
        <Plus size={20} />
        Add Product
      </button>
    </div>
  );
};

export default AddProductButton;
