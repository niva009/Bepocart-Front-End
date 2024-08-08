import RangeSlider from "react-range-slider-input";
import axios from "axios";
import { useEffect, useState } from "react";
import './Slider.css';

export default function ProductsFilter({

  category,
  className,
  filterToggle,
  onFilteredResult // Accept the callback function as a prop
}) {
  const token = localStorage.getItem("token");
  const [price, setPrice] = useState({ min: 0, max: 200000 });

  const PriceHandler = (newValue) => {
    setPrice({ min: newValue[0], max: newValue[1] });
  };

  useEffect(() => {
    if (category) {
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
  }, [price, category, token]);

  return (
    <div
      className={`filter-widget w-full fixed lg:relative left-0 top-0 h-screen z-10 lg:h-auto overflow-y-scroll lg:overflow-y-auto bg-white px-8 pt-10 ${className || ""} ${filterToggle ? "block" : "hidden lg:block"}`}
    >
      <div className="filter-subject-item pb-10 border-b border-gray-300 mt-10 bg-gray-100 p-6 rounded-lg shadow-md">
        <div className="subject-title mb-6">
          <h1 className="text-black text-base font-semibold">Price Range</h1>
        </div>
        <div className="price-range mb-4">
          <RangeSlider
            value={[price.min, price.max]}
            onInput={PriceHandler}
            min={0}
            max={200000}
            className="range-slider"
          />
        </div>
        <div className="flex justify-between text-sm text-gray-700 font-medium">
          <p>Min: ₹{price.min}</p>
          <p>Max: ₹{price.max}</p>
        </div>
      </div>  
    </div>
  );
}
