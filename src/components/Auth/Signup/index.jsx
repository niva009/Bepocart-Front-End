import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../../Partials/Layout";
import Thumbnail from "./Thumbnail";
import { Link } from "react-router-dom";
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { GoogleLogin } from '@react-oauth/google';
import { MdOutlineVisibility, MdOutlineVisibilityOff } from "react-icons/md";
import { jwtDecode } from "jwt-decode";

export default function Signup() {
  const [checked, setValue] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const rememberMe = () => {
    setValue(!checked);
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const validationSchema = yup.object({
    first_name: yup.string().required("First name required"),
    last_name: yup.string().required("Last name required"),
    email: yup.string().email("Enter a valid email").required("Email required"),
    phone: yup.string().matches(/^[0-9]{10}$/, 'Phone number should be 10 digits').required('Phone number is required'),
    password: yup.string().required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      first_name: '',
      last_name: '',
      email: '',
      phone: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const token = localStorage.getItem('token');
      axios.post(
        `${import.meta.env.VITE_PUBLIC_URL}/register/`,
        values,
        {
          headers: {
            'Authorization': `${token}`,
          },
        }
      )
      .then(response => {
        toast.success('Account created successfully!');
        navigate('/login');
      })
      .catch(error => {
        toast.error('An error occurred while creating the account');
        console.error(error);
      });
    },
  });


  const handleGoogleLoginSuccess = async (response) => {
    try {
      const idToken = response.credential;
      const decodedIdToken = jwtDecode(idToken);
      const name = decodedIdToken.name;
      const email = decodedIdToken.email;
  
      const result = await axios.post(`${import.meta.env.VITE_PUBLIC_URL}/google-login/`, { name: name, email: email });
      const token = result.data.token;
      localStorage.setItem("token", token);
      
      // Set success message
      setMessageType("success");
      setMessage("Login successful!");
  
      // Redirect to callback URL after successful login
      const callbackUrl = '/';  // Change this to your desired redirect URL
      window.location.href = callbackUrl;
      
    } catch (error) {
      console.error("Google login error:", error.response ? error.response.data : error.message
      );
      console.log(error,"erroorrrr")
      
      // Set error message
      setMessageType("error");
      setMessage("Google login failed. Please try again.");
    }
  };
  
  const handleGoogleLoginError = () => {
    console.log('Google Login Failed');
  };

  return (
    <Layout childrenClasses="pt-0 pb-0">
      <div className="login-page-wrapper w-full py-10">
        <div className="container-x mx-auto">
          <div className="lg:flex items-center relative">
            <div className="lg:w-[572px] w-full lg:h-[783px] bg-white flex flex-col justify-center sm:p-10 p-5 border border-[#E0E0E0]">
              <div className="w-full">
                <div className="title-area flex flex-col justify-center items-center relative text-center mb-7">
                  <h1 className="text-[34px] font-bold leading-[74px] text-qblack">
                    Create Account
                  </h1>
                  <div className="shape -mt-6">
                    <svg
                      width="354"
                      height="30"
                      viewBox="0 0 354 30"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M1 28.8027C17.6508 20.3626 63.9476 8.17089 113.509 17.8802C166.729 28.3062 341.329 42.704 353 1"
                        stroke="#FFBB38"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                </div>
                <form onSubmit={formik.handleSubmit}>
                  <div className="input-area">
                    <div className="flex sm:flex-row flex-col space-y-5 sm:space-y-0 sm:space-x-5 mb-5">
                      <TextField
                        placeholder="First Name"
                        label="First Name*"
                        name="first_name"
                        type="text"
                        onChange={formik.handleChange}
                        value={formik.values.first_name}
                        error={formik.touched.first_name && Boolean(formik.errors.first_name)}
                        helperText={formik.touched.first_name && formik.errors.first_name}
                        style={{ height: '70px', width: '100%' }}
                      />
                      <TextField
                        placeholder="Last Name"
                        label="Last Name*"
                        name="last_name"
                        type="text"
                        onChange={formik.handleChange}
                        value={formik.values.last_name}
                        error={formik.touched.last_name && Boolean(formik.errors.last_name)}
                        helperText={formik.touched.last_name && formik.errors.last_name}
                        style={{ height: '70px', width: '100%' }}
                      />
                    </div>
                    <div className="flex sm:flex-row flex-col space-y-5 sm:space-y-0 sm:space-x-5 mb-5">
                      <TextField
                        placeholder="Demo@gmail.com"
                        label="Email Address*"
                        name="email"
                        type="email"
                        onChange={formik.handleChange}
                        value={formik.values.email}
                        error={formik.touched.email && Boolean(formik.errors.email)}
                        helperText={formik.touched.email && formik.errors.email}
                        style={{ height: '70px', width: '100%' }}
                      />
                      <TextField
                        placeholder="Phone Number"
                        label="Phone*"
                        name="phone"
                        type="text"
                        onChange={formik.handleChange}
                        value={formik.values.phone}
                        error={formik.touched.phone && Boolean(formik.errors.phone)}
                        helperText={formik.touched.phone && formik.errors.phone}
                        style={{ height: '70px', width: '100%' }}
                      />
                    </div>
                    
                    <div className="flex sm:flex-row flex-col space-y-5 sm:space-y-0 sm:space-x-5 mb-5">
                      <TextField
                        label="Password*"
                        name="password"
                        onChange={formik.handleChange}
                        value={formik.values.password}
                        error={formik.touched.password && Boolean(formik.errors.password)}
                        helperText={formik.touched.password && formik.errors.password}
                        type={showPassword ? "text" : "password"}
                        style={{ height: '70px', width: '100%' }}
                        placeholder="password"
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                              >
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                      />
                    </div>
                    <div className="forgot-password-area mb-7">
                      <div className="remember-checkbox flex items-center space-x-2.5">
                        <button
                          onClick={rememberMe}
                          type="button"
                          className="w-5 h-5 text-qblack flex justify-center items-center border border-light-gray"
                        >
                          {checked && (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                          )}
                        </button>
                        <span
                          onClick={rememberMe}
                          className="text-base text-black capitalize"
                          style={{ cursor: 'pointer' }}
                        >
                          Remember Me
                        </span>
                      </div>
                    </div>
                    <button type="submit" className="black-btn w-full h-[50px] text-white text-[18px] font-semibold flex justify-center bg-black items-center">
                      Sign Up
                    </button>
                  </div>
                </form>
                <div className="google-phone-login-section mb-3.5 flex flex-col sm:flex-row space-y-10 sm:space-y-0 mt-10 sm:space-x-4">
  {/* Google Login Section */}
  <div className="google-login-section flex-1">
    <GoogleLogin
      onSuccess={handleGoogleLoginSuccess}
      onError={handleGoogleLoginError}
      buttonText="Login with Google"
      className="w-full"
    />
  </div>

  {/* Phone Login Section */}
  <div className="phone-login-section flex-1">
    <button 
      className="bg-slate-200 border-solid border-black border-1 text-black py-2 px-4 rounded-sm hover:bg-green-600 transition duration-200 ease-in-out w-full flex items-center justify-center space-x-2"
      onClick={() => navigate('/phone-verify')}
    >
      <span>Register with Otp</span>
    </button>
  </div>
</div>

<div className="from-footer text-center mt-10">
  <p className="text-base text-gray-600">
    Already have an account?{' '}
    <Link to="/login" className="text-blue-600 hover:underline">
      Login
    </Link>
  </p>
</div>

              </div>
            </div>
            <Thumbnail />
          </div>
        </div>
      </div>
      <ToastContainer />
    </Layout>
  );
}
