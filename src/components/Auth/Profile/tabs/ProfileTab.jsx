import { useRef, useState, useEffect } from "react";
import TextField from '@mui/material/TextField';
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ProfileTab() {
  const [profile, setProfile] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    place: "",
    zip_code: "",
    image: ""
  });

  const profileImgInput = useRef(null);
  const [profileImageFile, setProfileImageFile] = useState(null);

  useEffect(() => {
    fetchProfileData();
  }, []);

  const fetchProfileData = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_PUBLIC_URL}/profile-view/`, {
        headers: {
          Authorization: ` ${localStorage.getItem('token')}`,
        },
      });
      setProfile(response.data.data);
    } catch (error) {
      console.error('Error fetching profile data:', error);
    }
  };

  const browseProfileImg = () => {
    profileImgInput.current.click();
  };

  const profileImgChangeHandler = (e) => {
    if (e.target.files.length > 0) {
      const imgFile = e.target.files[0];
      const imgReader = new FileReader();

      imgReader.onload = (event) => {
        setProfile((prevProfile) => ({
          ...prevProfile,
          image: event.target.result,
        }));
      };

      imgReader.readAsDataURL(imgFile);
      setProfileImageFile(imgFile); // Store the image file for upload
    }
  };

  const updateProfile = async () => {
    try {
      const formData = new FormData();
      formData.append('first_name', profile.first_name);
      formData.append('last_name', profile.last_name);
      formData.append('email', profile.email);
      formData.append('phone', profile.phone);
      formData.append('place', profile.place);
      formData.append('zip_code', profile.zip_code);
      
      if (profileImageFile) {
        formData.append('image', profileImageFile);
      }

      const response = await axios.put(`${import.meta.env.VITE_PUBLIC_URL}/profile/`, formData, {
        headers: {
          Authorization: ` ${localStorage.getItem('token')}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      toast.success("Profile Updated Successfully!", { position: toast.POSITION.TOP_RIGHT });
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "zip_code" && value.length > 6) {
      return; // Prevent updating state if zip_code exceeds 6 characters
    }
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  return (
    <>
      <div className="flex flex-col lg:flex-row space-x-0 lg:space-x-10">
        <div className="w-full lg:w-[570px]">
          <div className="input-item flex flex-col sm:flex-row sm:space-x-2.5 mb-8">
            <div className="w-full sm:w-1/2 mb-4 sm:mb-0">
              <TextField
                label="First Name*"
                placeholder="First Name"
                type="text"
                name="first_name"
                value={profile.first_name || ""}
                onChange={handleChange}
                fullWidth
              />
            </div>
            <div className="w-full sm:w-1/2">
              <TextField
                label="Last Name*"
                placeholder="Last Name"
                name="last_name"
                type="text"
                value={profile.last_name || ""}
                onChange={handleChange}
                fullWidth
              />
            </div>
          </div>
          <div className="input-item flex flex-col sm:flex-row sm:space-x-2.5 mb-8">
            <div className="w-full sm:w-1/2 mb-4 sm:mb-0">
              <TextField
                label="Email*"
                placeholder="Email"
                type="email"
                name="email"
                value={profile.email || ""}
                onChange={handleChange}
                fullWidth
              />
            </div>
            <div className="w-full sm:w-1/2">
              <TextField
                label="Phone Number*"
                placeholder="Phone Number"
                type="number"
                name="phone"
                value={profile.phone || ""}
                onChange={handleChange}
                fullWidth
              />
            </div>
          </div>
          <div className="input-item mb-8">
            <TextField
              label="State*"
              placeholder="State"
              type="text"
              name="place"
              value={profile.place || ""}
              onChange={handleChange}
              fullWidth
            />
          </div>
          <div className="input-item mb-8">
            <TextField
              label="Zip Code*"
              placeholder="ZIP CODE"
              type="text"
              name="zip_code"
              value={profile.zip_code || ""}
              onChange={handleChange}
              fullWidth
            />
          </div>
        </div>
        <div className="flex-1 flex flex-col items-center lg:items-start">
          <div className="update-logo w-full mb-9 flex flex-col items-center lg:items-start">
            <h1 className="text-xl tracking-wide font-bold text-qblack flex items-center mb-2">
              Update Profile
            </h1>
            <p className="text-sm text-qgraytwo mb-5 text-center lg:text-left">
              Profile images should be at least 300x300 pixels. GIFs are also supported with a maximum size of 5MB.
            </p>
            <div className="relative mb-4">
              <div className="sm:w-[198px] sm:h-[198px] w-[199px] h-[199px] rounded-full overflow-hidden relative">
                <img
                  src={profile.image ?` ${import.meta.env.VITE_PUBLIC_URL}/${profile.image}` : '/default-profile.png'}
                  alt={profile.first_name}
                  className="object-cover w-full h-full"
                />
              </div>
              <input
                ref={profileImgInput}
                onChange={profileImgChangeHandler}
                type="file"
                className="hidden"
              />
              <div
                onClick={browseProfileImg}
                className="w-[32px] h-[32px] absolute bottom-0 right-0 bg-qblack rounded-full cursor-pointer flex justify-center items-center"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-white"
                >
                  <path
                    d="M10 0C4.47457 0 0 4.47791 0 10C0 15.5221 4.47791 20 10 20C15.5221 20 20 15.5221 20 10C19.9967 4.48126 15.5221 0.00669344 10 0ZM10 16.67C9.53815 16.67 9.16667 16.2985 9.16667 15.8367C9.16667 15.3748 9.53815 15.0033 10 15.0033C10.4618 15.0033 10.8333 15.3748 10.8333 15.8367C10.8333 16.2952 10.4618 16.67 10 16.67ZM11.6098 10.425C11.1078 10.7396 10.8132 11.2952 10.8333 11.8842V12.5033C10.8333 12.9652 10.4618 13.3367 10 13.3367C9.53815 13.3367 9.16667 12.9652 9.16667 12.5033V11.8842C9.14324 10.6861 9.76907 9.56827 10.8032 8.96586C11.4357 8.60076 12.0635 8.87804 12.3524 9.49658C12.7153 10.1587 12.6281 11.0128 11.6098 10.425ZM10 8.33333C9.25281 8.33333 8.33333 9.25281 8.33333 10C8.33333 10.7472 9.25281 11.6667 10 11.6667C10.7472 11.6667 11.6667 10.7472 11.6667 10C11.6667 9.25281 10.7472 8.33333 10 8.33333Z"
                    fill="currentColor"
                  />
                </svg>
              </div>
            </div>
          </div>
          <button
            onClick={updateProfile}
            className="bg-qblack text-white px-5 py-2 rounded-md w-full lg:w-auto"
          >
            Save Changes
          </button>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}
