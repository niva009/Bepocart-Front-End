import { useEffect, useState } from 'react';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';

export default function ProductsTable({ className }) {
  const [cartProducts, setCartProducts] = useState([]);
  const [offer, setOffer] = useState([]);


  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_PUBLIC_URL}/offer/`)
      .then((response) => {
        setOffer(response.data);
      })
      .catch((error) => {
        console.log("error fetching offer products", error);
      });
  }, []);

  useEffect(() => {
    const fetchCartProducts = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(`${import.meta.env.VITE_PUBLIC_URL}/cart-products/`, {
          headers: {
            Authorization: `${token}`,
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch cart products');
        }
        const data = await response.json();
        setCartProducts(data.data);
      } catch (error) {
        console.error('Error fetching cart products:', error);
      }
    };

    fetchCartProducts();
  }, []);

  const handleDeleteProduct = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${import.meta.env.VITE_PUBLIC_URL}/cart-delete/${id}/`, {
        headers: {
          Authorization: `${token}`,
        },
      });
      setCartProducts(prevProducts => prevProducts.filter(product => product.id !== id));
    } catch (error) {
    console.error('Error deleting product:', error);
    }
  };

  const updateProductQuantityIncrement = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(`${import.meta.env.VITE_PUBLIC_URL}/cart/increment/${id}/`, {}, {
        headers: {
          Authorization: `${token}`,
        },
      });
      if (response.status === 200) {
        setCartProducts(prevProducts => prevProducts.map(product =>
          product.id === id ? { ...product, quantity: product.quantity + 1 } : product
        ));
      } else {
        throw new Error('Failed to update product quantity');
      }
    } catch (error) {
      console.error('Error updating product quantity:', error);
    }
  };

  const updateProductQuantityDecrement = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(`${import.meta.env.VITE_PUBLIC_URL}/cart/decrement/${id}/`, {}, {
        headers: {
          Authorization: `${token}`,
        },
      });
      if (response.status === 200) {
        setCartProducts(prevProducts => prevProducts.map(product =>
          product.id === id ? { ...product, quantity: product.quantity - 1 } : product
        ));
      } else {
        throw new Error('Failed to update product quantity');
      }
    } catch (error) {
      console.error('Error updating product quantity:', error);
 
    }
  };

  const increment = (id, currentQuantity, stock) => {
    if (currentQuantity < stock) {
      updateProductQuantityIncrement(id);
    }
  };

  const decrement = (id, currentQuantity) => {
    if (currentQuantity > 1) {
      updateProductQuantityDecrement(id);
    }
  };

  const hasOfferProducts = cartProducts.some(product => product.offer_type !== null);

  console.log("cart data......:", cartProducts);
  console.log("offer getting details  ", offer);

  const offerCategory = offer[0];

  console.log("offerCategory-information", offerCategory);
  console.log("cart information:", cartProducts);

  // Log offerCategory details for debugging
  console.log("offerCategory:", offerCategory);
  console.log("is_active:", offerCategory?.is_active);
  console.log("get_option:", offerCategory?.get_option);

  let totalPrice = 0;
  let offerName = "";
  let freeQuantity = 0;
  let discountAllowedProducts = []; // Array to store products with discount_product === "Discount Allowed"
  
  // Check if offerCategory is active
  if (offerCategory?.is_active === true) {
    if (offerCategory?.get_option === 1) {
      offerName = "BUY-ONE-GET-ONE";
    } else if (offerCategory?.get_option === 2) {
      offerName = "BUY-TWO-GET-ONE";
    }

    cartProducts.forEach((product, index) => {
      const price = parseFloat(product?.salePrice);
      const quantity = parseInt(product?.quantity);

      if (!isNaN(price) && !isNaN(quantity)) {
        totalPrice += price * quantity;
        console.log(`Product at index ${index}: has_offer=${product?.has_offer}, discount_product=${product?.discount_product}`);
      } else {
        console.warn(`Invalid data at index ${index}: price=${product?.salePrice}, quantity=${product?.quantity}`);
      }
    });
  } else {
    if (offerCategory?.get_option === 1) {
      offerName = "BUY-ONE-GET-ONE";
    } else if (offerCategory?.get_option === 2) {
      offerName = "BUY-TWO-GET-ONE";
    }

    console.log("Offer Name:", offerName);

    if (offerName === "BUY-ONE-GET-ONE") {
      cartProducts.forEach((product, index) => {
        const price = parseFloat(product?.salePrice);
        const quantity = parseInt(product?.quantity);

        if (!isNaN(price) && !isNaN(quantity)) {
          console.log(`Product at index ${index}: has_offer=${product?.has_offer}, discount_product=${product?.discount_product}`);
          
          if (product.has_offer === "Offer Applied" && product.discount_product === "normal") {
            totalPrice += price * quantity;
          } else if (product.has_offer === "Offer Not Applicable" && product.discount_product === "Discount Allowed") {
            totalPrice += price * quantity;
          } else if (product.discount_product === "Discount Allowed") {
            discountAllowedProducts.push({ price, quantity, index });
          }

          if (product.has_offer === "Offer Applied") {
            freeQuantity += quantity;
          }
        } else {
          console.warn(`Invalid data at index ${index}: price=${product?.salePrice}, quantity=${product?.quantity}`);
        }
      });
    } else {
      cartProducts.forEach((product, index) => {
        const price = parseFloat(product?.salePrice);
        const quantity = parseInt(product?.quantity);

        if (!isNaN(price) && !isNaN(quantity)) {
          console.log(`Product at index ${index}: has_offer=${product?.has_offer}, discount_product=${product?.discount_product}`);
          
          if (product.has_offer === "Offer Applied" && product.discount_product === "normal") {
            totalPrice += price * quantity;
          } else if (product.has_offer === "Offer Not Applicable" && product.discount_product === "Discount Allowd") {
            totalPrice += price * quantity;
          } else if (product.has_offer === "Offer Applied" && product.discount_product === "normal"  || product.discount_product === "Discount Allowd") {
                
            

          }

          if (product.has_offer === "Offer Applied") {
            freeQuantity += quantity;
          }
        } else {
          console.warn(`Invalid data at index ${index}: price=${product?.salePrice}, quantity=${product?.quantity}`);
        }
      });
    }
  }
  // Output results
  console.log("Total Price:", totalPrice);
  console.log("Free Quantity:", freeQuantity);
  // console.log("Discount Allowed Products:", discountAllowedProducts);

  return (
    <div className={`w-full ${className || ''}`}>
      {hasOfferProducts && (
        <div className="flex justify-between items-center mb-4">
          <div>
            <select className="px-4 py-2 rounded bg-gray-200">
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
            </select>
          </div>
          <p style={{ color: "green", fontWeight: "bold" }}>Offer Available</p>
        </div>
      )}
      <div className="relative w-full overflow-x-auto border border-[#EDEDED]">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <tbody>
            {/* Table heading */}
            <tr className="text-[13px] font-medium text-black bg-[#F6F6F6] whitespace-nowrap px-2 border-b default-border-bottom uppercase">
              <td className="py-4 pl-10 block whitespace-nowrap min-w-[300px]">
                Product
              </td>
              <td className="py-4 whitespace-nowrap text-center">Color</td>
              <td className="py-4 whitespace-nowrap text-center">Size</td>
              <td className="py-4 whitespace-nowrap text-center">Price</td>
              <td className="py-4 whitespace-nowrap text-center">Quantity</td>
              <td className="py-4 whitespace-nowrap text-center">Total</td>
              <td className="py-4 whitespace-nowrap text-right w-[114px]"></td>
            </tr>
            {/* Table heading end */}
            {cartProducts.map((product, index) => (
              <tr key={index} className="bg-white border-b hover:bg-gray-50">
                <td className="pl-10 py-4 w-[380px]">
                  <div className="flex space-x-6 items-center">
                    <div className="w-[80px] h-[80px] overflow-hidden flex justify-center items-center border border-[#EDEDED]">
                      <img
                        src={`${product.image}`}
                        alt={product.name}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="flex-1 flex flex-col">
                      <p className="font-medium text-[15px] text-qblack">
                        {product.name}
                      </p>
                      {product.offer_type !== null && (
                        <p style={{ paddingTop: "30px", color: "green", fontWeight: "bold" }}>
                          {product.offer_type} Offer Available
                        </p>
                      )}
                    </div>
                  </div>
                </td>
                <td className="text-center py-4 px-2">
                  <div className="flex justify-center items-center">
                    <span className="text-[15px] font-normal">{product.color}</span>
                  </div>
                </td>
                <td className="text-center py-4 px-2">
                  <div className="flex space-x-1 items-center justify-center">
                    <span className="text-[15px] font-normal">
                      {product.size}
                    </span>
                  </div>
                </td>
                <td className="text-center py-4 px-2">
                  <div className="flex space-x-1 items-center justify-center">
                    <span className="text-[15px] font-normal">
                      ${product.salePrice}
                    </span>
                  </div>
                </td>
                <td className="py-4">
                  <div className="flex justify-center items-center">
                    <div className="w-[120px] h-[40px] px-[26px] flex items-center border border-qgray-border">
                      <div className="flex justify-between items-center w-full">
                        <button
                          onClick={() => decrement(product.id, product.quantity)}
                          type="button"
                          className="text-base text-qgray"
                        >
                          -
                        </button>
                        <span className="text-qblack">{product.quantity}</span>
                        <button
                          onClick={() => increment(product.id, product.quantity, product.stock)}
                          type="button"
                          className="text-base text-qgray"
                          disabled={product.quantity >= product.stock}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </td>
                <td className="text-right py-4">
                  <div className="flex space-x-1 items-center justify-center">
                    <span className="text-[15px] font-normal">
                      ${product.salePrice * product.quantity}
                    </span>
                  </div>
                </td>
                <td className="text-right py-4">
                  <div className="flex space-x-1 items-center justify-center">
                    <button onClick={() => handleDeleteProduct(product.id)} className="text-[15px] font-normal text-red-600 hover:text-red-700 cursor-pointer">
                      Remove
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {/* Placeholder for empty cart or loading state */}
            {cartProducts.length === 0 && (
              <tr>
                <td colSpan="7" className="py-4 text-center">
                  Loading cart products...
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
