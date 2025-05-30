# LangChain CRUD with Natural Language Search

A full-stack application featuring natural language product search using LangChain and Groq.

## Setup & Installation

### Prerequisites
- Node.js v18+ 
- Groq API key (get from https://console.groq.com)

### Backend Setup
```bash
cd langchain-crud-backend
npm install
# Create .env and add your GROQ_API_KEY
npm run dev
```

### Frontend Setup
```bash
cd langchain-crud-frontend
npm install
npm run dev
```

## Features

- Natural language product search
- Full CRUD operations for products
- Real-time search filtering
- Responsive UI with Tailwind CSS

## Example Search Queries

- "Show me Apple products under $1000"
- "Nike shoes between $100 and $200"
- "Electronics from Samsung"
- "Clothing under $50"

## API Endpoints

- GET /api/products - Get all products
- POST /api/products - Create product
- PUT /api/products/:id - Update product
- DELETE /api/products/:id - Delete product
- POST /api/search - Natural language search

## Technology Stack

### Frontend
- React with TypeScript
- Vite
- Tailwind CSS
- Axios

### Backend
- Node.js
- Express
- LangChain
- Groq AI

## Project Structure
```
langchain-crud/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── services/
│   │   └── types/
│   └── package.json
└── backend/
    ├── server.js
    └── package.json
```

## Environment Variables

### Backend (.env)
```
GROQ_API_KEY=your_groq_api_key
PORT=3001
```

### Frontend (.env)
```
VITE_API_URL=http://localhost:3001/api
```