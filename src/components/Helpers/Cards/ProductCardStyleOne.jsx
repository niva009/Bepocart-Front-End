import React, { useState } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import QuickViewIco from "../icons/QuickViewIco";
import Star from "../icons/Star";
import ThinLove from "../icons/ThinLove";
import './modal-styles.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

export default function ProductCardStyleOne({ datas, type }) {
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
        toast.error("Please login to add products to your wishlist.");
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
      } else if(response.status === 400) {
        toast.error("Product already in wishlist",{
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    } catch (error) {
      console.error("Error adding product to wishlist:", error);
      toast.error("Product already in wishlist");
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
      <div className="product-card-img w-full h-[200px]"
        style={{
          background: `url(${datas.image}) no-repeat center`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          display: "flex",
        }}
      >
        {datas.campaingn_product && (
          <>
            <div className="px-[30px] absolute left-0 top-3 w-full">
              <div className="progress-title flex justify-between">
                <p className="text-xs text-qblack font-400 leading-6">Products Available</p>
                <span className="text-sm text-qblack font-600 leading-6">{datas.stock}</span>
              </div>
              <div className="progress w-full h-[5px] rounded-[22px] bg-primarygray relative overflow-hidden">
                <div
                  style={{ width: `${datas.campaingn_product ? 100 - available : 0}%` }}
                  className={`h-full absolute left-0 top-0 ${type === 3 ? "bg-qh3-blue" : "bg-qyellow"}`}
                ></div>
              </div>
            </div>
          </>
        )}
        {datas.product_type && !datas.campaingn_product && (
          <div className="product-type absolute right-[14px] top-[17px]">
            <span className={`text-[9px] font-700 leading-none py-[6px] px-3 uppercase text-white rounded-full tracking-wider ${datas.product_m === "popular" ? "bg-[#19CC40]" : "bg-qyellow"}`}>
              {datas.product_type}
            </span>
          </div>
        )}
      </div>
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
