import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FormControl, Select, MenuItem } from "@mui/material";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import Star from "@mui/icons-material/Star";
import { FaCircleMinus } from "react-icons/fa6";
import { FaCirclePlus } from "react-icons/fa6";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaShare } from 'react-icons/fa'; //


export default function ProductView({ className, }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [product, setProduct] = useState(null);
  const [productImages, setProductImages] = useState([]);
  const [src, setSrc] = useState(""); // The main image source
  const [selectedSize, setSelectedSize] = useState("");
  const [sizes, setSizes] = useState([]);
  const [variants, setVariants] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [wishlist, setWishlist] = useState(false);
  const [selectedColor, setSelectedColor] = useState("");
  const [isReadMore, setIsReadMore] = useState(true);
  const [review, setReview] = useState([]);
  const [stock,setStock] = useState([]);
  const [selectedImage, setSelectedImage] = useState([]);
  



  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchProduct(id);
    stock
  }, [id]);


  
  const fetchProduct = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${import.meta.env.VITE_PUBLIC_URL}/product/${id}/`, {
        headers: { Authorization: `${token}` },
      });
      const productData = response.data.product;
      const productImages = response.data.images;
  
      setProduct(productData);
      setProductImages(productImages);
      setSrc(productData.image || ""); // Set initial image to product.image
  
      // Set initial color and sizes based on available stock
      const initialColorId = productImages[0]?.id;
      const initialStockInfo = productImages.find(image => image.id === initialColorId)?.stock_info || [];
      let availableSizes = [];
      let initialStock = [];
  
      if (productData.type === "single") {
        // If the product type is "single," directly use the stock from the image
        initialStock = productImages[0]?.stock || 0;
        setSizes([]); // Clear sizes for single product type
      } else {
        // For other product types, filter the stock_info array
        availableSizes = initialStockInfo
          .filter(variant => variant.stock > 0)
          .map(variant => variant.size);
  
        initialStock = initialStockInfo.filter(variant => variant.stock > 0);
       
      }
  
      setVariants(initialStockInfo);
      setSelectedColor(productImages[0]?.color || "");
      setSizes(availableSizes);
      setSelectedSize(availableSizes[0] || "");
      // setStock(initialStock);
      setTimeout(() => {
        setStock(initialStock);
      }, 100);
  
      // Check if the selected size has any stock
      if (productData.type !== "single" && availableSizes.length === 0) {
        setError("Out of stock");
      } else {
        setError("");
      }
    } catch (error) {
      if (error.response && (error.response.status === 401 || error.response.status === 403 || error.response.status === 500)) {
        navigate("/login");
      } else {
        setError("Error fetching product");
      }
    } finally {
      setLoading(false);
    }
  };




  // Use effect for wishlist success mes
  // Use effect for error message

  
  

  const productId = product?.id;


  useEffect(() => {
    const fetchRating = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_PUBLIC_URL}/review/${productId}/`);
        setReview(response.data);
      } catch (error) {
        console.log("Error fetching review:", error);
      }
    };

    fetchRating();
  }, [productId]);


  const calculateAverageRating = () => {
    if (review.length === 0) return 0;

    const totalRating = review.reduce((sum, rateClass) => sum + rateClass.rating, 0);
    return totalRating / review.length;
  };

  const averageRating = calculateAverageRating();

  // console.log("stock information..:", stock)


  const AddToCart = async () => {
    try {
      if (id) {
        const token = localStorage.getItem("token");
        const response = await axios.post(
          `${import.meta.env.VITE_PUBLIC_URL}/cart/${productId}/`,
          {
            quantity: quantity,
            size: selectedSize,
            color: selectedColor,
          },
          {
            headers: { "Authorization": `${token}` },
          }
        );

        if(response.status === 201){
          toast.success("Added to Cart Successfull!", { position: "bottom-center" });
        }
      } else {
        toast.warning("id not found")
      }
    } catch (error) {
      if(error?.response?.status === 400){
        toast.warning(error?.response?.data?.message || "error adding product to cart", { position: "bottom-center" });
      }
       else if (error.response && (error.response.status === 401 || error.response.status === 403 || error.response.status === 500)) {
        navigate("/login");
      } else {
        setError("Error adding to cart");
      }
    }
  };

  const changeImgHandler = (current, sizes, color) => {
    setSrc(`${current}`);
  
    // Find the image based on the selected color
    const changedImage = productImages.find(image => image.color === color);
 
    if (changedImage) {
      const stockAvailable = changedImage.stock;
  
      // Update sizes and stock for multi-type products
      if (product?.type !== "single") {
        setSizes(sizes);
        setSelectedSize(sizes[0] || ""); // Set the first available size as the default
        const choosedImage = changedImage.stock_info.filter(variant => variant.stock);
        setStock(choosedImage);
        setQuantity(1);
      } else {
        // Clear sizes for single type and set stock based on the image's stock
        setSizes([]);
        setSelectedSize("");
        setStock(stockAvailable); // Set stock to the single variant's stock
        setQuantity(1);
      }
  
      // Always update the selected color
      setSelectedColor(color);
    }
  };
  

  const handleSizeChange = (event) => {
    const newSize = event.target.value;
    setSelectedSize(newSize);

    // Find the stock for the newly selected size
    const selectedVariant = selectedImage.stock_info.find(variant => variant.size === newSize);
    const newStock = selectedVariant ? selectedVariant.stock : 0;
    setStock(newStock); // Update stock based on selected size
    setQuantity(1); // Reset quantity when a new size is selected
  };

  const handleWishlistToggle = () => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    const body = {
      product: id,
    };

    axios.post(
      `${import.meta.env.VITE_PUBLIC_URL}/add-wishlist/${productId}/`,
      body,
      {
        headers: {
          Authorization: token,
        },
      }
    )
      .then((response) => {
        if(response.status === 201){
          toast.success("Added to wishlist Successfull!", { position: "bottom-center" });
         

        }
      })
      .catch((error) => {
        toast.warning(error?.response?.data?.message || "Error adding to wishlist", { position: "bottom-center" });
        console.log("error wishlist..:",error);

      });
  };

  const toggleReadMore = () => {
    setIsReadMore(!isReadMore)
  };

  const handleColorChange = (colorId) => {
    const selectedImage = productImages.find(image => image.id === colorId);
  
    if (selectedImage) {
      setSelectedImage(selectedImage);
      setSrc(selectedImage.image1);
      setSelectedColor(selectedImage.color);
      const stockAvailable = selectedImage.stock
  
      if (product?.type !== "single") {
        const filteredVariants = selectedImage.stock_info.filter(variant => variant.stock > 0);
        setSizes(filteredVariants.map(variant => variant.size));
        setStock(filteredVariants.map(variant => variant.stock));
        setSelectedSize(filteredVariants[0]?.size || "");
        setQuantity(1);
      } else {
        setSizes([]); // Clear sizes if product type is "single"
        setSelectedSize(""); // Clear selected size
        setStock(stockAvailable)
        setQuantity(1);
      }
    }
  };



   const incrementCounter = () =>{
       if(quantity < stock)
       setQuantity(quantity + 1)
   }

   const decrementCounter = () =>{
       if( quantity > 1){
        setQuantity(quantity - 1)
       }
   }



   const handleShare = async () => {
    if (navigator.share) {
      try {
        // Make sure product and product.image exist before sharing
        if (product && product.image) {
          await navigator.share({
            title: product.slug || 'Check this out!', // Provide a fallback title
            text: 'Check out this product!', // Adding text for better sharing experience
            url: window.location.href,
            // image property can be included if you have a valid URL for product.image
            // However, Web Share API might not support image sharing directly
          });
        } else {
          console.error('Product or product image is not defined');
        }
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      // Display a more user-friendly message or handle the case more gracefully
      alert('Sharing is not supported on this browser.');
    }
  };
  

  

  const isOutOfStock = stock !== null && (stock === 0 || stock.length === 0);
  

  const PreviousButton = ({ onClick }) => (
    <button
      className="slick-prev"
      onClick={onClick}
      style={{ display: "block", left: "-40px" }}
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M15 18L9 12L15 6"
          stroke="black"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );

  const NextButton = ({ onClick }) => (
    <button
      className="slick-next"
      onClick={onClick}
      style={{ display: "block", right: "-40px" }}
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M9 18L15 12L9 6"
          stroke="black"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    prevArrow: <PreviousButton />,
    nextArrow: <NextButton />,

  };

  

  useEffect(() => {
    // Check if product is fully loaded and all necessary properties exist
    if (product && product.categoryName && product.name && product.id && product.salePrice && window.fbq) {
      window.fbq('track', 'ViewContent', {
        content_category: product.categoryName,
        content_name: product.name,
        content_ids: product.id,
        content_type: 'product_Group',
        value: product.salePrice,
        currency: 'INR',
      });
    }
  }, [product]);


  const handleButtonClick = () => {
    handleWishlistToggle();
    handleTrackWishlist();
  };

  const handleCartClick =() =>{
    handleTrackCart();
    AddToCart();  
  }
  


  const handleTrackWishlist = () => {

    if (product && product.categoryName && product.name && product.id && product.salePrice && window.fbq&& window.fbq) { // Track only when adding to wishlist
      window.fbq('track', 'AddToWishlist', {
        content_category: product.categoryName,
        content_ids: product.id,
        content_name: product.name,
        content_type: 'product_group',
        currency: 'INR',
        value: product.salePrice,
      });
    }
  };

  const handleTrackCart = () => {
    fbq('track', 'AddToCart', {
      content_name: product.name,
      content_ids: product.id,
      content_type: 'product_group',
      content_category: product.categoryName, // Add category
      value: product.salePrice,
      currency: 'INR',
      quantity: quantity // Make sure to pass a valid quantity
    });
  };
  
  


  return (
    <div className={`product-view w-full lg:flex justify-between ${className || ""}`}>
      <div data-aos="fade-right" className="lg:w-1/2 xl:mr-[70px] lg:mr-[50px]">
        <div className="w-full">
          <div className="w-full h-[600px] border border-qgray-border flex justify-center items-center overflow-hidden relative mb-3">
          <img src={`${src}`} alt="Product" className="object-contain" />
            <div className="w-[80px] h-[80px] rounded-full bg-qyellow text-qblack flex justify-center items-center text-xl font-medium absolute left-[30px] top-[30px]">
              <span>{product?.discount}%</span>
            </div>
          </div>
          <Slider {...settings}>

  {productImages.map((item) =>
    Object.keys(item)
      .filter((key) => key.startsWith("image"))
      .map((imageKey) => (
        <div
          onClick={() =>
            changeImgHandler(
              item[imageKey],
              product?.type !== "single"
                ? item.stock_info.filter(variant => variant.stock > 0).map(variant => variant.size)
                : [],
              item.color
            )
          }
          key={imageKey}
          className="w-[110px] h-[110px] p-[15px] border border-qgray-border cursor-pointer"
        >
          <img
            src={`${item[imageKey]}`}
            alt="Thumbnail"
            className={`w-full h-full object-contain ${src === item[imageKey] ? "opacity-50" : ""}`}
          />
        </div>
      ))
  )}
</Slider>


        </div>
      </div>
      <div className="lg:w-1/2">
        <div data-aos="fade-up" className="w-full mb-6">
          <div className="flex justify-between items-center mb-2">
            <div>
              <span className="text-qgray text-xs">{product?.sku}</span>
            </div>
            {/* <div className="flex">
              {[...Array(Math.floor(averageRating))].map((_, i) => (
                <Star key={i} color="primary" />
              ))}
              {averageRating % 1 !== 0 && <Star color="primary" half />}
            </div> */}
                        <div
                data-aos="fade-up"
                className="flex items-center mb-5"
              >
                  <div className="flex">
                  {[...Array(5)].map((_, index) => (
                    <Star
                      key={index}
                      className={
                        index < averageRating
                          ? "text-yellow-400"
                          : "text-gray-400"
                      }
                    />
                  ))}
                </div>
                <span className="text-qgray text-xs font-normal ml-2">
                  ({review.length} reviews)
                </span>
              </div>
          </div>
          <h1 className="text-xl font-bold text-qblack mb-2">{product?.name}</h1>
          <p className="text-qgray text-sm mb-4">
            {isReadMore ? product?.description?.slice(0, 100) : product?.short_description}
            {product?.description?.length > 100 && (
              <span onClick={toggleReadMore} className="text-blue-500 cursor-pointer">
                {isReadMore ? "...Read more" : " Show less"}
              </span>
            )}
          </p>

          <div className="flex items-center">
  {product?.price && (
    <span className="text-qgray line-through mr-2">
      ₹ {product.price}
    </span>
  )}
  <span className="text-qblack font-semibold text-xl">
    ₹ {product?.salePrice ? product.salePrice : ''}
  </span>
</div>

<div className="mb-4">
            <h4 className="text-base font-bold text-qblack mb-2">Color</h4>
            <div className="flex flex-wrap gap-2">
              {productImages.map((image) => (
                <button
                  key={image.id}
                  className={`px-4 py-2 rounded border ${selectedColor === image.color
                      ? "border-qblack text-qblack font-semibold"
                      : "border-qgray text-qblack"
                    }`}
                  onClick={() => handleColorChange(image.id)}
                >
                  {image.color}
                </button>
              ))}
            </div>
          </div>

<div className="flex items-center space-x-4 mb-4" >
  <button
    className="bg-gray-200 rounded-full p-2 hover:bg-gray-300 focus:outline-none transition duration-300 ease-in-out"
    onClick={decrementCounter}
    aria-label="Increase quantity"
  >
    <FaCircleMinus />
  </button>

  <span className="text-lg font-semibold text-gray-800">
    {quantity}
  </span>

  <button
    className="bg-gray-200 rounded-full p-2 hover:bg-gray-300 focus:outline-none transition duration-300 ease-in-out"
    onClick={incrementCounter}
    aria-label="Decrease quantity"
  >
    <FaCirclePlus />
  </button>
</div>



          {product?.type !== "single" && sizes.length > 0 && (
  <div className="mb-4">
    <FormControl fullWidth>
      <Select value={selectedSize} onChange={handleSizeChange}>
        {sizes.map((size) => (
          <MenuItem key={size} value={size}>
            {size}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  </div>
)}
          <div className="mb-4">

            <div className="mb-4">
            {isOutOfStock && <p style={{ color:"red",fontWeight:"bold",fontSize:"25px", padding:"20px 0px"}} className="out-of-stock-message">Out of stock.</p>}
            </div>

            <div className="mb-4">
  {stock !== undefined && stock < 10 && stock.length !== 0 && stock !== 0 &&(
    <p style={{ color: "green", fontWeight: "500", fontSize: "18px", padding: "10px 0px" }}>
      {`${stock}`} items Left
    </p>
  )}
</div>

<button
  className="w-full bg-qyellow text-qblack py-3 text-lg font-medium"
  onClick={handleCartClick}
  disabled = {isOutOfStock}
>
  Add to Cart
</button>

          </div>
          <div>
<button
  className={`w-full py-3 text-lg font-medium ${wishlist ? "bg-qgray text-qwhite" : "bg-qblack text-white"}`}
  onClick={handleButtonClick}
>
  {wishlist ? "Remove from Wishlist" : "Add to Wishlist"}
</button>

          </div>

    
       


<button
            onClick={handleShare}
            className="flex items-center space-x-2 text-qblack border border-qgray-border p-2 rounded-lg hover:bg-gray-100 transition duration-150 ease-in-out"
          >
            <FaShare className="text-lg" />
            <span>Share</span>
          </button>
        </div>
      </div>
      <ToastContainer/>
    </div>
  );
}