import React, { useState, useEffect ,lazy} from 'react';
import BreadcrumbCom from '../components/BreadcrumbCom';
import ProductCardStyleOne  from '../components/Helpers/Cards/ProductCardStyleOne' ;
import DataIteration  from '../components/Helpers/DataIteration';
import Layout  from '../components/Partials/Layout' ;
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function OfferProducts() {
  const { id } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);



      axios.get(`${import.meta.env.VITE_PUBLIC_URL}/offers/`)
        .then((response) => {
          const products = response;
          setProducts(products.data.data);
        })
        .catch((error) => {
          console.error('Error fetching products:', error);
          setError(error?.response?.data?.message || 'An error occurred while fetching products');
          setLoading(false);
        });


  console.log(products, "category information");



  return (
    <Layout>
      <div className="products-page-wrapper w-full">
        <div className="container-x mx-auto">
          <BreadcrumbCom />
          <div className="w-full lg:flex lg:space-x-[30px]">
            <div className="lg:w-[270px]">
              <div className="w-full hidden lg:block h-[295px]">
                <img
                  src={`${import.meta.env.VITE_PUBLIC_URL}/assets/images/ads-5.png`}
                  alt=""
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
            <div className="flex-1">
              <div className="grid xl:grid-cols-3 sm:grid-cols-2 grid-cols-1 xl:gap-[30px] gap-5 mb-[40px]">
                {loading ? (
                  <p>Loading...</p>
                ) : error ? (
                  <p>{error}</p>
                ) : products.length > 0 ? (
                  <DataIteration datas={products}>
                    {({ datas }) => (
                      <div data-aos="fade-up" key={datas.id}>
                        <ProductCardStyleOne datas={datas} />
                      </div>
                    )}
                  </DataIteration>
                ) : (
                  <p>No products found</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
