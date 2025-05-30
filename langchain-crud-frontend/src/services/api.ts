import axios from "axios";
import type { CreateProductRequest, Product, SearchResponse } from "../types";

const API_BASE_URL = "http://localhost:3001/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const productApi = {
  // Get all products
  getAll: async (): Promise<Product[]> => {
    const response = await api.get("/products");
    return response.data;
  },

  // Get product by ID
  getById: async (id: number): Promise<Product> => {
    const response = await api.get(`/products/${id}`);
    return response.data;
  },

  // Create new product
  create: async (product: CreateProductRequest): Promise<Product> => {
    const response = await api.post("/products", product);
    return response.data;
  },

  // Update product
  update: async (
    id: number,
    product: Partial<CreateProductRequest>
  ): Promise<Product> => {
    const response = await api.put(`/products/${id}`, product);
    return response.data;
  },

  // Delete product
  delete: async (id: number): Promise<void> => {
    await api.delete(`/products/${id}`);
  },

  // Natural language search
  search: async (query: string): Promise<SearchResponse> => {
    const response = await api.post("/search", { query });
    return response.data;
  },
};
