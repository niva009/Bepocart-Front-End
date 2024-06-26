import { useState, useEffect } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";


export default function BrandSection({ className, sectionTitle, type }) {
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/subcategorys/")
      .then(response => {
        setBrands(response.data.data);
      })
      .catch(error => {
        console.error("There was an error fetching the brands!", error);
      });
  }, []);

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000, // 2 seconds
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <div data-aos="fade-up" className={`w-full ${className || ""}`}>
      <div className="container-fluid mx-auto">
        {type !== 3 && (
          <div className="section-title flex justify-between items-center mb-5">
            <div>
              <h1 className="sm:text-3xl text-xl font-600 text-qblacktext">
                {sectionTitle}
              </h1>
            </div>
          </div>
        )}

        <Slider {...settings} className="brand-slider">
          {brands.map((brand) => (
            <Link to={`/category/${brand.id}/`}>
              <div key={brand.id} className="item">
                <div className="w-full h-[130px] bg-white border border-primarygray flex justify-center items-center rounded-full overflow-hidden">
                  <img
                    src={`${import.meta.env.VITE_PUBLIC_URL}${brand.image}`}
                    alt={`${brand.name} logo`}
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
                <p className="mt-2 text-center text-sm font-medium text-qblacktext">
                  {brand.name}
                </p>
              </div>
            </Link>

          ))}
        </Slider>
      </div>
    </div>
  );
}
