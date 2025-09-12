import express from "express";
import { searchProducts } from "../controllers/searchController.js";

const router = express.Router();

// Search route
router.post("/", searchProducts);

export default router;
