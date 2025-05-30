import React from "react";
import { Search, X } from "lucide-react";
import type { SearchResponse } from "../types";

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  handleSearch: () => void;
  loading: boolean;
  searchResults: SearchResponse | null;
  clearSearch: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  searchQuery,
  setSearchQuery,
  handleSearch,
  loading,
  searchResults,
  clearSearch,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="flex gap-4">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          placeholder="Try: 'Show me Nike shoes under $150' or 'Apple Electronics'"
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleSearch}
          disabled={loading}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center gap-2"
        >
          <Search size={20} />
          {loading ? "Searching..." : "Search"}
        </button>
        {searchResults && (
          <button
            onClick={clearSearch}
            className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 flex items-center gap-2"
          >
            <X size={20} />
            Clear
          </button>
        )}
      </div>

      {searchResults && (
        <div
          className={`mt-4 p-4 rounded-lg ${
            searchResults.error ? "bg-red-50" : "bg-blue-50"
          }`}
        >
          <p
            className={`text-sm ${
              searchResults.error ? "text-red-800" : "text-blue-800"
            }`}
          >
            <strong>Query:</strong> "{searchResults.query}"
          </p>
          {searchResults.error ? (
            <p className="text-sm text-red-800 mt-2">
              <strong>Error:</strong> {searchResults.error}
            </p>
          ) : (
            <>
              <p className="text-sm text-blue-800">
                <strong>Filters Applied:</strong>{" "}
                {JSON.stringify(searchResults.filters)}
              </p>
              <p className="text-sm text-blue-800">
                <strong>Results:</strong> {searchResults.count} products found
              </p>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
