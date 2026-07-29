// frontend/src/components/common/SearchBar.jsx

import { useState } from "react";
import { Search, X } from "lucide-react";

const SearchBar = ({
  placeholder = "Search...",
  onSearch,
  disabled = false,
}) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!query.trim()) return;

    onSearch?.(query.trim());
  };

  const clearSearch = () => {
    setQuery("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center gap-2 w-full"
    >
      <div className="relative flex-1">
        <Search
          size={18}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
        />

        <input
          type="text"
          value={query}
          disabled={disabled}
          placeholder={placeholder}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full rounded-lg border border-gray-300 bg-white py-2 pl-10 pr-10 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200 disabled:cursor-not-allowed disabled:bg-gray-100"
        />

        {query && (
          <button
            type="button"
            onClick={clearSearch}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700"
          >
            <X size={16} />
          </button>
        )}
      </div>

      <button
        type="submit"
        disabled={disabled}
        className="rounded-lg bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-400"
      >
        Search
      </button>
    </form>
  );
};

export default SearchBar;