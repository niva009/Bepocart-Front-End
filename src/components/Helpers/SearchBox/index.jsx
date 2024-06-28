import React, { useState } from 'react';

export default function SearchBox({ className, type }) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearch = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://127.0.0.1:8000/search-products/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ "q": searchQuery }),
      });

      if (!response.ok) {
        throw new Error('Search request failed');
      }

      const data = await response.json();
      console.log('Search results:', data);
    } catch (error) {
      console.error('Error during search:', error);
    }
  };

  return (
    <div className={`w-full h-full flex items-center border border-qgray-border bg-white ${className || ""}`}>
      <div className="flex-1 bg-red-500 h-full">
        <form onSubmit={handleSearch} className="h-full">
          <input
            type="text"
            className="search-input"
            placeholder="Search Product..."
            value={searchQuery}
            onChange={handleInputChange} // Bind the input change handler
          />
          <button type="submit" className="hidden">Submit</button>
        </form>
      </div>
      <div className="w-[1px] h-[22px] bg-qgray-border"></div>
      <div className="flex-1 flex items-center px-4">
        <button
          type="button"
          className="w-full text-xs font-500 text-qgray flex justify-between items-center"
        >
          <span>All Categories</span>
          <span>
            <svg
              width="10"
              height="5"
              viewBox="0 0 10 5"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
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
