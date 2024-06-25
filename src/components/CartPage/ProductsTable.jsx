import { useEffect, useState } from 'react';
import InputQuantityCom from '../Helpers/InputQuantityCom'; // Assuming this is your input quantity component

export default function ProductsTable({ className }) {
  const [cartProducts, setCartProducts] = useState([]);

  useEffect(() => {
    const fetchCartProducts = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch('http://127.0.0.1:8000/cart-products/', {
          headers: {
            Authorization: `${token}`,
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch cart products');
        }
        const data = await response.json();
        setCartProducts(data.data); 
        console.log(data.data);
      } catch (error) {
        console.error('Error fetching cart products:', error);
      }
    };

    fetchCartProducts();
  }, []); 

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
                        src={`${import.meta.env.VITE_PUBLIC_URL}${product.image}`}
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
                    <InputQuantityCom />
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
                    <span>
              remove
                    </span>
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
