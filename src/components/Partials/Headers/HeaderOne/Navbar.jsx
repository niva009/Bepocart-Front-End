import { useEffect, useState ,startTransition} from "react";
import { Link, useFetcher } from "react-router-dom";
import axios from "axios";
import Arrow from "../../../Helpers/icons/Arrow";

export default function Navbar({ className, type }) {
  const [categoryToggle, setToggle] = useState(false);
  const [elementsSize, setSize] = useState("0px");
  const [categories, setCategories] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);



  const handler = () => {
    startTransition(() => {
      setToggle(!categoryToggle);
    });
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_PUBLIC_URL}/category/`);
        startTransition(() => {
          setCategories(response.data.data);
        });
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    const fetchSubCategory = async () =>{

      try{
        const response =await axios.get(`${import.meta.env.VITE_PUBLIC_URL}/subcategorys/`)
        setSubCategory(response.data.data)
      }
      catch(error){
        console.log("subcategory fetching error");
      }
    }
    fetchCategories();
    fetchSubCategory();
    
  }, []);

  // console.log("category information", categories);
  // console.log("subcategory information", subCategory);

  const handleCategoryClick = (categoryId) => {
    setActiveCategory((prevActiveCategory) =>
      prevActiveCategory === categoryId ? null : categoryId
    );
  };
  



  useEffect(() => {
    startTransition(() => {
      if (categoryToggle) {
        const getItems = categories.length;
        if (categoryToggle && getItems > 0) {
          setSize(`${42 * getItems}px`);
        }
      } else {
        setSize(`0px`);
      }
    });
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
  <ul className="categories-list overflow-y-auto max-h-64">
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
              <span className="text-sm font-400">{category.name}</span>
            </div>
            <div onClick={(e) => {
              e.preventDefault();
              handleCategoryClick(category.id);
            }}>
              <Arrow
                width="10.7"
                height="2.4"
                className="fill-current cursor-pointer"
              />
            </div>  
          </div>
        </Link>
        {activeCategory === category.id && (
          <ul className="subcategories-list overflow-y-auto max-h-40">
            {subCategory
              .filter(subCategory => subCategory.category === category.id)
              .map(subCategory => (
                <li className="subcategory-item" key={subCategory.id}>
                  <Link to={`/category/${subCategory.slug}/`}>
                    <div className="flex items-center px-5 h-8 bg-gray-100 transition-all duration-300 ease-in-out cursor-pointer text-qblack hover:bg-gray-200">
                      <span className="text-sm font-400">{subCategory.name}</span>
                    </div>
                  </Link>
                </li>
              ))}
          </ul>
        )}
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
                        className={`flex items-center text-sm font-600 cursor-pointer ${type === 3 ? "text-black" : "text-qblacktext"
                          }`}
                      >
                        <span>Home</span>
                      </span>
                    </Link>
                  </li>
                  <li className="relative">
                    <span
                      className={`flex items-center text-sm font-600 cursor-pointer ${type === 3 ? "text-black" : "text-qblacktext"
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
                                <li>
                                  <Link to="/shipping-policy">
                                    <span
                                      className={`text-qgray text-sm font-400 border-b border-transparent   ${type === 3
                                        ? "hover:text-qh3-blue hover:border-qh3-blue"
                                        : "hover:text-qyellow hover:border-qyellow"
                                        }`}
                                    >
                                      Shipping Policy
                                    </span>
                                  </Link>
                                </li>
  
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
                        className={`flex items-center text-sm font-600 cursor-pointer ${type === 3 ? "text-black" : "text-qblacktext"
                          }`}
                      >
                        <span>About</span>
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/blogs">
                      <span
                        className={`flex items-center text-sm font-600 cursor-pointer ${type === 3 ? "text-black" : "text-qblacktext"
                          }`}
                      >
                        <span>Blog</span>
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/contact">
                      <span
                        className={`flex items-center text-sm font-600 cursor-pointer ${type === 3 ? "text-black" : "text-qblacktext"
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
