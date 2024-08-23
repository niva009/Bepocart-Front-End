import React, { useEffect, useState } from "react";
import axios from "axios";
import DefaultImage from '../../../../assets/default-image.jpeg';
import Button from '@mui/material/Button';
import StarRating from '../../../Helpers/StarRating';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function OrderTab() {
  const [orders, setOrders] = useState([]);
  const [clickedOrderId, setClickedOrderId] = useState(null);
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_PUBLIC_URL}/order-items/`, {
          headers: {
            Authorization: `${localStorage.getItem('token')}`,
          },
        });
        setOrders(response.data.data.map(order => ({ ...order, reviewSubmitted: false })));
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);


  const buttonStyle = {
    width: '140px',
    height: '40px'
  };

  const getStatusStyle = (status) => {
    switch (status) {
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

  function truncateString(str, num) {
    if (str.length <= num) {
      return str;
    }
    return str.slice(0, num) + '...';
  }

  const handleOpen = (orderId) => {
    setClickedOrderId(orderId);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setRating(0);
    setHoverRating(0);
    setMessage('');
  };

  const handleReviewSubmit = () => {
    const token = localStorage.getItem('token');
    const productId = orders.find(order => order.id === clickedOrderId)?.product;

    if (!productId) {
      console.error("Product ID not found for the selected order");
      return;
    }

    axios.post(
      `${import.meta.env.VITE_PUBLIC_URL}/product-review/${productId}/`,
      {
        rating: rating,
        review_text: message
      },
      {
        headers: {
          'Authorization': `${token}`
        }
      }
    )
    .then(response => {
      // Update the orders state with the new review and set reviewSubmitted to true
      setOrders(prevOrders => prevOrders.map(order => 
        order.id === clickedOrderId 
        ? { ...order, reviewSubmitted: true } 
        : order
      ));
      handleClose();
    })
    .catch(error => {
      console.error("Error submitting review:", error);
    });
  };

  return (
    <>
      <div className="relative w-full overflow-x-auto sm:rounded-lg max-h-100 overflow-y-auto">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <tbody>
            <tr className="text-base text-qgray whitespace-nowrap px-2 border-b default-border-bottom ">
              <td className="py-4 block whitespace-nowrap text-center">Name</td>
              <td className="py-4 whitespace-nowrap text-center">Image</td>
              <td className="py-4 whitespace-nowrap text-center">Quantity</td>
              <td className="py-4 whitespace-nowrap text-center">Price</td>
              <td className="py-4 whitespace-nowrap text-center">Status</td>
              <td className="py-4 whitespace-nowrap text-center">Review</td>
            </tr>
            {orders.length > 0 ? (
              orders.map((order) => (
                <tr
                  key={order.id}
                  className="bg-white border-b hover:bg-gray-50 cursor-pointer"
                >
                  <td className="text-center py-4">
                    <span className="text-lg text-qgray font-medium">
                      {truncateString(order.name, 20)}
                    </span>
                  </td>
                  <td className="text-center py-4">
                    <span className="text-lg text-qgray font-medium">
                      <img
                        src={`${order.image}`}
                        alt={order.name}
                        className="w-16 h-16 object-cover rounded-full"
                        onError={(e) => { e.target.onError = null; e.target.src = DefaultImage; }}
                      />
                    </span>
                  </td>
                  <td className="text-center py-4 px-2">
                    <span className="text-base text-qgray whitespace-nowrap">
                      {order.quantity}
                    </span>
                  </td>
                  <td className="text-center py-4 px-2">
                    <span className="text-base text-qblack whitespace-nowrap px-2">
                      ₹ {order.price}
                    </span>
                  </td>
                  <td className="text-center py-4 px-2">
                    <Button variant="contained" style={{ ...getStatusStyle(order.status), ...buttonStyle }}>
                      {order.status}
                    </Button>
                  </td>
                  <td className="text-center py-4 px-2">
                    {order.reviewSubmitted ? (
                      <Button variant="contained" style={{ ...buttonStyle }} disabled>
                        Reviewed
                      </Button>
                    ) : (
                      <Button variant="contained" style={{ ...buttonStyle }} onClick={() => handleOpen(order.id)}>
                        Review
                      </Button>
                    )}
                  </td>
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
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="review-modal-title"
        aria-describedby="review-modal-description"
      >
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          border: '2px solid #000',
          boxShadow: 24,
          p: 4,
        }}>
          <h2 id="review-modal-title" className="text-lg font-medium mb-4">Write a Review</h2>
          <div className="flex space-x-1 items-center mb-[30px]">
            <StarRating
              hoverRating={hoverRating}
              hoverHandler={setHoverRating}
              rating={rating}
              ratingHandler={setRating}
            />
            <span className="text-qblack text-[15px] font-normal mt-1">
              ({rating}.0)
            </span>
          </div>
          <div className="w-full review-form mb-[30px]">
            <TextField
              label="Message"
              variant="outlined"
              fullWidth
              multiline
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>
          <div className="flex justify-end">
            <Button
              onClick={handleReviewSubmit}
              variant="contained"
              color="primary"
            >
              Submit
            </Button>
          </div>
        </Box>
      </Modal>
    </>
  );
}
