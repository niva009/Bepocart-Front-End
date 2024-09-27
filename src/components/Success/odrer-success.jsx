import React from 'react';
import { Link } from 'react-router-dom';
import PageTitle from "../Helpers/PageTitle";
import Layout from "../Partials/Layout";
import { IoCheckmarkCircleOutline } from "react-icons/io5";
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';

const OrderSuccess = () => {
  const location = useLocation();
  const data = location.state;

  console.log("data in order success page", data);



  const contents = data && data.contents ? data.contents.map(product => ({
    id: product.id,
    name: product.name,
    currency: "INR",
    price: product.price,
    quantity: product.quantity,
  })) : [];

  // Add conditional check before calling 'fbq' function
  useEffect(() => {
    if (data && data.value) {
      fbq('track', 'Purchase', {
        value: data.value,
        currency: 'INR',
        transaction_id: data.transaction_id,
        content_ids: ['112233', '445566'],
        contents: contents,
        num_items: data.num_items,
        content_type: 'product',
        coupon_code: data.coupon_code,
        payment_method: data.payment_method,
        customer_segment: 'new_customer',
      });
    }
  }, [data, contents]);

  let shipCharge = data.value > 500 ? 60: 0;
  let deliveryCharge = data.payment_method === "COD" ? 40: 0;

  useEffect(() => {
    if (data && data.value) {
      const PurchaseItems = data.contents.map((product) => ({
        item_id: product.id,
        item_name: product.name,
        affiliation: "Bepocart",
        coupon: product.coupon_code || null, // Add coupon if it exists
        discount: product.discount || null,  // Add discount dynamically or a default
        item_brand:"Bepocart", // Use brand dynamically if available
        price: parseFloat(product.price).toFixed(2),    // Product price formatted as float
        quantity: product.quantity                      // Quantity of the product
      }));
  
      // Pushing the purchase event to the dataLayer
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: "purchase",
        ecommerce: {
          transaction_id: data.transaction_id,  // Transaction ID from data
          value: parseFloat(data.value).toFixed(2), // Total value of the transaction
          shipping: shipCharge,         // Shipping cost (can be dynamic)
          delivery_charge: deliveryCharge,  // Delivery charge (can be dynamic)
          currency: "INR",        // Currency should be a string
          coupon: data.coupon_code || null,  // Coupon code if available
          items: PurchaseItems    // The mapped purchase items
        }
      });
    }
  }, [data]);
  

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
