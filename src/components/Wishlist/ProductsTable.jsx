import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Wishlist.css';
import { Link } from 'react-router-dom';

Modal.setAppElement('#root'); // Set the root element for accessibility

export default function ProductsTable({ className }) {
  const [wishlist, setWishlist] = useState([]);
  const [productDetails, setProductDetails] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedWishlistItemId, setSelectedWishlistItemId] = useState(null); // Track selected wishlist item ID
  const navigate = useNavigate();

  useEffect(() => {
    fetchWishlist();
  }, []);

  const fetchWishlist = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${import.meta.env.VITE_PUBLIC_URL}/wishlist/`, {
        headers: {
          'Authorization': `${token}`
        }
      });
      setWishlist(response.data.data);
    } catch (error) {
      console.error("Error fetching wishlist:", error);
    }
  };


  console.log("wishlist-itemsssss",wishlist);

  const handleDeleteItem = async (itemId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${import.meta.env.VITE_PUBLIC_URL}/wishlist-delete/${itemId}/`, {
        headers: {
          'Authorization': `${token}`
        }
      });
      setWishlist(wishlist.filter(item => item.id !== itemId));
    } catch (error) {
      console.error(`Error deleting item with ID ${itemId}:`, error);
      toast.error(`Error deleting item: ${error.response?.data?.message || error.message}`);
    }
  };

  const fetchProductDetails = async (itemId, wishlistItemId) => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_PUBLIC_URL}/product/${itemId}/`);
      const productData = response.data;
      
      setProductDetails(productData);
  
      // Handle the selected color and size based on product type
      if (productData.product.type === 'single') {
        setSelectedColor(productData.images[0]?.color || "");
        setSelectedSize(productData.images[0]?.stock || ""); // Use stock instead of size for single products
      } else {
        setSelectedColor(productData.images[0]?.color || "");
        setSelectedSize(productData.images[0]?.stock_info[0]?.size || "");
      }
      
      setSelectedWishlistItemId(wishlistItemId); // Save wishlist item ID
      setIsModalOpen(true);
    } catch (error) {
      console.error("Error fetching product details:", error);
    }
  };
  

  const addToCart = async (productId, wishlistItemId) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_PUBLIC_URL}/cart/${productId}/`, {
        size: selectedSize,
        color: selectedColor,
      }, {
        headers: {
          'Authorization': `${localStorage.getItem('token')}`
        }
      });
      toast.success("Item added to cart successfully!");
      setIsModalOpen(false);
      handleDeleteItem(wishlistItemId); // Remove the item from the wishlist
    } catch (error) {
      console.error(`Error adding item with ID ${productId} to cart:`, error);
      toast.error(`Error adding item to cart: ${error.response?.data?.message || error.message}`);
    }
  };

  const availableSizes = () => {
    if (!productDetails || !selectedColor || productDetails.product.type === 'single') return [];
    const colorImage = productDetails.images.find(image => image.color === selectedColor);
    return colorImage ? colorImage.stock_info.filter(stock => stock.stock > 0) : [];
  };

  console.log("product details......:", productDetails);
  console.log("wishlist data", wishlist);

  return (
    <div className={`w-full ${className || ""}`}>
    <ToastContainer />
    <div className="relative w-full overflow-x-auto border border-[#EDEDED]">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <tbody>
          <tr className="text-[13px] font-medium text-black bg-[#F6F6F6] whitespace-nowrap px-2 border-b default-border-bottom uppercase">
            <td className="py-4 pl-10 block whitespace-nowrap w-[380px]">Product</td>
            <td className="py-4 whitespace-nowrap text-center">Category</td>
            <td className="py-4 whitespace-nowrap text-center">Price</td>
            <td className="py-4 whitespace-nowrap text-center w-[114px] block">Actions</td>
          </tr>
          {wishlist.map((item) => (
            <tr key={item.id} className="bg-white border-b hover:bg-gray-50">
              <td className="pl-10 py-4">
              <Link to={`/single-product/${item.slug}`}>
                <div className="flex space-x-6 items-center">
                 
                  <div className="w-[80px] h-[80px] overflow-hidden flex justify-center items-center border border-[#EDEDED]">
                    <img
                      src={`${item.productImage}`}
                      alt={item.productName}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="flex-1 flex flex-col">
                    <p className="font-medium text-[15px] text-qblack">
                      {item.productName}
                    </p>
                  </div>
                </div>
                </Link>
              </td>
              <td className="text-center py-4 px-2">
                <div className="flex space-x-1 items-center justify-center">
                  <span className="text-[15px] font-normal">{item.category}</span>
                </div>
              </td>
              <td className="text-center py-4 px-2">
                <div className="flex space-x-1 items-center justify-center">
                  <span className="text-[15px] font-normal">${item.productPrice}</span>
                </div>
              </td>
              <td className="text-right py-4">
                <div className="flex space-x-1 items-center justify-center">
                  <button
                    onClick={() => handleDeleteItem(item.id)}
                    className="text-[15px] text-red-600 hover:text-red-900 cursor-pointer"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => fetchProductDetails(item.slug, item.id)} // Pass wishlist item ID
                    className="text-[15px] text-blue-600 hover:text-blue-900 cursor-pointer ml-2"
                  >
                    Add to Cart
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    {productDetails && (
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="Select Size and Color"
        className="modal"
        overlayClassName="modal-overlay"
      >
        <div className="p-4">
          <h2 className="text-xl font-semibold mb-4">Select Size and Color</h2>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Color:</label>
            <select
              value={selectedColor}
              onChange={(e) => setSelectedColor(e.target.value)}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              {productDetails.images.map((image) => (
                <option key={image.id} value={image.color}>
                  {image.color}
                </option>
              ))}
            </select>
          </div>
          {productDetails.product.type !== 'single' && ( // Conditionally render size selection
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Size:</label>
              <select
                value={selectedSize}
                onChange={(e) => setSelectedSize(e.target.value)}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                {availableSizes().map((variant) => (
                  <option key={variant.size} value={variant.size}>
                    {variant.size}
                  </option>
                ))}
              </select>
            </div>
          )}
          <div className="flex justify-end">
            <button
              onClick={() => setIsModalOpen(false)}
              className="mr-2 px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              onClick={() => addToCart(productDetails.product.id, selectedWishlistItemId)} // Pass wishlist item ID
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </Modal>
    )}
  </div>
);
}