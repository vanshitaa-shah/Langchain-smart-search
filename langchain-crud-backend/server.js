import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDatabase } from "./config/database.js";
import productRoutes from "./routes/productRoutes.js";
import searchRoutes from "./routes/searchRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Connect to database
connectDatabase();

// Middleware
app.use(cors());
app.use(express.json());

// Request logging middleware
app.use((req, res, next) => {
  next();
});

// Routes
app.use("/api/products", productRoutes);
app.use("/api/search", searchRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
