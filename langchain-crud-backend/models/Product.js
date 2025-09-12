import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: true,
    enum: ['Electronics', 'Shoes', 'Clothing']
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  brand: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    default: "",
    trim: true
  }
}, {
  timestamps: true // This adds createdAt and updatedAt fields
});

// Add indexes for better search performance
productSchema.index({ name: 'text', brand: 'text', description: 'text' });
productSchema.index({ category: 1 });
productSchema.index({ brand: 1 });
productSchema.index({ price: 1 });

export const Product = mongoose.model('Product', productSchema);
