import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FormControl, Select, MenuItem, Rating } from "@mui/material";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import Star from "@mui/icons-material/Star";

export default function ProductView({ className }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [product, setProduct] = useState(null);
  const [productImages, setProductImages] = useState([]);
  const [src, setSrc] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [sizes, setSizes] = useState([]);
  const [variants, setVariants] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [wishlist, setWishlist] = useState(false);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedColorName, setSelectedColorName] = useState("");
  const [selectedColorCode, setSelectedColorCode] = useState("");
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showWishlistSuccessMessage, setShowWishlistSuccessMessage] = useState(false);
  const [errorWishlist, setErrorWishlist] = useState(null);
  const [isReadMore, setIsReadMore] = useState(true);
  const [review, setReview] = useState([]);


  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchProduct(id);
  }, [id]);

  useEffect(() => {
    console.log("productImages updated:", productImages);
  }, [productImages]);

  const fetchProduct = async (productId) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${import.meta.env.VITE_PUBLIC_URL}/product/${id}/`,
        {
          headers: { Authorization: `${token}` },
        }
      );

      setProduct(response.data.product);
      setProductImages(response.data.images);
      setVariants(response.data.variants);

      if (response.data.images.length > 0) {
        const initialImage = response.data.images[0];
        setSrc(`${import.meta.env.VITE_PUBLIC_URL}${initialImage.image1}`);
        const initialSizes = response.data.variants
          .filter(variant => variant.color === initialImage.id && variant.stock > 0)
          .map(variant => variant.size);
        setSizes(initialSizes);
        setSelectedSize(initialSizes[0]);
        setSelectedColor(initialImage.color);
        setSelectedColorCode(initialImage.colorCode);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      if (error.response && (error.response.status === 401 || error.response.status === 403)) {
        navigate("/login");
      } else {
        setError("Error fetching product");
      }
    } finally {
      setLoading(false);
    }
  };

  const productId = product?.id

  console.log("product id informationn :",productId);


  useEffect(() => {
    const fetchRating = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_PUBLIC_URL}/review/${productId}/`);
        console.log(response);
        setReview(response.data);
      } catch (error) {
        console.log("Error fetching review:", error);
      }
    };

    fetchRating();
  }, [productId]); 


  console.log("RATING IN BIG VIEW",review);

  const calculateAverageRating = () => {
    if (review.length === 0) return 0;

    const totalRating = review.reduce((sum, rateClass) => sum + rateClass.rating, 0);
    return totalRating / review.length;
  };

  const averageRating = calculateAverageRating();


  console.log("average rating",averageRating);

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
            headers: { Authorization: `${token}` },
          }
        );
        setShowSuccessMessage(true);
        console.log(response);
      } else {
        console.log("ID not found");
      }
    } catch (error) {
      console.log(error);
      if (error.response && (error.response.status === 401 || error.response.status === 403)) {
        navigate("/login");
      } else {
        setError("Error adding to cart");
      }
    }
  };

  const changeImgHandler = (current, sizes, color, colorCode) => {
    setSrc(`${import.meta.env.VITE_PUBLIC_URL}${current}`);
    setSizes(sizes);
    setSelectedSize(sizes[0]);
    setSelectedColor(color);
    setSelectedColorCode(colorCode);
  };

  const handleSizeChange = (event) => setSelectedSize(event.target.value);
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
        console.log(response.data);
        // Optionally update state or UI based on response
        setShowWishlistSuccessMessage(true);
      })
      .catch((error) => {
        console.error("Error adding to wishlist", error);
        setErrorWishlist(error?.response?.data?.message || "Error adding to wishlist")
  
      });
  };
  

  const toggleReadMore = () => {setIsReadMore(!isReadMore)};

  

  const handleColorChange = (colorId) => {
    const selectedImage = productImages.find(image => image.id === colorId);
    if (selectedImage) {
      setSrc(`${import.meta.env.VITE_PUBLIC_URL}${selectedImage.image1}`);
      const filteredVariants = variants.filter(variant => variant.color === colorId && variant.stock > 0);
      setSizes(filteredVariants.map(variant => variant.size));
      setSelectedSize(filteredVariants[0]?.size || "");
      setSelectedColor(selectedImage.color);
    }
  };
  
  

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

  return (
    <div className={`product-view w-full lg:flex justify-between ${className || ""}`}>
      <div data-aos="fade-right" className="lg:w-1/2 xl:mr-[70px] lg:mr-[50px]">
        <div className="w-full">
          <div className="w-full h-[600px] border border-qgray-border flex justify-center items-center overflow-hidden relative mb-3">
            <img src={src} alt="Product" className="object-contain" />
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
                        variants
                          .filter(variant => variant.color === item.id && variant.stock > 0)
                          .map(variant => variant.size),
                        item.color,
                        item.colorCode
                      )
                    }
                    key={imageKey}
                    className="w-[110px] h-[110px] p-[15px] border border-qgray-border cursor-pointer"
                  >
                    <img
                      src={`${import.meta.env.VITE_PUBLIC_URL}${item[imageKey]}`}
                      alt="Thumbnail"
                      className={`w-full h-full object-contain ${
                        src !==
                        `${import.meta.env.VITE_PUBLIC_URL}${item[imageKey]}`
                          ? "opacity-50"
                          : ""
                      }`}
                    />
                  </div>
                ))
            )}
          </Slider>
        </div>
      </div>

      <div className="flex-1">
        <div className="product-details w-full mt-10 lg:mt-0">
          {product && (
            <>
              <span
                data-aos="fade-up"
                className="text-qgray text-xs font-normal uppercase tracking-wider mb-2 inline-block"
              >
                {product.categoryName}
              </span>
              <h1
                data-aos="fade-up"
                className="text-xl font-medium text-qblack mb-4"
              >
                {product.name}
              </h1>
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

              <p
                data-aos="fade-up"
                className="text-qgray text-sm font-normal leading-7 mb-8"
              >
               {isReadMore ? product.description.slice(0, 100): product.description }
      {product.description.length > 100 &&
        <span onClick={toggleReadMore}>
          {isReadMore ? '...read more' : ' ...show less'}
        </span>
      }
              </p>

              <div data-aos="fade-up" className="flex flex-col gap-y-5 mb-6">
                <div className="flex items-center">
                  <span className="text-qblack font-semibold text-lg">
                    {product.currency} {product.salePrice} 
                  </span>
                  {product.original_price && (
                    <span className="text-qgray line-through ml-2">
                      {product.currency} {product.original_price}
                    </span>
                  )}
                </div>

                <div className="flex items-center">
  <span className="text-qblack text-sm font-medium mr-3">
    Color:
  </span>
  {productImages.map((image) => (
    <div
      key={image.id}
      className={`w-6 h-6 border border-qgray-border rounded-full ${
        selectedColor === image.color
          ? "ring-2 ring-qblack"
          : ""
      }`}
      style={{ backgroundColor: image.color }}
    >
      <span className="sr-only">{image.color}</span> {/* Optional: Include color name tooltip */}
    </div>
  ))}
</div>


                <div className="flex items-center">
                  <span className="text-qblack text-sm font-medium mr-3">
                    Size:
                  </span>
                  <FormControl variant="outlined" size="small">
                    <Select
                      value={selectedSize}
                      onChange={handleSizeChange}
                      displayEmpty
                    >
                      {sizes.map((size) => {
                        return (
                          <MenuItem
                            key={size}
                            value={size}
                            disabled={!variants.find(variant => variant.size === size && variant.stock > 0)}
                          >
                            {size}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                </div>

                <div className="flex items-center">
                  <span className="text-qblack text-sm font-medium mr-3">
                    Quantity:
                  </span>
                  <div className="flex items-center border border-qgray-border">
                    <button
                      className="px-3 py-1 text-qblack"
                      onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}
                    >
                      -
                    </button>
                    <span className="px-4 py-1 border-l border-r border-qgray-border">
                      {quantity}
                    </span>
                    <button
                      className="px-3 py-1 text-qblack"
                      onClick={() => setQuantity(quantity + 1)}
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-x-5 mt-6">
                  <button
                    onClick={AddToCart}
                    className="px-8 py-3 bg-qyellow text-qblack font-medium text-sm uppercase tracking-wider rounded-md"
                  >
                    Add to Cart
                  </button>
                  <button
                    onClick={handleWishlistToggle}
                    className="px-5 py-3 border border-qgray-border text-qblack font-medium text-sm uppercase tracking-wider rounded-md"
                  >
                    {wishlist ? "Remove from Wishlist" : "Add to Wishlist"}
                  </button>
                </div>

                {showSuccessMessage && (
                  <Stack sx={{ width: "100%" }} spacing={2}>
                    <Alert
                      severity="success"
                      onClose={() => setShowSuccessMessage(false)}
                    >
                      Item added to cart successfully!
                    </Alert>
                  </Stack>
                )}
              </div>
              {showWishlistSuccessMessage || errorWishlist && (
  <Stack sx={{ width: "100%" }} spacing={2}>
    <Alert 
      severity={errorWishlist ? "error" : "success"} 
      onClose={() => { 
        setShowWishlistSuccessMessage(false); 
        setErrorWishlist(null);
      }}
    >
      {errorWishlist ? errorWishlist : "Item added to Wishlist successfully!"}
    </Alert>
  </Stack>
)}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
