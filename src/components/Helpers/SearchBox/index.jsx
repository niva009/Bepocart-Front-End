import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function SearchBox({ className, type }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearch = (event) => {
    event.preventDefault();
    axios
      .get(`${import.meta.env.VITE_PUBLIC_URL}/search-products/?q=${searchQuery}`)
      .then((response) => {
        navigate('/all-products', { state: { searchResult: response.data } });
        setErrorMessage(null); // Clear any previous error message
      })
      .catch((error) => {
        const message = error?.response?.data?.message || 'An error occurred while fetching search results';
        setErrorMessage(message);
        setTimeout(() => {
          setErrorMessage(null); // Clear error message after 3 seconds
        }, 3000);
      });
  };

  return (
    <div className={`w-full h-full flex items-center border border-qgray-border bg-white ${className || ''}`}>
      <div className="flex-1 h-full">
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
      </div>
      <div className="w-[1px] h-[22px] bg-qgray-border"></div>
      <div className="flex-1 flex items-center px-4">
        <button type="button" className="w-full text-xs font-500 text-qgray flex justify-between items-center">
          <span>All Categories</span>
          <span>
            <svg width="10" height="5" viewBox="0 0 10 5" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect
                x="9.18359"
                y="0.90918"
                width="5.78538"
                height="1.28564"
                transform="rotate(135 9.18359 0.90918)"
                fill="#8E8E8E"
              />
              <rect
                x="5.08984"
                y="5"
                width="5.78538"
                height="1.28564"
                transform="rotate(-135 5.08984 5)"
                fill="#8E8E8E"
              />
            </svg>
          </span>
        </button>
      </div>
      <button
        className={`w-[93px] h-full text-sm font-600 ${type === 3 ? 'bg-qh3-blue text-white' : 'search-btn'}`}
        type="submit"
        onClick={handleSearch}
      >
        Search
      </button>
    </div>
  );
}
