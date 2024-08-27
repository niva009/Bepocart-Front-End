import React, { useEffect, useState } from "react";
import axios from "axios";
import AddressDetails from "../../../CartPage/AddressDetails";

export default function AddressesTab() {
  const [addresses, setAddresses] = useState([]);
  const [open, setOpen] = useState(false); // Initialize `open` state
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_PUBLIC_URL}/get-address/`, {
          headers: {
            Authorization: `${token}`,
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
  

  console.log("address details", addresses);

  const handleDeleteAddress = async (id) => {
    try {
      const response = await axios.delete(`${import.meta.env.VITE_PUBLIC_URL}/delete-address/${id}/`, {
        headers: {
          Authorization: `${token}`,
        },
      });

      if (response.status === 200) {
        const updatedAddresses = addresses.filter((address) => address.id !== id);
        setAddresses(updatedAddresses);
      }
    } catch (error) {
      console.error(`Error deleting address with id ${id}:`, error);
    }
  };


  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <div className="grid grid-cols-2 gap-[30px]">
        {addresses.length > 0 ? (
          addresses.map((address, index) => (
            <div key={address.id} className="w-full bg-primarygray p-5 border">
              <div className="flex justify-between items-center">
                <p className="title text-[22px] font-semibold">Address #{address.id + 1}</p>
                <button
                  type="button"
                  className="border border-qgray w-[34px] h-[34px] rounded-full flex justify-center items-center"
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
              <div className="mt-5 max-h-60 overflow-y-auto">
                <table>
                  <tbody>
                    <tr className="flex mb-3">
                      <td className="text-base text-qgraytwo w-[70px] block line-clamp-1">
                        <div>Name:</div>
                      </td>
                      <td className="text-base text-qblack line-clamp-1 font-medium">
                        {address.name}
                      </td>
                    </tr>
                    <tr className="flex mb-3">
                      <td className="text-base text-qgraytwo w-[70px] block line-clamp-1">
                        <div>Email:</div>
                      </td>
                      <td className="text-base text-qblack line-clamp-1 font-medium">
                        {address.email}
                      </td>
                    </tr>
                    <tr className="flex mb-3">
                      <td className="text-base text-qgraytwo w-[70px] block line-clamp-1">
                        <div>Phone:</div>
                      </td>
                      <td className="text-base text-qblack line-clamp-1 font-medium">
                        {address.phone}
                      </td>
                    </tr>
                    <tr className="flex mb-3">
                      <td className="text-base text-qgraytwo w-[70px] block line-clamp-1">
                        <div>City:</div>
                      </td>
                      <td className="text-base text-qblack line-clamp-1 font-medium">
                        {address.city}
                      </td>
                    </tr>
                    <tr className="flex mb-3">
                      <td className="text-base text-qgraytwo w-[70px] block line-clamp-1">
                        <div>State:</div>
                      </td>
                      <td className="text-base text-qblack line-clamp-1 font-medium">
                        {address.state}
                      </td>
                    </tr>
                    <tr className="flex mb-3">
                      <td className="text-base text-qgraytwo w-[70px] block line-clamp-1">
                        <div>Pincode:</div>
                      </td>
                      <td className="text-base text-qblack line-clamp-1 font-medium">
                        {address.pincode}
                      </td>
                    </tr>
                    <tr className="flex mb-3">
                      <td className="text-base text-qgraytwo w-[70px] block line-clamp-1">
                        <div>Address:</div>
                      </td>
                      <td className="text-base text-qblack line-clamp-1 font-medium">
                        {address.address}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          ))
        ) : (
          <p>No addresses found.</p>
        )}
      </div>
      <div className="w-[180px] h-[50px] mt-4">
        <button type="button" className="yellow-btn" onClick={handleOpen} >
          <div className="w-full text-sm font-semibold">Add New Address</div>
        </button>
      </div>
      <AddressDetails open={open} handleClose={handleClose} />
    </>
  );
}
