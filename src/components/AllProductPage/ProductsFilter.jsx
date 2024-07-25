import RangeSlider from "react-range-slider-input";
import axios from "axios";
import { useEffect, useState } from "react";

export default function ProductsFilter({
  filters,
  checkboxHandler,
  PriceFilter,
  storage,
  category,
  filterStorage,
  className,
  filterToggle,
  filterToggleHandler,
  onFilteredResult // Accept the callback function as a prop
}) {
  const token = localStorage.getItem("token");
  const [price, setPrice] = useState({ min: 0, max: 200000 });

  const PriceHandler = (newValue) => {
    setPrice({ min: newValue[0], max: newValue[1] }); // Ensure this is properly passed and used
  };

  useEffect(() => {
    if (category) {
      // Check if both min and max are 0, if so, use default range or skip API call
      const minPrice = price.min === 0 && price.max === 0 ? 1 : price.min;
      const maxPrice = price.max === 0 ? 200000 : price.max;

      axios.post(`${import.meta.env.VITE_PUBLIC_URL}/filtered-products/${category}/`, {
        min_price: minPrice,
        max_price: maxPrice
      }, {
        headers: { Authorization: `${token}` }
      })
      .then((res) => {
        onFilteredResult(res.data.data); // Call the callback function with the filtered result
      })
      .catch((error) => {
        console.log(error);
      });
    }
  }, [price, category, token]); // Adding dependencies to useEffect

  return (
    <div
      className={`filter-widget w-full fixed lg:relative left-0 top-0 h-screen z-10 lg:h-auto overflow-y-scroll lg:overflow-y-auto bg-white px-[30px] pt-[40px] ${className || ""} ${filterToggle ? "block" : "hidden lg:block"}`}
    >
      <div className="filter-subject-item pb-10 border-b border-qgray-border mt-10">
        <div className="subject-title mb-[30px]">
          <h1 className="text-black text-base font-500">Price Range</h1>
        </div>
        <div className="price-range mb-5">
          <RangeSlider
            value={[price.min, price.max]}
            onInput={PriceHandler}
            min={0}
            max={200000}
          />
        </div>
        <p className="text-xs text-qblack font-400">
          Price: ${price.min} - ${price.max}
        </p>
      </div>
      <button
        onClick={filterToggleHandler}
        type="button"
        className="w-10 h-10 fixed top-5 right-5 z-50 rounded lg:hidden flex justify-center items-center border border-qred text-qred"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 011.414 1.414L11.414 10l4.293 4.293a1 1 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </div>
  );
}
