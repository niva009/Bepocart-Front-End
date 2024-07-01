import { Link } from "react-router-dom";
import BreadcrumbCom from "../BreadcrumbCom";
import EmptyCardError from "../EmptyCardError";
import InputCom from "../Helpers/InputCom";
import PageTitle from "../Helpers/PageTitle";
import Layout from "../Partials/Layout";
import ProductsTable from "./ProductsTable";
import axios from "axios";
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";

export default function CardPage({ cart = true }) {
  const [cartProducts, setCartProducts] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [subtotal, setSubtotal] = useState(0);
  const [shipping, setShipping] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [total, setTotal] = useState(0);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCartProducts = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/cart-products/', {
          headers: {
            Authorization: `${token}`,
          },
        });
        const data = response.data;
        setCartProducts(data.data);
        setSubtotal(data.Subtotal ?? 0);
        setShipping(data.Shipping ?? 0);
        setDiscount(data.Discount ?? 0);
        setTotal(data.TotalPrice ?? 0);

        console.log("Total:", data.Subtotal);
        console.log("Discount:", data.Discount);
        console.log("Shipping Charge:", data.Shipping);
        console.log("Sub total:", data.TotalPrice);

      } catch (error) {
        console.error('Error fetching cart products:', error);
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

    fetchCartProducts();
    fetchUserAddresses();
  }, [token]);

  const handleSelectAddress = (addressId) => {
    setSelectedAddressId(addressId);
  };

  const handleProceedToCheckout = () => {
    if (selectedAddressId) {
      navigate(`/checkout/${selectedAddressId}/`);
    } else {
      alert("Please select an address before proceeding to checkout.");
    }
  };

  console.log("Selected Address Id:", selectedAddressId);

  return (
    <Layout childrenClasses={cart ? "pt-0 pb-0" : ""}>
      {cart === false ? (
        <div className="cart-page-wrapper w-full">
          <div className="container-x mx-auto">
            <BreadcrumbCom
              paths={[
                { name: "home", path: "/" },
                { name: "cart", path: "/cart" },
              ]}
            />
            <EmptyCardError />
          </div>
        </div>
      ) : (
        <div className="cart-page-wrapper w-full bg-white pb-[60px]">
          <div className="w-full">
            <PageTitle
              title="Your Cart"
              breadcrumb={[
                { name: "home", path: "/" },
                { name: "cart", path: "/cart" },
              ]}
            />
          </div>
          <div className="w-full mt-[23px]">
            <div className="container-x mx-auto">
              <ProductsTable className="mb-[30px]" cartProducts={cartProducts} />
              <div className="w-full sm:flex justify-between">
                <div className="discount-code sm:w-[1000px] w-full mb-5 sm:mb-0 h-[50px] flex">
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
                                  onChange={() => handleSelectAddress(address.id)}
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
                </div>
                <div className="flex space-x-2.5 items-center">
                  <Link to="/">
                    <div className="w-[220px] h-[50px] bg-[#F6F6F6] flex justify-center items-center">
                      <span className="text-sm font-semibold">
                        Continue Shopping
                      </span>
                    </div>
                  </Link>
                  <button type="button" className="w-[140px] h-[50px] bg-[#F6F6F6] flex justify-center items-center">
                    <a href="/cart" className="text-sm font-semibold">Update Cart</a>
                  </button>
                </div>
              </div>
              <div className="w-full mt-[30px] flex sm:justify-end">
                <div className="sm:w-[370px] w-full border border-[#EDEDED] px-[30px] py-[26px]">
                  <div className="sub-total mb-6">
                    <div className=" flex justify-between mb-6">
                      <p className="text-[15px] font-medium text-qblack">
                        Subtotal
                      </p>
                      <p className="text-[15px] font-medium text-qred">${total.toFixed(2)}</p>
                    </div>
                    <div className="w-full h-[1px] bg-[#EDEDED]"></div>
                  </div>
                  <div className="shipping mb-6">
                    <span className="text-[15px] font-medium text-qblack mb-[18px] block">
                      Shipping
                    </span>
                    <ul className="flex flex-col space-y-1">
                      <li>
                        <div className="flex justify-between items-center">
                          <div className="flex space-x-2.5 items-center">
                            {/* <div className="input-radio">
                              <input
                                type="radio"
                                name="price"
                                className="accent-pink-500"
                              />
                            </div> */}
                            <span className="text-[13px] text-normal text-green-500">
                              Discount
                            </span>
                          </div>
                          <span className="text-[13px] text-normal text-green-500">
                            +${discount.toFixed(2)}
                          </span>
                        </div>
                      </li>
                      <li>
                        <div className="flex justify-between items-center">
                          <div className="flex space-x-2.5 items-center">
                            {/* <div className="input-radio">
                              <input
                                type="radio"
                                name="price"
                                className="accent-pink-500"
                              />
                            </div> */}
                            <span className="text-[13px] text-normal text-green-500">
                              Shipping Charge
                            </span>
                          </div>
                          <span className="text-[13px] text-normal text-green-500">
                            +${shipping.toFixed(2)}
                          </span>
                        </div>
                      </li>

                    </ul>
                  </div>
                  <div className="total mb-6">
                    <div className=" flex justify-between">
                      <p className="text-[18px] font-medium text-qblack">
                        Total
                      </p>
                      <p className="text-[18px] font-medium text-qred">${subtotal.toFixed(2)}</p>
                    </div>
                  </div>
                  <div className="w-full h-[50px] black-btn flex justify-center items-center" onClick={handleProceedToCheckout}>
                    <span className="text-sm font-semibold">
                      Proceed to Checkout
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}
