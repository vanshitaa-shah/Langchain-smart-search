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
    <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 mb-6">
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          placeholder="Try: 'Show me Nike shoes under $150' or 'Apple Electronics'"
          className="flex-1 px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
        />
        <div className="flex gap-2 sm:gap-3">
          <button
            onClick={handleSearch}
            disabled={loading}
            className="flex-1 sm:flex-none px-4 sm:px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center justify-center gap-2 text-sm sm:text-base"
          >
            <Search size={18} className="sm:w-5 sm:h-5" />
            {loading ? "Searching..." : "Search"}
          </button>
          {searchResults && (
            <button
              onClick={clearSearch}
              className="flex-1 sm:flex-none px-3 sm:px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 flex items-center justify-center gap-2 text-sm sm:text-base"
            >
              <X size={18} className="sm:w-5 sm:h-5" />
              <span className="hidden sm:inline">Clear</span>
            </button>
          )}
        </div>
      </div>

      {searchResults && (
        <div
          className={`mt-4 p-3 sm:p-4 rounded-lg ${
            searchResults.error ? "bg-red-50" : "bg-blue-50"
          }`}
        >
          <p
            className={`text-xs sm:text-sm ${
              searchResults.error ? "text-red-800" : "text-blue-800"
            }`}
          >
            <strong>Query:</strong> "{searchResults.query}"
          </p>
          {searchResults.error ? (
            <p className="text-xs sm:text-sm text-red-800 mt-2">
              <strong>Error:</strong> {searchResults.error}
            </p>
          ) : (
            <>
              <p className="text-xs sm:text-sm text-blue-800 break-all">
                <strong>Filters Applied:</strong>{" "}
                {JSON.stringify(searchResults.filters)}
              </p>
              <p className="text-xs sm:text-sm text-blue-800">
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
