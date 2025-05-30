export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  brand: string;
  description: string;
}

export interface SearchFilters {
  category?: string;
  brand?: string;
  minPrice?: number;
  maxPrice?: number;
  name?: string;
}

export interface SearchResponse {
  query: string;
  filters: SearchFilters;
  results: Product[];
  count: number;
  error?: string;
}

export interface CreateProductRequest {
  name: string;
  category: string;
  price: number;
  brand: string;
  description?: string;
}
