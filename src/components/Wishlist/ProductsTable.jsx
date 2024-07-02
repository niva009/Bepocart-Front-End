import { useEffect, useState } from "react";
import axios from "axios";

export default function ProductsTable({ className }) {
  const [wishlist, setWishlist] = useState([]);
  
  useEffect(() => {
    fetchWishlist();
  }, []);

  const fetchWishlist = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get("https://isa-pointing-relax-potentially.trycloudflare.com/wishlist/", {
        headers: {
          'Authorization': `${token}`
        }
      });
      console.log("Wishlist Data:", response.data.data);
      setWishlist(response.data.data);
    } catch (error) {
      console.error("Error fetching wishlist:", error);
    }
  };

  const handleDeleteItem = async (itemId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`https://isa-pointing-relax-potentially.trycloudflare.com/wishlist-delete/${itemId}/`, {
        headers: {
          'Authorization': `${token}`
        }
      });
      const updatedWishlist = wishlist.filter(item => item.id !== itemId);
      setWishlist(updatedWishlist);
      console.log(`Item with ID ${itemId} deleted successfully`);
    } catch (error) {
      console.error(`Error deleting item with ID ${itemId}:`, error);
    }
  };

  return (
    <div className={`w-full ${className || ""}`}>
      <div className="relative w-full overflow-x-auto border border-[#EDEDED]">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <tbody>
            <tr className="text-[13px] font-medium text-black bg-[#F6F6F6] whitespace-nowrap px-2 border-b default-border-bottom uppercase">
              <td className="py-4 pl-10 block whitespace-nowrap  w-[380px]">
                Product
              </td>
              <td className="py-4 whitespace-nowrap text-center">Category</td>
              <td className="py-4 whitespace-nowrap  text-center">Price</td>
              <td className="py-4 whitespace-nowrap text-center w-[114px] block">Delete</td>
            </tr>
            {wishlist.map((item) => (
              <tr key={item.id} className="bg-white border-b hover:bg-gray-50">
                <td className="pl-10 py-4 ">
                  <div className="flex space-x-6 items-center">
                    <div className="w-[80px] h-[80px] overflow-hidden flex justify-center items-center border border-[#EDEDED]">
                      <img
                        src={`${"https://isa-pointing-relax-potentially.trycloudflare.com/"}${item.productImage}`}
                        alt={item.productName}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="flex-1 flex flex-col">
                      <p className="font-medium text-[15px] text-qblack">
                        {item.productName}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="text-center py-4 px-2">
                  <div className="flex space-x-1 items-center justify-center">
                    <span className="text-[15px] font-normal">{item.category}</span>
                  </div>
                </td>
                <td className="text-center py-4 px-2">
                  <div className="flex space-x-1 items-center justify-center">
                    <span className="text-[15px] font-normal">${item.productPrice}</span>
                  </div>
                </td>
                <td className="text-right py-4">
                  <div className="flex space-x-1 items-center justify-center">
                    <button
                      onClick={() => handleDeleteItem(item.id)}
                      className="text-[15px] text-red-600 hover:text-red-900 cursor-pointer"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
