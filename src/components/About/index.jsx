import { useRef } from "react";
import { Link } from "react-router-dom";
import BlogCard from "../Helpers/Cards/BlogCard";
import Star from "../Helpers/icons/Star";
import PageTitle from "../Helpers/PageTitle";
import SimpleSlider from "../Helpers/SliderCom";
import Layout from "../Partials/Layout";  
import AboutBanner from '../../assets/banner-image.jpg';
import { HiOutlineCash } from "react-icons/hi";
import { RiSecurePaymentLine } from "react-icons/ri";
import { RiCustomerService2Fill } from "react-icons/ri";
import { MdLocalShipping } from "react-icons/md";
export default function About() {
  const settings = {
    slidesToShow: 3,
    slidesToScroll: 3,
    autoplay: true,
    centerMode: true,
    infinite: true,
    centerPadding: "60px",
    dots: false,
    responsive: [
      {
        breakpoint: 1026,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          centerMode: false,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: false,
        },
      },

      // You can unslick at a given breakpoint now by adding:
      // settings: "unslick"
      // instead of a settings object
    ],
  };
  const slider = useRef(null);
  const prev = () => {
    slider.current.slickPrev();
  };
  const next = () => {
    slider.current.slickNext();
  };
  return (
    <Layout childrenClasses="pt-0 pb-0">
      <div className="about-page-wrapper w-full">
        <div className="title-area w-full">
          <PageTitle
            title="About Us"
            breadcrumb={[
              { name: "home", path: "/" },
              { name: "About us", path: "/about" },
            ]}
          />
        </div>

        <div className="aboutus-wrapper w-full">
          <div className="container-x mx-auto">
            <div className="w-full min-h-[665px] lg:flex lg:space-x-12 items-center pb-10 lg:pb-0">
              <div className="md:w-[570px] w-full md:h-[560px] h-auto rounded overflow-hidden my-5 lg:my-0">
                <img
                  src={AboutBanner}
                  alt="about"
                  className="w-full h"
                />
              </div>
              <div className="content flex-1">
                {/* <h1 className="text-[18px] font-medium text-qblack mb-2.5">
                  What is e-commerce business?
                </h1> */}
                <p className="text-[15px] text-qgraytwo leading-7 mb-7">
                Bepokart, an ecommerce website for a wide range of cycles, accessories, and apparel in India, offers some of the best prices and a completely hassle-free experience with options of paying through Cash on Delivery, Debit Card, Credit card, and Net Banking processed through secure and trusted gateways. Browse through our accessories and apparel featured on our site with expert descriptions to help you arrive at the right buying decision. Bepocart also offers free shipping. Join our community of cycling enthusiasts, and let's ride together towards greatness. Subscribe now for the latest updates and cycling adventures!
                </p>
      
                <Link to="/contact">
                  <div className="w-[121px] h-10">
                  <button className="bg-qh3-blue hover:bg-qh3-darkblue text-black font-semibold py-2 px-4 rounded">About Us</button>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="customer-feedback w-full bg-white py-[60px]">
          <div className="title flex justify-center mb-5">
            <h1 className="text-[30px] font-semibold text-qblack">
              Customers Feedback
            </h1>
          </div>
          <div className="feedback-slider-wrapper w-vw relative overflow-hidden">
            <SimpleSlider selector={slider} settings={settings}>
              <div className="item h-[385px] bg-primarygray sm:px-10 sm:py-9 p-2">
                <div className="flex flex-col justify-between h-full">
                  <div className="rating flex space-x-1 items-center">
                    <div className="flex items-center">
                      <Star w="20" h="20" />
                      <Star w="20" h="20" />
                      <Star w="20" h="20" />
                      <Star w="20" h="20" />
                      <Star w="20" h="20" />
                    </div>
                    <span className="text-[13px] text-qblack">(5.0)</span>
                  </div>
                  <div className="text-[15px] text-qgraytwo leading-[30px] text-justify line-clamp-6">
                  I have ordered 2 helmets from bepocart Few days back i Received Parcel Firstly the packing was good and about helmets they was also good i love it seriously that's what I was looking for... You can also buy it i will give 10/10 Keep shopping
                  </div>
                  <div className="flex items-center space-x-2.5 mt-3">
        
                    <div>
                      <p className="text-[18px] text-qblack font-medium">
                        Arul
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="item h-[385px] bg-primarygray sm:px-10 sm:py-9 p-2">
                <div className="flex flex-col justify-between h-full">
                  <div className="rating flex space-x-1 items-center">
                    <div className="flex items-center">
                      <Star w="20" h="20" />
                      <Star w="20" h="20" />
                      <Star w="20" h="20" />
                      <Star w="20" h="20" />
                      <Star w="20" h="20" />
                    </div>
                    <span className="text-[13px] text-qblack">(5.0)</span>
                  </div>
                  <div className="text-[15px] text-qgraytwo leading-[30px] text-justify line-clamp-6">
                  Hi cyclist, Worth the money, I recently purchased a car rack at an affordable price, and the build quality of the bicycle stand is also good. I've tried it with two road bikes, each weighing approximately 10 kilos
                  </div>
                  <div className="flex items-center space-x-2.5 mt-3">
          
                    <div>
                      <p className="text-[18px] text-qblack font-medium">
                      Sathish Kumar S
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="item h-[385px] bg-primarygray sm:px-10 sm:py-9 p-2">
                <div className="flex flex-col justify-between h-full">
                  <div className="rating flex space-x-1 items-center">
                    <div className="flex items-center">
                      <Star w="20" h="20" />
                      <Star w="20" h="20" />
                      <Star w="20" h="20" />
                      <Star w="20" h="20" />
                      <Star w="20" h="20" />
                    </div>
                    <span className="text-[13px] text-qblack">(5.0)</span>
                  </div>
                  <div className="text-[15px] text-qgraytwo leading-[30px] text-justify line-clamp-6">
      

Complete brake cable replacement kit. It includes all the neccessary parts like end caps, ferrule, etc, Il you need to completely change your brake lines. At this offer price, it is probably the best you can find in the market.
                  </div>
                  <div className="flex items-center space-x-2.5 mt-3">
                    <div>
                      <p className="text-[18px] text-qblack font-medium">
                        Rema.nair
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </SimpleSlider>

            <div className="slider-btns flex justify-center mt-[40px]">
              <div className="flex space-x-5 item-center">
                <button
                  onClick={prev}
                  type="button"
                  className="w-[48px] h-[48px] rounded-full overflow-hidden flex justify-center items-center border border-qh3-blue text-qh3-blue focus:bg-qh3-blue focus:text-white"
                >
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
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>
                <button
                  onClick={next}
                  type="button"
                  className="w-[48px] h-[48px] rounded-full overflow-hidden flex justify-center items-center border border-qh3-blue text-qh3-blue focus:bg-qh3-blue focus:text-white"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 transform rotate-180"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="container-x mx-auto my-[60px]">
          <div
            data-aos="fade-down"
            className="best-services w-full bg-qh3-blue flex flex-col space-y-10 lg:space-y-0 lg:flex-row lg:justify-between lg:items-center lg:h-[110px] px-10 lg:py-0 py-10"
          >
            <div className="item">
              <div className="flex space-x-5 items-center">
                <div>
                <MdLocalShipping size={40}/>
                </div>
                <div>
                  <p className="text-black text-[15px] font-700 tracking-wide mb-1 uppercase">
                    Free Shipping
                  </p>
                  <p className="text-sm text-qblack">Order above 500 Rs</p>
                </div>
              </div>
            </div>
            <div className="item">
              <div className="flex space-x-5 items-center">
                <div>
                <HiOutlineCash size={40}/>
                </div>
             <div>
                  <p className="text-black text-[15px] font-700 tracking-wide mb-1 uppercase">
                    COD
                  </p>
                  <p className="text-sm text-qblack">
                   Cash on Delivery Available
                  </p>
                </div>
              </div>
            </div>
            <div className="item">
              <div className="flex space-x-5 items-center">
                <div>
                <RiSecurePaymentLine size={40} />
                </div>
                <div>
                  <p className="text-black text-[15px] font-700 tracking-wide mb-1 uppercase">
                    Secure Payment
                  </p>
                  <p className="text-sm text-qblack">
                    100% Secure Online Payment
                  </p>
                </div>
              </div>
            </div>
            <div className="item">
              <div className="flex space-x-5 items-center">
                <div>
                <RiCustomerService2Fill size={40}/>
                </div>
                <div>
                  <p className="text-black text-[15px] font-700 tracking-wide mb-1 uppercase">
                    Customer Support
                  </p>
                  <p className="text-sm text-qblack">
                    9am-5pm(mon-sat)
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="blog-post-wrapper w-full mb-[30px]">
          <div className="container-x mx-auto">
            {/* <div className="blog-post-title flex justify-center items-cente mb-[30px]">
              <h1 className="text-3xl font-semibold text-qblack">
                My Latest News
              </h1>
            </div> */}

            <div className="blogs-wrapper w-full">
              <div className="grid md:grid-cols-2 grid-cols-1 lg:gap-[30px] gap-5">
                {/* <DataIteration datas={blog.blogs} startLength={0} endLength={2}>
                  {({ datas }) => (
                    <div
                      data-aos="fade-up"
                      key={datas.id}
                      className="item w-full"
                    >
                      <BlogCard datas={datas} />
                    </div>
                  )}
                </DataIteration> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
