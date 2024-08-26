import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import SimpleSlider from "../Helpers/SliderCom";

export default function Banner({ className }) {
  const sliderRef = useRef(null);
  const [sliderData, setSliderData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_PUBLIC_URL}/banners/`);
        setSliderData(response.data.banner);
        console.log("Data:", response.data.banner);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };
    fetchData();
  }, []);

  console.log(sliderData, "slider images");
  const settings = {
    dots: false,
    infinite: true,
    autoplay: true,
    fade: true,
    arrows: false,
  };

  return (
    <div className={`relative w-full ${className || ""}`}>
      <div className="relative w-full h-full">
        <div className="absolute top-1/2 left-4 transform -translate-y-1/2 flex flex-col justify-between h-full">
          <button
            type="button"
            onClick={() => sliderRef.current.slickPrev()}
            className="bg-white p-3 rounded-full shadow-lg flex items-center justify-center text-[#8cb1f6] hover:bg-gray-200 transition-transform transform hover:scale-110 mb-2"
            style={{ zIndex: 10 }}
          >
            {/* Left arrow SVG */}
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 18l-6-6 6-6" stroke="#8cb1f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => sliderRef.current.slickNext()}
            className="bg-white p-3 rounded-full shadow-lg flex items-center justify-center text-[#8cb1f6] hover:bg-gray-200 transition-transform transform hover:scale-110"
            style={{ zIndex: 10 }}
          >
            {/* Right arrow SVG */}
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 18l6-6-6-6" stroke="#8cb1f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

        </div>
        <SimpleSlider settings={settings} selector={sliderRef}>
          {sliderData.map((item, index) => (
            <div key={index} className="relative w-full h-[300px] xl:h-[733px] flex items-center justify-center">
              <div
                className="w-full h-full bg-cover bg-center flex items-center justify-center"
                style={{
                  backgroundImage: `url(${item.image})`,
                }}
              >
                <div className="text-center w-full">
                  <h1 className="text-[24px] sm:text-[40px] md:text-[66px] font-bold text-black leading-tight mb-[20px] sm:mb-[44px]">
                    {/* {item.name} */}
                  </h1>

                  <div className="flex items-center relative z-10">
                    <Link
                      to="/all-products"
                      className="text-sm font-semibold tracking-wide leading-7 px-5 py-3 bg-qh3-blue text-black  shadow-md hover:bg-qh3-blue transition-colors duration-300 ml-[150px]"
                    >
                      Shop Now
                    </Link>
                  </div>




                </div>
              </div>
            </div>
          ))}
        </SimpleSlider>
      </div>
    </div>
  );
}