import React from "react";

interface ExampleQueriesProps {
  setSearchQuery: (query: string) => void;
}

const ExampleQueries: React.FC<ExampleQueriesProps> = ({ setSearchQuery }) => {
  const examples = [
    "Apple products",
    "Electronics under $1000",
    "Nike shoes",
    "Expensive clothing",
    "Samsung phones",
  ];

  return (
    <div className="mb-6">
      <p className="text-sm text-gray-600 mb-2">Try these examples:</p>
      <div className="flex flex-wrap gap-2">
        {examples.map((example) => (
          <button
            key={example}
            onClick={() => setSearchQuery(example)}
            className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full text-sm"
          >
            {example}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ExampleQueries;
