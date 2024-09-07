import React, { useEffect, useState } from "react";
import axios from "axios";
import PageTitle from "../Helpers/PageTitle";
import Layout from "../Partials/Layout";
import TextField from '@mui/material/TextField';
import { useParams, useNavigate } from "react-router-dom";

export default function CheckoutPage() {
  const [cartItems, setCartItems] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [dataSubTotal, setDataSubTotal] = useState(0);
  const [shipping, setShipping] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [total, setTotal] = useState(0);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [couponData, setCouponData] = useState([]);
  const [couponCode, setCouponCode] = useState("");
  const [couponError, setCouponError] = useState(null);
  const [couponDiscount, setCouponDiscount] = useState(0);
  const [ offer, setOffer] = useState("");
  const [ profile, setProfile] = useState([]);


  const token = localStorage.getItem("token");
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    setSelectedAddress(parseInt(id)); // Parse id from params
  }, [id]);

  useEffect(() => {
    fetchProfileData();
  }, []);

  const fetchProfileData = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_PUBLIC_URL}/profile-view/`, {
        headers: {
          Authorization: `${localStorage.getItem('token')}`,
        },
      });

      setProfile(response.data.data);
    } catch (error) {
      console.error('Error fetching profile data:', error);
    }
  };


  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_PUBLIC_URL}/cart-products/`, {
          headers: {
            Authorization: `${token}`,
          },
        });
        const data = response.data;
        setCartItems(data.data);
        setSubtotal(data.Subtotal ?? 0);
        setDataSubTotal(data.Subtotal ?? 0)
        setShipping(data.Shipping ?? 0);
        setDiscount(data.Discount ?? 0);
        setTotal(data.TotalPrice ?? 0);
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };

    const fetchUserAddresses = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_PUBLIC_URL}/get-address/`, {
          headers: {
            Authorization: `${token}`,
          },
        });
        setAddresses(response.data.address);
      } catch (error) {
        console.error("Error fetching user addresses:", error);
      }
    };

    const fetchCouponData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_PUBLIC_URL}/cupons/`);
        setCouponData(response.data);
      } catch (error) {
        console.error("Error fetching coupon data:", error);
      }
    };

    fetchCartItems();
    fetchUserAddresses();
    fetchCouponData();
  }, [token]);




  useEffect(() => {
    let calculatedTotal = total + shipping - discount;
  
    if (paymentMethod === "COD" && dataSubTotal) {
      calculatedTotal += 40; // Add ₹40 COD charge for orders below ₹500
    }
  
    setSubtotal(calculatedTotal);
  }, [total, shipping, discount, paymentMethod,dataSubTotal]);







  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method);
    
    let newShipping = 0;
  
    if (dataSubTotal< 500) {
      newShipping = 60;
    } 
    
    setShipping(newShipping);
  };

  

useEffect(() =>{
 
 const offerProduct = cartItems.some((element) => element.has_offer === "Offer Applied")
 setOffer (offerProduct)
},[cartItems]);



  const initializeRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";

      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  const makePayment = async () => {
    // Initialize Razorpay SDK
    const isRazorpayLoaded = await initializeRazorpay();
    if (!isRazorpayLoaded) {
      alert("Failed to load Razorpay SDK. Please try again later.");
      return;
    }
  
    // Check if address is selected
    if (!selectedAddress) {
      alert("Please select an address to place the order.");
      return;
    }
  
    // Proceed with payment initiation
    try {
      const paymentOptions = {
        key: `${import.meta.env.VITE_PAYMENT_KEY}`, // Razorpay Key ID
        name: "BepoCart Pvt Limited",
        currency: "INR",
        amount: (subtotal * 100).toString(), // Amount in paise
        description: "Thank you for your order",
        image: "https://manuarora.in/logo.png",
        callback_url: '/order-success',
        handler: async function (response) {
          // Payment handler
          const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = response;
  
          try {
            // Create order after successful payment
            const orderResponse = await axios.post(
              `${import.meta.env.VITE_PUBLIC_URL}/order/create/${selectedAddress}/`,
              {
                payment_method: paymentMethod,
                coupon_code: couponCode,
                payment_id: razorpay_payment_id, // Send payment ID
              },
              {
                headers: {
                  'Authorization': `${token}`,
                },
              }
            );

  
            if (orderResponse.status === 200) {
              alert("Payment successful and order created!");
              navigate('/order-success');
            } else {
              alert("Failed to create order. Please try again.");
            }
          } catch (orderError) {
            console.error("Error creating order:", orderError);
            alert("An error occurred while creating your order. Please try again.");
          }
        },
        prefill: {
          name: profile.first_name,
          email: profile.email,
          contact: profile.phone,
        },
      };
  
      // Open Razorpay payment dialog
      const paymentObject = new window.Razorpay(paymentOptions);
      paymentObject.open();
    } catch (error) {
      console.error("Error initializing payment:", error);
      alert("Payment initialization failed. Redirecting to cart.");
      navigate("/cart"); // Redirect to cart if payment fails
    }
  };


  const handlePlaceOrder = async () => {
    if (paymentMethod === "COD") {
      try {
        await axios.post(`${import.meta.env.VITE_PUBLIC_URL}/order/create/${selectedAddress}/`, {
          payment_method: paymentMethod,
          coupon_code: couponCode,
        }, {
          headers: {
            'Authorization': `${token}`,
          },
        });
        navigate("/order-success");
      } catch (error) {
        console.error("Error creating COD order:", error);
        alert("Order creation failed.");
      }
    } else {
      makePayment();
    }
  };



  const handleChange = (e) => {
    const { name, value } = e.target;
    setCouponCode(value);
  };


  const applyCoupon = () => {
    setCouponError(null); 
    if (couponCode !== "") {
      const appliedCoupon = couponData.find(
        (coupon) => coupon.code === couponCode && coupon.status === "Active"
      );
  
      if (appliedCoupon) {
        alert("Coupon code applied successfully");
        
        let discountAmount = 0;
        if (appliedCoupon.coupon_type === "Percentage") {
          discountAmount = (subtotal * parseFloat(appliedCoupon.discount)) / 100;
        } else {
          discountAmount = parseFloat(appliedCoupon.discount);
        }
  
        setCouponDiscount(discountAmount);
        setDiscount((prevDiscount) => prevDiscount + discountAmount);
      } else {
        setCouponError("Invalid or inactive coupon code");
      }
    } else {
      setCouponError("Please enter a coupon code");
    }
  };
  


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
           <div className="w-full mb-5 lg:mb-0 lg:w-1/2">
                <div className="flex flex-col lg:flex-row items-center space-y-4 lg:space-y-0 lg:space-x-4">
                  <TextField
                    placeholder="Enter your discount code"
                    name='couponCode'
                    onChange={handleChange}
                    disabled={offer === true}
                    style={{ border: '2px dotted #ccc', borderRadius: '0.375rem' }} // Adjust border and radius
                    className="w-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-qh3-blue"
                  />
                  <button
                    type="button"
                    className="w-full lg:w-[120px] h-[44px] bg-black text-white rounded-md hover:bg-gray-800 disabled:opacity-50"
                    onClick={applyCoupon}
                    disabled={offer === true}
                  >
                    <span className="text-lg font-semibold">Apply</span>
                  </button>
                </div>
                {offer && (
                  <p className="text-center lg:text-left text-sm text-red-500 mt-2">
                    Coupon codes cannot be applied to products with an active offer. Please enjoy the current discount!
                  </p>
                )}
              </div>

              <div className="lg:w-1/2 w-full">
                <h1 className="sm:text-2xl text-xl text-qblack font-medium mb-5">
                  Order Summary
                </h1>
                <div className="w-full px-10 py-6 border border-[#EDEDED]">
                  <div className="product-list w-full mb-6">
                    <ul className="flex flex-col space-y-4">
                      {cartItems.map((item, index) => (
                        <li key={index}>
                          <div className="flex justify-between items-center">
                            <div className="flex items-center space-x-3">
                              <div className="rounded-full overflow-hidden w-12 h-12">
                                <img
                                  src={`${item.image}`}
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
                              ₹{item.salePrice * item.quantity}
                              </span>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex justify-between">
                    <div>
                      <p className="text-[13px] font-medium text-qblack uppercase">
                        Subtotal
                      </p>
                    </div>
                    <div>
                      <p className="text-[15px] font-medium text-qblack">
                      ₹{total.toFixed(2)}
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <div>
                      <p className="text-[13px] font-medium text-qblack uppercase">
                        Discount
                      </p>
                    </div>
                    <div>
                      <p className="text-[15px] font-medium text-qblack">
                      ₹{discount.toFixed(2)}
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-between mt-4">
                  <div>
  <p className="text-[13px] font-medium text-qblack uppercase">
    Shipping
  </p>
  
  {couponDiscount > 0 && (
    <p className="text-[13px] font-medium text-green-500 uppercase">
      Coupon Discount: -₹{couponDiscount.toFixed(2)}
    </p>
  )}
</div>
<div>
  <p className="text-[15px] font-medium text-qblack">
    {shipping === 0 ? (
      <span style={{ color: 'green' }}>Free Delivery</span>
    ) : (
      `₹${shipping.toFixed(2)}`
    )}
  </p>
</div>
       </div>
       {dataSubTotal !== undefined  && paymentMethod == "COD" &&(
  <div className="flex justify-between">
    <div>
      <p className="text-[13px] mt-3 font-medium text-qblack uppercase">
        COD
      </p>
    </div>
    <div>
      <p className="text-[15px] font-medium mt-3 text-qblack">
        ₹40
      </p>
    </div>
  </div>
)}

                  <div className="flex justify-between mt-4">
                    <div>
                      <p className="text-[15px] font-medium text-qblack uppercase">
                        Total
                      </p>
                    </div>
                    <div>
                      <p className="text-[15px] font-medium text-qred">₹{(subtotal).toFixed(2)}
                      </p>
                    </div>
                  </div>
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
                        onChange={() => handlePaymentMethodChange("COD")}
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
                        onChange={() => handlePaymentMethodChange("razorpay")}
                      />
                      <label htmlFor="creditCard" className="text-qblack">
                        Net Banking
                      </label>
                    </div>
                  </div>
                  <div className="mt-6">
                    <button className="w-full h-12 bg-black text-white flex justify-center items-center" onClick={handlePlaceOrder}>
                      <span className="text-sm font-semibold">
                        Place Order Now
                      </span>
                    </button>
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
