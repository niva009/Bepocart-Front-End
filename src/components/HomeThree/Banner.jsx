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
        const response = await axios.get('http://127.0.0.1:8000/banners/');
        setSliderData(response.data.banner); 
        console.log("Data:", response.data.banner); 
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };
    fetchData();
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    autoplay: true,
    fade: true,
    arrows: false,
  };

  return (
    <div className={`w-full xl:h-[733px] h-[500px] ${className || ""}`}>
      <div className="main-wrapper w-full h-full">
        <div className="hero-slider-wrapper xl:h-full mb-20 xl:mb-0  w-full relative">
          <div className="absolute left-0 top-0 w-full h-full items-center justify-between hidden xl:flex">
            <button
              type="button"
              onClick={() => sliderRef.current.slickPrev()}
              className="relative hover:text-qh3-blue text-[#8cb1f6] 2xl:left-32 left-5 cursor-pointer z-10"
            >
              {/* Left arrow SVG */}
            </button>
            <button
              type="button"
              onClick={() => sliderRef.current.slickNext()}
              className="relative hover:text-qh3-blue text-[#8cb1f6]  2xl:right-32 right-5 cursor-pointer z-10"
            >
              {/* Right arrow SVG */}
            </button>
          </div>
          <SimpleSlider settings={settings} selector={sliderRef}>
            {sliderData.map((item, index) => (
              <div key={index} className="item w-full xl:h-[733px] h-[500px]">
                <div
                  className="w-full h-full relative"
                  style={{
                    backgroundImage: `url(http://127.0.0.1:8000${item.image})`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                  }}
                >
                  <div className="container-x mx-auto flex items-center  h-full">
                    <div className="w-full h-full xl:flex items-center pt-20 xl:pt-0">
                      <div className="xl:w-[626px] w-full">
                        <p className="md:text-[34px] text-[20px] font-medium text-white mb-[7px]">
                          VR BOX 3D Glass
                        </p>
                        <h1 className="md:text-[66px] text-[40px]  font-bold text-black md:leading-[80px] leading-[40px] mb-[44px]">
                          {item.name}
                        </h1>

                        <Link to="#" passhref="true">
                          <div rel="noopener noreferrer">
                            <div
                              className={`w-[160px] h-[52px] flex justify-center items-center group rounded bg-qh3-blue text-white relative transition-all duration-300 ease-in-out overflow-hidden cursor-pointer ${
                                className || ""
                              }`}
                            >
                              <div className="flex space-x-1 items-center transition-all duration-300 ease-in-out relative z-10">
                                <span className="text-sm font-600 tracking-wide leading-7 mr-2">
                                  Shop Now
                                </span>
                                
                              </div>
                              <div
                                style={{
                                  transition: `transform 0.25s ease-in-out`,
                                }}
                                className="w-full h-full bg-black absolute top-0 left-0 right-0 bottom-0 transform scale-x-0 group-hover:scale-x-100 origin-[center_left] group-hover:origin-[center_right]"
                              ></div>
                            </div>
                          </div>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </SimpleSlider>
        </div>
      </div>
    </div>
  );
}
