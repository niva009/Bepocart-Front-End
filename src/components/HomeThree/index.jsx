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

export default function HomeThree() {
  const [products, setProducts] = useState([]);
  const [brands, setBrands] = useState([]);
  const [recommendedProducts, setRecommendedProducts] = useState([]);
  const [banners, setBanners] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch all products
        const productsResponse = await axios.get("http://127.0.0.1:8000/products/");
        console.log("All Products Data:", productsResponse.data);
        const { products } = productsResponse.data;
        const brands = products.map(product => product.brand);
        setProducts(products);
        setBrands(brands);

        // Fetch recommended products with authorization token
        const token = localStorage.getItem('token');
        console.log("token", token);
        const recommendedResponse = await axios.get("http://127.0.0.1:8000/recommended/", {
          headers: {
            'Authorization': `${token}`,
          },
        });
        console.log("Recommended Products Data:", recommendedResponse.data.data);
        setRecommendedProducts(recommendedResponse.data.data);

        // Fetch banners data
        const bannersResponse = await axios.get("http://127.0.0.1:8000/offer-banner/");
        console.log("Banners Data:", bannersResponse.data.banner);
        setBanners(bannersResponse.data.banner);
      } catch (error) {
        console.error("Error fetching data:", error);
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
          sectionTitle="recomended for you"
          seeMoreUrl="/all-products"
          className="new-products mb-[60px]"
        />
        <ProductsAds
          ads={banners}
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
          categoryTitle="Top Selling Products"
        >
          <SectionStyleTwo
            type={3}
            products={products.slice(3, products.length)}
          />
        </ViewMoreTitle>

        <ProductsAds
          ads={[
            `${import.meta.env.VITE_PUBLIC_URL}/assets/images/ads-1.png`,
            `${import.meta.env.VITE_PUBLIC_URL}/assets/images/ads-2.png`,
          ]}
          sectionHeight="sm:h-[295px] h-full"
          className="products-ads-section mb-[60px]"
        />
        <SectionStyleOneHmThree
          type={3}
          categoryBackground={`${
            import.meta.env.VITE_PUBLIC_URL
          }/assets/images/section-category-2.jpg`}
          products={products.slice(4, products.length)}
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
