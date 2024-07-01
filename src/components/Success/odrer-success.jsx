import React from 'react';
import { Link } from 'react-router-dom';
import PageTitle from "../Helpers/PageTitle";
import Layout from "../Partials/Layout";

const OrderSuccess = () => {
  return (
    <Layout>
      <div className="order-success-page-wrapper w-full bg-white pb-[60px]">
        <div className="w-full mb-5">
          <PageTitle
            title="Order Success"
            breadcrumb={[
              { name: "home", path: "/" },
              { name: "order success", path: "/order-success" },
            ]}
          />
        </div>
        <div className="order-success-content w-full text-center">
          <div className="container-x mx-auto">
            <div className="w-full sm:mb-10 mb-5">
              <h1 className="text-3xl text-qblack font-medium mb-5">Thank You for Your Order!</h1>
              <p className="text-lg text-qgray mb-5">Your order has been successfully placed.</p>
              <p className="text-lg text-qgray mb-5">Order Number: #12345</p>
              <p className="text-lg text-qgray mb-5">You will receive an email confirmation shortly.</p>
              <Link to="/" className="black-btn mt-5 inline-block">
                <span className="text-sm font-semibold">Back to Home</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default OrderSuccess;
