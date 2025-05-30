import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { ChatGroq } from "@langchain/groq";
import { PromptTemplate } from "@langchain/core/prompts";
import { z } from "zod";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Initialize Groq LLM
const llm = new ChatGroq({
  apiKey: process.env.GROQ_API_KEY,
  model: "llama-3.1-8b-instant",
  temperature: 0.1,
});

// Sample data - In production, this would be a database
let products = [
  {
    id: 1,
    name: "iPhone 14",
    category: "Electronics",
    price: 999,
    brand: "Apple",
    description: "Latest iPhone with A16 chip",
  },
  {
    id: 2,
    name: "Samsung Galaxy S23",
    category: "Electronics",
    price: 899,
    brand: "Samsung",
    description: "Android flagship phone",
  },
  {
    id: 3,
    name: "MacBook Pro",
    category: "Electronics",
    price: 1999,
    brand: "Apple",
    description: "Professional laptop with M2 chip",
  },
  {
    id: 4,
    name: "Dell XPS 13",
    category: "Electronics",
    price: 1299,
    brand: "Dell",
    description: "Ultrabook laptop",
  },
  {
    id: 5,
    name: "Nike Air Max",
    category: "shoes",
    price: 120,
    brand: "Nike",
    description: "Comfortable running shoes",
  },
  {
    id: 6,
    name: "Adidas Ultraboost",
    category: "Shoes",
    price: 180,
    brand: "Adidas",
    description: "Premium running shoes",
  },
  {
    id: 7,
    name: "Levi's 501 Jeans",
    category: "Clothing",
    price: 80,
    brand: "Levi's",
    description: "Classic straight-leg jeans",
  },
  {
    id: 8,
    name: "Champion Hoodie",
    category: "Clothing",
    price: 45,
    brand: "Champion",
    description: "Comfortable cotton hoodie",
  },
];

// Schema for filter extraction
const FilterSchema = z.object({
  category: z.string().optional(),
  brand: z.string().optional(),
  minPrice: z.number().optional(),
  maxPrice: z.number().optional(),
  name: z.string().optional(),
});

// Improved prompt template for natural language to filters
const filterPrompt = PromptTemplate.fromTemplate(`
You are a product search filter assistant. Your job is to convert user queries into JSON filters.

AVAILABLE OPTIONS:
Categories: Electronics, Shoes, Clothing

STRICT RULES:
1. Return ONLY valid JSON - no explanations, no extra text
2. Use only the exact categories listed above (case-sensitive)
3. For nonsensical input, return brand query
4. For unclear queries, return brand query
5. Extract only clear, meaningful criteria

VALID FIELDS:
- category: "Electronics" | "Shoes" | "Clothing"
- brand: string
- minPrice: number (minimum price)
- maxPrice: number (maximum price)
- name: string (for product name matching)

EXAMPLES:
Input: "Show me Apple products"
Output: {{"brand": "Apple"}}

Input: "Electronics under 1000"
Output: {{"category": "Electronics", "maxPrice": 1000}}

Input: "Nike shoes between 100 and 200"
Output: {{"brand": "Nike", "category": "Shoes", "minPrice": 100, "maxPrice": 200}}

Input: "iPhone"
Output: {{"name": "iPhone"}}

Input: "cheap clothing"
Output: {{"category": "Clothing"}}

Input: "expensive electronics over 1500"
Output: {{"category": "Electronics", "minPrice": 1500}}

Input: "random gibberish xyz123"
Output: {{"barnd": "xyz123"}}

USER QUERY: "{query}"

JSON OUTPUT:`);

// Helper function to apply filters
function applyFilters(products, filters) {
  return products.filter((product) => {
    if (
      filters.category &&
      product.category.toLowerCase() !== filters.category.toLowerCase()
    ) {
      return false;
    }
    if (
      filters.brand &&
      product.brand.toLowerCase() !== filters.brand.toLowerCase()
    ) {
      return false;
    }
    if (filters.minPrice && product.price < filters.minPrice) {
      return false;
    }
    if (filters.maxPrice && product.price > filters.maxPrice) {
      return false;
    }
    if (
      filters.name &&
      !product.name.toLowerCase().includes(filters.name.toLowerCase())
    ) {
      return false;
    }
    return true;
  });
}

// Routes

// Get all products
app.get("/api/products", (req, res) => {
  res.json(products);
});

// Get product by ID
app.get("/api/products/:id", (req, res) => {
  const product = products.find((p) => p.id === parseInt(req.params.id));
  if (!product) {
    return res.status(404).json({ error: "Product not found" });
  }
  res.json(product);
});

// Create new product
app.post("/api/products", (req, res) => {
  const { name, category, price, brand, description } = req.body;

  if (!name ?? !category ?? !price ?? !brand) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const newProduct = {
    id: Math.max(...products.map((p) => p.id)) + 1,
    name,
    category,
    price: parseFloat(price),
    brand,
    description: description || "",
  };

  products.push(newProduct);
  res.status(201).json(newProduct);
});

// Update product
app.put("/api/products/:id", (req, res) => {
  const productIndex = products.findIndex(
    (p) => p.id === parseInt(req.params.id)
  );
  if (productIndex === -1) {
    return res.status(404).json({ error: "Product not found" });
  }

  const { name, category, price, brand, description } = req.body;
  products[productIndex] = {
    ...products[productIndex],
    ...(name && { name }),
    ...(category && { category }),
    ...(price && { price: parseFloat(price) }),
    ...(brand && { brand }),
    ...(description !== undefined && { description }),
  };

  res.json(products[productIndex]);
});

// Delete product
app.delete("/api/products/:id", (req, res) => {
  const productIndex = products.findIndex(
    (p) => p.id === parseInt(req.params.id)
  );
  if (productIndex === -1) {
    return res.status(404).json({ error: "Product not found" });
  }

  products.splice(productIndex, 1);
  res.status(204).send();
});

// Enhanced natural language search with better error handling
app.post("/api/search", async (req, res) => {
  try {
    const { query } = req.body;

    if (!query || typeof query !== "string" || query.trim() === "") {
      return res.status(400).json({ error: "Valid query string is required" });
    }

    // Clean and validate query
    const cleanQuery = query.trim();

    // Use LangChain to convert natural language to filters
    const formattedPrompt = await filterPrompt.format({
      query: cleanQuery,
    });

    const response = await llm.invoke(formattedPrompt);
    console.log("LLM response:", response.content); // Debug log

    // Parse the response with better error handling
    let filters = {};
    try {
      // Clean the response content (remove any extra whitespace or formatting)
      const cleanResponse = response.content.trim();

      // Try to extract JSON if wrapped in other text
      const jsonMatch = cleanResponse.match(/\{[^}]*\}/);
      const jsonString = jsonMatch ? jsonMatch[0] : cleanResponse;

      filters = JSON.parse(jsonString);

      // Ensure it's an object
      if (
        typeof filters !== "object" ||
        filters === null ||
        Array.isArray(filters)
      ) {
        filters = {};
      }
    } catch (parseError) {
      console.error("Failed to parse LLM response:", response.content);
      console.error("Parse error:", parseError);
      filters = {}; // Default to empty filters for unparseable responses
    }

    // Validate filters with better error handling
    let validatedFilters = {};
    try {
      validatedFilters = FilterSchema.parse(filters);
    } catch (validationError) {
      console.error("Filter validation failed:", validationError);
      // Instead of erroring out, use empty filters
      validatedFilters = {};
    }

    // Check if filters are empty or contain only undefined/null values
    const hasValidFilters = Object.values(validatedFilters).some(
      (value) => value !== undefined && value !== null && value !== ""
    );

    // Apply filters to products
    const filteredProducts = hasValidFilters
      ? applyFilters(products, validatedFilters)
      : []; // Return empty array for invalid queries

    const result = {
      query: cleanQuery,
      filters: validatedFilters,
      results: filteredProducts,
      count: filteredProducts.length,
    };

    // Add helpful message for empty results
    if (!hasValidFilters) {
      result.message =
        "No valid search criteria found. Try searching for specific brands (Apple, Samsung, Dell, Nike, Adidas, Levi's, Champion), categories (Electronics, Shoes, Clothing), or prices.";
    } else if (filteredProducts.length === 0) {
      result.message =
        "No products found matching your criteria. Try adjusting your search terms.";
    }

    res.json(result);
  } catch (error) {
    console.error("Search error:", error);
    res.status(500).json({
      error: "Search failed",
      details: error.message,
      query: req.body.query || "",
      filters: {},
      results: [],
      count: 0,
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
