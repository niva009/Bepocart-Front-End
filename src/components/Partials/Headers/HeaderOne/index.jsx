import { Link } from "react-router-dom";
import ThinBag from "../../../Helpers/icons/ThinBag";
import Middlebar from "./Middlebar";
import Navbar from "./Navbar";
import Logo from '../../../../assets/bepocart.png';
import axios from "axios";
import { useState, useEffect } from "react";
import BepoCoin from './../../../../assets/bepocoin.png'



export default function HeaderOne({ className, drawerAction, type = 1 }) {


  const [wishlistTotal, setWishlistTotal] = useState(0);
  const[cartTotal, setCartTotal] = useState(0);
  const[coinCount, setCoinCount] = useState("");

  const token = localStorage.getItem("token")


  useEffect(() => {
    const fetchWishlistAndCart = async () => {
      setLoading(true);
      try {
        // Fetch Wishlist
        const wishlistResponse = await axios.get(`${import.meta.env.VITE_PUBLIC_URL}/wishlist/`, {
          headers: {
            'Authorization': `${token}`
          }
        });
        setWishlistTotal(wishlistResponse.data.data.length);
        
        // Fetch Cart Products
        const cartResponse = await axios.get(`${import.meta.env.VITE_PUBLIC_URL}/cart-products/`, {
          headers: { 'Authorization': `${token}` }
        });
        setCartTotal(cartResponse.data.data.length);
  
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error?.response?.data?.message || 'An error occurred while fetching the wishlist and cart');
      } finally {
        setLoading(false);
      }
    };
  
    fetchWishlistAndCart();
  }, [token]);

  useEffect(() =>{
    const token = localStorage.getItem("token");
    axios.get(`${import.meta.env.VITE_PUBLIC_URL}/coin/`,{

      headers:{
        'Authorization': `${token}`,
      }
    })
    .then((response) =>{
      setCoinCount(response.data.data)
    })
    .catch((error) =>{
      console.log(error,"error fetching coin");
    })
  },[])

  const totalAmount = Array.isArray(coinCount)? coinCount.reduce((sum,current) => sum+(current.amount || 0), 0):0;
  return (
    <header className={` ${className || ""} header-section-wrapper relative`}>
      <Middlebar
        type={type}
        className="quomodo-shop-middle-bar lg:block hidden"
      />
      <div className="quomodo-shop-drawer lg:hidden block w-full h-[60px] bg-white">
        <div className="w-full h-full flex justify-between items-center px-5">
          <div onClick={drawerAction}>
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
                d="M4 6h16M4 12h16M4 18h7"
              />
            </svg>
          </div>
          <div>
            {type === 3 ? (
              <Link to="/">
                <img
                  width="152"
                  height="36"
                  src={Logo}
                />
              </Link>
            ) : type === 4 ? (
              <Link to="/">
                <img
                  width="152"
                  height="36"
                  src={`${
                    import.meta.env.VITE_PUBLIC_URL
                  }/assets/images/logo-4.svg`}
                  alt="logo"
                />
              </Link>
            ) : (
              <Link to="/">
                <img
                  width="152"
                  height="36"
                  src={Logo}
                  alt="logo"
                />
              </Link>
            )}
          </div>
          <div className="compaire relative flex items-center">
            <Link to="/be-coin">
  <p style={{color:"#e0c031", fontWeight:'bold'}} className="mr-2">Becoin</p>
</Link>
  <img style={{ width: '50px', height: '50px'}} src={BepoCoin} alt="Coin" />
  <p className="mr-2">{totalAmount}</p>
</div>
      
          <div className="cart relative cursor-pointer">
            <Link to="/cart">
              <span>
                <ThinBag />
              </span>
            </Link>
            <span
              className={`w-[18px] h-[18px] rounded-full  absolute -top-2.5 -right-2.5 flex justify-center items-center text-[9px] ${
                type === 3 ? "bg-qh3-blue text-white" : "bg-blue text-qblack"
              }`}
            >
              {cartTotal}
            </span>
          </div>
        </div>
      </div>
      <Navbar type={type} className="quomodo-shop-nav-bar lg:block hidden" />
    </header>
  );
}
