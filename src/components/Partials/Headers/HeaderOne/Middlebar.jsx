import Cart from "../../../Cart";
import Compair from "../../../Helpers/icons/Compair";
import ThinBag from "../../../Helpers/icons/ThinBag";
import ThinLove from "../../../Helpers/icons/ThinLove";
import ThinPeople from "../../../Helpers/icons/ThinPeople";
import SearchBox from "../../../Helpers/SearchBox";
import { Link } from "react-router-dom";
import Logo from '../../../../assets/bepocart.png';
import BepoCoin from '../../../../assets/bepocoin.png'
import { useEffect, useState } from "react";
import axios from "axios";
export default function Middlebar({ className, type }) {

const[coinCount, setCoinCount] =useState([]);
const [wishlistTotal, setWishlistTotal] = useState(0);
const [wishlistItems, setWishlistItems] = useState([]);
const [cartTotal, setCartTotal] = useState(0)
const [loading, setLoading] = useState(false);
const [error, setError] = useState(null);


const token = localStorage.getItem('token');

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
        setWishlistItems(wishlistResponse.data); // Assuming response.data contains the array of wishlist items
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
  

  console.log(wishlistTotal,"wishlist toatal products")
  console.log(wishlistItems,"wishlist-items");
  console.log(cartTotal,"cart total length");


  const totalAmount = Array.isArray(coinCount)? coinCount.reduce((sum,current) => sum+(current.amount || 0), 0):0;

  console.log(totalAmount);

  console.log("coin count is:...",coinCount)
  return (
    <div className={`w-full h-[86px] bg-white ${className}`}>
      <div className="container-x mx-auto h-full">
        <div className="relative h-full">
          <div className="flex justify-between items-center h-full">
            <div>
              {type === 3 ? (
                <Link to="/">
                  <img
                    width="152"
                    height="36"
                    src={Logo}
                    alt="logo"
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
            <div className="w-[517px] h-[44px]">
              <SearchBox type={type} className="search-com" />
            </div>
            <div className="flex space-x-6 items-center">
            <div className="compaire relative flex items-center">
            <Link to="/be-coin">
  <p style={{color:"#e0c031", fontWeight:'bold'}} className="mr-2">Becoin</p>
</Link>
  <img style={{ width: '50px', height: '50px'}} src={BepoCoin} alt="Coin" />
  <p className="mr-2">{totalAmount}</p>
</div>
              <div className="favorite relative">
                <Link to="/wishlist">
                  <span>
                    <ThinLove />
                  </span>
                </Link>
                <span
                  className={`w-[18px] h-[18px] rounded-full  absolute -top-2.5 -right-2.5 flex justify-center items-center text-[9px] ${
                    type === 3 ? "bg-qh3-blue text-white" : "bg-qh3-blue"
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
                    className={`w-[18px] h-[18px] rounded-full  absolute -top-2.5 -right-2.5 flex justify-center items-center text-[9px] ${
                      type === 3 ? "bg-qh3-blue text-white" : "bg-qh3-blue"
                    }`}
                  >
                    {cartTotal}
                  </span>
                </div>
                {/* <div className="fixed left-0 top-0 w-full h-full z-40"></div> */}
                {/* hidden group-hover:block" */}
                <Cart
                  type={type}
                  className="absolute -right-[45px] top-11 z-50 hidden group-hover:block"
                />
              </div>
              <div>
                <Link to="/profile">
                  <span>
                    <ThinPeople />
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
