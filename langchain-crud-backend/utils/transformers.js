// Helper function to transform MongoDB product document to frontend-friendly format
export const transformProduct = (product) => {
  const productObj = product.toObject();
  return {
    id: productObj._id,
    name: productObj.name,
    category: productObj.category,
    price: productObj.price,
    brand: productObj.brand,
    description: productObj.description,
    createdAt: productObj.createdAt,
    updatedAt: productObj.updatedAt
  };
};

// Helper function to transform array of products
export const transformProducts = (products) => {
  return products.map(transformProduct);
};
