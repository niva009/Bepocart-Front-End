import React, { useState, useEffect } from 'react';
import BreadcrumbCom from '../BreadcrumbCom';
import ProductCardStyleOne from '../Helpers/Cards/ProductCardStyleOne';
import DataIteration from '../Helpers/DataIteration';
import Layout from '../Partials/Layout';
import { FormControl, NativeSelect } from '@mui/material';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import './Pagination.css'; // Import the CSS file for pagination styles

const PRODUCTS_PER_PAGE = 15;

export default function AllProductPage() {
  const location = useLocation();
  const searchResult = location.state?.searchResult || [];

  const [filters, setFilter] = useState({
    mobileLaptop: false,
    gaming: false,
    imageVideo: false,
    vehicles: false,
    furnitures: false,
    sport: false,
    foodDrinks: false,
    fashion: false,
    toilet: false,
    makeupCorner: false,
    babyItem: false,
    apple: false,
    samsung: false,
    walton: false,
    oneplus: false,
    vivo: false,
    oppo: false,
    xiomi: false,
    others: false,
    sizeS: false,
    sizeM: false,
    sizeL: false,
    sizeXL: false,
    sizeXXL: false,
    sizeFit: false,
  });

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_PUBLIC_URL}/subcategory/`);
  }, []);

  const [sortedProducts, setSortedProducts] = useState(searchResult);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filterToggle, setToggle] = useState(false);
  const [price, setPrice] = useState({ min: 0, max: 200000 });
  const [category, setCategory] = useState(null);
  const [filteredResult, setFilteredResult] = useState([]);
  const [showProducts, setShowProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);


console.log("sorted resulttttttttt",sortedProducts);

  useEffect(() => {
    setSortedProducts(searchResult);
  }, [searchResult]);

  const checkboxHandler = (e) => {
    const { name } = e.target;
    setFilter((prevState) => ({
      ...prevState,
      [name]: !prevState[name],
    }));
  };

  const handleFilteredResult = (result) => {
    setFilteredResult(result);
  };

  const fetchLowToHigh = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_PUBLIC_URL}/low-products/${category}`);
      setSortedProducts(response.data);
      setCurrentPage(1); // Reset to first page on sort
    } catch (error) {
      console.error("Error fetching low-to-high products:", error);
    }
  };

  const fetchHighToLow = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_PUBLIC_URL}/high-products/${category}`);
      setSortedProducts(response.data);
      setCurrentPage(1); // Reset to first page on sort
    } catch (error) {
      console.error("Error fetching high-to-low products:", error);
    }
  };

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${import.meta.env.VITE_PUBLIC_URL}/products/`);
        setShowProducts(response.data.products);
      } catch (error) {
        console.error("Error fetching all products:", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllProducts();
  }, []);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const getTotalPages = (products) => {
    return Math.ceil(products.length / PRODUCTS_PER_PAGE);
  };

  const getPaginatedProducts = (products) => {
    const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
    return products.slice(startIndex, startIndex + PRODUCTS_PER_PAGE);
  };

  const paginatedProducts = sortedProducts.length > 0 ? getPaginatedProducts(sortedProducts) : getPaginatedProducts(showProducts);

  return (
    <Layout>
      <div className="products-page-wrapper w-full">
        <div className="container-x mx-auto">
          <BreadcrumbCom />
          <div className="w-full lg:flex lg:space-x-[30px]">
            <div className="lg:w-[270px]">
              <div className="w-full hidden lg:block h-[295px]">
                <img
                  src={`${import.meta.env.VITE_PUBLIC_URL}/assets/images/ads-5.png`}
                  alt=""
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
            <div className="flex-1">
              <div className="products-sorting w-full bg-white md:h-[70px] flex md:flex-row flex-col md:space-y-0 space-y-5 md:justify-between md:items-center p-[30px] mb-[40px]">
                <div>
                  <p className="font-400 text-[13px]">
                    <span className="text-qgray"> Showing</span> 1–15 of {sortedProducts.length || showProducts.length} results
                  </p>
                </div>
                <div className="flex space-x-3 items-center">
                  <span className="font-400 text-[13px]">Sort by:</span>
                  <div className="flex space-x-3 items-center border-b border-b-qgray">
                    <FormControl fullWidth>
                      <NativeSelect
                        inputProps={{
                          name: 'sort',
                          id: 'uncontrolled-native',
                        }}
                        onChange={(e) => {
                          if (e.target.value === 'Low_to_High') {
                            fetchLowToHigh();
                          } else if (e.target.value === 'High_to_Low') {
                            fetchHighToLow();
                          }
                        }}
                      >
                        <option value="">Sort</option>
                        <option value="Low_to_High">Low To High</option>
                        <option value="High_to_Low">High To Low</option>
                      </NativeSelect>
                    </FormControl>
                  </div>
                </div>
                <button
                  onClick={() => setToggle(!filterToggle)}
                  type="button"
                  className="w-10 lg:hidden h-10 rounded flex justify-center items-center border border-qyellow text-qyellow"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                    />
                  </svg>
                </button>
              </div>
              <div className="grid xl:grid-cols-3 sm:grid-cols-2 grid-cols-1 xl:gap-[30px] gap-5 mb-[40px]">
                {paginatedProducts.length > 0 ? (
                  <DataIteration datas={paginatedProducts}>
                    {({ datas }) => (
                      <div data-aos="fade-up" key={datas.id}>
                        <ProductCardStyleOne datas={datas} />
                      </div>
                    )}
                  </DataIteration>
                ) : (
                  <p>No products found</p>
                )}
              </div>
              <Pagination
                currentPage={currentPage}
                totalPages={getTotalPages(sortedProducts.length > 0 ? sortedProducts : showProducts)}
                onPageChange={handlePageChange}
              />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pageNumbers = [];

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="pagination">
      {pageNumbers.map(number => (
        <button
          key={number}
          onClick={() => onPageChange(number)}
          className={`page-number ${number === currentPage ? 'active' : ''}`}
        >
          {number}
        </button>
      ))}
    </div>
  );
};
