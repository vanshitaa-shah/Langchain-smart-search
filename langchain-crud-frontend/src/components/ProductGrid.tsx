import React from "react";
import ProductCard from "./ProductCard";
import type { Product, SearchResponse } from "../types";

interface ProductGridProps {
  products: Product[];
  searchResults: SearchResponse | null;
  onEdit: (product: Product) => void;
  onDelete: (id: number) => void;
}

const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  searchResults,
  onEdit,
  onDelete,
}) => {
  const displayProducts = searchResults ? searchResults.results : products;

  if (displayProducts.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">
          {searchResults?.error
            ? "Please try a different search query"
            : "No products found"}
        </p>
        {searchResults?.error && (
          <p className="text-sm text-gray-400 mt-2">
            Try searching for: brands (Apple, Nike), categories (Electronics,
            Shoes), or prices
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {displayProducts.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default ProductGrid;
