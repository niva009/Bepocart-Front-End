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
import offerBanner1 from "../../assets/ads-1.png";
import offerBanner2 from "../../assets/ads-2.png";
import flashsale from "../../assets/flash-sale-ads.png";

export default function HomeThree() {
  const [products, setProducts] = useState([]);
  const [brands, setBrands] = useState([]);
  const [recommendedProducts, setRecommendedProducts] = useState([]);
  const [banners, setBanners] = useState([]);
  const [offerProduct, setOfferProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productsResponse = await axios.get("http://127.0.0.1:8000/products/");
        const { products } = productsResponse.data;
        const brands = products.map(product => product.brand);
        setProducts(products);
        setBrands(brands);
      } catch (error) {
        console.error("Error fetching all products:", error);
      }

      try {
        const token = localStorage.getItem('token');
        const recommendedResponse = await axios.get("http://127.0.0.1:8000/recently-viewed/", {
          headers: {
            'Authorization': `${token}`,
          },
        });
        setRecommendedProducts(recommendedResponse.data.data);
      } catch (error) {
        console.error("Error fetching recommended products:", error);
      }

      try {
        // Fetch banners data
        const bannersResponse = await axios.get("http://127.0.0.1:8000/offer-banner/");
        setBanners(bannersResponse.data.banner);
      } catch (error) {
        console.error("Error fetching banners:", error);
      }

      try {
        // Fetch offer products
        const offerProductResponse = await axios.get("http://127.0.0.1:8000/buy-1-get-1-free/");
        setOfferProducts(offerProductResponse.data.data);
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
          categoryTitle="Mobile & Tablet"
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
        <SectionStyleOneHmThree
          type={3}
          categoryBackground={`${import.meta.env.VITE_PUBLIC_URL}/assets/images/section-category-2.jpg`}
          products={products.slice(12)}
          brands={brands}
          categoryTitle="Electronics"
          sectionTitle="Popular Sales"
          seeMoreUrl="/all-products"
          className="category-products mb-[60px]"
        />
        <CampaignCountDown
          className="mb-[60px]"
          lastDate="2023-10-04 4:00:00"
        />
        <SectionStyleFour
          products={products}
          sectionTitle="Popular Sales"
          seeMoreUrl="/all-products"
          className="category-products mb-[60px]"
        />
      </LayoutHomeThree>
    </>
  );
}
