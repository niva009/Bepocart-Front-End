import BreadcrumbCom from "../BreadcrumbCom";
import EmptyCardError from "../EmptyCardError";
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
  const [free_quantity, Setfree] = useState(0);
  const [shipping, setShipping] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [total, setTotal] = useState(0);
  const [open, setOpen] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);


  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const fetchCartProducts = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_PUBLIC_URL}/cart-products/`, {
        headers: {
          'Authorization': `${token}`,
        },
      });

      const data = response.data;
      setCartProducts(data.data);
      setSubtotal(data.Subtotal ?? 0);
      setShipping(data.Shipping ?? 0);
      setDiscount(data.Discount ?? 0);
      setTotal(data.TotalPrice ?? 0);
      Setfree(data.free ?? 0);
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

  const content = cartProducts.map(product => ({
    id:product.id,
    name: product.name,
    currency:"INR",
    price: product.salePrice,
    quantity:product.quantity,

  }))



  const handleTrackCheckout = () => {
    fbq('track', 'InitiateCheckout', {
      value: parseFloat(subtotal).toFixed(2), // Ensure it's a number
      currency: 'INR',
      content_ids: cartProducts.map(product => product.id.toString()),
      contents: content,
      content_type: 'product',
    });
  };

  const handleGoogleTrackCheckOut = () => {
    if (!cartProducts || cartProducts.length === 0) {
      console.error("No products in the cart to track.");
      return;
    }
  
    const cartItems = cartProducts.map((product) => ({
      item_id:   product.id,    // Use SKU or product ID
      item_name: product.name,               // Product name
      affiliation: "Bepocart",               // Store or brand name
      item_brand: "Bepocart",  // Brand or default brand
      item_category: product.mainCategory,   // Main category
      item_category2: product.subcategory_slug,   // Subcategory
      price: parseFloat(product.salePrice).toFixed(2), // Price (convert to float and fix to 2 decimal places)
      quantity: product.quantity             // Quantity
    }));
  
    window.dataLayer.push({
      event: "begin_checkout",
      ecommerce: {
        currency: "INR",  
        value: parseFloat(subtotal).toFixed(2),  
        items: cartItems 
      }
    });
  
    console.log("Begin Checkout event tracked:", cartItems);
  };
  


  const checkoutUpdate = () =>{
    handleTrackCheckout();
    handleProceedToCheckout();
    handleGoogleTrackCheckOut();
  }

  const CheckCart = () => {
    const isOutOfStock = cartProducts.some(product => product.stock === 0);
    setIsButtonDisabled(isOutOfStock); // Disable button if any product is out of stock
  };
  

  useEffect(() => {
    CheckCart();
  }, [cartProducts]);
  

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleUpdateCart = () => {
    fetchCartProducts();
  };
  const handleUpdate = () =>{
    fetchCartProducts();
  }



  const hasFreeProduct = cartProducts.some(cart => cart.discount_product === "normal");


  return (
    <Layout childrenClasses={cart ? "pt-0 pb-0" : ""}>
      {cart === false ? (
        <div className="cart-page-wrapper w-full">
          <div className="container-x mx-auto px-4">
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
          <div className="container-x mx-auto px-4">
            <PageTitle
              title="Your Cart"
              breadcrumb={[
                { name: "home", path: "/" },
                { name: "cart", path: "/cart" },
              ]}
            />
            <ProductsTable className="mb-6" cartProducts={cartProducts} onQuantityChange={handleQuantityChange} onProductRemove={handleUpdate} />



            <div className="flex flex-col sm:flex-row justify-between mt-6">
              <div className="address-selection-container sm:w-[750px] w-full mb-6 sm:mb-0 flex flex-col">
                <h1 className="text-xl sm:text-2xl font-semibold text-qblack mb-5">
                  Select Address
                </h1>
                <div className="address-list border border-[#EDEDED] rounded-lg p-4 bg-white">
                  {addresses.length > 0 ? (
                    addresses.map((address) => (
                      <div
                        key={address.id}
                        className={`address-item mb-3 p-4 border border-[#EDEDED] rounded-lg cursor-pointer hover:bg-gray-100 transition-colors duration-200 ${selectedAddressId === address.id ? 'bg-gray-100' : ''
                          }`}
                        onClick={() => handleSelectAddress(address.id)}
                      >
                        <label className="block text-sm text-qgray">
                          <input
                            type="radio"
                            name="address"
                            className="mr-2"
                            checked={selectedAddressId === address.id}
                            readOnly
                          />
    <span>
  {`${address.name},${address.address}, ${address.email}, ${address.phone}, ${address.pincode}, ${address.city}, ${address.state}`}
</span>

                        </label>
                      </div>
                    ))
                  ) : (
                    <p className="text-center text-gray-500">No addresses available</p>
                  )}
                  <button
                    onClick={handleOpen}
                    className="mt-4 px-4 py-2 bg-qh3-blue text-white font-semibold rounded-lg shadow-md hover:bg-qh3-blue focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition duration-200"
                  >
                    Add New Address
                  </button>
                </div>
              </div>


              <div className="cart-summary w-full sm:w-[370px] border border-[#EDEDED] px-4 py-6 flex flex-col">
                <div className="flex flex-col sm:flex-row justify-between mb-6">
                  <p className="text-sm sm:text-base font-medium text-qblack">
                    Subtotal
                  </p>
                  <p className="text-sm sm:text-base font-medium text-qred">₹{total.toFixed(2)}</p>
                </div>
                {!hasFreeProduct && (
                <div className="free-quantity-box mt-5 p-2 border-dotted border-2 border-green-500 rounded-lg text-center">
                
                  <p className="text-sm font-semibold text-blue-500">
                    Free Quantity: {free_quantity}
                  </p>
                  
                </div>
              )}
                <div className="w-full h-[1px] bg-[#EDEDED] mb-6"></div>
                <div className="shipping mb-6">
                  <span className="text-sm sm:text-base font-medium text-qblack mb-3 block">
                    Shipping
                  </span>
                  <ul className="flex flex-col space-y-1">
                    <li>
                      <div className="flex justify-between items-center">
                        <span className="text-xs sm:text-sm text-green-500">
                          Discount
                        </span>
                        <span className="text-xs sm:text-sm text-green-500">
                          +₹{discount.toFixed(2)}
                        </span>
                      </div>
                    </li>
                    <li>
                      <div className="flex justify-between items-center">
                        <span className="text-xs sm:text-sm text-green-500">
                          Shipping Charge
                        </span>
                        <span className="text-xs sm:text-sm text-green-500">
                          +₹{shipping.toFixed(2)}
                        </span>
                      </div>
                    </li>
                  </ul>
                </div>
                <div className="total mb-6">
                  <div className="flex justify-between">
                    <p className="text-lg sm:text-xl font-medium text-qblack">
                      Total
                    </p>
                    <p className="text-lg sm:text-xl font-medium text-qred">₹{subtotal.toFixed(2)}</p>
                  </div>
                </div>
                <div
        className={`w-full h-[50px] bg-black text-white flex justify-center items-center rounded-md cursor-pointer ${
          isButtonDisabled ? 'opacity-50 cursor-not-allowed' : ''
        }`}
        onClick={!isButtonDisabled ? checkoutUpdate : null}
        disabled={isButtonDisabled}
      >
        <span className="text-sm font-semibold">
          Proceed to Checkout
        </span>
      </div>
                
              </div>
            </div>
          </div>
          <AddressDetails open={open} handleClose={handleClose} />
        </div>
      )}
    </Layout>
  );
}
