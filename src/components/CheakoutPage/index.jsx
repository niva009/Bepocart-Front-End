import React, { useEffect, useState } from "react";
import axios from "axios";
import PageTitle from "../Helpers/PageTitle";
import Layout from "../Partials/Layout";

export default function CheckoutPage() {
  const [cartItems, setCartItems] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [shipping, setShipping] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [total, setTotal] = useState(0);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/cart-products/", {
          headers: {
            Authorization: `${token}`,
          },
        });
        const data = response.data; // Assuming response.data is the object returned
        setCartItems(data.data); // Assuming data.data contains the cart items
        console.log("Cart items:", data.data);
        console.log("Cart Total:", data.TotalPrice);
        console.log("Cart Subtotal:", data.Subtotal);
        console.log("Shipping Charge:", data.Shipping);
        setSubtotal(data.Subtotal ?? 0); // Setting subtotal with proper handling for NaN
        setShipping(data.Shipping ?? 0); // Setting shipping charge with proper handling for NaN
        setDiscount(data.Discount ?? 0); // Setting discount with proper handling for NaN
        setTotal(data.TotalPrice ?? 0); // Setting total with proper handling for NaN

      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };

    const fetchUserAddresses = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/get-address/", {
          headers: {
            Authorization: `${token}`,
          },
        });
        setAddresses(response.data.address);
        console.log("User addresses:", response.data.address);
      } catch (error) {
        console.error("Error fetching user addresses:", error);
      }
    };

    fetchCartItems();
    fetchUserAddresses();
  }, [token]);

  return (
    <Layout childrenClasses="pt-0 pb-0">
      <div className="checkout-page-wrapper w-full bg-white pb-[60px]">
        <div className="w-full mb-5">
          <PageTitle
            title="Checkout"
            breadcrumb={[
              { name: "home", path: "/" },
              { name: "checkout", path: "/checkout" },
            ]}
          />
        </div>
        <div className="checkout-main-content w-full">
          <div className="container-x mx-auto">
            <div className="w-full sm:mb-10 mb-5">
              {/* Address Selection */}
              <div className="sm:flex sm:space-x-5">
                <div className="sm:w-1/2 w-full mb-5 h-[70px]">
                  <a href="#">
                    <div className="w-full h-full bg-[#F6F6F6] text-qblack flex justify-center items-center">
                      <span className="text-[15px] font-medium">
                        Log into your Account
                      </span>
                    </div>
                  </a>
                </div>
                <div className="flex-1 h-[70px]">
                  <a href="#">
                    <div className="w-full h-full bg-[#F6F6F6] text-qblack flex justify-center items-center">
                      <span className="text-[15px] font-medium">
                        Enter Coupon Code
                      </span>
                    </div>
                  </a>
                </div>
              </div>
            </div>
            <div className="w-full lg:flex lg:space-x-5">
              <div className="lg:w-1/2 w-full">
                <h1 className="sm:text-2xl text-xl text-qblack font-medium mb-5">
                  Select Address
                </h1>
                <div className="form-area">
                  {/* Address Selection */}
                  <div className="mb-5">
                    <div className="border border-[#EDEDED] p-4 rounded-lg">
                      {addresses.map((address) => (
                        <div
                          key={address.id}
                          className="mb-3 p-3 border border-[#EDEDED] rounded-lg"
                        >
                          <label className="block mb-1 text-sm text-qgray">
                            <input
                              type="radio"
                              name="address"
                              className="mr-2"
                            // Implement onChange handler to select address
                            />
                            {`${address.address}, ${address.email}, ${address.phone}, ${address.pincode}, ${address.city}, ${address.state}`}
                          </label>
                        </div>
                      ))}
                      {/* Add new address button */}
                      <button className="text-sm text-qblack underline">
                        Add New Address
                      </button>
                    </div>
                  </div>
                  {/* Other form fields */}
                </div>
              </div>
              <div className="flex-1">
                <h1 className="sm:text-2xl text-xl text-qblack font-medium mb-5">
                  Order Summary
                </h1>
                {/* Order Summary component */}
                <div className="w-full px-10 py-6 border border-[#EDEDED]">
                  {/* Product list */}
                  <div className="product-list w-full mb-6">
                    <ul className="flex flex-col space-y-4">
                      {cartItems.map((item, index) => (
                        <li key={index}>
                          <div className="flex justify-between items-center">
                            <div className="flex items-center space-x-3">
                              <div className="rounded-full overflow-hidden w-12 h-12">
                                <img
                                  src={`http://127.0.0.1:8000/${item.image}`}
                                  alt={item.name}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <div>
                                <h4 className="text-[15px] text-qblack mb-1.5">
                                  {item.name.length > 20 ? `${item.name.substring(0, 20)}...` : item.name}
                                  <sup className="text-[13px] text-qgray ml-1 mt-1">
                                    x{item.quantity}
                                  </sup>
                                </h4>

                                <p className="text-[13px] text-qgray">
                                  {item.description}
                                </p>
                              </div>
                            </div>
                            <div>
                              <span className="text-[15px] text-qblack font-medium">
                                ${item.salePrice}
                              </span>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                  {/* Subtotal and total */}
                  <div className="flex justify-between">
                    <div>
                      <p className="text-[13px] font-medium text-qblack uppercase">
                        Subtotal
                      </p>
                    </div>
                    <div>
                      <p className="text-[15px] font-medium text-qblack">
                        ${total.toFixed(2)}
                      </p>
                    </div>
                  </div>
                  {/* Shipping */}
                  <div className="flex justify-between mt-4">
                    <div>
                      <p className="text-[13px] font-medium text-qblack uppercase">
                        Shipping
                      </p>
                    </div>
                    <div>
                      <p className="text-[15px] font-medium text-qblack">
                        {shipping === 0 ? (
                          <span style={{ color: 'green' }}>Free Delivery</span>
                        ) : (
                          `$${shipping.toFixed(2)}`
                        )}
                      </p>
                    </div>

                  </div>
                  {/* Order total */}
                  <div className="flex justify-between mt-4">
                    <div>
                      <p className="text-[15px] font-medium text-qblack uppercase">
                        Total
                      </p>
                    </div>
                    <div>
                      <p className="text-[15px] font-medium text-qred">${subtotal.toFixed(2)}
                      </p>
                    </div>
                  </div>
                  {/* Payment methods */}
                  <div className="mt-6">
                    <p className="text-lg font-medium text-qblack mb-3">
                      Payment Method
                    </p>
                    <div className="flex space-x-3 items-center">
                      <input
                        type="radio"
                        id="cashOnDelivery"
                        name="paymentMethod"
                        className="text-accent-pink-500"
                      />
                      <label htmlFor="cashOnDelivery" className="text-qblack">
                        Cash on Delivery
                      </label>
                    </div>
                    <div className="flex space-x-3 items-center mt-2">
                      <input
                        type="radio"
                        id="creditCard"
                        name="paymentMethod"
                        className="text-accent-pink-500"
                      />
                      <label htmlFor="creditCard" className="text-qblack">
                        Net Banking
                      </label>
                    </div>
                  </div>
                  {/* Place order button */}
                  <div className="mt-6">
                    <a href="#">
                      <div className="w-full h-12 bg-black text-white flex justify-center items-center">
                        <span className="text-sm font-semibold">
                          Place Order Now
                        </span>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
