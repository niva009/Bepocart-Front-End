import React, { useEffect, useState } from "react";
import axios from "axios";
import LayoutHomeThree from "../Partials/LayoutHomeThree";
import Banner from "./Banner";
import BrandSection from "./BrandSection";
import SectionStyleThree from "../Helpers/SectionStyleThree";
import ProductsAds from "./ProductsAds";
import SectionStyleOneHmThree from "../Helpers/SectionStyleOneHmThree";
import SectionStyleTwo from "../Helpers/SectionStyleTwo";
import ViewMoreTitle from "../Helpers/ViewMoreTitle";
import CampaignCountDown from "./CampaignCountDown";
import SectionStyleFour from "../Helpers/SectionStyleFour";
import offerBanner1 from "../../assets/ads-1.jpg";
import offerBanner2 from "../../assets/ads-2.jpg";
import flashsale from "../../assets/flash-sale-ads.png";
import 'font-awesome/css/font-awesome.min.css';
import './Home.css';


export default function HomeThree() {
  const [products, setProducts] = useState([]);
  const [brands, setBrands] = useState([]);
  const [recommendedProducts, setRecommendedProducts] = useState([]);
  const [banners, setBanners] = useState([]);
  const [offerProduct, setOfferProducts] = useState([]);
  const [DiscountProducts, setDiscountProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productsResponse = await axios.get(`${import.meta.env.VITE_PUBLIC_URL}/products/`, {
          params: {
            limit: 10
          }
        });
        console.log("Products response:", productsResponse.data);
        const { products } = productsResponse.data;
        const brands = products.map(product => product.brand);
         const limitedProducts = products.slice(0, 15);
        setProducts(limitedProducts);
        setBrands(brands);
      } catch (error) {
        console.error("Error fetching all products:", error);
      }

      try {
        const token = localStorage.getItem('token');
        const recommendedResponse = await axios.get(`${import.meta.env.VITE_PUBLIC_URL}/recommended/`, {
          headers: {
            'Authorization': `${token}`,
          },
        });
        console.log("Recommended response:", recommendedResponse);
        setRecommendedProducts(recommendedResponse.data.data);
      } catch (error) {
        console.error("Error fetching recommended products:", error);
      }

      try {
        const bannersResponse = await axios.get(`${import.meta.env.VITE_PUBLIC_URL}/offer-banner/`);
        console.log("Banners response:", bannersResponse.data);
        setBanners(bannersResponse.data.banner);
      } catch (error) {
        console.error("Error fetching banners:", error);
      }

      try {
        const offerProductResponse = await axios.get(`${import.meta.env.VITE_PUBLIC_URL}/buy-1-get-1-free/`);
        console.log("Offer products response:", offerProductResponse.data);
        setOfferProducts(offerProductResponse.data.data);
      } catch (error) {
        console.error("Error fetching offer products:", error);
      }
      try {
        const DiscountProducts = await axios.get(`${import.meta.env.VITE_PUBLIC_URL}/offers/`);
        console.log("Discount products response:", DiscountProducts.data);
        setDiscountProducts(DiscountProducts.data.data);
      } catch (error) {
        console.error("Error fetching offer products:", error);
      }
    };

    fetchData();
  }, []);

  console.log("Discount products...:",DiscountProducts);  
  console.log(products,"product information")

  return (
    <>
      <LayoutHomeThree type={3} childrenClasses="pt-0">
        <Banner className="banner-wrapper mb-[60px]" />
        <BrandSection
          type={3}
          sectionTitle="Shop by Brand"
          className="brand-section-wrapper mb-[60px]"
        />
        <SectionStyleThree
          type={3}
          products={recommendedProducts}
          sectionTitle="Recommended for you"
          seeMoreUrl="/all-products"
          className="new-products mb-[60px]"
        />
        <ProductsAds
          ads={[
            flashsale
          ]}
          className="products-ads-section mb-[60px]"
        />
        <SectionStyleOneHmThree
          type={3}
          products={products}
          brands={brands}
          categoryTitle="latest products"
          sectionTitle="New Arrivals"
          seeMoreUrl="/all-products"
          className="category-products mb-[60px]"
        />
        <ViewMoreTitle
          className="top-selling-product mb-[60px]"
          seeMoreUrl="/all-products"
          categoryTitle="Buy One Get One"
        >
          <SectionStyleTwo
            type={3}
            products={offerProduct}
          />
        </ViewMoreTitle>
        <ProductsAds
          ads={[
            offerBanner1, // Directly using the imported image
            offerBanner2  // You can add more images like this
          ]}
          className="products-ads-section mb-[60px]"
        />;
        {/* <SectionStyleOneHmThree
          type={3}
          categoryBackground={`${import.meta.env.VITE_PUBLIC_URL}/assets/images/section-category-2.jpg`}
          products={products}
          brands={brands}
          categoryTitle="Electronics"
          sectionTitle="Popular Sales"
          seeMoreUrl="/all-products"
          className="category-products mb-[60px]"
        /> */}
        <CampaignCountDown
          className="mb-[60px]"
          lastDate="2023-10-04 4:00:00"
        />
        <SectionStyleFour
           type={3}
          products={DiscountProducts}
          sectionTitle="Discount Products"
          seeMoreUrl="/all-products"
          className="category-products mb-[60px]"
        />
      </LayoutHomeThree>
      <a
        href="https://wa.me/8167845851?text=Hello,%20I%20am%20interested%20in%20your%20products!"
        className="whatsapp_float"
        target="_blank"
        rel="noopener noreferrer"
      >
        <i className="fa fa-whatsapp whatsapp-icon"></i>
      </a>
    </>
  );
}
