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
            placeholder={errorMessage || "Search Product ......"}
            value={searchQuery}
            onChange={handleInputChange}
            style={{ borderColor: errorMessage ? 'red' : 'inherit' }}
          />
          <button type="submit" className="hidden">Submit</button>
        </form>
      </div>
      <div className="w-[1px] h-[22px] bg-qgray-border"></div>
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
