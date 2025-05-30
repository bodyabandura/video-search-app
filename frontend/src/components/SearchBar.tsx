import { useState, useRef, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_SEARCH_HISTORY } from '../graphql/queries';
import type { SearchBarProps, SearchHistoryItem } from '../types';

export default function SearchBar({ onSearch, isLoading }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const { data: historyData, loading: historyLoading, error: historyError } = useQuery(GET_SEARCH_HISTORY, {
    fetchPolicy: 'cache-and-network',
  });

  useEffect(() => {
    console.log('Search History Data:', historyData);
    console.log('Search History Loading:', historyLoading);
    console.log('Search History Error:', historyError);
  }, [historyData, historyLoading, historyError]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
      setIsDropdownOpen(false);
    }
  };

  const handleHistoryClick = (query: string) => {
    setQuery(query);
    onSearch(query);
    setIsDropdownOpen(false);
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node) &&
          inputRef.current && !inputRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative">
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsDropdownOpen(true)}
            placeholder="Search for videos..."
            className="w-full px-12 py-4 text-lg bg-white/20 backdrop-blur-md border border-white/30 rounded-full text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-200"
          />
          <svg
            className="absolute left-5 top-1/2 transform -translate-y-1/2 h-6 w-6 text-white/70"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <button
            type="submit"
            disabled={isLoading}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 px-6 py-2 bg-white/20 hover:bg-white/30 rounded-full text-white font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <div className="flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Searching...
              </div>
            ) : (
              'Search'
            )}
          </button>
        </div>
      </form>

      {/* Dropdown */}
      {isDropdownOpen && (
        <div className="absolute w-full mt-2 bg-white/90 backdrop-blur-md rounded-2xl shadow-xl border border-white/30 overflow-hidden z-50">
          <div className="py-2">
            <div className="px-4 py-2 text-sm font-medium text-gray-500 border-b border-gray-200">
              Recent Searches
            </div>
            {historyLoading ? (
              <div className="px-4 py-3 text-gray-500">Loading history...</div>
            ) : historyError ? (
              <div className="px-4 py-3 text-red-500">Error loading history</div>
            ) : historyData?.searchHistory?.history?.length > 0 ? (
              historyData.searchHistory.history.map((item: SearchHistoryItem) => (
                <button
                  key={item.timestamp}
                  onClick={() => handleHistoryClick(item.query)}
                  className="w-full px-4 py-3 text-left hover:bg-white/50 transition-colors duration-150 flex items-center justify-between group"
                >
                  <div className="flex items-center">
                    <svg className="w-5 h-5 mr-3 text-gray-400 group-hover:text-blue-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-gray-700 group-hover:text-blue-600 transition-colors">{item.query}</span>
                  </div>
                  <span className="text-sm text-gray-400">
                    {new Date(item.timestamp).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                    })}
                  </span>
                </button>
              ))
            ) : (
              <div className="px-4 py-3 text-gray-500">No recent searches</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
