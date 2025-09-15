import React from "react";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import ExampleQueries from "./components/ExampleQueries";
import AddProductButton from "./components/AddProductButton";
import ProductGrid from "./components/ProductGrid";
import ProductForm from "./components/ProductForm";
import ErrorMessage from "./components/ErrorMessage";
import { useProducts } from "./hooks/useProducts";
import { useProductForm } from "./hooks/useProductForm";

const App: React.FC = () => {
  const {
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
  } = useProducts();

  const {
    formData,
    setFormData,
    editingProduct,
    isFormOpen,
    openCreateForm,
    openEditForm,
    closeForm,
  } = useProductForm();

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const success = editingProduct
      ? await updateProduct(editingProduct.id, formData)
      : await createProduct(formData);

    if (success) {
      closeForm();
    }
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className=" mx-auto p-6 min-h-screen">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <Header />

          <div className="p-6">
            {error && <ErrorMessage message={error} onClose={clearError} />}

            <SearchBar
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              handleSearch={handleSearch}
              loading={loading}
              searchResults={searchResults}
              clearSearch={clearSearch}
            />

            <ExampleQueries setSearchQuery={setSearchQuery} />

            <AddProductButton onClick={openCreateForm} />

            {loading ? (
              <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
                <span className="ml-3 text-gray-600">Loading...</span>
              </div>
            ) : (
              <ProductGrid
                products={products}
                searchResults={searchResults}
                onEdit={openEditForm}
                onDelete={deleteProduct}
              />
            )}

            {isFormOpen && (
              <ProductForm
                formData={formData}
                setFormData={setFormData}
                editingProduct={editingProduct}
                onSubmit={handleFormSubmit}
                onCancel={closeForm}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
