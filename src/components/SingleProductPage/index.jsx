import React, { useRef, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import BreadcrumbCom from "../BreadcrumbCom";
import ProductCardStyleOne from "../Helpers/Cards/ProductCardStyleOne";
import Layout from "../Partials/Layout";
import ProductView from "./ProductView";
import Reviews from "./Reviews";
import SallerInfo from "./SallerInfo";
import axios from "axios";

export default function SingleProductPage() {
  const { id } = useParams();
  const [products, setProducts] = useState([]);
  const [tab, setTab] = useState("des");
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [reviewLoading, setLoading] = useState(false);
  const reviewElement = useRef(null);
  const [report, setReport] = useState(false);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const productId = parseInt(id);
    fetchProduct(productId);
  }, [id]);

  const fetchProduct = async (id) => {
    setLoading(true);
    try {
      const response = await axios.get(`http://127.0.0.1:8000/related-products/${id}/`);
      setProducts(response.data.data); // Update state with fetched products array
      console.log("Data received from API:", response.data.data); // Log received data
    } catch (error) {
      console.error("Error fetching product:", error);
    } finally {
      setLoading(false);
    }
  };

  const reviewAction = () => {
    setLoading(true);
    setTimeout(() => {
      if (name && message && rating) {
        setComments((prev) => [
          {
            id: Math.random(),
            author: name,
            comments: message,
            review: rating,
          },
          ...prev,
        ]);
        setLoading(false);
        setName("");
        setEmail("");
        setPhone("");
        setMessage("");
        setRating(0);
        setHover(0);
        window.scrollTo({
          top: -reviewElement.current.getBoundingClientRect().top,
          left: 0,
          behavior: "smooth",
        });
      }
      setLoading(false);
    }, 2000);
  };

  return (
    <>
      <Layout childrenClasses="pt-0 pb-0">
        <div className="single-product-wrapper w-full">
          <div className="product-view-main-wrapper bg-white pt-[30px] w-full">
            <div className="breadcrumb-wrapper w-full">
              <div className="container-x mx-auto">
                <BreadcrumbCom
                  paths={[
                    { name: "home", path: "/" },
                    { name: "single product", path: "/single-product" },
                  ]}
                />
              </div>
            </div>
            <div className="w-full bg-white pb-[60px]">
              <div className="container-x mx-auto">
                <ProductView reportHandler={() => setReport(!report)} />
              </div>
            </div>
          </div>

          <div className="product-des-wrapper w-full relative pb-[60px]" ref={reviewElement}>
            <div className="tab-buttons w-full mb-10 mt-5 sm:mt-0">
              <div className="container-x mx-auto">
                <ul className="flex space-x-12 ">
                  <li>
                    <span
                      onClick={() => setTab("des")}
                      className={`py-[15px] sm:text-[15px] text-sm sm:block border-b font-medium cursor-pointer ${tab === "des"
                          ? "border-qyellow text-qblack "
                          : "border-transparent text-qgray"
                        }`}
                    >
                      Description
                    </span>
                  </li>
                  <li>
                    <span
                      onClick={() => setTab("review")}
                      className={`py-[15px] sm:text-[15px] text-sm sm:block border-b font-medium cursor-pointer ${tab === "review"
                          ? "border-qyellow text-qblack "
                          : "border-transparent text-qgray"
                        }`}
                    >
                      Reviews
                    </span>
                  </li>
                  <li>
                    <span
                      onClick={() => setTab("info")}
                      className={`py-[15px] sm:text-[15px] text-sm sm:block border-b font-medium cursor-pointer ${tab === "info"
                          ? "border-qyellow text-qblack "
                          : "border-transparent text-qgray"
                        }`}
                    >
                      Seller Info
                    </span>
                  </li>
                </ul>
              </div>
              <div className="w-full h-[1px] bg-[#E8E8E8] absolute left-0 sm:top-[50px] top-[36px] -z-10"></div>
            </div>
            <div className="tab-contents w-full min-h-[400px] ">
              <div className="container-x mx-auto">
                {tab === "des" && (
                  <div data-aos="fade-up" className="w-full tab-content-item">
                    <h6 className="text-[18px] font-medium text-qblack mb-2">
                      Introduction
                    </h6>
                    <p className="text-[15px] text-qgray text-normal mb-10">
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry. Lorem Ipsum has been the industry's
                      standard dummy text ever since the 1500s, when an unknown
                      printer took a galley of type and scrambled it to make a
                      type specimen book. It has survived not only five
                      centuries but also the on leap into electronic
                      typesetting, remaining essentially unchanged. It wasn’t
                      popularised in the 1960s with the release of Letraset
                      sheets containing Lorem Ipsum passages, andei more
                      recently with desktop publishing software like Aldus
                      PageMaker including versions of Lorem Ipsum to make a type
                      specimen book.
                    </p>
                    <div>
                      <h6 className="text-[18px] text-medium mb-4">
                        Features :
                      </h6>
                      <ul className="list-disc ml-[15px]">
                        <li className="font-normal text-qgray leading-9">
                          slim body with metal cover
                        </li>
                        <li className="font-normal text-qgray leading-9">
                          latest Intel Core i5-1135G7 import.metaor (4 cores / 8
                          threads)
                        </li>
                        <li className="font-normal text-qgray leading-9">
                          8GB DDR4 RAM and fast 512GB PCIe SSD
                        </li>
                        <li className="font-normal text-qgray leading-9">
                          NVIDIA GeForce MX350 2GB GDDR5 graphics card backlit
                          keyboard, touchpad with gesture support
                        </li>
                      </ul>
                    </div>
                  </div>
                )}
                {tab === "review" && (
                  <div data-aos="fade-up" className="w-full tab-content-item">
                    <h6 className="text-[18px] font-medium text-qblack mb-2">
                      Reviews
                    </h6>
                    {/* review-comments */}
                    <div className="w-full">
                      <Reviews
                        reviewLoading={reviewLoading}
                        reviewAction={reviewAction}
                        comments={comments.slice(0, 2)}
                        name={name}
                        nameHandler={(e) => setName(e.target.value)}
                        email={email}
                        emailHandler={(e) => setEmail(e.target.value)}
                        phone={phone}
                        phoneHandler={(e) => setPhone(e.target.value)}
                        message={message}
                        messageHandler={(e) => setMessage(e.target.value)}
                        rating={rating}
                        ratingHandler={setRating}
                        hoverRating={hover}
                        hoverHandler={setHover}
                      />
                    </div>
                  </div>
                )}
                {tab === "info" && (
                  <div data-aos="fade-up" className="w-full tab-content-item">
                    <SallerInfo product={products} />
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="related-product w-full bg-white">
            <div className="container-x mx-auto">
              <div className="w-full py-[60px]">
                <h1 className="sm:text-3xl text-xl font-600 text-qblacktext leading-none mb-[30px]">
                  Related Product
                </h1>
                <div
                  data-aos="fade-up"
                  className="grid xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 xl:gap-[30px] gap-5"
                >
                  {products.map((product) => (
                    <div key={product.id} className="item">
                      <ProductCardStyleOne datas={product} />
                    </div>
                  ))}

                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}
