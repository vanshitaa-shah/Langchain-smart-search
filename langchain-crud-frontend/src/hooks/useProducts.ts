import { useState, useEffect } from "react";
import { productApi } from "../services/api";
import type { Product, CreateProductRequest, SearchResponse } from "../types";

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResponse | null>(
    null
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadProducts();
  }, []);

  // Load all products from the API
  const loadProducts = async () => {
    try {
      const data = await productApi.getAll();
      setProducts(data);
    } catch (error) {
      console.error("Failed to load products:", error);
      setError("Failed to load products");
    }
  };

  // Handle search functionality
  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      setSearchResults(null);
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const results = await productApi.search(searchQuery);
      setSearchResults(results);
    } catch (error) {
      console.error("Search failed:", error);
      setError("Search failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // CRUD operations
  const createProduct = async (productData: CreateProductRequest) => {
    try {
      setError(null);
      await productApi.create(productData);
      await loadProducts();
      return true;
    } catch (error) {
      console.error("Failed to create product:", error);
      setError("Failed to create product");
      return false;
    }
  };

  const updateProduct = async (
    id: number,
    productData: CreateProductRequest
  ) => {
    try {
      setError(null);
      await productApi.update(id, productData);
      await loadProducts();
      return true;
    } catch (error) {
      console.error("Failed to update product:", error);
      setError("Failed to update product");
      return false;
    }
  };

  const deleteProduct = async (id: number) => {
    try {
      setError(null);
      await productApi.delete(id);
      await loadProducts();
      return true;
    } catch (error) {
      console.error("Failed to delete product:", error);
      setError("Failed to delete product");
      return false;
    }
  };

  const clearSearch = () => {
    setSearchResults(null);
    setSearchQuery("");
  };

  const clearError = () => {
    setError(null);
  };

  return {
    products,
    searchQuery,
    setSearchQuery,
    searchResults,
    loading,
    error,
    handleSearch,
    createProduct,
    updateProduct,
    deleteProduct,
    clearSearch,
    clearError,
  };
};
