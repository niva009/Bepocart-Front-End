import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../../Partials/Layout";
import Thumbnail from "./Thumbnail";
import { Link } from "react-router-dom";
import TextField from '@mui/material/TextField';
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as yup from 'yup';
import { useFormik } from 'formik';

export default function Signup() {

  const [checked, setValue] = useState(false);
  const navigate = useNavigate();

  const rememberMe = () => {
    setValue(!checked);
  };

  const validationSchema = yup.object({
    first_name: yup.string().required("First name required"),
    last_name: yup.string().required("Last name required"),
    email: yup.string().email("Enter a valid email").required("Email required"),
    place: yup.string().required("Place name is required"),
    phone: yup.string().matches(/^[0-9]{10}$/, 'Phone number should be 10 digits').required('Phone number is required'),
    zip_code: yup.string().matches(/^[0-9]{6}$/, 'Pin Code should be 6 digits').required("Zip code is required"),
    password: yup.string().required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      first_name: '',
      last_name: '',
      email: '',
      place: '',
      phone: '',
      zip_code: '',
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
            Authorization: `${token}`,
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
                        placeholder="Your address Here"
                        label="Place"
                        name="place"
                        type="text"
                        onChange={formik.handleChange}
                        value={formik.values.place}
                        error={formik.touched.place && Boolean(formik.errors.place)}
                        helperText={formik.touched.place && formik.errors.place}
                        style={{ height: '70px', width: '100%' }}
                      />
                      <TextField
                        label="Postcode / ZIP*"
                        name="zip_code"
                        onChange={formik.handleChange}
                        value={formik.values.zip_code}
                        error={formik.touched.zip_code && Boolean(formik.errors.zip_code)}
                        helperText={formik.touched.zip_code && formik.errors.zip_code}
                        type="text"
                        style={{ height: '70px', width: '100%' }}
                        placeholder="00000"
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
                        type="password"
                        style={{ height: '70px', width: '100%' }}
                        placeholder="password"
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
                          className="text-base text-black"
                        >
                          Remember Me
                        </span>
                      </div>
                    </div>
                    <div className="signin-area mb-3">
                      <div className="flex justify-center">
                        <button
                          type="submit"
                          className="black-btn text-sm text-white w-full h-[50px] font-semibold flex justify-center bg-purple items-center"
                        >
                          <span>Create Account</span>
                        </button>
                      </div>
                    </div>
                    <div className="signup-area flex justify-center">
                      <p className="text-base text-qgraytwo font-normal">
                        Already have an Account?
                        <Link to="/login" className="ml-2 text-qblack">
                          Log In
                        </Link>
                      </p>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div className="flex-1 lg:flex hidden transform scale-60 xl:scale-100 xl:justify-center">
              <div
                className="absolute xl:-right-20 -right-[138px]"
                style={{ top: "calc(50% - 258px)" }}
              >
                <Thumbnail />
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </Layout>
  );
}
