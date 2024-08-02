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

export default function ProductView({ className }) {
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

  const fetchProduct = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${import.meta.env.VITE_PUBLIC_URL}/product/${id}/`,
        {
          headers: { Authorization: `${token}` },
        }
      );
      const productData = response.data.product;
      setProduct(productData);
      setProductImages(response.data.images);
      setVariants(response.data.variants);
      setSrc(productData.image || ""); // Set initial image to product.image
      setSelectedColor(response.data.images[0]?.color || "");
      const initialSizes = response.data.variants
        .filter(variant => variant.color === response.data.images[0].id && variant.stock > 0)
        .map(variant => variant.size);
      setSizes(initialSizes);
      setSelectedSize(initialSizes[0]);
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

  const changeImgHandler = (current, sizes, color) => {
    setSrc(`${current}`);
    setSizes(sizes);
    setSelectedSize(sizes[0]);
    setSelectedColor(color);
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
        setShowWishlistSuccessMessage(true);
      })
      .catch((error) => {
        console.error("Error adding to wishlist", error);
        setErrorWishlist(error?.response?.data?.message || "Error adding to wishlist")
      });
  };

  const toggleReadMore = () => {
    setIsReadMore(!isReadMore)
  };

  const handleColorChange = (colorId) => {
    const selectedImage = productImages.find(image => image.id === colorId);
    if (selectedImage) {
      setSrc(selectedImage.image1);
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
                        item.color
                      )
                    }
                    key={imageKey}
                    className="w-[110px] h-[110px] p-[15px] border border-qgray-border cursor-pointer"
                  >
                    <img
                      src={`${import.meta.env.VITE_PUBLIC_URL}/${item[imageKey]}`}
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
            {isReadMore ? product?.description?.slice(0, 100) : product?.description}
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
            <div className="flex space-x-2">
              {productImages.map((image) => (
                <div
                  key={image.id}
                  className={`w-6 h-6 rounded-full cursor-pointer ${selectedColor === image.color ? "border border-qblack" : ""
                    }`}
                  onClick={() => handleColorChange(image.id)}
                  style={{ backgroundColor: image.color }}
                >
                </div>
              ))}
            </div>
          </div>
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
          <div className="mb-4">
            <h4 className="text-base font-bold text-qblack mb-2">Quantity</h4>
            <div className="flex items-center space-x-4">
              <button
                className="w-8 h-8 border border-qgray text-qblack flex justify-center items-center"
                onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}
              >
                -
              </button>
              <span>{quantity}</span>
              <button
                className="w-8 h-8 border border-qgray text-qblack flex justify-center items-center"
                onClick={() => setQuantity(quantity + 1)}
              >
                +
              </button>
            </div>
          </div>
          <div className="mb-4">
            <button
              className="w-full bg-qyellow text-qblack py-3 text-lg font-medium"
              onClick={AddToCart}
            >
              Add to Cart
            </button>
          </div>
          <div>
<button
  className={`w-full py-3 text-lg font-medium ${wishlist ? "bg-qgray text-qwhite" : "bg-qblack text-white"}`}
  onClick={handleWishlistToggle}
>
  {wishlist ? "Remove from Wishlist" : "Add to Wishlist"}
</button>


          </div>
          {showSuccessMessage && (
            <Stack sx={{ width: "100%" }} spacing={2}>
              <Alert severity="success">Product added to cart successfully!</Alert>
            </Stack>
          )}
          {showWishlistSuccessMessage && (
            <Stack sx={{ width: "100%" }} spacing={2}>
              <Alert severity="success">Product added to wishlist successfully!</Alert>
            </Stack>
          )}
          {errorWishlist && (
            <Stack sx={{ width: "100%" }} spacing={2}>
              <Alert severity="error">{errorWishlist}</Alert>
            </Stack>
          )}
        </div>
      </div>
    </div>
  );
}
