import { Product } from "../models/Product.js";
import { transformProduct, transformProducts } from "../utils/transformers.js";

// Get all products
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    
    res.json(transformProducts(products));
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch products" });
  }
};

// Get product by ID
export const getProductById = async (req, res) => {
  try {    
    if (!req.params.id || req.params.id === 'undefined' || req.params.id === 'null') {
      return res.status(400).json({ 
        error: "Product ID is required", 
        receivedId: req.params.id 
      });
    }
    
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    
    res.json(transformProduct(product));
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({ 
        error: "Invalid product ID format", 
        receivedId: req.params.id 
      });
    }
    res.status(500).json({ error: "Failed to fetch product" });
  }
};

// Create new product
export const createProduct = async (req, res) => {
  try {
    const { name, category, price, brand, description } = req.body;

    if (!name || !category || !price || !brand) {
      return res.status(400).json({ error: "Missing required fields: name, category, price, brand" });
    }

    const newProduct = new Product({
      name,
      category,
      price: parseFloat(price),
      brand,
      description: description || "",
    });

    const savedProduct = await newProduct.save();
    
    res.status(201).json(transformProduct(savedProduct));
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({ 
        error: "Validation failed", 
        details: Object.values(error.errors).map(e => e.message)
      });
    }
    res.status(500).json({ error: "Failed to create product" });
  }
};

// Update product
export const updateProduct = async (req, res) => {
  try {
    if (!req.params.id || req.params.id === 'undefined' || req.params.id === 'null') {
      return res.status(400).json({ 
        error: "Product ID is required", 
        receivedId: req.params.id 
      });
    }
    
    const { name, category, price, brand, description } = req.body;
    
    const updateData = {};
    if (name !== undefined) updateData.name = name;
    if (category !== undefined) updateData.category = category;
    if (price !== undefined) updateData.price = parseFloat(price);
    if (brand !== undefined) updateData.brand = brand;
    if (description !== undefined) updateData.description = description;

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json(transformProduct(product));
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({ 
        error: "Invalid product ID format", 
        receivedId: req.params.id 
      });
    }
    if (error.name === 'ValidationError') {
      return res.status(400).json({ 
        error: "Validation failed", 
        details: Object.values(error.errors).map(e => e.message)
      });
    }
    res.status(500).json({ error: "Failed to update product" });
  }
};

// Delete product
export const deleteProduct = async (req, res) => {
  try { 
    if (!req.params.id || req.params.id === 'undefined' || req.params.id === 'null') {
      return res.status(400).json({ 
        error: "Product ID is required", 
        receivedId: req.params.id 
      });
    }
    
    const product = await Product.findByIdAndDelete(req.params.id);
    
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.status(204).send();
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({ 
        error: "Invalid product ID format", 
        receivedId: req.params.id 
      });
    }
    res.status(500).json({ error: "Failed to delete product" });
  }
};
