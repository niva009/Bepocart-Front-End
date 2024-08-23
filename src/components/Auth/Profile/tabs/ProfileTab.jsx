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
    state: "",
    zip_code: "",
    image:""
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
          Authorization: `${localStorage.getItem('token')}`,
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
      const imgReader = new FileReader();
      imgReader.onload = (event) => {
        setProfile((prevProfile) => ({
          ...prevProfile,
          image: event.target.result,
        }));
      };
      imgReader.readAsDataURL(e.target.files[0]);
      setProfileImageFile(e.target.files[0]); // Store the image file for upload
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
      
      if(profileImageFile){      
        formData.append('image', profileImageFile);
      }

      const response = await axios.put(`${import.meta.env.VITE_PUBLIC_URL}/profile/`, formData, {
        headers: {
          Authorization: `${localStorage.getItem('token')}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      toast.success ( " Profile Updated Successfully !",)
      position: toast.POSITION.TOP_RIGHT
      setTimeout(() =>{
        window.location.reload();
      },3000);
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
        <div className="flex space-x-10">
          <div className="w-[570px]">
            <div className="input-item flex space-x-2.5 mb-8">
              <div className="w-1/2 h-full">
                <TextField
                  label="First Name*"
                  placeholder="First Name"
                  type="text"
                  name="first_name"
                  inputClasses="h-[50px]"
                  value={profile?.first_name || ""}
                  onChange={handleChange}
                />
              </div>
              <div className="w-1/2 h-full">
                <TextField
                  label="Last Name*"
                  placeholder="Last Name"
                  name="last_name"
                  type="text"
                  value={profile?.last_name || ""}
                  inputClasses="h-[50px]"
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="input-item flex space-x-2.5 mb-8">
              <div className="w-1/2 h-full">
                <TextField
                  label="Email*"
                  placeholder="Email"
                  type="email"
                  name="email"
                  value={profile?.email || ""}
                  inputClasses="h-[50px]"
                  onChange={handleChange}
                />
              </div>
              <div className="w-1/2 h-full">
                <TextField
                  label="Phone Number*"
                  placeholder="Phone Number"
                  type="Number"
                  name="phone"
                  inputClasses="h-[50px]"
                  value={profile?.phone || ""}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="input-item mb-8">
              <div className="w-full">
                <TextField
                  label="State*"
                  placeholder="State"
                  type="Text"
                  name="place"
                  value={profile?.place || ""}
                  inputClasses="h-[50px]"
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="input-item mb-8">
              <div className="w-full">
                <TextField
                  label="Zip Code*"
                  placeholder="ZIP CODE"
                  type="Number"
                  name="zip_code"
                  value={profile?.zip_code || ""}
                  inputClasses="h-[50px]"
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
          <div className="flex-1">
            <div className="update-logo w-full mb-9">
              <h1 className="text-xl tracking-wide font-bold text-qblack flex items-center mb-2">
                Update Profile
                <span className="ml-1">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10 0C4.47457 0 0 4.47791 0 10C0 15.5221 4.47791 20 10 20C15.5221 20 20 15.5221 20 10C19.9967 4.48126 15.5221 0.00669344 10 0ZM10 16.67C9.53815 16.67 9.16667 16.2985 9.16667 15.8367C9.16667 15.3748 9.53815 15.0033 10 15.0033C10.4618 15.0033 10.8333 15.3748 10.8333 15.8367C10.8333 16.2952 10.4618 16.67 10 16.67ZM11.6098 10.425C11.1078 10.7396 10.8132 11.2952 10.8333 11.8842V12.5033C10.8333 12.9652 10.4618 13.3367 10 13.3367C9.53815 13.3367 9.16667 12.9652 9.16667 12.5033V11.8842C9.14324 10.6861 9.76907 9.56827 10.8032 8.96586C11.4357 8.61781 11.7704 7.90161 11.6366 7.19545C11.5027 6.52276 10.9772 5.99732 10.3046 5.8668C9.40094 5.69946 8.5308 6.29853 8.36346 7.20214C8.34673 7.30254 8.33668 7.40295 8.33668 7.50335C8.33668 7.96519 7.9652 8.33668 7.50335 8.33668C7.0415 8.33668 6.67002 7.96519 6.67002 7.50335C6.67002 5.66265 8.16265 4.17001 10.0067 4.17001C11.8474 4.17001 13.34 5.66265 13.34 7.50669C13.3333 8.71821 12.674 9.83601 11.6098 10.425Z"
                      fill="#374557"
                      fillOpacity="0.6"
                    />
                  </svg>
                </span>
              </h1>
              <p className="text-sm text-qgraytwo mb-5">
                Profile images should be at least 300x300 pixels. GIFs are also supported with a maximum size of 5MB.
              </p>
              <div className="flex xl:justify-center justify-start">
                <div className="relative">
                  <div className="sm:w-[198px] sm:h-[198px] w-[199px] h-[199px] rounded-full overflow-hidden relative">
                    <img
                        src={`${import.meta.env.VITE_PUBLIC_URL}/${profile.image}`}  
                      alt={profile.first_name}
                      className="object-cover w-full h-ful    l"
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
                    className="w-[32px] h-[32px] absolute bottom-7 sm:right-0 right-[105px] bg-qblack rounded-full cursor-pointer"
                  >
                    <ToastContainer />
                    <svg
                      width="32"
                      height="32"
                      viewBox="0 0 32 32"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M16.5147 11.5C17.7284 12.7137 18.9234 13.9087 20.1296 15.115C19.9798 15.2611 19.8187 15.4109 19.6651 15.5683C17.4699 17.7635 15.271 19.9587 13.0758 22.1539C12.9334 22.2962 12.7948 22.4386 12.6524 22.5735C12.6187 22.6034 12.5663 22.6296 12.5213 22.6296C11.3788 22.6334 10.2362 22.6297 9.09365 22.6334C9.01498 22.6334 9 22.6034 9 22.536C9 21.4009 9 20.2621 9.00375 19.1271C9.00375 19.0746 9.02997 19.0109 9.06368 18.9772C10.4123 17.6249 11.7609 16.2763 13.1095 14.9277C14.2295 13.8076 15.3459 12.6913 16.466 11.5712C16.4884 11.5487 16.4997 11.5187 16.5147 11.5Z"
                        fill="white"
                      />
                      <path
                        d="M20.9499 14.2904C19.7436 13.0842 18.5449 11.8854 17.3499 10.6904C17.5634 10.4694 17.7844 10.2446 18.0054 10.0199C18.2639 9.76139 18.5261 9.50291 18.7884 9.24443C19.118 8.91852 19.5713 8.91852 19.8972 9.24443C20.7251 10.0611 21.5492 10.8815 22.3771 11.6981C22.6993 12.0165 22.7105 12.4698 22.3996 12.792C21.9238 13.2865 21.4443 13.7772 20.9686 14.2717C20.9648 14.2792 20.9536 14.2867 20.9499 14.2904Z"
                        fill="white"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="action-area flex space-x-4 items-center">
          <button type="button" className="text-sm text-qred font-semibold">
            Cancel
          </button>
          <button
            type="button"
            className="w-[164px] h-[50px] bg-qblack text-white text-sm"
            onClick={updateProfile}
          >
            Update Profile
          </button>
        </div>
      </>
    );
  }
