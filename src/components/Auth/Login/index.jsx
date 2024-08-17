import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TextField from '@mui/material/TextField';
import * as yup from "yup";  // Correct import for Yup
import { Formik, Form } from "formik";
import { Link } from "react-router-dom";
import axios from "axios";
import Thumbnail from "./Thumbnail";

export default function Login() {
  const [checked, setValue] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const navigate = useNavigate();

  const rememberMe = () => {
    setValue(!checked);
  };

  const validationSchema = yup.object().shape({
    email: yup.string().email("Email must be valid").required("Email is required"),
    password: yup.string().required("Password is required"),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    setMessage("");
    try {
      const response = await axios.post(`${import.meta.env.VITE_PUBLIC_URL}/login/`, values);
      console.log("Response:", response.data);
      const token = response.data.token;
      localStorage.setItem("token", token);
      setMessageType("success");
      setMessage("Login successful!");
      navigate("/");
    } catch (error) {
      console.error("Error:", error.response ? error.response.data : error.message);
      setMessageType("error");
      setMessage("Login failed. Please check your credentials.");
    } finally {
      setSubmitting(false);
    }
  };


  return (
    <div className="login-page-wrapper w-full py-10">
      <div className="container-x mx-auto">
        <div className="lg:flex items-center relative">
          <div className="lg:w-[572px] w-full h-[783px] bg-white flex flex-col justify-center sm:p-10 p-5 border border-[#E0E0E0]">
            <div className="w-full">
              <div className="title-area flex flex-col justify-center items-center relative text-center mb-7">
                <h1 className="text-[34px] font-bold leading-[74px] text-qblack">
                  Log In
                </h1>
                <div className="shape -mt-6">
                  <svg
                    width="172"
                    height="29"
                    viewBox="0 0 172 29"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1 5.08742C17.6667 19.0972 30.5 31.1305 62.5 27.2693C110.617 21.4634 150 -10.09 171 5.08727"
                      stroke="#FFBB38"
                    />
                  </svg>
                </div>
              </div>
              {message && (
                <div className={`mb-4 p-3 ${messageType === "success" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"} rounded`}>
                  {message}
                </div>
              )}
              <Formik
                initialValues={{ email: "", password: "" }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({ values, handleChange, handleBlur, touched, errors, isSubmitting }) => (
                  <Form>
                    <div className="input-area">
                      <div className="input-item mb-5">
                        <TextField
                          placeholder="Email"
                          style={{width:"500px"}}
                          label="Email Address*"
                          name="email"
                          type="email"
                          value={values.email}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.email && Boolean(errors.email)}
                          helperText={touched.email && errors.email}
                        />
                      </div>
                      <div className="input-item mb-5">
                        <TextField
                          placeholder="Password"
                          label="Password*"
                          style={{width:"500px"}}
                          name="password"
                          type="password"
                          value={values.password}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.password && Boolean(errors.password)}
                          helperText={touched.password && errors.password}
                        />
                      </div>
                      <div className="forgot-password-area flex justify-between items-center mb-7">
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
                        <Link
                          to="/forgot-password"
                          className="text-base text-qyellow"
                        >
                          Forgot Password
                        </Link>
                      </div>
                      <div className="signin-area mb-3.5">
                        <div className="flex justify-center">
                          <button
                            type="submit"
                            className="black-btn mb-6 text-sm text-white w-full h-[50px] font-semibold flex justify-center bg-purple items-center"
                            disabled={isSubmitting}
                          >
                            <span>Log In</span>
                          </button>
                        </div>
                      </div>

                    

                      <div className="signup-area flex justify-center">
                        <p className="text-base text-qgraytwo font-normal">
                          Don’t have an account?
                          <Link to="/signup" className="ml-2 text-qblack">
                            Sign up free
                          </Link>
                        </p>
                      </div>
                    </div>
                  </Form>
                )}
              </Formik>
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
  );
}
