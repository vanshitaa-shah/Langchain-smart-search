import { llm } from "../config/llm.js";
import { Product } from "../models/Product.js";
import { FilterSchema } from "../schemas/filterSchema.js";
import { filterPrompt } from "../templates/prompts.js";
import { buildMongoQuery, performComprehensiveSearch } from "../utils/searchHelpers.js";
import { transformProducts } from "../utils/transformers.js";

// Enhanced natural language search with better error handling
export const searchProducts = async (req, res) => {
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
      filters = {}; // Default to empty filters for unparseable responses
    }

    // Validate filters with better error handling
    let validatedFilters = {};
    try {
      validatedFilters = FilterSchema.parse(filters);
    } catch (validationError) {
      // Instead of erroring out, use empty filters
      validatedFilters = {};
    }

    // Check if filters are empty or contain only undefined/null values
    const hasValidFilters = Object.values(validatedFilters).some(
      (value) => value !== undefined && value !== null && value !== ""
    );

    let filteredProducts = [];
    let searchType = "";

    if (hasValidFilters) {
      // Use structured filters with MongoDB query
      const mongoQuery = buildMongoQuery(validatedFilters);
      filteredProducts = await Product.find(mongoQuery).sort({ createdAt: -1 });
      searchType = "structured";
    } else {
      // Fallback to comprehensive text search
      filteredProducts = await performComprehensiveSearch(cleanQuery);
      searchType = "comprehensive";
    }

    // Transform _id to id for all search results
    const transformedProducts = transformProducts(filteredProducts);

    const result = {
      query: cleanQuery,
      filters: validatedFilters,
      results: transformedProducts,
      count: transformedProducts.length,
      searchType: searchType,
    };

    // Add helpful message for different scenarios
    if (!hasValidFilters && filteredProducts.length === 0) {
      result.message =
        "No products found. Try searching for specific brands (Apple, Samsung, Dell, Sony, Nintendo, LG, Canon, DJI), categories (Electronics), or product names.";
    } else if (!hasValidFilters && filteredProducts.length > 0) {
      result.message = `Found ${filteredProducts.length} products matching your search terms across names, brands, and descriptions.`;
    } else if (hasValidFilters && filteredProducts.length === 0) {
      result.message =
        "No products found matching your specific criteria. Try adjusting your search terms.";
    }

    res.json(result);
  } catch (error) {
    res.status(500).json({
      error: "Search failed",
      details: error.message,
      query: req.body.query || "",
      filters: {},
      results: [],
      count: 0,
      searchType: "error",
    });
  }
};
