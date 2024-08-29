import React, { useRef, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import BreadcrumbCom from "../BreadcrumbCom";
import ProductCardStyleOne from "../Helpers/Cards/ProductCardStyleOne";
import Layout from "../Partials/Layout";
import ProductView from "./ProductView";
import Reviews from "./Reviews";
import axios from "axios";
import DataIteration from "../Helpers/DataIteration";


export default function SingleProductPage() {
  
  const { id } = useParams();


  const [products, setProducts] = useState("");
  const [tab, setTab] = useState("des");
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [review, setReview] = useState([]);
  const [message, setMessage] = useState("");
  const [reviewLoading, setLoading] = useState(false);
  const reviewElement = useRef(null);
  const [report, setReport] = useState(false);
  const [comments, setComments] = useState([]);
  const [productId,setProductId] = useState();
  const [categoryId, setCategoryId] = useState();
  const [ releatedproducts, setReleatedproducts] = useState([])
  const [categoryData, setCategoryData] = useState([])

  useEffect(() => {
    fetchProduct(id);
  }, [id]);

  
  const fetchProduct = async (id) => {
    setLoading(true);
    try {
      const response = await axios.get(`${import.meta.env.VITE_PUBLIC_URL}/product/${id}/`);
      setProducts(response.data); // Update state with fetched products array
      setProductId(response.data.product.id)
      setCategoryId(response.data.product.mainCategory)
    } catch (error) {
      console.error("Error fetching product:", error);
    } finally {
      setLoading(false);
    }
  };


  console.log("reposne dataaaa...:",products);




  useEffect(() => {
    if (categoryId) {
      axios.get(`${import.meta.env.VITE_PUBLIC_URL}/products/`)
        .then(response => {

          const filteredProducts = response.data.products.filter(product => product.category === categoryId);
          setCategoryData(filteredProducts);
        })
        .catch(error => {
          console.error("There was an error fetching the products!", error);
        });
    }
  }, [categoryId]);




  useEffect(() =>{
    axios.get(`${import.meta.env.VITE_PUBLIC_URL}/category/${categoryId}/products/`)
    .then((response) =>{
      setReleatedproducts(response.data.products);
    })
    .catch((error) =>{
      console.log(error,"error fetching releated products");
    })
  },[categoryId])



  const reviewAction = () => {
    const token = localStorage.getItem("token");
  
    axios.post(
      `${import.meta.env.VITE_PUBLIC_URL}/product-review/${productId}/`,
      {
        rating: rating,
        review_text: message
      },
      {
        headers: {
          'Authorization': `${token}`
        }
      }
    )
    .then(response => {
      // Handle the response here if needed
    })
    .catch(error => {
      // Handle errors here
      console.error("Error submitting review:", error);
    });
  };
  


useEffect(() =>{

  if(productId){
    axios.get(`${import.meta.env.VITE_PUBLIC_URL}/review/${productId}/`)

    .then((response) =>{     
      setComments(response.data)
    })
  
    .catch((error) =>{
      console.log(error.message)
    })
  }
},[productId])



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
                    { name: "single product", path: "/all-products/" },
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
                </ul>
              </div>
              <div className="w-full h-[1px] bg-[#E8E8E8] absolute left-0 sm:top-[50px] top-[36px] -z-10"></div>
            </div>
            <div className="tab-contents w-full min-h-[400px] ">
              <div className="container-x mx-auto">
                {tab === "des" && (
                  <div data-aos="fade-up" className="w-full tab-content-item">
                    <h6 className="text-[18px] font-medium text-qblack mb-2">
                      Description
                    </h6>
                    <p className="text-[15px] text-qgray text-normal mb-1
                    ">
                    {products.product?.description}
                    </p>
                    {/* <div>
                      <h6 className="text-[18px] text-medium mb-4">
                        Product-Info 
                      </h6>
                      <p className="text-[15px] text-qgray text-normal mb-10">
                    {products.product?.short_description}
                    </p>
                    </div> */}
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
                        comments={comments}
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
              </div>
            </div>
          </div>

          <div className="related-product w-full bg-white">
            <div className="container-x mx-auto">
              <div className="w-full py-[60px]">
                <h1 className="sm:text-3xl text-xl font-600 text-qblacktext leading-none mb-[30px]">
                  Related Product
                </h1>
                <div class = "grid xl:grid-cols-5 lg:grid-cols-5 sm:grid-cols-2 grid-cols-1 xl:gap-[30px] gap-5">    
                <DataIteration
              datas={releatedproducts}
              startLength={1}
            > 
              {({ datas }) => (
                <div key={datas.id} className="item">
                  <ProductCardStyleOne datas={datas} />
                </div>
              )}
            </DataIteration>
            </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}
