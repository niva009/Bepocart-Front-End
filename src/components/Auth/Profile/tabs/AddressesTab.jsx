import React, { useEffect, useState } from "react";
import axios from "axios";
import AddressDetails from "../../../CartPage/AddressDetails";

export default function AddressesTab() {
  const [addresses, setAddresses] = useState([]);
  const [open, setOpen] = useState(false);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_PUBLIC_URL}/get-address/`, {
          headers: {
           ' Authorization': `${token}`,
          },
        });
        setAddresses(response.data.address);
        console.log("User addresses:", response.data.address);
      } catch (error) {
        console.error("Error fetching addresses:", error);
      }
    };

    fetchAddresses();
  }, [token]);

  const handleDeleteAddress = async (id) => {
    try {
      const response = await axios.delete(`${import.meta.env.VITE_PUBLIC_URL}/delete-address/${id}/`, {
        headers: {
          'Authorization': `${token}`,
        },
      });

      if (response.status === 200) {
        const updatedAddresses = addresses.filter((address) => address.id !== id);
        setAddresses(updatedAddresses);
        console.log('Address with id `${id}` deleted successfully');
      }
    } catch (error) {
      console.error('Error deleting address with id `${id}`:, error');
    }
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <div className="address-container mx-auto p-4 sm:p-6 lg:p-8">
        {addresses.length > 0 ? (
          addresses.map((address) => (
            <div key={address.id} className="address-card bg-primarygray p-4 border mb-4 rounded-md">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
                <p className="title text-[16px] sm:text-[18px] font-semibold mb-2 sm:mb-0">
                  Address #{address.id + 1}
                </p>
                <button
                  type="button"
                  className="border border-qgray w-8 h-8 rounded-full flex justify-center items-center"
                  onClick={() => handleDeleteAddress(address.id)}
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 12 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-red-500"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M1.5 3.5V9.5C1.5 10.3284 2.17157 11 3 11H9C9.82843 11 10.5 10.3284 10.5 9.5V3.5H1.5ZM3 1.5H4.5H7.5H9V2.5H3V1.5ZM3.75 3V9H4.25V3H3.75ZM5.75 3V9H6.25V3H5.75ZM7.75 3V9H8.25V3H7.75Z"
                      fill="currentColor"
                    />
                  </svg>
                </button>
              </div>
              <div className="text-base">
                <div className="mb-2">
                  <span className="text-qgraytwo">Name:</span> {address.name}
                </div>
                <div className="mb-2">
                  <span className="text-qgraytwo">Email:</span> {address.email}
                </div>
                <div className="mb-2">
                  <span className="text-qgraytwo">Phone:</span> {address.phone}
                </div>
                <div className="mb-2">
                  <span className="text-qgraytwo">City:</span> {address.city}
                </div>
                <div className="mb-2">
                  <span className="text-qgraytwo">State:</span> {address.state}
                </div>
                <div className="mb-2">
                  <span className="text-qgraytwo">Pincode:</span> {address.pincode}
                </div>
                <div>
                  <span className="text-qgraytwo">Address:</span> {address.address}
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No addresses found.</p>
        )}
      </div>
      <div className="w-full p-4">
        <button
          type="button"
          className="yellow-btn w-full sm:w-[180px] h-[50px] mt-4"
          onClick={handleOpen}
        >
          <div className="w-full text-sm font-semibold">Add New Address</div>
        </button>
      </div>
      <AddressDetails open={open} handleClose={handleClose} />
    </>
  );
}
