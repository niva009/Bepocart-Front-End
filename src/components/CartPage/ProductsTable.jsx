import { useEffect, useState } from 'react';
import axios from 'axios';

export default function ProductsTable({ className }) {
  const [cartProducts, setCartProducts] = useState([]);

  useEffect(() => {
    const fetchCartProducts = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch('https://isa-pointing-relax-potentially.trycloudflare.com/cart-products/', {
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
      await axios.delete(`https://isa-pointing-relax-potentially.trycloudflare.com/cart-delete/${id}/`, {
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
      const response = await axios.put(`https://isa-pointing-relax-potentially.trycloudflare.com/cart/increment/${id}/`, {}, {
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
      const response = await axios.put(`https://isa-pointing-relax-potentially.trycloudflare.com/cart/decrement/${id}/`, {}, {
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

  const increment = (id) => {
    updateProductQuantityIncrement(id);
  };

  const decrement = (id, currentQuantity) => {
    if (currentQuantity > 1) {
      updateProductQuantityDecrement(id);
    }
  };

  return (
    <div className={`w-full ${className || ''}`}>
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
                        src={`${"https://isa-pointing-relax-potentially.trycloudflare.com/"}${product.image}`}
                        alt={product.name}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="flex-1 flex flex-col">
                      <p className="font-medium text-[15px] text-qblack">
                        {product.name}
                      </p>
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
                          onClick={() => increment(product.id)}
                          type="button"
                          className="text-base text-qgray"
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
