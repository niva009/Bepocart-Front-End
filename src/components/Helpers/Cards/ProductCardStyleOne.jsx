import React, { useState } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import QuickViewIco from "../icons/QuickViewIco";
import Star from "../icons/Star";
import ThinLove from "../icons/ThinLove";
import './modal-styles.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { BiSolidOffer } from "react-icons/bi"; // Import the offer icon

export default function   ProductCardStyleOne({ datas, type }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isWishlisted, setIsWishlisted] = useState(false); // New state to track wishlist status



  const available =
    (datas.cam_product_sale /
      (datas.cam_product_available + datas.cam_product_sale)) *
    100;


    const addToWishlist = async (productId, event) => {
      event.preventDefault(); // Prevent the default anchor behavior
    
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          toast.error("Please login to add products to your wishlist.", {
            position: 'top-right', // Set the position directly as a string
          });
          return;
        }
    
        const response = await axios.post(
          `${import.meta.env.VITE_PUBLIC_URL}/add-wishlist/${productId}/`,
          {},
          {
            headers: {
              'Authorization': `${token}`,
              'Content-Type': 'application/json',
            },
          }
        );
    
        if (response.status === 201) {
          setIsWishlisted(true); // Update wishlist status

        } else if (response.status === 400) {
          toast.error("Product already in wishlist", {
            position: 'top-right', // Set the position directly as a string
          });
        }
      } catch (error) {
        console.error("Error adding product to wishlist:", error);
    
        if (error?.response?.status === 400) {
          toast.error("Product already in wishlist", {
            position: 'top-right', // Set the position directly as a string
          });
        } else {
          toast.error("Error adding product to wishlist", {
            position: 'top-right', // Set the position directly as a string
          });
        }
      }
    };
    

  const handleAddToCart = async (productId) => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_PUBLIC_URL}/product/${productId}`);
      if (response.status === 200) {
        setSelectedProduct(response.data);
        setIsModalOpen(true);
      } else {
        toast.error("Failed to fetch product details.");
      }
    } catch (error) {
      console.error("Error fetching product details:", error);
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
  
    <div className="product-card-one w-full h-full bg-white relative group overflow-hidden" style={{ boxShadow: "0px 15px 64px 0px rgba(0, 0, 0, 0.05)" }}>
   <Link to={`/single-product/${datas.slug}/`}>
        <div
          className="product-card-img relative w-full h-[200px]"
          style={{
            background: `url(${datas.image}) no-repeat center`,
            backgroundSize: "cover",
          }}
        >
          <div className="discount-container absolute top-3 left-3 flex space-x-2">
            {/* Render discount percentage box */}
            {datas.discount && (
              <div className="discount-box px-2 py-1 bg-qh3-blue text-black text-xs font-bold rounded">
                {parseInt(datas.discount)}% OFF
              </div>
            )}

            {/* Render sale box only if datas.sale exists */}
            {datas.sale && (
              <div className="discount-box px-2 py-1 bg-green-600 text-white text-xs font-bold rounded">
                {datas.sale}
              </div>
            )}
          </div>

          {datas.offer && datas.offer !== "none" && (
            <div className="offer-box absolute bottom-3 left-3 px-2 py-1 bg-red-500 text-white text-xs font-bold rounded flex items-center">
              <BiSolidOffer className="text-lg mr-1" />
              {datas.offer}
            </div>
          )}
        </div>
      </Link>
  
    <div className="product-card-details px-[30px] pb-[30px] relative">
      <div className="absolute w-full h-10 px-[30px] left-0 top-40 group-hover:top-[85px] transition-all duration-300 ease-in-out">
        {/* <button
          type="button"
          className={type === 3 ? "blue-btn" : "yellow-btn"}
          onClick={() => handleAddToCart(datas.id)} // Pass datas.id to handleAddToCart
        >
          <div className="flex items-center space-x-3">
            <span>
              <svg width="14" height="16" viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="fill-current"></svg>
            </span>
            <span style={{ textAlign: "center", justifyContent: "center", alignItems: "center" }}>Add To Cart</span>
          </div>
        </button> */}
      </div>
      <div className="reviews flex space-x-[5px] mb-3">
        {Array.from(Array(datas.review), (_, index) => (
          <span key={index}>
            <div className="flex">
              <Star />
            </div>
          </span>
        ))}
      </div>
      <Link to={`/single-product/${datas.slug}/`}>
        <p className="title mb-2 text-[15px] font-600 text-qblack leading-[24px] line-clamp-2 hover:text-blue-600">
          {datas.name}
        </p>
      </Link>
      <p className="price">
        <span className="main-price text-qgray line-through font-600 text-[18px]">
          {datas.price}
        </span>
        <span className="offer-price text-qred font-600 text-[18px] ml-2">
          ₹{datas.salePrice}
        </span>
      </p>
    </div>
  
    <div className="quick-access-btns flex flex-col space-y-2 absolute group-hover:right-4 -right-10 top-20 transition-all duration-300 ease-in-out">
      <Link to={`/single-product/${datas.slug}/`}>
        <span className="w-10 h-10 flex justify-center items-center bg-primarygray rounded">
          <QuickViewIco />
        </span>
      </Link>
      <a href="#" onClick={(event) => addToWishlist(datas.id, event)}>
        <span className={`w-10 h-10 flex justify-center items-center bg-primarygray rounded ${isWishlisted ? 'bg-red-500' : ''}`}>
          <ThinLove className={`${isWishlisted ? 'text-red-500' : ''}`} />
        </span>
      </a>
    </div>
  
    <ToastContainer />
  </div>
  
  );
}
