import React, { useEffect, useState } from "react";
import axios, { Axios } from "axios";  
import DefaultImage from '../../../../assets/default-image.jpeg'
import Button from '@mui/material/Button';
import { useParams } from "react-router-dom";

export default function OrderDetails() {
  const [orders, setOrders] = useState([]);


     useEffect(() =>{
      Axios.get(`${import.meta.env.VITE_PUBLIC_URL}/order-items/`,{

        headers:{ Authorization: `{localStorage.getItem('token')}`}
      })
      .then((response) =>{
        setOrders(response.data.data);
      })
      .catch((error) =>{
        console.error("error:",error);
      })
     },[])


  const buttonStyle = {
    width: '140px',  // Define button width
    height: '40px'  // Define button height
  };

  const getStatusStyle = (status) => {
    const normalizedStatus = status; // Normalize the status text for consistent comparison
    
    switch (normalizedStatus) {
      case 'Completed':
        return { backgroundColor: '#0a8f3f', color: 'white', fontWeight: 'bolder' };
      case 'Packing':
        return { backgroundColor: '#1906c2', color: 'white', fontWeight: 'bolder' };
      case 'Refunded':
        return { backgroundColor: '#f7dc6f', color: 'black', fontWeight: 'bolder' };
      case 'pending':
        return { backgroundColor: 'black', color: 'white', fontWeight: 'bolder' };
      case 'Cancelled':
        return { backgroundColor: 'orange', color: 'white', fontWeight: 'bolder' };
        case 'Processing':
          return { backgroundColor: 'black', color: 'white', fontWeight: 'bolder' };
      default:
        return {};
    }
  };

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
              <td className="py-4 whitespace-nowrap text-center">Amount</td>
              <td className="py-4 whitespace-nowrap text-center">View</td>
            </tr>
            {/* table heading end */}
            {orders.length > 0 ? (
              orders.map((order) => (
                <tr
                  key={order.id}
                  className="bg-white border-b hover:bg-gray-50 cursor-pointer"
                //   onClick={() => setClickedOrderId(clickedOrderId === order.id ? null : order.id)}
                >
                  <td className="text-center py-4">
                    <span className="text-lg text-qgray font-medium">
                      {/* {clickedOrderId === order.id ? order.status : order.status.slice(0, 10) + (order.status.length > 10 ? '...' : '')} */}
                    </span>
                  </td>
                  <td className="text-center py-4 px-2">
                    <img
                      src={`${import.meta.env.VITE_PUBLIC_URL}/${order.image}`}
                      alt={order.status}
                      className="w-16 h-16 object-cover rounded-full"
                      onError={(e) =>{ e.target.onError = null; e.target.src = DefaultImage; }}
                    />
                  </td>
                  <td className="text-center py-4 px-2">
                    <span className="text-base text-qgray whitespace-nowrap">
                      {new Date(order.created_at).toLocaleDateString()}
                    </span>
                  </td>
                  <td className="text-center py-4 px-2">

                  <Button variant="contained" style={{ ...getStatusStyle(order.status), ...buttonStyle }}>
                  {order.status}
                </Button>
                  </td>
                  <td className="text-center py-4 px-2">
                    <span className="text-base text-qblack whitespace-nowrap px-2">
                      {order.total_amount}
                    </span>
                  </td>
                  <td className="text-center py-4 px-2">
                  <Button variant="contained" style={{...buttonStyle }}>
                   View
                </Button>
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
