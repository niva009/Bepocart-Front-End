import React, { useState, useEffect } from "react";
import Star from "../Helpers/icons/Star";
import Selectbox from "../Helpers/Selectbox";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function ProductView({ className, reportHandler }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [product, setProduct] = useState(null);
  const [productImage, setProductImage] = useState([]);
  const [src, setSrc] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [wishlist, setWishlist] = useState(false);

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const productId = parseInt(id);
    fetchProduct(productId);
  }, [id]);

  const fetchProduct = async (productId) => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`http://127.0.0.1:8000/product/${productId}/`, {
        headers: { 'Authorization': `${token}` },
      });
      setProduct(response.data.product);
      setProductImage(response.data.images);
      if (response.data.images.length > 0) {
        setSrc(`http://127.0.0.1:8000${response.data.images[0].image1}`);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      if (error.response && (error.response.status === 401 || error.response.status === 403)) {
        navigate('/login');
      } else {
        setError("Error fetching product");
      }
    } finally {
      setLoading(false);
    }
  };

  const changeImgHandler = (current) => setSrc(`http://127.0.0.1:8000${current}`);

  const increment = () => setQuantity((prev) => prev + 1);

  const decrement = () => quantity > 1 && setQuantity((prev) => prev - 1);

  const handleSizeChange = (size) => setSelectedSize(size);

  const handleWishlistToggle = () => setWishlist((prevWishlist) => !prevWishlist);

  const filteredImages = selectedSize
    ? productImage.filter((img) => img.size.toString() === selectedSize)
    : productImage;

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className={`product-view w-full lg:flex justify-between ${className || ""}`}>
      <div data-aos="fade-right" className="lg:w-1/2 xl:mr-[70px] lg:mr-[50px]">
        <div className="w-full">
          <div className="w-full h-[600px] border border-qgray-border flex justify-center items-center overflow-hidden relative mb-3">
            <img src={src} alt="" className="object-contain" />
            <div className="w-[80px] h-[80px] rounded-full bg-qyellow text-qblack flex justify-center items-center text-xl font-medium absolute left-[30px] top-[30px]">
              <span>{product?.discount}%</span>
            </div>
          </div>
          <div className="flex gap-2 flex-wrap">
            {filteredImages.map((img) => (
              <div onClick={() => changeImgHandler(img.image1)} key={img.id} className="w-[110px] h-[110px] p-[15px] border border-qgray-border cursor-pointer">
                <img src={`http://127.0.0.1:8000${img.image1}`} alt="" className={`w-full h-full object-contain ${src !== `http://127.0.0.1:8000${img.image1}` ? "opacity-50" : ""}`} />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex-1">
        <div className="product-details w-full mt-10 lg:mt-0">
          {product && (
            <>
              <span data-aos="fade-up" className="text-qgray text-xs font-normal uppercase tracking-wider mb-2 inline-block">
                {product.categoryName}
              </span>
              <p data-aos="fade-up" className="text-xl font-medium text-qblack mb-4">{product.name}</p>
              <div data-aos="fade-up" className="flex space-x-[10px] items-center mb-6">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((index) => (
                    <Star key={index} />
                  ))}
                </div>
                <span className="text-[13px] font-normal text-qblack">6 Reviews</span>
              </div>
              <div data-aos="fade-up" className="flex space-x-2 items-center mb-7">
                <span className="text-sm font-500 text-qgray line-through mt-2">${product.price}</span>
                <span className="text-2xl font-500 text-qred">${product.salePrice}</span>
              </div>
              <p data-aos="fade-up" className="text-qgray text-sm text-normal mb-[30px] leading-7">{product.short_description}</p>
              <div data-aos="fade-up" className="colors mb-[30px]">
                <span className="text-sm font-normal uppercase text-qgray mb-[14px] inline-block">COLOR</span>
                <div className="flex space-x-4 items-center">
                  {productImage.map((img) => (
                    <div key={img.id}>
                      {img.color && img.color !== "" && (
                        <button onClick={() => changeImgHandler(img.image1)} type="button" style={{ "--tw-ring-color": `${img.color}` }} className="w-[20px] h-[20px] rounded-full focus:ring-2 ring-offset-2 flex justify-center items-center">
                          <span style={{ background: `${img.color}` }} className="w-[20px] h-[20px] block rounded-full border"></span>
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              <div data-aos="fade-up" className="product-size mb-[30px]">
                <span className="text-sm font-normal uppercase text-qgray mb-[14px] inline-block">SIZE</span>
                <div className="w-full">
                  <div className="border border-qgray-border h-[50px] flex justify-between items-center px-6 cursor-pointer">
                    <Selectbox className="w-full" datas={product.size ? product.size.map(size => size.toString()) : []} onChange={handleSizeChange}>
                      {({ item }) => (
                        <>
                          <div>
                            <span className="text-[13px] text-qblack">{item}</span>
                          </div>
                          <div className="flex space-x-10 items-center">
                            <span className="text-[13px] text-qblack">3”W x 3”D x 7”H</span>
                            <span>
                              <svg width="11" height="7" viewBox="0 0 11 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M5.4 6.8L0 1.4L1.4 0L5.4 4L9.4 0L10.8 1.4L5.4 6.8Z" fill="#222222" />
                              </svg>
                            </span>
                          </div>
                        </>
                      )}
                    </Selectbox>
                  </div>
                </div>
              </div>
              {/* <div data-aos="fade-up" className="quantity-card-wrapper w-full flex items-center h-[50px] space-x-[10px] mb-[30px]">
                <div className="w-[120px] h-full px-[26px] flex items-center border border-qgray-border">
                  <div className="flex justify-between items-center w-full">
                    <button onClick={decrement} type="button" className="text-base text-qgray">-</button>
                    <span className="text-qblack">{quantity}</span>
                    <button onClick={increment} type="button" className="text-base text-qgray">+</button>
                  </div>
                </div>
              </div> */}
              <div data-aos="fade-up" className="cart-btn w-full flex items-center mb-[30px]">
                <button className="w-full text-white bg-qyellow font-700 text-[13px] py-[17px] uppercase border border-qyellow hover:bg-white hover:text-qyellow transition duration-[200ms] rounded-[4px]" onClick={() => reportHandler(product, quantity)}>
                  Add to Cart
                </button>
              </div>
              <div data-aos="fade-up" className="wishlist-btn w-full flex items-center mb-[30px]">
                <button className="w-full text-white bg-qyellow font-700 text-[13px] py-[17px] uppercase border border-qyellow hover:bg-white hover:text-qyellow transition duration-[200ms] rounded-[4px]" onClick={handleWishlistToggle}>
                Add to Wishlist
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
