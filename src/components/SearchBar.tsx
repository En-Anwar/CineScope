import { useState, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { useDebounce } from '@/hooks/useDebounce';

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  initialValue?: string;
}

export const SearchBar = ({
  onSearch,
  placeholder = 'Search movies...',
  initialValue = '',
}: SearchBarProps) => {
  const [query, setQuery] = useState(initialValue);
  const debouncedQuery = useDebounce(query, 400);

  useEffect(() => {
    onSearch(debouncedQuery);
  }, [debouncedQuery, onSearch]);

  const handleClear = () => {
    setQuery('');
  };

  return (
    <div className="relative w-full max-w-xl">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className="h-12 w-full rounded-full border border-border bg-secondary pl-12 pr-12 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
        />
        {query && (
          <button
            onClick={handleClear}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Clear search"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>
    </div>
  );
};
