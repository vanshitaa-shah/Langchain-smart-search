import { z } from "zod";

// Schema for filter extraction
export const FilterSchema = z.object({
  category: z.string().optional(),
  brand: z.string().optional(),
  minPrice: z.number().optional(),
  maxPrice: z.number().optional(),
  name: z.string().optional(),
});
