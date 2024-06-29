import React, { useEffect, useState } from "react";
import axios from "axios"; // Make sure axios is installed and imported

export default function OrderTab() {
  const [orders, setOrders] = useState([]);
  const [clickedOrderId, setClickedOrderId] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/orders/', {
          headers: {
            Authorization: `${localStorage.getItem('token')}`,
          },
        }); // Adjust the endpoint as necessary
        setOrders(response.data.data);
        console.log(response.data.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <>
      <div className="relative w-full overflow-x-auto sm:rounded-lg max-h-100 overflow-y-auto">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <tbody>
            {/* table heading */}
            <tr className="text-base text-qgray whitespace-nowrap px-2 border-b default-border-bottom ">
              <td className="py-4 block whitespace-nowrap text-center">Name</td>
              <td className="py-4 whitespace-nowrap text-center">Image</td>
              <td className="py-4 whitespace-nowrap text-center">Date</td>
              <td className="py-4 whitespace-nowrap text-center">Status</td>
              <td className="py-4 whitespace-nowrap text-center">Quantity</td>
              <td className="py-4 whitespace-nowrap text-center">Amount</td>
              {/* <td className="py-4 whitespace-nowrap text-center">Action</td> */}
            </tr>
            {/* table heading end */}
            {orders.length > 0 ? (
              orders.map((order) => (
                <tr
                  key={order.id}
                  className="bg-white border-b hover:bg-gray-50 cursor-pointer"
                  onClick={() => setClickedOrderId(clickedOrderId === order.id ? null : order.id)}
                >
                  <td className="text-center py-4">
                    <span className="text-lg text-qgray font-medium">
                      {clickedOrderId === order.id ? order.productName : order.productName.slice(0, 10) + (order.productName.length > 10 ? '...' : '')}
                    </span>
                  </td>
                  <td className="text-center py-4 px-2">
                    <img
                      src={`http://127.0.0.1:8000/${order.productImage}`}
                      alt={order.productName}
                      className="w-16 h-16 object-cover rounded-full"
                    />
                  </td>
                  <td className="text-center py-4 px-2">
                    <span className="text-base text-qgray whitespace-nowrap">
                      {new Date(order.date).toLocaleDateString()}
                    </span>
                  </td>
                  <td className="text-center py-4 px-2">
                    <span className={`text-sm rounded p-2 ${order.status === 'Completed' ? 'text-green-500 bg-green-100' : 'text-red-500 bg-red-100'}`}>
                      {/* {order.status} */}  Completed
                    </span>
                  </td>
                  <td className="text-center py-4 px-2">
                    <span className="text-base text-qblack whitespace-nowrap px-2">
                      {order.quantity}
                    </span>
                  </td>
                  <td className="text-center py-4 px-2">
                    <span className="text-base text-qblack whitespace-nowrap px-2">
                    ₹   {order.salePrice * order.quantity} /-
                    </span>
                  </td>
                  {/* <td className="text-center py-4">
                    <button
                      type="button"
                      className="w-[116px] h-[46px] bg-qyellow text-qblack font-bold"
                    >
                      View Details
                    </button>
                  </td> */}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center py-4">
                  No orders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
