import { useState, useEffect } from "react";
import Compair from "../../Helpers/icons/Compair";
import ThinLove from "../../Helpers/icons/ThinLove";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import BepoCoin from '../../../assets/bepocoin.png'
import { GiUnderwearShorts } from "react-icons/gi";
import { GiBasketballJersey } from "react-icons/gi";
import { IoGlasses } from "react-icons/io5";
import { PiBeerBottleFill } from "react-icons/pi";
import { GiCycling } from "react-icons/gi";
import { FaPrescriptionBottle } from "react-icons/fa6";

export default function Drawer({ className, open, action }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const[coinCount, setCoinCount] =useState([]);
  const [tab, setTab] = useState("category");
  const[ brands, setBrands] =useState([]);
  const navigate = useNavigate();



  useEffect(() => {
    axios.get(`${import.meta.env.VITE_PUBLIC_URL}/subcategorys/`)
      .then(response => {
        setBrands(response.data.data);
      })
      .catch(error => {
        console.error("There was an error fetching the brands!", error);
      });
  }, []);


  console.log("subcategory information.....:",brands);




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

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };


  const handleSearch = (event) => {
    event.preventDefault();
    axios
      .get(`${import.meta.env.VITE_PUBLIC_URL}/search-products/?q=${searchQuery}`)
      .then((response) => {
        navigate('/all-products', { state: { searchResult: response.data } });
        setErrorMessage(null); // Clear any previous error message
      })
      .catch((error) => {
        const message = error?.response?.data?.message || 'An error occurred while fetching search results';
        setErrorMessage(message);
        setTimeout(() => {
          setErrorMessage(null); // Clear error message after 3 seconds
        }, 3000);
      });
  };

  return (
    <>
      <div
        className={`drawer-wrapper w-full block lg:hidden  h-full relative  ${
          className || ""
        }`}
      >
        {open && (
          <div
            onClick={action}
            className="w-full h-screen bg-black bg-opacity-40 z-40 left-0 top-0 fixed"
          ></div>
        )}
        <div
          className={`w-[280px] transition-all duration-300 ease-in-out h-screen overflow-y-auto overflow-x-hidden overflow-style-none bg-white fixed top-0 z-50 ${
            open ? "left-0" : "-left-[280px]"
          }`}
        >
          <div className="w-full px-5 mt-5 mb-4">
            <div className="flex justify-between items-center">
              <div className="flex space-x-5 items-center">
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
                  <span className="w-[18px] h-[18px] text-white rounded-full bg-qh3-blue absolute -top-2.5 -right-2.5 flex justify-center items-center text-[9px]">
                    1
                  </span>
                </div>
              </div>
              <button onClick={action} type="button">
                <svg
                  width="34"
                  height="34"
                  viewBox="0 0 34 34"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M17.0363 33.9994C7.66923 34.031 0.0436412 26.4423 0.000545718 17.0452C-0.0425497 7.68436 7.54917 0.0479251 16.9447 0.00021656C26.3072 -0.0467224 33.9505 7.54277 33.9998 16.9352C34.0483 26.3153 26.4411 33.9679 17.0363 33.9994Z"
                    fill="black"
                  />
                  <path
                    d="M17.0363 33.9994C26.4411 33.9679 34.0483 26.3153 33.9998 16.9352C33.9505 7.54277 26.3072 -0.0467224 16.9447 0.00021656C7.54917 0.0479251 -0.0425497 7.68436 0.000545718 17.0452C0.0436412 26.4423 7.66846 34.031 17.0363 33.9994ZM23.4629 21.5945C23.4514 21.8445 23.3321 22.0908 23.1305 22.3039C22.7865 22.6671 22.4479 23.0342 22.1039 23.3966C21.5236 24.0084 21.1458 24.0068 20.5648 23.3889C19.4581 22.2124 18.3492 21.0389 17.2533 19.8523C17.0633 19.6461 16.9686 19.6169 16.7608 19.8431C15.6511 21.0512 14.5222 22.2424 13.3978 23.4366C12.8753 23.9914 12.4697 23.9891 11.9388 23.4312C11.6032 23.0788 11.2715 22.7218 10.9399 22.3647C10.4089 21.7938 10.4081 21.3575 10.9376 20.7927C12.0503 19.6046 13.1593 18.4126 14.2836 17.2361C14.4822 17.0283 14.5037 16.9152 14.2921 16.6943C13.1654 15.5193 12.058 14.3266 10.9452 13.1385C10.4004 12.556 10.4042 12.1259 10.9545 11.5387C11.2785 11.1925 11.6009 10.8447 11.9272 10.5007C12.4821 9.91666 12.8822 9.92358 13.4417 10.5192C14.5468 11.6965 15.6588 12.8677 16.7516 14.0573C16.9671 14.2912 17.071 14.2651 17.271 14.0473C18.3831 12.8415 19.5082 11.6472 20.6363 10.4561C21.1273 9.93743 21.5521 9.94359 22.0469 10.4576C22.3848 10.8085 22.7157 11.1655 23.0474 11.5226C23.6115 12.1289 23.6122 12.5552 23.052 13.1539C21.9477 14.3328 20.8503 15.517 19.7321 16.6828C19.5058 16.9183 19.5382 17.0391 19.7475 17.2584C20.8641 18.4249 21.9623 19.6092 23.0681 20.7865C23.2721 21.002 23.456 21.229 23.4629 21.5945Z"
                    fill="#FE4949"
                  />
                  <path
                    d="M23.4614 21.5947C23.4545 21.2292 23.2706 21.0022 23.0659 20.7844C21.9608 19.6071 20.8619 18.4228 19.7452 17.2563C19.5359 17.0377 19.5036 16.9169 19.7298 16.6807C20.848 15.5157 21.9454 14.3307 23.0497 13.1518C23.61 12.5539 23.6084 12.1276 23.0451 11.5205C22.7134 11.1635 22.3825 10.8064 22.0447 10.4555C21.5498 9.9415 21.125 9.93611 20.6341 10.454C19.5059 11.6452 18.3808 12.8394 17.2688 14.0452C17.0679 14.263 16.964 14.2891 16.7493 14.0552C15.6565 12.8663 14.5445 11.6952 13.4394 10.5171C12.88 9.92149 12.4798 9.91456 11.9249 10.4986C11.5979 10.8426 11.2762 11.1904 10.9522 11.5367C10.402 12.1238 10.3981 12.5547 10.943 13.1364C12.0558 14.3245 13.1632 15.5172 14.2898 16.6922C14.5014 16.9131 14.4799 17.0254 14.2813 17.234C13.157 18.4113 12.0481 19.6025 10.9353 20.7906C10.4058 21.3561 10.4074 21.7917 10.9376 22.3626C11.2693 22.7197 11.601 23.076 11.9365 23.4291C12.4675 23.987 12.873 23.9893 13.3956 23.4345C14.5207 22.2403 15.6488 21.0491 16.7586 19.841C16.9671 19.614 17.061 19.644 17.2511 19.8502C18.3469 21.0368 19.4559 22.2103 20.5625 23.3868C21.1435 24.0047 21.5214 24.0063 22.1016 23.3945C22.4456 23.0321 22.7842 22.6643 23.1282 22.3018C23.3306 22.091 23.4507 21.8448 23.4614 21.5947Z"
                    fill="white"
                  />
                </svg>
              </button>
            </div>
          </div>
          <div className="w-full mt-5 px-5">
          <div className="search-bar w-full h-[34px] flex">
          <div className="search-bar w-full h-[34px] flex">
  <div className="flex-1 bg-white h-full border border-r-0 border-[#E9E9E9]">
    <form onSubmit={handleSearch} className="h-full flex">
      <input
        type="text"
        className={`search-input ${errorMessage ? 'border-red-600' : ''} flex-1`}
        placeholder={errorMessage || "Search Product..."}
        value={searchQuery}
        onChange={handleInputChange}
        style={{ borderColor: errorMessage ? 'red' : 'inherit' }}
      />
      <button type="submit" className="w-[34px] h-[34px] bg-qh3-blue flex justify-center items-center">
        <svg
          width="23"
          height="23"
          viewBox="0 0 23 23"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 8.83158C0.0484783 8.43809 0.0969566 8.04461 0.169674 7.67571C0.484783 5.92962 1.2362 4.42946 2.39968 3.12604C3.75707 1.60128 5.45381 0.592971 7.44142 0.199486C9.76838 -0.267779 11.9741 0.0765214 14.0345 1.33076C16.3614 2.75714 17.84 4.82294 18.3975 7.50356C18.8823 9.7907 18.5187 11.9795 17.4037 14.0453C17.1856 14.4388 17.1856 14.4388 17.5007 14.7585C19.1247 16.4062 20.7487 18.0539 22.3727 19.7016C22.906 20.2427 23.1242 20.8575 22.9302 21.5953C22.5667 22.9971 20.8457 23.5135 19.7549 22.3822C18.8338 21.4231 17.9127 20.5132 16.9674 19.5541C16.216 18.7917 15.4888 18.0539 14.7374 17.2915C14.6889 17.2423 14.6404 17.1932 14.6162 17.1686C14.0345 17.4637 13.5012 17.808 12.9195 18.0539C10.4228 19.1114 7.90196 19.0868 5.42957 17.9555C3.56316 17.0948 2.15728 15.7422 1.16348 13.9469C0.533261 12.791 0.145435 11.5614 0.0484783 10.2334C0.0484783 10.1596 0.0242392 10.0858 0 10.012C0 9.64314 0 9.22507 0 8.83158ZM3.00566 9.4464C3.00566 12.9632 5.84164 15.816 9.30784 15.816C12.774 15.7914 15.5615 12.9632 15.5858 9.4464C15.5858 5.95422 12.7498 3.07685 9.30784 3.07685C5.8174 3.07685 3.00566 5.92962 3.00566 9.4464Z"
            fill="#fff"
          />
        </svg>
      </button>
    </form>
  </div>
</div>

</div>

          </div>
          <div className="w-full mt-5 px-5 flex items-center space-x-3">
            <span
              onClick={() => setTab("category")}
              className={`text-base font-semibold  ${
                tab === "category" ? "text-qblack" : "text-qgray"
              }`}
            >
              Categories
            </span>
            <span className="w-[1px] h-[14px] bg-qgray"></span>
            <span
              onClick={() => setTab("menu")}
              className={`text-base font-semibold ${
                tab === "menu" ? "text-qblack" : "text-qgray "
              }`}
            >
              Main Menu
            </span>
          </div>
          {tab === "category" ? (
            <div className="category-item mt-5 w-full">
              <ul className="categories-list">
                <li className="category-item">
                  <Link to="/category/SHORTS/">
                    <div className=" flex justify-between items-center px-5 h-12 bg-white hover:bg-qh3-blue transition-all duration-300 ease-in-out cursor-pointer">
                      <div className="flex items-center space-x-6">
                      <GiUnderwearShorts />
                        <span className="text-sm font-400">
                          SHORTS
                        </span>
                      </div>
                      <div>
                        <span>
                          <svg
                            width="6"
                            height="9"
                            viewBox="0 0 6 9"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <rect
                              x="1.49805"
                              y="0.818359"
                              width="5.78538"
                              height="1.28564"
                              transform="rotate(45 1.49805 0.818359)"
                              fill="#1D1D1D"
                            />
                            <rect
                              x="5.58984"
                              y="4.90918"
                              width="5.78538"
                              height="1.28564"
                              transform="rotate(135 5.58984 4.90918)"
                              fill="#1D1D1D"
                            />
                          </svg>
                        </span>
                      </div>
                    </div>
                  </Link>
                </li>
                <li className="category-item">
                  <Link to="/category/JERSAY/">
                    <div className="flex justify-between items-center px-5 h-12 bg-white hover:bg-qh3-blue transition-all duration-300 ease-in-out cursor-pointer">
                      <div className="flex items-center space-x-6">
                      <GiBasketballJersey />
                        <span className="text-sm font-400">
                          JERSEY
                        </span>
                      </div>
                      <div>
                        <span>
                          <svg
                            width="6"
                            height="9"
                            viewBox="0 0 6 9"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <rect
                              x="1.49805"
                              y="0.818359"
                              width="5.78538"
                              height="1.28564"
                              transform="rotate(45 1.49805 0.818359)"
                              fill="#1D1D1D"
                            />
                            <rect
                              x="5.58984"
                              y="4.90918"
                              width="5.78538"
                              height="1.28564"
                              transform="rotate(135 5.58984 4.90918)"
                              fill="#1D1D1D"
                            />
                          </svg>
                        </span>
                      </div>
                    </div>
                  </Link>
                </li>
                <li className="category-item">
                  <Link to="/category/EYE-WEAR/">
                    <div className=" flex justify-between items-center px-5 h-12 bg-white hover:bg-qh3-blue transition-all duration-300 ease-in-out cursor-pointer">
                      <div className="flex items-center space-x-6">
                      <IoGlasses />
                        <span className="text-sm font-400">EYE WEAR</span>
                      </div>
                      <div>
                        <span>
                          <svg
                            width="6"
                            height="9"
                            viewBox="0 0 6 9"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <rect
                              x="1.49805"
                              y="0.818359"
                              width="5.78538"
                              height="1.28564"
                              transform="rotate(45 1.49805 0.818359)"
                              fill="#1D1D1D"
                            />
                            <rect
                              x="5.58984"
                              y="4.90918"
                              width="5.78538"
                              height="1.28564"
                              transform="rotate(135 5.58984 4.90918)"
                              fill="#1D1D1D"
                            />
                          </svg>
                        </span>
                      </div>
                    </div>
                  </Link>
                </li>
                <li className="category-item">
                  <Link to="/category/BOTTLE-CAGE/">
                    <div className="flex justify-between items-center px-5 h-12 bg-white hover:bg-qh3-blue transition-all duration-300 ease-in-out cursor-pointer">
                      <div className="flex items-center space-x-6">
                      <PiBeerBottleFill />
                        <span className="text-sm font-400">BOTTLE CAGES</span>
                      </div>
                      <div>
                        <span>
                          <svg
                            width="6"
                            height="9"
                            viewBox="0 0 6 9"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <rect
                              x="1.49805"
                              y="0.818359"
                              width="5.78538"
                              height="1.28564"
                              transform="rotate(45 1.49805 0.818359)"
                              fill="#1D1D1D"
                            />
                            <rect
                              x="5.58984"
                              y="4.90918"
                              width="5.78538"
                              height="1.28564"
                              transform="rotate(135 5.58984 4.90918)"
                              fill="#1D1D1D"
                            />
                          </svg>
                        </span>
                      </div>
                    </div>
                  </Link>
                </li>
                <li className="category-item">
                  <Link to="/category/GRIPS-AND-TAPES/">
                    <div className=" flex justify-between items-center px-5 h-12 bg-white hover:bg-qh3-blue transition-all duration-300 ease-in-out cursor-pointer">
                      <div className="flex items-center space-x-6">
                      <GiCycling />
                        <span className="text-sm font-400">GRIP & BAR TAPES</span>
                      </div>
                      <div>
                        <span>
                          <svg
                            width="6"
                            height="9"
                            viewBox="0 0 6 9"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <rect
                              x="1.49805"
                              y="0.818359"
                              width="5.78538"
                              height="1.28564"
                              transform="rotate(45 1.49805 0.818359)"
                              fill="#1D1D1D"
                            />
                            <rect
                              x="5.58984"
                              y="4.90918"
                              width="5.78538"
                              height="1.28564"
                              transform="rotate(135 5.58984 4.90918)"
                              fill="#1D1D1D"
                            />
                          </svg>
                        </span>
                      </div>
                    </div>
                  </Link>
                </li>
                <li className="category-item">
                  <Link to="/category/BOTTLE">
                    <div className="flex justify-between items-center px-5 h-12 bg-white hover:bg-qh3-blue transition-all duration-300 ease-in-out cursor-pointer">
                      <div className="flex items-center space-x-6">
                      <FaPrescriptionBottle />
                        <span className="text-sm font-400">BOTTLE</span>
                      </div>
                      <div>
                        <span>
                          <svg
                            width="6"
                            height="9"
                            viewBox="0 0 6 9"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <rect
                              x="1.49805"
                              y="0.818359"
                              width="5.78538"
                              height="1.28564"
                              transform="rotate(45 1.49805 0.818359)"
                              fill="#1D1D1D"
                            />
                            <rect
                              x="5.58984"
                              y="4.90918"
                              width="5.78538"
                              height="1.28564"
                              transform="rotate(135 5.58984 4.90918)"
                              fill="#1D1D1D"
                            />
                          </svg>
                        </span>
                      </div>
                    </div>
                  </Link>
                </li>
                {/* <li className="category-item ">
                  <Link to="/all-products">
                    <div className="flex justify-between items-center px-5 h-12 bg-white hover:bg-qh3-blue transition-all duration-300 ease-in-out cursor-pointer">
                      <div className="flex items-center space-x-6">
                        <span>
                          <svg
                            width="17"
                            height="21"
                            viewBox="0 0 17 21"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M5.7357 0.911472C5.55227 1.03555 5.50911 1.2028 5.56306 1.56425C5.62241 1.99045 5.80583 2.40585 6.09176 2.75652C6.42624 3.16653 6.53414 3.43088 6.53414 3.84629C6.53414 4.2509 6.43164 4.50986 6.10794 4.93605C5.55767 5.66436 5.36345 6.6732 5.72491 6.86742C5.88136 6.95374 6.07558 6.93216 6.22124 6.81347C6.32913 6.73255 6.3669 6.63544 6.39927 6.39806C6.44782 5.98805 6.52335 5.82621 6.84165 5.43238C7.64549 4.44512 7.64009 3.33917 6.83086 2.30875C6.52875 1.92571 6.44782 1.74228 6.39927 1.34306C6.3669 1.11108 6.32913 1.01398 6.22124 0.933052C6.05939 0.803575 5.89754 0.79818 5.7357 0.911472Z"
                              fill="black"
                            />
                            <path
                              d="M3.27421 2.66498C3.02605 2.8592 3.09079 3.43645 3.41448 3.92199C3.51159 4.06765 3.63567 4.25108 3.68422 4.32661C3.82988 4.53701 3.8083 4.92004 3.64646 5.14663C3.34434 5.56743 3.17171 5.97204 3.14473 6.3335C3.12315 6.66798 3.12855 6.69496 3.26882 6.80285C3.57093 7.04023 3.90541 6.89996 3.97015 6.50614C4.01331 6.24718 4.10502 6.04757 4.34779 5.71309C4.82254 5.05491 4.78478 4.27266 4.23989 3.60909C4.11042 3.44724 4.03489 3.28539 3.99713 3.08578C3.91081 2.60564 3.58711 2.41682 3.27421 2.66498Z"
                              fill="black"
                            />
                            <path
                              d="M8.4539 2.66498C8.20573 2.8592 8.27047 3.43645 8.59417 3.92199C8.69127 4.06765 8.81536 4.25108 8.86391 4.32661C9.00957 4.53701 8.98799 4.92004 8.82615 5.14663C8.52403 5.56743 8.3514 5.97204 8.32442 6.3335C8.30284 6.66798 8.30824 6.69496 8.4485 6.80285C8.75062 7.04023 9.0851 6.89996 9.14984 6.50614C9.193 6.24718 9.28471 6.04757 9.52748 5.71309C10.0022 5.05491 9.96447 4.27266 9.41958 3.60909C9.29011 3.44724 9.21458 3.28539 9.17681 3.08578C9.09049 2.60564 8.7668 2.41682 8.4539 2.66498Z"
                              fill="black"
                            />
                            <path
                              d="M0.134872 7.91994L0 8.05481L0.0161846 11.3349C0.0377642 14.5287 0.0377642 14.6204 0.156451 15.0358C0.636596 16.7514 1.97453 18.0515 3.67391 18.4507C4.02997 18.5371 4.36985 18.5479 6.47925 18.5479C8.58865 18.5479 8.92852 18.5371 9.28459 18.4507C10.984 18.0515 12.3381 16.7406 12.7967 15.0358C12.8992 14.6689 12.9207 14.4262 12.9423 13.2771L12.9639 11.9445L12.8236 11.8096C12.6618 11.6424 12.4244 11.6262 12.2464 11.7719C12.1169 11.8744 12.1169 11.8906 12.0845 13.2177C12.0576 14.4046 12.036 14.5988 11.9335 14.9333C11.7069 15.6238 11.4587 16.0284 10.9354 16.5571C10.3959 17.0912 9.99132 17.3394 9.28459 17.5606C8.88537 17.6847 8.8476 17.6847 6.47925 17.6847C4.1109 17.6847 4.07313 17.6847 3.67391 17.5606C2.96718 17.3394 2.56257 17.0912 2.02308 16.5571C1.49978 16.0284 1.25701 15.6346 1.02503 14.9333C0.900945 14.561 0.900945 14.5233 0.879365 11.5992L0.863181 8.64825H6.47385H12.0899V9.15537C12.0899 9.94302 12.0252 9.91065 13.5034 9.94302L14.7064 9.96999L15.0463 10.1534C15.424 10.3584 15.5912 10.5311 15.8016 10.9357C15.9203 11.1677 15.9419 11.2809 15.9419 11.6694C15.9419 12.0632 15.9203 12.1657 15.7962 12.4085C15.5103 12.9642 15.0032 13.3148 14.3989 13.3796C14.1508 13.4065 14.0321 13.4443 13.9404 13.536C13.676 13.8058 13.881 14.2589 14.2641 14.2589C14.906 14.2589 15.5696 13.973 16.0606 13.4821C17.0856 12.457 17.0856 10.8817 16.0659 9.86749C15.4509 9.24708 14.9546 9.07984 13.7515 9.07984H12.9531V8.56733C12.9531 8.09258 12.9423 8.03863 12.8182 7.91994L12.6888 7.78507H6.47925H0.269744L0.134872 7.91994Z"
                              fill="black"
                            />
                            <path
                              d="M12.2247 10.509C12.1384 10.5899 12.0898 10.7032 12.0898 10.8057C12.0898 10.9082 12.1384 11.0215 12.2247 11.1024C12.3056 11.1888 12.4189 11.2373 12.5214 11.2373C12.6239 11.2373 12.7372 11.1888 12.8182 11.1024C12.9045 11.0215 12.953 10.9082 12.953 10.8057C12.953 10.7032 12.9045 10.5899 12.8182 10.509C12.7372 10.4227 12.6239 10.3741 12.5214 10.3741C12.4189 10.3741 12.3056 10.4227 12.2247 10.509Z"
                              fill="black"
                            />
                            <path
                              d="M0.140731 20.0041C0.0544133 20.085 0.00585938 20.1983 0.00585938 20.3008C0.00585938 20.4033 0.0544133 20.5166 0.140731 20.5975L0.270208 20.7324H6.47971H12.6892L12.8187 20.5975C12.905 20.5166 12.9536 20.4033 12.9536 20.3008C12.9536 20.1983 12.905 20.085 12.8187 20.0041L12.6892 19.8692H6.47971H0.270208L0.140731 20.0041Z"
                              fill="black"
                            />
                          </svg>
                        </span>
                        <span className="text-sm font-400">BIKE LIGHTER</span>
                      </div>
                      <div>
                        <span>
                          <svg
                            width="6"
                            height="9"
                            viewBox="0 0 6 9"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <rect
                              x="1.49805"
                              y="0.818359"
                              width="5.78538"
                              height="1.28564"
                              transform="rotate(45 1.49805 0.818359)"
                              fill="#1D1D1D"
                            />
                            <rect
                              x="5.58984"
                              y="4.90918"
                              width="5.78538"
                              height="1.28564"
                              transform="rotate(135 5.58984 4.90918)"
                              fill="#1D1D1D"
                            />
                          </svg>
                        </span>
                      </div>
                    </div>
                  </Link>
                </li> */}
                {/* <li className="category-item">
                  <Link to="/all-products">
                    <div className=" flex justify-between items-center px-5 h-12 bg-white hover:bg-qh3-blue transition-all duration-300 ease-in-out cursor-pointer">
                      <div className="flex items-center space-x-6">
                        <span>
                          <svg
                            width="16"
                            height="18"
                            viewBox="0 0 16 18"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M4.57965 0.592365L4.00601 1.15652L3.72156 1.18971C1.85841 1.41253 0.34134 2.87271 0.0474084 4.72164C0.0189634 4.90179 0 6.00166 0 7.34332V9.65685L0.118521 9.77063L0.232301 9.88915H1.32744H2.42257L2.53635 9.77063C2.6928 9.61892 2.6928 9.40084 2.53635 9.24914C2.42257 9.13062 2.40835 9.13062 1.58818 9.13062H0.753793L0.768016 6.9119L0.786979 4.69793L0.9055 4.33289C1.10462 3.74976 1.3464 3.36576 1.79678 2.92012C2.3562 2.36544 2.98199 2.05254 3.74052 1.94825L3.99179 1.91506L5.3287 3.24724C6.89792 4.80697 6.78414 4.75008 7.27719 4.29022L7.58534 4.00103V5.11987V6.24345L7.70386 6.35723C7.77498 6.43308 7.87453 6.47575 7.96461 6.47575C8.05469 6.47575 8.15424 6.43308 8.22536 6.35723L8.34388 6.24345V5.02979V3.82088L8.85115 4.20014C9.42005 4.63156 9.52909 4.66001 9.77561 4.44193C9.86095 4.36607 10.3824 3.77821 10.9276 3.1382C11.8142 2.10469 11.9374 1.97669 12.0654 1.97669C12.3688 1.97195 12.8903 2.11892 13.317 2.33225C13.6915 2.51715 13.8338 2.62144 14.1704 2.96278C14.6207 3.41316 14.8341 3.74028 15.0048 4.23333C15.1944 4.78327 15.2181 5.0772 15.2181 7.17265V9.17803H14.3742C13.5493 9.17803 13.5256 9.18277 13.4261 9.28706C13.2981 9.42455 13.2933 9.65211 13.4118 9.79908C13.5019 9.91286 13.5161 9.91286 14.5591 9.92708C15.7064 9.9413 15.8391 9.92234 15.9292 9.69952C15.9671 9.6047 15.9766 8.9078 15.9671 7.15843C15.9482 4.82119 15.9434 4.73112 15.8391 4.36607C15.4836 3.11923 14.7108 2.17581 13.573 1.59742C13.2222 1.42201 12.6059 1.23712 12.2077 1.18971L11.9232 1.15652L11.3496 0.592365L10.7759 0.0282049H7.96461H5.15329L4.57965 0.592365ZM8.82744 1.64957L7.96461 2.51715L7.10178 1.64957L6.2342 0.786739H7.96461H9.69502L8.82744 1.64957ZM6.37643 2.01936L7.41941 3.06234L7.12074 3.35627L6.82681 3.65495L5.77434 2.60248L4.71713 1.54527L5.00159 1.26082C5.15803 1.10438 5.29552 0.976373 5.30974 0.976373C5.32396 0.976373 5.80279 1.44572 6.37643 2.01936ZM10.9703 1.25608C11.2263 1.51209 11.2453 1.55001 11.1836 1.62587C10.8613 2.03358 9.46272 3.63124 9.42953 3.63124C9.40583 3.63124 9.20671 3.4985 8.98863 3.33257L8.5904 3.0339L9.59072 2.00988C10.1454 1.44572 10.6195 0.981113 10.6432 0.981113C10.6716 0.976373 10.8186 1.10438 10.9703 1.25608Z"
                              fill="black"
                            />
                            <path
                              d="M3.15368 5.07793L3.03516 5.19171V10.8286V16.4654L3.1442 16.6266C3.31012 16.8731 3.76525 17.0817 4.4337 17.2145C5.25387 17.3757 5.87492 17.4278 7.37302 17.461C10.4735 17.5226 12.4315 17.2145 12.8013 16.6077C12.8914 16.4607 12.8961 16.3327 12.8961 11.3927V6.32951L12.7776 6.21573C12.7065 6.13988 12.6069 6.09721 12.5168 6.09721C12.4268 6.09721 12.3272 6.13988 12.2561 6.21573L12.1376 6.32951V11.2837V16.2379L11.8816 16.3327C11.1847 16.5934 10.1132 16.693 7.96563 16.693C5.82277 16.693 4.75134 16.5934 4.0497 16.3327L3.79369 16.2379V10.7148V5.19171L3.67517 5.07793C3.60406 5.00208 3.5045 4.95941 3.41442 4.95941C3.32435 4.95941 3.22479 5.00208 3.15368 5.07793Z"
                              fill="black"
                            />
                            <path
                              d="M12.2552 5.07776C12.1794 5.14887 12.1367 5.24843 12.1367 5.33851C12.1367 5.42858 12.1794 5.52814 12.2552 5.59925C12.3264 5.67511 12.4259 5.71777 12.516 5.71777C12.6061 5.71777 12.7056 5.67511 12.7767 5.59925C12.8526 5.52814 12.8953 5.42858 12.8953 5.33851C12.8953 5.24843 12.8526 5.14887 12.7767 5.07776C12.7056 5.00191 12.6061 4.95924 12.516 4.95924C12.4259 4.95924 12.3264 5.00191 12.2552 5.07776Z"
                              fill="black"
                            />
                            <path
                              d="M8.84118 6.59534C8.76532 6.66645 8.72266 6.76601 8.72266 6.85608C8.72266 6.94616 8.76532 7.04572 8.84118 7.11683L8.95496 7.23535H10.2397H11.5245L11.6383 7.11683C11.7141 7.04572 11.7568 6.94616 11.7568 6.85608C11.7568 6.76601 11.7141 6.66645 11.6383 6.59534L11.5245 6.47682H10.2397H8.95496L8.84118 6.59534Z"
                              fill="black"
                            />
                          </svg>
                        </span>
                        <span className="text-sm font-400">
                          Fashion Accessories
                        </span>
                      </div>
                      <div>
                        <span>
                          <svg
                            width="6"
                            height="9"
                            viewBox="0 0 6 9"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <rect
                              x="1.49805"
                              y="0.818359"
                              width="5.78538"
                              height="1.28564"
                              transform="rotate(45 1.49805 0.818359)"
                              fill="#1D1D1D"
                            />
                            <rect
                              x="5.58984"
                              y="4.90918"
                              width="5.78538"
                              height="1.28564"
                              transform="rotate(135 5.58984 4.90918)"
                              fill="#1D1D1D"
                            />
                          </svg>
                        </span>
                      </div>
                    </div>
                  </Link>
                </li> */}
                {/* <li className="category-item">
                  <Link to="/all-products">
                    <div className="flex justify-between items-center px-5 h-12 bg-white hover:bg-qh3-blue transition-all duration-300 ease-in-out cursor-pointer">
                      <div className="flex items-center space-x-6">
                        <span>
                          <svg
                            width="13"
                            height="20"
                            viewBox="0 0 13 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M3.31426 0.0918814C3.24257 0.171032 3.23113 0.325861 3.23113 1.21433C3.23113 2.50658 3.15969 2.41116 4.12673 2.41116H4.83857V3.13175C4.83857 3.96807 4.86197 4.0186 5.24917 4.0186C5.61644 4.0186 5.64229 3.95971 5.64229 3.123V2.41116H6.04415H6.44601V3.13175C6.44601 3.96807 6.46941 4.0186 6.85661 4.0186C7.22388 4.0186 7.24973 3.95971 7.24973 3.123V2.41116H7.95964H8.66949L9.91204 2.81302C11.7169 3.39672 11.6377 3.42919 11.6609 2.09778C11.6835 0.799606 11.8321 0.965236 10.1393 0.401282L8.93484 0H6.16612C3.5476 0 3.3929 0.00501528 3.31426 0.0918814ZM9.76801 1.15749L10.8665 1.51125V1.86077C10.8665 2.05296 10.8567 2.21023 10.8447 2.21023C10.8327 2.21023 10.4338 2.07463 9.95814 1.90887L9.09334 1.60744H6.56412H4.03485V1.20558V0.803721H6.3522H8.66955L9.76801 1.15749ZM3.31426 4.51235C3.26276 4.56925 3.23113 4.69045 3.23113 4.83107C3.23113 5.24457 3.10124 5.22418 5.73417 5.22418H8.05345V5.94477C8.05345 6.81857 8.0458 6.80687 8.66318 6.87702C9.8552 7.01243 10.7289 7.70594 11.1059 8.81579L11.2423 9.21765L11.2577 14.0526L11.273 18.8874H6.04415H0.815334L0.833016 14.0526C0.852627 8.69008 0.834367 8.98515 1.18852 8.31349C1.78481 7.1825 2.51067 6.88248 4.73813 6.84629C6.48542 6.81787 6.44601 6.82751 6.44601 6.42977C6.44601 6.0173 6.49262 6.02791 4.67937 6.02791C3.26938 6.02791 3.05424 6.03871 2.70986 6.12679C1.46712 6.44462 0.433342 7.47737 0.115969 8.71812C-0.0335875 9.30297 -0.0409175 19.4731 0.108124 19.608C0.257874 19.7436 11.8661 19.735 11.9889 19.5993C12.1293 19.4442 12.1146 9.27436 11.9732 8.72153C11.7594 7.88591 11.1936 7.09377 10.475 6.62446C10.0093 6.3202 9.70899 6.20466 8.99528 6.05497L8.85717 6.02598V5.30636C8.85717 4.67296 8.84618 4.57677 8.76529 4.5036C8.61657 4.36903 3.43643 4.37732 3.31426 4.51235ZM6.94837 6.1284C6.69021 6.38649 6.88105 6.83163 7.24973 6.83163C7.51766 6.83163 7.65159 6.69769 7.65159 6.42977C7.65159 6.29583 7.61809 6.19534 7.55116 6.1284C7.48416 6.0614 7.38366 6.02791 7.24973 6.02791C7.1158 6.02791 7.0153 6.0614 6.94837 6.1284ZM1.70682 9.33467C1.57167 9.48403 1.58009 17.4761 1.71557 17.5987C1.86499 17.7339 10.2589 17.7255 10.3815 17.59C10.5166 17.4406 10.5082 9.44854 10.3727 9.32592C10.2233 9.19071 1.82944 9.19913 1.70682 9.33467ZM9.66089 13.4623V16.8781H6.04415H2.4274V13.4623V10.0465H6.04415H9.66089V13.4623ZM5.73031 10.9684C5.38188 11.2914 4.60967 12.443 4.27706 13.1358C3.57139 14.6055 4.44706 16.0493 6.04415 16.0493C7.27776 16.0493 8.02831 15.3158 8.02831 14.1103V13.5757L7.74186 13C7.46538 12.4444 6.78299 11.4249 6.42846 11.0378C6.21434 10.8041 5.93741 10.7765 5.73031 10.9684ZM6.45707 12.5367C7.21424 13.6454 7.34913 14.1291 7.04771 14.6547C6.33516 15.8971 4.4277 14.9482 4.99192 13.6319C5.20712 13.13 5.96423 11.9873 6.06042 12.0194C6.09128 12.0296 6.26977 12.2625 6.45707 12.5367Z"
                              fill="black"
                            />
                          </svg>
                        </span>
                        <span className="text-sm font-400">
                          Toilet & Sanitation
                        </span>
                      </div>
                      <div>
                        <span>
                          <svg
                            width="6"
                            height="9"
                            viewBox="0 0 6 9"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <rect
                              x="1.49805"
                              y="0.818359"
                              width="5.78538"
                              height="1.28564"
                              transform="rotate(45 1.49805 0.818359)"
                              fill="#1D1D1D"
                            />
                            <rect
                              x="5.58984"
                              y="4.90918"
                              width="5.78538"
                              height="1.28564"
                              transform="rotate(135 5.58984 4.90918)"
                              fill="#1D1D1D"
                            />
                          </svg>
                        </span>
                      </div>
                    </div>
                  </Link>
                </li> */}
                {/* <li className="category-item ">
                  <Link to="/all-products">
                    <div className="flex justify-between items-center px-5 h-12 bg-white hover:bg-qh3-blue transition-all duration-300 ease-in-out cursor-pointer">
                      <div className="flex items-center space-x-6">
                        <span>
                          <svg
                            width="14"
                            height="20"
                            viewBox="0 0 14 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M4.31169 0.0624969C4.23983 0.0984272 3.63928 0.49366 2.972 0.940223C2.2072 1.44838 1.73497 1.79742 1.69904 1.87441C1.66311 1.96167 1.64258 2.51089 1.64258 3.5426V5.08247L1.7709 5.20566C1.84789 5.28779 1.95569 5.33398 2.05321 5.33398C2.15074 5.33398 2.25853 5.28779 2.33552 5.20566L2.46384 5.08247V3.67093V2.25938L3.25944 1.72042C3.70087 1.42272 4.07044 1.17634 4.08071 1.17634C4.0961 1.17634 4.10637 2.05406 4.10637 3.12684V5.08247L4.23469 5.20566C4.31169 5.28779 4.41948 5.33398 4.517 5.33398C4.61453 5.33398 4.72232 5.28779 4.79931 5.20566L4.92763 5.08247V2.66488V0.247281L4.79931 0.124092C4.66072 -0.0196294 4.5016 -0.0350281 4.31169 0.0624969Z"
                              fill="black"
                            />
                            <path
                              d="M0.949586 5.87307C0.821264 5.99626 0.821264 5.99626 0.821264 7.10497V8.20854H0.538954C0.302841 8.20854 0.23098 8.22907 0.128322 8.33686L0 8.46005V13.1721C0 18.2485 0 18.228 0.266911 18.6745C0.538954 19.1365 1.02145 19.5009 1.5296 19.6292C1.79651 19.7011 2.10962 19.7114 3.42878 19.696C4.92758 19.6806 5.01998 19.6703 5.29715 19.5625C5.64106 19.4239 6.03116 19.0903 6.25187 18.7413C6.57524 18.2382 6.57011 18.3665 6.57011 13.1721V8.46005L6.44179 8.33686L6.3186 8.20854H4.92758H3.53657L3.41338 8.33686C3.24399 8.50112 3.24399 8.73723 3.41338 8.90148C3.53657 9.02981 3.53657 9.02981 4.64527 9.02981H5.74885L5.73858 13.5365L5.72318 18.0483L5.5692 18.2998C5.47167 18.4538 5.31768 18.6078 5.1637 18.7053L4.91218 18.8593H3.28506H1.65793L1.40641 18.7053C1.25243 18.6078 1.09844 18.4538 1.00092 18.2998L0.846928 18.0483L0.83153 13.5365L0.821264 9.02981H1.10357C1.33969 9.02981 1.41155 9.00927 1.51421 8.90148C1.64253 8.77829 1.64253 8.77829 1.64253 7.66959V6.56601H3.28506H4.92758V6.84832C4.92758 7.19223 5.07644 7.38728 5.33822 7.38728C5.43574 7.38728 5.54353 7.34108 5.62052 7.25896C5.74371 7.1409 5.74885 7.09984 5.74885 6.56601C5.74885 6.03219 5.74371 5.99113 5.62052 5.87307L5.49733 5.74475H3.28506H1.07278L0.949586 5.87307Z"
                              fill="black"
                            />
                            <path
                              d="M2.18133 8.33636C1.92469 8.58787 2.10434 9.0293 2.46364 9.0293C2.67409 9.0293 2.87428 8.82911 2.87428 8.61866C2.87428 8.40822 2.67409 8.20803 2.46364 8.20803C2.36612 8.20803 2.25833 8.25423 2.18133 8.33636Z"
                              fill="black"
                            />
                            <path
                              d="M8.88943 12.3917C8.39154 12.5303 7.92958 12.8896 7.65754 13.3464C7.40602 13.7673 7.39062 13.9418 7.39062 16.7957V19.4545L7.51895 19.5777L7.64214 19.7061H10.6757H13.7092L13.8324 19.5777L13.9607 19.4545V16.7957C13.9607 13.9059 13.9505 13.7827 13.6733 13.3105C13.4834 12.9871 13.0317 12.597 12.6878 12.4584C12.4055 12.3455 12.3336 12.3403 10.7783 12.3301C9.48998 12.3198 9.10501 12.3352 8.88943 12.3917ZM12.5543 13.3156C12.7083 13.4131 12.8623 13.5671 12.9598 13.7211L13.1138 13.9726L13.1292 16.4313L13.1446 18.8848H10.6757H8.20676L8.22215 16.4364L8.23755 13.9829L8.38127 13.7416C8.45827 13.6082 8.59172 13.4491 8.67898 13.3875C9.01775 13.1462 9.12041 13.1359 10.7578 13.1513L12.3028 13.1616L12.5543 13.3156Z"
                              fill="black"
                            />
                          </svg>
                        </span>
                        <span className="text-sm font-400">Makeup Corner</span>
                      </div>
                      <div>
                        <span>
                          <svg
                            width="6"
                            height="9"
                            viewBox="0 0 6 9"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <rect
                              x="1.49805"
                              y="0.818359"
                              width="5.78538"
                              height="1.28564"
                              transform="rotate(45 1.49805 0.818359)"
                              fill="#1D1D1D"
                            />
                            <rect
                              x="5.58984"
                              y="4.90918"
                              width="5.78538"
                              height="1.28564"
                              transform="rotate(135 5.58984 4.90918)"
                              fill="#1D1D1D"
                            />
                          </svg>
                        </span>
                      </div>
                    </div>
                  </Link>
                </li> */}
                {/* <li className="category-item">
                  <Link to="/all-products">
                    <div className=" flex justify-between items-center px-5 h-12 bg-white hover:bg-qh3-blue transition-all duration-300 ease-in-out cursor-pointer">
                      <div className="flex items-center space-x-6">
                        <span>
                          <svg
                            width="12"
                            height="18"
                            viewBox="0 0 12 18"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M5.33134 0.0585212C4.21138 0.271167 3.66452 1.02808 3.70545 2.30909L3.72294 2.85721L3.48817 2.9339C2.69258 3.19379 1.94407 3.77655 1.53723 4.45275C1.37223 4.7271 1.33584 4.75871 1.13079 4.80665C-0.248122 5.12877 -0.410044 6.93812 0.889205 7.50525L1.20958 7.64505L5.83093 7.645H10.4523L10.7652 7.51546C12.1208 6.95439 11.9709 5.2257 10.5305 4.80858C10.3173 4.74681 10.2767 4.70978 10.0874 4.4044C9.74838 3.85744 9.11237 3.33236 8.45647 3.0579L7.93091 2.83796L7.91355 2.08618C7.87856 0.571472 6.85648 -0.231111 5.33134 0.0585212ZM6.23744 0.820161C6.91745 1.07841 7.18594 1.79719 6.96232 2.76097C6.83939 3.29095 6.87151 3.33767 7.48568 3.52302C8.03748 3.68947 8.60658 4.00244 8.91627 4.30968C9.33453 4.72453 9.68314 4.68336 5.75481 4.68336H2.2796L2.44205 4.50419C2.79261 4.11757 3.42173 3.73578 3.95197 3.58788C4.52053 3.4293 4.57208 3.40521 4.63738 3.26757C4.67184 3.1949 4.68699 3.07872 4.67104 3.00949C4.65514 2.9402 4.61455 2.77077 4.58089 2.63295C4.44194 2.06372 4.61408 1.2745 4.93011 1.03216C5.25022 0.786742 5.88034 0.68456 6.23744 0.820161ZM10.3217 5.5743C10.5904 5.71223 10.7392 5.93053 10.7392 6.18698C10.7392 6.44343 10.5904 6.66173 10.3217 6.79966C10.035 6.94675 1.53195 6.94675 1.24523 6.79966C0.589732 6.46332 0.72795 5.65799 1.46805 5.50151C1.90941 5.40825 10.1297 5.47585 10.3217 5.5743ZM0.879924 8.10073C0.810347 8.16145 0.775559 8.25261 0.775559 8.37409C0.775559 8.49558 0.810347 8.58674 0.879924 8.64751C0.949433 8.70822 1.0538 8.73861 1.19288 8.73861C1.33197 8.73861 1.43633 8.70822 1.50591 8.64751C1.57542 8.58674 1.61021 8.49558 1.61021 8.37409C1.61021 8.25261 1.57542 8.16145 1.50591 8.10073C1.43633 8.03996 1.33197 8.00957 1.19288 8.00957C1.0538 8.00957 0.949433 8.03996 0.879924 8.10073ZM10.043 8.45744C9.96425 8.53349 9.95664 8.85969 9.95624 12.2052C9.95571 16.7581 9.97594 16.6162 9.27857 16.9588L8.99165 17.0997H5.78346H2.57526L2.28835 16.9588C1.59726 16.6193 1.61121 16.7101 1.61068 12.5617C1.61014 8.81315 1.64593 9.10313 1.1838 9.10313C0.739101 9.10313 0.771285 8.79437 0.787377 12.9126L0.801666 16.553L0.94142 16.8135C1.13666 17.1774 1.50297 17.5032 1.91663 17.6811L2.2601 17.8288H5.78346H9.30681L9.65029 17.6811C10.0639 17.5032 10.4303 17.1774 10.6255 16.8135L10.7652 16.553L10.7794 12.5479C10.7954 8.01214 10.8306 8.37409 10.374 8.37409C10.2032 8.37409 10.1033 8.39923 10.043 8.45744ZM3.36584 8.82195C3.24432 8.93924 3.24999 9.29349 3.37493 9.39224C3.45632 9.45657 3.60936 9.46765 4.41824 9.46765H5.36613V11.4725V13.4774H4.40916C3.30749 13.4774 3.27951 13.4866 3.27951 13.8498C3.27951 14.1944 3.31763 14.2064 4.41824 14.2064H5.36613V15.2245C5.36613 16.5264 5.19907 16.3935 6.83585 16.3935C8.29862 16.3935 8.28741 16.3964 8.28741 16.021C8.28741 15.6764 8.24928 15.6645 7.14868 15.6645H6.20078V13.6596V11.6548H7.15776C8.25943 11.6548 8.28741 11.6455 8.28741 11.2823C8.28741 10.9377 8.24928 10.9257 7.14868 10.9257H6.20078V9.90758C6.20078 8.97908 6.19237 8.88278 6.10536 8.81402C5.95319 8.6937 3.49131 8.70082 3.36584 8.82195Z"
                              fill="black"
                            />
                          </svg>
                        </span>
                        <span className="text-sm font-400">Baby Items</span>
                      </div>
                      <div>
                        <span>
                          <svg
                            width="6"
                            height="9"
                            viewBox="0 0 6 9"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <rect
                              x="1.49805"
                              y="0.818359"
                              width="5.78538"
                              height="1.28564"
                              transform="rotate(45 1.49805 0.818359)"
                              fill="#1D1D1D"
                            />
                            <rect
                              x="5.58984"
                              y="4.90918"
                              width="5.78538"
                              height="1.28564"
                              transform="rotate(135 5.58984 4.90918)"
                              fill="#1D1D1D"
                            />
                          </svg>
                        </span>
                      </div>
                    </div>
                  </Link>
                </li> */}
              </ul>
            </div>
          ) : (
            <div className="menu-item mt-5 w-full">
              <ul className="categories-list">
                <li className="category-item">
                  <Link to="/">
                    <div className=" flex justify-between items-center px-5 h-12 bg-white hover:bg-qh3-blue transition-all duration-300 ease-in-out cursor-pointer">
                      <div className="flex items-center space-x-6">
                        <span className="text-sm font-400">Home</span>
                      </div>
                      <div>
                        <span>
                          <svg
                            width="6"
                            height="9"
                            viewBox="0 0 6 9"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <rect
                              x="1.49805"
                              y="0.818359"
                              width="5.78538"
                              height="1.28564"
                              transform="rotate(45 1.49805 0.818359)"
                              fill="#1D1D1D"
                            />
                            <rect
                              x="5.58984"
                              y="4.90918"
                              width="5.78538"
                              height="1.28564"
                              transform="rotate(135 5.58984 4.90918)"
                              fill="#1D1D1D"
                            />
                          </svg>
                        </span>
                      </div>
                    </div>
                  </Link>
                  {/* <ul className="submenu-list ml-5">
                    <li className="category-item">
                      <Link to="/home-two">
                        <div className=" flex justify-between items-center px-5 h-12 bg-white hover:bg-qyellow transition-all duration-300 ease-in-out cursor-pointer">
                          <div className="flex items-center space-x-6">
                            <span className="text-sm font-400">Home Two</span>
                          </div>
                          <div>
                            <span>
                              <svg
                                width="6"
                                height="9"
                                viewBox="0 0 6 9"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <rect
                                  x="1.49805"
                                  y="0.818359"
                                  width="5.78538"
                                  height="1.28564"
                                  transform="rotate(45 1.49805 0.818359)"
                                  fill="#1D1D1D"
                                />
                                <rect
                                  x="5.58984"
                                  y="4.90918"
                                  width="5.78538"
                                  height="1.28564"
                                  transform="rotate(135 5.58984 4.90918)"
                                  fill="#1D1D1D"
                                />
                              </svg>
                            </span>
                          </div>
                        </div>
                      </Link>
                    </li>
                    <li className="category-item">
                      <Link to="/home-three">
                        <div className=" flex justify-between items-center px-5 h-12 bg-white hover:bg-qyellow transition-all duration-300 ease-in-out cursor-pointer">
                          <div className="flex items-center space-x-6">
                            <span className="text-sm font-400">Home Three</span>
                          </div>
                          <div>
                            <span>
                              <svg
                                width="6"
                                height="9"
                                viewBox="0 0 6 9"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <rect
                                  x="1.49805"
                                  y="0.818359"
                                  width="5.78538"
                                  height="1.28564"
                                  transform="rotate(45 1.49805 0.818359)"
                                  fill="#1D1D1D"
                                />
                                <rect
                                  x="5.58984"
                                  y="4.90918"
                                  width="5.78538"
                                  height="1.28564"
                                  transform="rotate(135 5.58984 4.90918)"
                                  fill="#1D1D1D"
                                />
                              </svg>
                            </span>
                          </div>
                        </div>
                      </Link>
                    </li>
                  </ul> */}
                </li>
                <li className="category-item">
                  <Link to="#">
                    <div className=" flex justify-between items-center px-5 h-12 bg-white hover:bg-qh3-blue transition-all duration-300 ease-in-out cursor-pointer">
                      <div className="flex items-center space-x-6">
                        <span className="text-sm font-400">Pages</span>
                      </div>
                      <div>
                        <span>
                          <svg
                            width="6"
                            height="9"
                            viewBox="0 0 6 9"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <rect
                              x="1.49805"
                              y="0.818359"
                              width="5.78538"
                              height="1.28564"
                              transform="rotate(45 1.49805 0.818359)"
                              fill="#1D1D1D"
                            />
                            <rect
                              x="5.58984"
                              y="4.90918"
                              width="5.78538"
                              height="1.28564"
                              transform="rotate(135 5.58984 4.90918)"
                              fill="#1D1D1D"
                            />
                          </svg>
                        </span>
                      </div>
                    </div>
                  </Link>
                  <ul className="submenu-list ml-5">
                    <li className="category-item">
                      <Link to="/privacy-policy">
                        <div className=" flex justify-between items-center px-5 h-12 bg-white hover:bg-qh3-blue transition-all duration-300 ease-in-out cursor-pointer">
                          <div className="flex items-center space-x-6">
                            <span className="text-sm font-400">
                              Privacy Policy
                            </span>
                          </div>
                          <div>
                            <span>
                              <svg
                                width="6"
                                height="9"
                                viewBox="0 0 6 9"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <rect
                                  x="1.49805"
                                  y="0.818359"
                                  width="5.78538"
                                  height="1.28564"
                                  transform="rotate(45 1.49805 0.818359)"
                                  fill="#1D1D1D"
                                />
                                <rect
                                  x="5.58984"
                                  y="4.90918"
                                  width="5.78538"
                                  height="1.28564"
                                  transform="rotate(135 5.58984 4.90918)"
                                  fill="#1D1D1D"
                                />
                              </svg>
                            </span>
                          </div>
                        </div>
                      </Link>
                    </li>
                    <li className="category-item">
                      <Link to="/faq">
                        <div className=" flex justify-between items-center px-5 h-12 bg-white hover:bg-qh3-blue transition-all duration-300 ease-in-out cursor-pointer">
                          <div className="flex items-center space-x-6">
                            <span className="text-sm font-400">FAQ</span>
                          </div>
                          <div>
                            <span>
                              <svg
                                width="6"
                                height="9"
                                viewBox="0 0 6 9"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <rect
                                  x="1.49805"
                                  y="0.818359"
                                  width="5.78538"
                                  height="1.28564"
                                  transform="rotate(45 1.49805 0.818359)"
                                  fill="#1D1D1D"
                                />
                                <rect
                                  x="5.58984"
                                  y="4.90918"
                                  width="5.78538"
                                  height="1.28564"
                                  transform="rotate(135 5.58984 4.90918)"
                                  fill="#1D1D1D"
                                />
                              </svg>
                            </span>
                          </div>
                        </div>
                      </Link>
                    </li>
                    <li className="category-item">
                      <Link to="/terms-condition">
                        <div className=" flex justify-between items-center px-5 h-12 bg-white hover:bg-qh3-blue transition-all duration-300 ease-in-out cursor-pointer">
                          <div className="flex items-center space-x-6">
                            <span className="text-sm font-400">
                              Terms and Conditions
                            </span>
                          </div>
                          <div>
                            <span>
                              <svg
                                width="6"
                                height="9"
                                viewBox="0 0 6 9"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <rect
                                  x="1.49805"
                                  y="0.818359"
                                  width="5.78538"
                                  height="1.28564"
                                  transform="rotate(45 1.49805 0.818359)"
                                  fill="#1D1D1D"
                                />
                                <rect
                                  x="5.58984"
                                  y="4.90918"
                                  width="5.78538"
                                  height="1.28564"
                                  transform="rotate(135 5.58984 4.90918)"
                                  fill="#1D1D1D"
                                />
                              </svg>
                            </span>
                          </div>
                        </div>
                      </Link>
                    </li>
                  </ul>
                </li>

                <li className="category-item">
                  <Link to="/about">
                    <div className="flex justify-between items-center px-5 h-12 bg-white hover:bg-qh3-blue transition-all duration-300 ease-in-out cursor-pointer">
                      <div className="flex items-center space-x-6">
                        <span className="text-sm font-400">About</span>
                      </div>
                      <div>
                        <span>
                          <svg
                            width="6"
                            height="9"
                            viewBox="0 0 6 9"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <rect
                              x="1.49805"
                              y="0.818359"
                              width="5.78538"
                              height="1.28564"
                              transform="rotate(45 1.49805 0.818359)"
                              fill="#1D1D1D"
                            />
                            <rect
                              x="5.58984"
                              y="4.90918"
                              width="5.78538"
                              height="1.28564"
                              transform="rotate(135 5.58984 4.90918)"
                              fill="#1D1D1D"
                            />
                          </svg>
                        </span>
                      </div>
                    </div>
                  </Link>
                </li>
                <li className="category-item">
                  <Link to="/Blogs">
                    <div className="flex justify-between items-center px-5 h-12 bg-white hover:bg-qh3-blue transition-all duration-300 ease-in-out cursor-pointer">
                      <div className="flex items-center space-x-6">
                        <span className="text-sm font-400">Blogs</span>
                      </div>
                      <div>
                        <span>
                          <svg
                            width="6"
                            height="9"
                            viewBox="0 0 6 9"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <rect
                              x="1.49805"
                              y="0.818359"
                              width="5.78538"
                              height="1.28564"
                              transform="rotate(45 1.49805 0.818359)"
                              fill="#1D1D1D"
                            />
                            <rect
                              x="5.58984"
                              y="4.90918"
                              width="5.78538"
                              height="1.28564"
                              transform="rotate(135 5.58984 4.90918)"
                              fill="#1D1D1D"
                            />
                          </svg>
                        </span>
                      </div>
                    </div>
                  </Link>
                </li>
                <li className="category-item">
                  <Link to="/contact">
                    <div className="flex justify-between items-center px-5 h-12 bg-white hover:bg-qh3-blue transition-all duration-300 ease-in-out cursor-pointer">
                      <div className="flex items-center space-x-6">
                        <span className="text-sm font-400">Contact</span>
                      </div>
                      <div>
                        <span>
                          <svg
                            width="6"
                            height="9"
                            viewBox="0 0 6 9"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <rect
                              x="1.49805"
                              y="0.818359"
                              width="5.78538"
                              height="1.28564"
                              transform="rotate(45 1.49805 0.818359)"
                              fill="#1D1D1D"
                            />
                            <rect
                              x="5.58984"
                              y="4.90918"
                              width="5.78538"
                              height="1.28564"
                              transform="rotate(135 5.58984 4.90918)"
                              fill="#1D1D1D"
                            />
                          </svg>
                        </span>
                      </div>
                    </div>
                  </Link>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
