import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Arrow from "../../../Helpers/icons/Arrow";

export default function Navbar({ className, type }) {
  const [categoryToggle, setToggle] = useState(false);
  const [elementsSize, setSize] = useState("0px");
  const [categories, setCategories] = useState([]);

  const handler = () => {
    setToggle(!categoryToggle);
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_PUBLIC_URL}/category/`);
        setCategories(response.data.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);




  useEffect(() => {
    if (categoryToggle) {
      const getItems = categories.length;
      if (categoryToggle && getItems > 0) {
        setSize(`${42 * getItems}px`);
      }
    } else {
      setSize(`0px`);
    }
  }, [categoryToggle, categories]);


  return (
    <div
      className={`nav-widget-wrapper w-full h-[60px] relative z-30 ${type === 3 ? "bg-qh3-blue" : "bg-qh3-blue"
        } ${className || ""}`}
    >
      <div className="container-x mx-auto h-full">
        <div className="w-full h-full relative">
          <div className="w-full h-full flex justify-between items-center">
            <div className="category-and-nav flex xl:space-x-7 space-x-3 items-center">
              <div className="category w-[270px] h-[53px] bg-white px-5 rounded-t-md mt-[6px] relative">
                <button
                  onClick={handler}
                  type="button"
                  className="w-full h-full flex justify-between items-center"
                >
                  <div className="flex space-x-3 items-center">
                    <span>
                      <svg
                        className="fill-current"
                        width="14"
                        height="9"
                        viewBox="0 0 14 9"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect width="14" height="1" />
                        <rect y="8" width="14" height="1" />
                        <rect y="4" width="10" height="1" />
                      </svg>
                    </span>
                    <span className="text-sm font-600 text-qblacktext">
                      All Categories
                    </span>
                  </div>
                  <div>
                    <Arrow
                      width="5.78538"
                      height="1.28564"
                      className="fill-current text-qblacktext"
                    />
                  </div>
                </button>
                {categoryToggle && (
                  <div
                    className="fixed top-0 left-0 w-full h-full -z-10"
                    onClick={handler}
                  ></div>
                )}
                <div
                  className="category-dropdown w-full absolute left-0 top-[53px] overflow-hidden"
                  style={{ height: `${elementsSize} ` }}
                >
                  <ul className="categories-list">
                    {categories.map((category) => (
                      <li className="category-item" key={category.id}>
                        <Link to={`/main-category/${category.slug}/`}>
                          <div
                            className={`flex justify-between items-center px-5 h-10 bg-white transition-all duration-300 ease-in-out cursor-pointer text-qblack ${type === 3
                                ? "hover:bg-qh3-blue hover:text-white"
                                : "hover:bg-qyellow"
                              }`}
                          >
                            <div className="flex items-center space-x-6">
                              {/* <span>
                                <svg
                                  className="fill-current"
                                  width="12"
                                  height="16"
                                  viewBox="0 0 12 16"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path d="M0.911344 0.0514231C0.633547 0.132053 0.157324 0.565442 0.0722839 0.822452C-0.0240946 1.12481 -0.0240946 14.8132 0.0722839 15.1156C0.162993 15.3928 0.633547 15.811 0.94536 15.8917C1.10977 15.932 1.72773 15.9521 2.94663 15.9521H4.71546L4.85152 15.8262C5.03861 15.6649 5.03861 15.4331 4.85152 15.2718L4.71546 15.1458H2.9523H1.18914L1.05308 15.0199L0.911344 14.8989V8.85526V1.03914L1.05308 0.9182L1.18914 0.792214H5.90035H10.6116L10.7476 0.9182L10.8894 1.03914V8.85526V14.8989L10.7476 15.0199L10.6116 15.1458H8.8484H7.08524L6.94917 15.2718C6.76208 15.4331 6.76208 15.6649 6.94917 15.8262L7.08524 15.9521H8.85406C10.073 15.9521 10.6909 15.932 10.8553 15.8917C11.1842 15.806 11.6377 15.3877 11.7284 15.0955C11.7851 14.9191 11.7964 14.8673 11.7851 8.72423L11.7681 0.807333L11.598 0.560402C11.4903 0.409221 11.3202 0.258039 11.1501 0.16229L10.8723 0.0111084L5.99106 0.00102901C2.53844 -0.0040102 1.05308 0.0111074 0.911344 0.0514231Z" />
                                  <path d="M1.96009 1.72447C1.86938 1.80006 1.81836 1.90588 1.81836 2.00163C1.81836 2.09738 1.86938 2.20321 1.96009 2.2788C2.09049 2.39975 2.13584 2.40479 2.72545 2.40479C3.31506 2.40479 3.36042 2.39975 3.49081 2.2788C3.58152 2.20321 3.63254 2.09738 3.63254 2.00163C3.63254 1.90588 3.58152 1.80006 3.49081 1.72447C3.36042 1.60352 3.31506 1.59848 2.72545 1.59848C2.13584 1.59848 2.09049 1.60352 1.96009 1.72447Z" />
                                  <path d="M8.16214 1.66399C7.83899 1.76981 7.61221 1.93611 7.4478 2.19312C7.31174 2.3947 7.28906 2.48541 7.28906 2.81297C7.28906 3.15061 7.31174 3.22116 7.45914 3.44289C7.56686 3.59407 7.73694 3.74526 7.90702 3.84101C8.15647 3.97707 8.23584 3.99219 8.62135 3.99219C9.00687 3.99219 9.08624 3.97707 9.33569 3.84101C9.50577 3.74526 9.67585 3.59407 9.78357 3.44289C9.93664 3.22116 9.95364 3.15061 9.95364 2.80793C9.95364 2.46525 9.93664 2.3947 9.78357 2.17297C9.67585 2.02179 9.50577 1.87061 9.33569 1.77486C9.09919 1.63879 9.02483 1.62166 8.63418 1.62166C8.37936 1.62166 8.202 1.64079 8.16214 1.66399Z" />
                                  <path d="M4.13228 5.1303C4.13228 5.26321 4.18698 5.39928 4.26935 5.48194C4.35172 5.5646 4.48779 5.6193 4.6207 5.6193H6.74787C6.88078 5.6193 7.01685 5.5646 7.09921 5.48194C7.18158 5.39928 7.23628 5.26321 7.23628 5.1303C7.23628 4.99739 7.18158 4.86132 7.09921 4.77866C7.01685 4.696 6.88078 4.6413 6.74787 4.6413H4.6207C4.48779 4.6413 4.35172 4.696 4.26935 4.77866C4.18698 4.86132 4.13228 4.99739 4.13228 5.1303Z" />
                                  <path d="M4.13228 7.98694C4.13228 8.11985 4.18698 8.25591 4.26935 8.33858C4.35172 8.42124 4.48779 8.47594 4.6207 8.47594H6.74787C6.88078 8.47594 7.01685 8.42124 7.09921 8.33858C7.18158 8.25591 7.23628 8.11985 7.23628 7.98694C7.23628 7.85403 7.18158 7.71796 7.09921 7.6353C7.01685 7.55264 6.88078 7.49794 6.74787 7.49794H4.6207C4.48779 7.49794 4.35172 7.55264 4.26935 7.6353C4.18698 7.71796 4.13228 7.85403 4.13228 7.98694Z" />
                                  <path d="M4.13228 10.8436C4.13228 10.9765 4.18698 11.1126 4.26935 11.1952C4.35172 11.2779 4.48779 11.3326 4.6207 11.3326H6.74787C6.88078 11.3326 7.01685 11.2779 7.09921 11.1952C7.18158 11.1126 7.23628 10.9765 7.23628 10.8436C7.23628 10.7107 7.18158 10.5746 7.09921 10.492C7.01685 10.4093 6.88078 10.3546 6.74787 10.3546H4.6207C4.48779 10.3546 4.35172 10.4093 4.26935 10.492C4.18698 10.5746 4.13228 10.7107 4.13228 10.8436Z" />
                                  <path d="M0.911344 14.5916C0.633547 14.6723 0.157324 15.1056 0.0722839 15.3626C-0.0240946 15.665 1.97417e-08 15.7325 0.4722 15.8938C0.687611 15.9684 1.69792 15.9795 5.9398 15.9795C12.6254 15.9795 11.9964 16.0258 12 14.9489C12.0016 14.4586 12.0131 14.4173 12.1403 14.1764C12.2728 13.9262 12.3066 13.8798 12.5017 13.7197C12.7327 13.527 12.764 13.4752 12.735 13.2425C12.707 13.0236 12.6632 12.9748 12.518 12.9195C12.1881 12.7887 0.808746 12.8375 0.474017 12.9705C0.287588 13.0421 0.186824 13.1467 0.0682442 13.3876C-0.0240946 13.5828 0.00388549 13.6474 0.31812 13.9094C0.733546 14.2728 1.05485 14.2597 5.9535 14.2465C8.22364 14.2465 8.33293 14.2465 8.50526 14.1798C8.67859 14.113 8.75921 13.9712 8.89678 13.3382C8.98378 12.9268 9.00038 12.8467 9.00038 12.5328C9.00038 12.3356 8.93571 12.0732 8.79478 11.7971C8.42822 11.052 7.74711 10.8053 5.94924 10.8053C2.40442 10.8053 1.71766 10.7976 1.36234 10.9278C1.12925 11.0146 1.04191 11.0559 0.906062 11.2236C0.737199 11.4341 0.73432 11.444 0.73432 11.7425V12.0448L0.911344 12.2268V14.5916Z" />
                                </svg>
                              </span> */}
                              <span className="text-sm font-400">
                                {category.name}
                              </span>
                            </div>
                            <div>
                              <Arrow
                                width="9.48895"
                                height="1.85719"
                                className="fill-current"
                              />
                            </div>
                          </div>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="nav">
                <ul className="nav-wrapper flex xl:space-x-10 space-x-5">
                  <li>
                    <Link to="/">
                      <span
                        className={`flex items-center text-sm font-600 cursor-pointer ${type === 3 ? "text-white" : "text-qblacktext"
                          }`}
                      >
                        <span>Home</span>
                      </span>
                    </Link>
                  </li>
                  <li className="relative">
                    <span
                      className={`flex items-center text-sm font-600 cursor-pointer ${type === 3 ? "text-white" : "text-qblacktext"
                        }`}
                    >
                      <span>Pages</span>
                      <span className="ml-1.5 ">
                        <Arrow className="fill-current" />
                      </span>
                    </span>
                    <div className="sub-menu w-[220px] absolute left-0 top-[60px]">
                      <div
                        className="w-full bg-white flex justify-between items-center "
                        style={{
                          boxShadow: "0px 15px 50px 0px rgba(0, 0, 0, 0.14)",
                        }}
                      >
                        <div className="categories-wrapper w-full h-full p-5">
                          <div>
                            <div className="category-items">
                              <ul className="flex flex-col space-y-2">
                                <li>
                                  <Link to="/privacy-policy">
                                    <span
                                      className={`text-qgray text-sm font-400 border-b border-transparent   ${type === 3
                                        ? "hover:text-qh3-blue hover:border-qh3-blue"
                                        : "hover:text-qyellow hover:border-qyellow"
                                        }`}
                                    >
                                      Privacy Policy
                                    </span>
                                  </Link>
                                </li>
                                {/* <li>
                                  <Link to="/terms-condition">
                                    <span
                                      className={`text-qgray text-sm font-400 border-b border-transparent   ${type === 3
                                        ? "hover:text-qh3-blue hover:border-qh3-blue"
                                        : "hover:text-qyellow hover:border-qyellow"
                                        }`}
                                    >
                                      Terms and Conditions
                                    </span>
                                  </Link>
                                </li> */}
                                {/* <li>
                                  <Link to="/faq">
                                    <span
                                      className={`text-qgray text-sm font-400 border-b border-transparent   ${type === 3
                                        ? "hover:text-qh3-blue hover:border-qh3-blue"
                                        : "hover:text-qyellow hover:border-qyellow"
                                        }`}
                                    >
                                      FAQ
                                    </span>
                                  </Link>
                                </li> */}
                                {/* <li>
                                  <Link to="/all-products">
                                    <span
                                      className={`text-qgray text-sm font-400 border-b border-transparent   ${type === 3
                                        ? "hover:text-qh3-blue hover:border-qh3-blue"
                                        : "hover:text-qyellow hover:border-qyellow"
                                        }`}
                                    >
                                      Shop Category Icon
                                    </span>
                                  </Link>
                                </li> */}
                                {/* <li>
                                  <Link to="/all-products">
                                    <span
                                      className={`text-qgray text-sm font-400 border-b border-transparent   ${type === 3
                                        ? "hover:text-qh3-blue hover:border-qh3-blue"
                                        : "hover:text-qyellow hover:border-qyellow"
                                        }`}
                                    >
                                      Shop List View
                                    </span>
                                  </Link>
                                </li> */}
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li>
                    <Link to="/about">
                      <span
                        className={`flex items-center text-sm font-600 cursor-pointer ${type === 3 ? "text-white" : "text-qblacktext"
                          }`}
                      >
                        <span>About</span>
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/blogs">
                      <span
                        className={`flex items-center text-sm font-600 cursor-pointer ${type === 3 ? "text-white" : "text-qblacktext"
                          }`}
                      >
                        <span>Blog</span>
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/contact">
                      <span
                        className={`flex items-center text-sm font-600 cursor-pointer ${type === 3 ? "text-white" : "text-qblacktext"
                          }`}
                      >
                        <span>Contact</span>
                      </span>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
