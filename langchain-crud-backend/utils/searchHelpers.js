import { Product } from "../models/Product.js";

// Helper function to build MongoDB query from filters
export function buildMongoQuery(filters) {
  const query = {};
  
  if (filters.category) {
    query.category = new RegExp(filters.category, 'i');
  }
  
  if (filters.brand) {
    query.brand = new RegExp(filters.brand, 'i');
  }
  
  if (filters.name) {
    query.name = new RegExp(filters.name, 'i');
  }
  
  if (filters.minPrice !== undefined || filters.maxPrice !== undefined) {
    query.price = {};
    if (filters.minPrice !== undefined) {
      query.price.$gte = filters.minPrice;
    }
    if (filters.maxPrice !== undefined) {
      query.price.$lte = filters.maxPrice;
    }
  }
  
  return query;
}

// Helper function for comprehensive text search using MongoDB text search
export async function performComprehensiveSearch(query) {
  try {
    const searchTerms = query.toLowerCase().split(/\s+/).filter(term => term.length > 0);
    
    if (searchTerms.length === 0) {
      return [];
    }
    
    // Create a MongoDB text search query
    const searchQuery = searchTerms.join(' ');
    
    // Try MongoDB text search first (requires text index)
    try {
      const textSearchResults = await Product.find(
        { $text: { $search: searchQuery } },
        { score: { $meta: 'textScore' } }
      ).sort({ score: { $meta: 'textScore' } });
      
      if (textSearchResults.length > 0) {
        return textSearchResults;
      }
    } catch (textSearchError) {
      console.log('Text search not available, falling back to regex search');
    }
    
    // Fallback to regex search across multiple fields
    // Search for both individual terms AND the full phrase
    const fullPhrase = query.toLowerCase().trim();
    const individualTermQueries = searchTerms.map(term => ({
      $or: [
        { name: new RegExp(term, 'i') },
        { brand: new RegExp(term, 'i') },
        { description: new RegExp(term, 'i') }
      ]
    }));
    
    // Also search for the full phrase
    const fullPhraseQuery = {
      $or: [
        { name: new RegExp(fullPhrase, 'i') },
        { brand: new RegExp(fullPhrase, 'i') },
        { description: new RegExp(fullPhrase, 'i') }
      ]
    };
    
    const results = await Product.find({
      $or: [
        fullPhraseQuery,
        { $and: individualTermQueries }
      ]
    }).sort({ createdAt: -1 });
    
    // Sort by relevance (number of matches and phrase matching)
    const scoredResults = results.map(product => {
      let score = 0;
      const productObj = product.toObject();
      
      // Higher score for full phrase matches
      const fullPhraseRegex = new RegExp(fullPhrase, 'i');
      if (fullPhraseRegex.test(productObj.name)) score += 10;
      if (fullPhraseRegex.test(productObj.brand)) score += 8;
      if (fullPhraseRegex.test(productObj.description)) score += 5;
      
      // Score for individual term matches
      searchTerms.forEach(term => {
        const regex = new RegExp(term, 'i');
        if (regex.test(productObj.name)) score += 3;
        if (regex.test(productObj.brand)) score += 2;
        if (regex.test(productObj.description)) score += 1;
      });
      
      return { product, score };
    });
    
    // Sort by score (highest first) and return products
    return scoredResults
      .sort((a, b) => b.score - a.score)
      .map(item => item.product);
      
  } catch (error) {
    console.error('Error in comprehensive search:', error);
    return [];
  }
}
