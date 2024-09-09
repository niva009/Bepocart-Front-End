import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { RiLoginBoxLine } from "react-icons/ri";
import Cart from "../../../Cart";
import ThinBag from "../../../Helpers/icons/ThinBag";
import ThinLove from "../../../Helpers/icons/ThinLove";
import ThinPeople from "../../../Helpers/icons/ThinPeople";
import SearchBox from "../../../Helpers/SearchBox";
import Logo from '../../../../assets/bepocart.png';
import BepoCoin from '../../../../assets/bepocoin.png';

export default function Middlebar({ className, type ,}) {
  const [coinCount, setCoinCount] = useState([]);
  const [wishlistTotal, setWishlistTotal] = useState(0);
  const [wishlistItems, setWishlistItems] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const token = localStorage.getItem('token');

 

  const fetchWishlistAndCart = useCallback(async () => {
    setLoading(true);
    try {
      // Fetch Wishlist
      const wishlistResponse = await axios.get(`${import.meta.env.VITE_PUBLIC_URL}/wishlist/`, {
        headers: {
          'Authorization': `${token}`
        }
      });
      setWishlistItems(wishlistResponse.data); // Assuming response.data contains the array of wishlist items
      setWishlistTotal(wishlistResponse.data.data.length);

      // Fetch Cart Products
      const cartResponse = await axios.get(`${import.meta.env.VITE_PUBLIC_URL}/cart-products/`, {
        headers: { 'Authorization': `${token}` }
      });
      setCartTotal(cartResponse.data.data.length);

    } catch (error) {
      setError(error?.response?.data?.message || 'An error occurred while fetching the wishlist and cart');
    } finally {
      setLoading(false);
    }
  }, [token]);



  useEffect(() => {
    fetchWishlistAndCart();
  }, [fetchWishlistAndCart,cartTotal]);

  // Fetch coin count
  useEffect(() => {
    axios.get(`${import.meta.env.VITE_PUBLIC_URL}/coin/`, {
      headers: {
        'Authorization': `${token}`,
      }
    })
      .then((response) => {
        setCoinCount(response.data.data);
      })
      .catch((error) => {
        console.log(error, "error fetching coin");
      });
  }, [token]);

  const totalAmount = Array.isArray(coinCount) ? coinCount.reduce((sum, current) => sum + (current.amount || 0), 0) : 0;

  return (
    <div className={`w-full h-[86px] bg-white ${className}`}>
      <div className="container-x mx-auto h-full">
        <div className="relative h-full">
          <div className="flex justify-between items-center h-full">
            <div>
              <Link to="/">
                <img 
                  width="152"
                  height="36"
                  src={Logo}
                  alt="logo"
                
                />
              </Link>
            </div>
            <div className="w-[517px] h-[44px]">
              <SearchBox type={type} className="search-com" />
            </div>
            <div className="flex space-x-6 items-center">
              <div className="compaire relative flex items-center">
                <Link to="/be-coin">
                  <p style={{ color: "#e0c031", fontWeight: 'bold' }} className="mr-2">Becoin</p>
                </Link>
                <img style={{ width: '50px', height: '50px' }} src={BepoCoin} alt="Coin" />
                <p className="mr-2">{totalAmount}</p>
              </div>
              <div className="favorite relative">
                <Link to="/wishlist">
                  <span>
                    <ThinLove />
                  </span>
                </Link>
                <span
                  className={`w-[18px] h-[18px] rounded-full  absolute -top-2.5 -right-2.5 flex justify-center items-center text-[9px] ${type === 3 ? "bg-qh3-blue text-black" : "bg-qh3-blue"
                    }`}
                >
                  {wishlistTotal}
                </span>
              </div>
              <div className="cart-wrapper group relative py-4">
                <div className="cart relative cursor-pointer">
                  <Link to="/cart">
                    <span>
                      <ThinBag />
                    </span>
                  </Link>
                  <span
                    className={`w-[18px] h-[18px] rounded-full  absolute -top-2.5 -right-2.5 flex justify-center items-center text-[9px] ${type === 3 ? "bg-qh3-blue text-black" : "bg-qh3-blue"
                      }`}
                  >
                    {cartTotal}
                  </span>
                </div>
                <Cart
                  type={type}
                  className="absolute -right-[45px] top-11 z-50 hidden group-hover:block"
                  onUpdate={fetchWishlistAndCart} // Call fetchWishlistAndCart on update
                />
              </div>
              <div>
                <Link to="/profile">
                  <span>
                    <ThinPeople />
                  </span>
                </Link>
              </div>
              <div>
      {!token && (
        <Link to="/login">
          <span>
            <RiLoginBoxLine style={{ width: "50px", height: "22px" }} />
          </span>
        </Link>
      )}
    </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
