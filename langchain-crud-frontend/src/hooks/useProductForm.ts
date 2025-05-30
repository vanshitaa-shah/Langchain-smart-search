import { useState } from "react";
import type { CreateProductRequest, Product } from "../types";

const initialFormData: CreateProductRequest = {
  name: "",
  category: "",
  price: 0,
  brand: "",
  description: "",
};

export const useProductForm = () => {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] =
    useState<CreateProductRequest>(initialFormData);

  const resetForm = () => {
    setFormData(initialFormData);
  };

  const openCreateForm = () => {
    resetForm();
    setShowCreateForm(true);
  };

  const openEditForm = (product: Product) => {
    setFormData({
      name: product.name,
      category: product.category,
      price: product.price,
      brand: product.brand,
      description: product.description,
    });
    setEditingProduct(product);
  };

  const closeForm = () => {
    setShowCreateForm(false);
    setEditingProduct(null);
    resetForm();
  };

  const isFormOpen = showCreateForm || editingProduct !== null;

  return {
    formData,
    setFormData,
    showCreateForm,
    editingProduct,
    isFormOpen,
    openCreateForm,
    openEditForm,
    closeForm,
  };
};
