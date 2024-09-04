import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

export default function SearchBox({ className, type }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();
  const suggestionsRef = useRef(null);

  const handleInputChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);

    if (query) {
      axios.get(`${import.meta.env.VITE_PUBLIC_URL}/search-products/?q=${query}`)
        .then((response) => {
          setSuggestions(response.data.slice(0, 10));
        })
        .catch(() => {
          setSuggestions([]);
        });
    } else {
      setSuggestions([]);
    }
  };

  const handleSearch = (event) => {
    event.preventDefault();  // Ensure this is inside the handleSearch function
  
    if (searchQuery) {
      axios.get(`${import.meta.env.VITE_PUBLIC_URL}/search-products/?q=${searchQuery}`)  // Corrected searchQuery usage
        .then((response) => {
          console.log("response:", response.data);
          navigate('/all-products', { state: { searchResult: response.data } });
          setErrorMessage(null);
        })
        .catch((error) => {
          const message = error?.response?.data?.message || 'An error occurred while fetching search results';
          setErrorMessage(message);
          setTimeout(() => {
            setErrorMessage(null);
          }, 3000);
        });
    }
  };

  const handleClickOutside = (event) => {
    if (suggestionsRef.current && !suggestionsRef.current.contains(event.target)) {
      setSuggestions([]);
      setSearchQuery('');
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className={`w-full h-full flex items-center border border-qgray-border bg-white ${className || ''}`}>
      <div className="flex-1 h-full relative">
        <form onSubmit={handleSearch} className="h-full">
          <input
            type="text"
            className={`search-input ${errorMessage ? 'border-red-600' : ''}`}
            placeholder={errorMessage || "Search Product..."}
            value={searchQuery}
            onChange={handleInputChange}
            style={{ borderColor: errorMessage ? 'red' : 'inherit' }}
          />
          <button type="submit" className="hidden">Submit</button>
        </form>

        {suggestions.length > 0 && (
          <ul ref={suggestionsRef} className="absolute z-50 bg-white border border-qgray-border mt-2 w-full max-h-[300px] overflow-y-auto shadow-lg">
            {suggestions.map((suggestion) => (
              <li key={suggestion.id} className="cursor-pointer hover:bg-gray-200 px-4 py-2">
                <Link to={`/single-product/${suggestion.slug}/`} onClick={() => setSuggestions([])}>
                  <img src={suggestion.image} alt={suggestion.name} className="inline-block w-15 h-10 mr-2" />
                  {suggestion.name}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
      <button
        className={`w-[93px] h-full text-sm font-600 ${type === 3 ? 'bg-qh3-blue text-white' : 'search-btn'}`}
        type="button"  // Keep this as a button to avoid form submission
        onClick={handleSearch}  // Trigger the search on click
      >
        Search
      </button>
    </div>
  );
}
