import React, { useEffect, useState, lazy } from "react";
import axios from "axios";
import LayoutHomeThree from '../Partials/LayoutHomeThree';
import Banner from './Banner';
import BrandSection from "./BrandSection";
import SectionStyleThree from '../Helpers/SectionStyleThree';
import ProductsAds from "./ProductsAds";
import SectionStyleOneHmThree from '../Helpers/SectionStyleOneHmThree';
import SectionStyleTwo from "../Helpers/SectionStyleTwo";
import ViewMoreTitle from "../Helpers/ViewMoreTitle";
import CampaignCountDown from "./CampaignCountDown";
import SectionStyleFour from "../Helpers/SectionStyleFour";
import flashsale from "../../assets/flash-sale-ads.jpg";
import 'font-awesome/css/font-awesome.min.css';
import './Home.css';



export default function HomeThree() {
  const [products, setProducts] = useState([]);
  const [brands, setBrands] = useState([]);
  const [recommendedProducts, setRecommendedProducts] = useState([]);
  const [banners, setBanners] = useState([]);
  const [offerProduct, setOfferProducts] = useState([]);
  const [DiscountProducts, setDiscountProducts] = useState([]);
  const [BestSeller, setBestSeller] = useState([])

    useEffect(() => {
      if (window.fbq) {
        window.fbq('track', 'PageView', { page: 'HomeThree' });
    
      }
    }, []);



  useEffect(() => {
    const fetchData = async () => {
      try {
        const productsResponse = await axios.get(`${import.meta.env.VITE_PUBLIC_URL}/products/`, {
          params: {
            limit: 10
          }
        });
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
        setRecommendedProducts(recommendedResponse.data.data);
      } catch (error) {
        console.error("Error fetching recommended products:", error);
      }

      try {
        const bannersResponse = await axios.get(`${import.meta.env.VITE_PUBLIC_URL}/offer-banner/`);
        setBanners(bannersResponse.data.banner);
      } catch (error) {
        console.error("Error fetching banners:", error);
      }

      try {
        const BestSales = await axios.get(`${import.meta.env.VITE_PUBLIC_URL}/best-sale/`);
        setBestSeller(BestSales.data);
      }catch(error){
        console.log("error fetching best-sales");
      }

      try {
        const offerProductResponse = await axios.get(`${import.meta.env.VITE_PUBLIC_URL}/buy-1-get-1-free/`);

        setOfferProducts(offerProductResponse.data.data);
      } catch (error) {
        console.error("Error fetching offer products:", error);
      }
      try {
        const DiscountProducts = await axios.get(`${import.meta.env.VITE_PUBLIC_URL}/offers/`);
        setDiscountProducts(DiscountProducts.data.data);
      } catch (error) {
        console.error("Error fetching offer products:", error);
      } 
    };

    fetchData();
  }, []);

  
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
          ads={banners.slice(0, 2).map((banner) => `${banner.image}`)}
          sectionHeight="sm:h-[295px] h-full"
          className="products-ads-section mb-[60px]"
        />

<SectionStyleOneHmThree
          type={3}
          products={BestSeller}
          brands={brands}
          categoryTitle="Best Sellers"
          sectionTitle="Best Sellers"
          seeMoreUrl="/all-products"
          className="category-products mb-[60px]"
        />
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
        {/* <SectionStyleFour
           type={3}
          products={DiscountProducts}
          // sectionTitle="Discount Products"
          // seeMoreUrl="/all-products"
          className="category-products mb-[60px]"
        /> */}
      </LayoutHomeThree>
      <a
        href="https://wa.me/+917025494747?text=Hello,%20I%20am%20interested%20in%20your%20products!"
        className="whatsapp_float"
        target="_blank"
        rel="noopener noreferrer"
      >
        <i className="fa fa-whatsapp whatsapp-icon"></i>
      </a>
    </>
  );
}
