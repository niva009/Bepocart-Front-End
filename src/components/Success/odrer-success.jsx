import React from 'react';
import { Link } from 'react-router-dom';
import PageTitle from "../Helpers/PageTitle";
import Layout from "../Partials/Layout";
import { IoCheckmarkCircleOutline } from "react-icons/io5";

const OrderSuccess = () => {
  return (
    <Layout>
      <div className="order-success-page-wrapper w-full bg-white pb-[60px]">
        <div className="w-full mb-5">
          <PageTitle
            // title="Order Success"
            breadcrumb={[
              { name: "home", path: "/" },
              { name: "order success", path: "/order-success" },
            ]}
          />
        </div>
        <div className="order-success-content w-full text-center">
          <div className="container-x mx-auto">
            <div className="w-full sm:mb-10 mb-5">
              <div className= "flex items-center justify-center">
              <IoCheckmarkCircleOutline size={70} style={{color:"#07b03d",margin:"10px 0px"}} />
              </div>
              <h1 className="text-3xl text-qblack font-medium mb-5">Thank You for Your Order!</h1>
              <p className="text-lg text-qgray mb-5">Your order has been successfully placed.</p>
              <p className="text-lg text-qgray mb-5">You will receive an email confirmation shortly.</p>
              <Link
  to="/"
  style={{
    display: 'inline-block',
    textDecoration: 'none',
    borderRadius: '5px',
    backgroundColor: '#28a745', // Green background color
    padding: '12px 24px', // Adjust padding for better spacing
    fontSize: '1rem', // Adjust size as needed
    fontWeight: '600',
    color: '#fff', // White text color
    transition: 'background-color 0.3s ease, transform 0.3s ease',
  }}
  onMouseEnter={(e) => {
    e.target.style.backgroundColor = '#218838'; // Darker green on hover
    e.target.style.transform = 'scale(1.05)'; // Slightly enlarges on hover
  }}
  onMouseLeave={(e) => {
    e.target.style.backgroundColor = '#28a745'; // Return to original green
    e.target.style.transform = 'scale(1)'; // Return to original size
  }}
  onMouseDown={(e) => {
    e.target.style.transform = 'scale(0.95)'; // Slightly shrinks on click
  }}
  onMouseUp={(e) => {
    e.target.style.transform = 'scale(1)'; // Return to original size
  }}
>
  <span
    style={{
      display: 'inline-block',
      textDecoration: 'none',
    }}
  >
    Back to Home
  </span>
</Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default OrderSuccess;
