# LangChain CRUD Backend

A Node.js backend application with MongoDB database integration and LangChain-powered smart search functionality.

## 🚀 Features

- **CRUD Operations**: Full Create, Read, Update, Delete operations for products
- **Smart Search**: LangChain-powered natural language search with Groq LLM
- **MongoDB Integration**: Persistent data storage with MongoDB
- **Comprehensive Search**: Fallback text search across multiple fields
- **Data Validation**: Zod schema validation
- **Clean Architecture**: Modular file structure with separation of concerns

## 📁 Project Structure

```
langchain-crud-backend/
├── server.js                 # Main server file
├── config/
│   ├── database.js          # MongoDB connection & seeding
│   └── llm.js               # LangChain/Groq configuration
├── controllers/
│   ├── productController.js # Product CRUD operations
│   └── searchController.js  # Search logic & LLM integration
├── models/
│   └── Product.js           # MongoDB product schema
├── routes/
│   ├── productRoutes.js     # Product API routes
│   └── searchRoutes.js      # Search API routes
├── schemas/
│   └── filterSchema.js      # Zod validation schemas
├── templates/
│   └── prompts.js           # LangChain prompt templates
├── utils/
    └── searchHelpers.js     # Search utility functions
```

## 🛠️ Setup Instructions

### 1. Prerequisites

- **Node.js** (v18 or higher)
- **MongoDB** (local installation or MongoDB Atlas cloud)
- **Groq API Key** (for LangChain integration)

### 2. Installation

```bash
# Install dependencies
npm install
```

### 3. Environment Configuration

```bash
# Copy environment template
cp .env.example .env
```

**Required Environment Variables:**

```env
# Database Configuration
MONGODB_URI=mongodb://localhost:27017/langchain-crud
# For MongoDB Atlas: mongodb+srv://username:password@cluster.mongodb.net/langchain-crud

# Server Configuration
PORT=3001

# LangChain/Groq Configuration
GROQ_API_KEY=your_groq_api_key_here

# Node Environment
NODE_ENV=development
```

### 4. MongoDB Atlas (Cloud)**
1. Create account at [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a cluster
3. Get connection string
4. Update `MONGODB_URI` in `.env`

### 5. Get Groq API Key

1. Visit [Groq Console](https://console.groq.com/)
2. Sign up/Sign in
3. Generate API key
4. Add to `.env` file

### 6. Run the Application

```bash
# Development mode (with auto-reload)
npm run dev

# Production mode
npm start
```

## 📡 API Endpoints

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `POST /api/products` - Create new product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product

### Search
- `POST /api/search` - Smart search with natural language

## 🔍 Search Examples

**Structured Search (LLM parses intent):**
```json
POST /api/search
{
  "query": "iPhone under 1000"
}
// Returns: {"name": "iPhone", "maxPrice": 1000}
```

**Comprehensive Search (fallback for unclear queries):**
```json
POST /api/search
{
  "query": "gaming device camera"
}
// Searches across name, brand, description fields
```

## 🚨 Troubleshooting

**MongoDB Connection Issues:**
```bash
# Check MongoDB status
sudo systemctl status mongod

# Check if MongoDB is listening
sudo netstat -plnt | grep :27017

# View MongoDB logs
sudo journalctl -u mongod
```

**Groq API Issues:**
- Verify API key in `.env`
- Check Groq service status
- Review rate limiting

## 📊 Database Schema

```javascript
{
  name: String (required),
  category: String (enum: 'Electronics', 'Shoes', 'Clothing'),
  price: Number (required, min: 0),
  brand: String (required),
  description: String (optional),
  createdAt: Date (auto),
  updatedAt: Date (auto)
}
```

## 🔧 Development

```bash
# Install nodemon for development
npm install -g nodemon

# Run in development mode
npm run dev
```

## 🌟 Features

- **Text Search Indexing**: MongoDB text indexes for better search performance
- **Graceful Shutdown**: Proper database connection cleanup
- **Error Handling**: Comprehensive error handling with proper HTTP status codes
- **Input Validation**: Zod schema validation for all inputs
- **Flexible Search**: Structured filters + comprehensive text search fallback
