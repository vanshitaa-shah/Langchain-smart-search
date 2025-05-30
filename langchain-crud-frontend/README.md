# LangChain CRUD with Natural Language Search

A proof of concept application that demonstrates CRUD operations with natural language search using LangChain, Groq, Node.js, React, TypeScript, and Tailwind CSS.

## Features

- 🔍 Natural language search (e.g., "Show me Apple products under $1000")
- ✨ Full CRUD operations (Create, Read, Update, Delete)
- 🤖 LangChain integration with Groq for free AI processing
- 🎨 Modern React frontend with TypeScript and Tailwind CSS
- 🚀 Fast development with Vite

## Tech Stack

### Backend
- Node.js with Express
- LangChain with Groq integration
- CORS for cross-origin requests
- Zod for validation

### Frontend
- React 18 with TypeScript
- Vite for development and building
- Tailwind CSS for styling
- Axios for API calls
- Lucide React for icons

## Setup Instructions

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Groq API key (free from https://console.groq.com/)

### Backend Setup

1. Create a new directory for the backend:
```bash
mkdir langchain-crud-backend
cd langchain-crud-backend
```

2. Initialize npm and install dependencies:
```bash
npm init -y
# Copy the package.json content from the backend package.json artifact
npm install
```

3. Create the server files:
- Copy `server.js` from the backend server artifact
- Create `.env` file with your Groq API key:
```env
GROQ_API_KEY=your_groq_api_key_here
PORT=3001
```

4. Start the backend server:
```bash
npm run dev
```

The backend will run on http://localhost:3001

### Frontend Setup

1. Create a new directory for the frontend:
```bash
mkdir langchain-crud-frontend
cd langchain-crud-frontend
```

2. Initialize Vite React TypeScript project:
```bash
npm create vite@latest . -- --template react-ts
```

3. Install additional dependencies:
```bash
npm install axios lucide-react
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

4. Replace/create the following files with content from the artifacts:
- `package.json`
- `tailwind.config.js`
- `vite.config.ts`
- `src/index.css`
- `src/main.tsx`
- `src/App.tsx`
- `index.html`
- Create `src/types/index.ts`
- Create `src/services/api.ts`

5. Start the frontend development server:
```bash
npm run dev
```

The frontend will run on http://localhost:3000

## Usage Examples

### Natural Language Search Examples

Try these search queries:

1. **"Show me Apple products"** - Filters by Apple brand
2. **"Electronics under $1000"** - Filters electronics with max price $1000
3. **"Nike shoes between $100 and $200"** - Filters Nike shoes in price range
4. **"Samsung phones"** - Filters Samsung products containing "phone" in name
5. **"Clothing from Levi's"** - Filters Levi's clothing items

### API Endpoints

- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `POST /api/products` - Create new product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product
- `POST /api/search` - Natural language search

## How It Works

1. **Natural Language Processing**: User enters a search query in natural language
2. **LangChain Processing**: The query is sent to Groq's Mixtral model via LangChain
3. **Filter Extraction**: The AI converts the natural language to structured filters
4. **Product Filtering**: Backend applies the extracted filters to the product database
5. **Results Display**: Frontend shows the filtered results with applied filters

## Sample Data

The application comes with sample products including:
- Electronics (iPhone, Samsung Galaxy, MacBook, Dell XPS)
- Shoes (Nike Air Max, Adidas Ultraboost)
- Clothing (Levi's Jeans, Champion Hoodie)

## Getting Your Groq API Key

1. Visit https://console.groq.com/
2. Sign up for a free account
3. Go to API Keys section
4. Create a new API key
5. Copy the key to your `.env` file

## Customization

### Adding New Categories/Brands
Update the prompt template in `server.js` to include new categories and brands.

### Changing the AI Model
Modify the `model` parameter in the ChatGroq initialization to use different models like:
- `llama2-70b-4096`
- `gemma-7b-it`

### Database Integration
Replace the in-memory `products` array with a real database like MongoDB, PostgreSQL, or MySQL.

## Troubleshooting

### Common Issues

1. **CORS Errors**: Make sure the backend is running on port 3001 and frontend on port 3000
2. **API Key Issues**: Verify your Groq API key is correct and has sufficient quota
3. **Search Not Working**: Check the console for LLM response parsing errors

### Debug Tips

- Check browser console for frontend errors
- Check terminal logs for backend errors
- Verify API responses in Network tab
- Test API endpoints directly with tools like Postman

## License

MIT License - feel free to use this for your projects!