import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Wishlist.css';
import { Link } from 'react-router-dom';
import { MdDelete } from "react-icons/md";

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
      toast.error(`Error adding item to cart: ${error.response?.data?.message || error.message}`);
    }
  };

  const availableSizes = () => {
    if (!productDetails || !selectedColor || productDetails.product.type === 'single') return [];
    const colorImage = productDetails.images.find(image => image.color === selectedColor);
    return colorImage ? colorImage.stock_info.filter(stock => stock.stock > 0) : [];
  };

  const availableStock = () => {
    if (!productDetails) return false;
  
    if (productDetails.product.type === 'single') {
      const colorImage = productDetails.images.find(image => image.color === selectedColor);
      const productStock = colorImage.stock;
      return productStock === 0;
    }
  
    if (productDetails.product.type === 'variant') {
      if (!selectedColor) return false;
  
      const colorImage = productDetails.images.find(image => image.color === selectedColor);
  
      // If no color image is found or stock info is missing, return true (out of stock)
      if (!colorImage || !colorImage.stock_info || colorImage.stock_info.length === 0) return true;
  
      return colorImage.stock_info.every(stock => stock.stock === 0);
    }
    return false;
  };


  return (
    <div className={`w-full ${className || ""}`}>
      <ToastContainer />
      <div className="relative w-full overflow-x-auto border border-[#EDEDED]">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <tbody>
            <tr className="text-[13px] font-medium text-black bg-[#F6F6F6] whitespace-nowrap px-2 border-b default-border-bottom uppercase">
              <td className="py-4 pl-4 md:pl-10 block whitespace-nowrap w-[300px] md:w-[380px]">Product</td>
              <td className="py-4 whitespace-nowrap text-center hidden md:table-cell">Category</td>
              <td className="py-4 whitespace-nowrap text-center hidden md:table-cell">Price</td>
              <td className="py-4 whitespace-nowrap text-center w-[80px] md:w-[114px] block">Actions</td>
            </tr>
            {wishlist.map((item) => (
              <tr key={item.id} className="bg-white border-b hover:bg-gray-50">
                <td className="pl-4 md:pl-10 py-4">
                  <Link to={`/single-product/${item.slug}`}>
                    <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 space-x-0 md:space-x-6 items-center">
                      <div className="w-[60px] h-[60px] md:w-[80px] md:h-[80px] overflow-hidden flex justify-center items-center border border-[#EDEDED]">
                        <img
                          src={`${item.productImage}`}
                          alt={item.productName}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div className="flex-1 flex flex-col">
                        <p className="font-medium text-[14px] md:text-[15px] text-qblack">
                          {item.productName}
                        </p>
                      </div>
                    </div>
                  </Link>
                </td>
                <td className="text-center py-4 px-2 hidden md:table-cell">
                  <div className="flex space-x-1 items-center justify-center">
                    <span className="text-[14px] md:text-[15px] font-normal">{item.category}</span>
                  </div>
                </td>
                <td className="text-center py-4 px-2 hidden md:table-cell">
                  <div className="flex space-x-1 items-center justify-center">
                    <span className="text-[14px] md:text-[15px] font-normal">₹{item.productPrice}</span>
                  </div>
                </td>
                <td className="text-right py-4">
                  <div className="flex space-x-1 items-center justify-center">
                  <MdDelete size={40}  onClick={() => handleDeleteItem(item.id)} style={{cursor:"pointer", marginRight:"20px"}}/>
                    <button
                      onClick={() => fetchProductDetails(item.slug, item.id)} // Pass wishlist item ID
                      className="bg-transparent hover:bg-qh3-blue text-blue-700 font-semibold hover:text-black py-2 px-2 md:px-4 border ml-2 md:ml-3 border-blue-500 hover:border-transparent rounded text-[13px] md:text-[15px]"
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
            <h2 className="text-lg md:text-xl font-semibold mb-4">Select Size and Color</h2>
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
                  {availableSizes().map((stock) => (
                    <option key={stock.size} value={stock.size}>
                      {stock.size}
                    </option>
                  ))}
                </select>
              </div>
            )}
            <div className="flex justify-end space-x-3">
              
            <button
  onClick={() => addToCart(productDetails.product.id, selectedWishlistItemId)}
  className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
  disabled={availableStock()} // Disable the button if out of stock for either single or variant products
>
  {availableStock() ? 'Out of Stock' : 'Add to Cart'} {/* Change text based on stock availability */}
</button>
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-300 text-black py-2 px-4 rounded-md hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
