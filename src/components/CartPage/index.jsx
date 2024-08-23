import BreadcrumbCom from "../BreadcrumbCom";
import EmptyCardError from "../EmptyCardError";
import InputCom from "../Helpers/InputCom";
import PageTitle from "../Helpers/PageTitle";
import Layout from "../Partials/Layout";
import ProductsTable from "./ProductsTable";
import axios from "axios";
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import AddressDetails from "./AddressDetails";

export default function CardPage({ cart = true }) {
  const [cartProducts, setCartProducts] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [subtotal, setSubtotal] = useState(0);
  const [shipping, setShipping] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [total, setTotal] = useState(0);
  const [open, setOpen] = useState(false);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const fetchCartProducts = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_PUBLIC_URL}/cart-products/`, {
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
    } catch (error) {
      console.error('Error fetching cart products:', error);
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

  useEffect(() => {
    fetchCartProducts();
    fetchUserAddresses();
  }, [token]);

  const handleQuantityChange = () => {
    fetchCartProducts();
  };

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

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
              <ProductsTable className="mb-[30px]" cartProducts={cartProducts} onQuantityChange={handleQuantityChange} />
              <div className="w-full sm:flex justify-between">
                <div className="sm:w-[1000px] w-full mb-5 sm:mb-0">
                  <h1 className="sm:text-2xl text-xl text-qblack font-medium mb-5">
                    Select Address
                  </h1>
                  <div className="form-area">
                    <div className="mb-9">
                      <div className="border border-[#EDEDED] p-4 rounded-lg">
                        {addresses.map((address) => (
                          <div
                            key={address.id}
                            className="mb-3 p-3 border border-[#EDEDED] rounded-lg"
                          >
                            <label className="block mb-1 text-sm text-qgray mt-3">
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
                        <button onClick={handleOpen} className="text-sm text-qblack underline">
                          Add New Address
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="sm:w-[370px] w-full border border-[#EDEDED] px-[30px] py-[26px] mt-5 sm:mt-0">
                  <div className="sub-total mb-6">
                    <div className="flex justify-between mb-6">
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
                    <div className="flex justify-between">
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
      <AddressDetails open={open} handleClose={handleClose} />
    </Layout>
  );
}
