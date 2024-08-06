import React, { useState, useEffect } from 'react';
import BreadcrumbCom from '../components/BreadcrumbCom';
import ProductCardStyleOne from '../components/Helpers/Cards/ProductCardStyleOne';
import DataIteration from '../components/Helpers/DataIteration';
import Layout from '../components/Partials/Layout';
import ProductsFilter from '../components/AllProductPage/ProductsFilter';
import { FormControl, NativeSelect } from '@mui/material';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function Category() {
  const { id } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filterToggle, setToggle] = useState(false);
  const [price, setPrice] = useState({ min: 0, max: 200000 });
  const [storage, setStorage] = useState(null);
  const [category, setCategory] = useState(null);
  const [filteredResult, setFilteredResult] = useState([]);
  const [sortOption, setSortOption] = useState('');

  useEffect(() => {
    if (id) {
      setLoading(true);
      axios.get(`${import.meta.env.VITE_PUBLIC_URL}/category/${id}/products/`)
        .then((response) => {
          const products = response.data.products;
          setProducts(products);
          if (products.length > 0) {
            setCategory(products[0].category);
          }
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching products:', error);
          setError(error?.response?.data?.message || 'An error occurred while fetching products');
          setLoading(false);
        });
    }
  }, [id]);

  console.log(category, "category information");

  const checkboxHandler = (e) => {
    const { name } = e.target;
    setFilter((prevState) => ({
      ...prevState,
      [name]: !prevState[name],
    }));
  };

  const filterStorage = (value) => {
    setStorage(value);
  };

  useEffect(() => {
    if (sortOption === 'Low_to_High') {
      fetchLowToHigh();
    } else if (sortOption === 'High_to_Low') {
      fetchHighToLow();
    }
  }, [sortOption]);

  const fetchLowToHigh = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_PUBLIC_URL}/low-products/${category}/`);
      setProducts(response.data.data);
    } catch (error) {
      console.error('Error fetching low to high products:', error);
      setError(error?.response?.data?.message || 'An error occurred while fetching low to high products');
    }
  };

  const fetchHighToLow = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_PUBLIC_URL}/high-products/${category}/`);
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching high to low products:', error);
      setError(error?.response?.data?.message || 'An error occurred while fetching high to low products');
    }
  };

  const handleFilteredResult = (result) => {
    setFilteredResult(result);
  };

  const displayProducts = filteredResult.length > 0 ? filteredResult : products;

  return (
    <Layout>
      <div className="products-page-wrapper w-full">
        <div className="container-x mx-auto">
          <BreadcrumbCom />
          <div className="w-full lg:flex lg:space-x-[30px]">
            <div className="lg:w-[270px]">
              <ProductsFilter
                filterToggle={filterToggle}
                filterToggleHandler={() => setToggle(!filterToggle)}
                checkboxHandler={checkboxHandler}
                PriceFilter={price}
                volumeHandler={(value) => setPrice({ min: value[0], max: value[1] })}
                storage={storage}
                category={category}
                filterstorage={filterStorage}
                className="mb-[30px]"
                onFilteredResult={handleFilteredResult}
              />
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
                    <span className="text-qgray">Showing</span> 1–{displayProducts.length} of {displayProducts.length} results
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
                        onChange={(e) => setSortOption(e.target.value)}
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
                {loading ? (
                  <p>Loading...</p>
                ) : error ? (
                  <p>{error}</p>
                ) : displayProducts.length > 0 ? (
                  <DataIteration datas={displayProducts}>
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
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
