import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin } from 'lucide-react';
import { locations } from '@/data/properties';
import { usePropertyStore } from '@/store/usePropertyStore';

export default function AdvancedSearchBar() {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { setFilter } = usePropertyStore();

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setShowSuggestions(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleChange = (value: string) => {
    setQuery(value);
    if (value.length > 0) {
      const filtered = locations.filter((l) => l.toLowerCase().includes(value.toLowerCase()));
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSearch = (searchQuery?: string) => {
    const q = searchQuery || query;
    setFilter('search', q);
    setShowSuggestions(false);
    navigate('/listings');
  };

  return (
    <div ref={ref} className="relative w-full max-w-2xl mx-auto">
      <div className="flex items-center bg-card rounded-2xl border border-border shadow-elegant overflow-hidden">
        <div className="flex-1 flex items-center gap-3 px-5">
          <MapPin className="w-5 h-5 text-muted-foreground shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => handleChange(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            placeholder="Search by city, address, or property name..."
            className="w-full py-4 bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none font-body"
          />
        </div>
        <button
          onClick={() => handleSearch()}
          className="btn-gradient m-2 flex items-center gap-2 shrink-0"
        >
          <Search className="w-4 h-4" />
          <span className="hidden sm:inline">Search</span>
        </button>
      </div>

      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute top-full mt-2 w-full bg-card rounded-xl border border-border shadow-elegant z-20 py-2 max-h-60 overflow-auto">
          {suggestions.map((s) => (
            <button
              key={s}
              onClick={() => { setQuery(s); handleSearch(s); }}
              className="w-full px-5 py-3 text-left text-sm hover:bg-muted transition-colors flex items-center gap-3 text-foreground"
            >
              <MapPin className="w-4 h-4 text-muted-foreground" />
              {s}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
