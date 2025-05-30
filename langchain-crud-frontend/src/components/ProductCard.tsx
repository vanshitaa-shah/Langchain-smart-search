import React from "react";
import { Edit, Trash2 } from "lucide-react";
import type { Product } from "../types";

interface ProductCardProps {
  product: Product;
  onEdit: (product: Product) => void;
  onDelete: (id: number) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onEdit,
  onDelete,
}) => {
  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      onDelete(product.id);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(product)}
            className="p-1 text-blue-600 hover:bg-blue-50 rounded"
          >
            <Edit size={16} />
          </button>
          <button
            onClick={handleDelete}
            className="p-1 text-red-600 hover:bg-red-50 rounded"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
      <div className="space-y-2">
        <p className="text-sm text-gray-600">
          <strong>Category:</strong> {product.category}
        </p>
        <p className="text-sm text-gray-600">
          <strong>Brand:</strong> {product.brand}
        </p>
        <p className="text-sm text-gray-600">
          <strong>Price:</strong> ${product.price}
        </p>
        <p className="text-sm text-gray-600">
          <strong>Description:</strong> {product.description}
        </p>
      </div>
    </div>
  );
};

export default ProductCard;
