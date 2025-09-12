import dotenv from "dotenv";
import { ChatGroq } from "@langchain/groq";

dotenv.config();

// Initialize Groq LLM
const llm = new ChatGroq({
  apiKey: process.env.GROQ_API_KEY,
  model: "llama-3.1-8b-instant",
  temperature: 0.1,
});

export { llm };
