import { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import InputCom from "../../Helpers/InputCom";
import Thumbnail from "./Thumbnail";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const [checked, setValue] = useState(false);
  const [data, setData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(""); 
  const navigate = useNavigate(); 
  const rememberMe = () => {
    setValue(!checked);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage(""); 
    axios
      .post("http://127.0.0.1:8000/login/", data)
      .then((response) => {
        console.log("Response:", response.data);
        const token = response.data.token; 
        localStorage.setItem("token", token); 
        setMessageType("success");
        setMessage("Login successful!");
        navigate("/"); 
      })
      .catch((error) => {
        console.error("Error:", error.response ? error.response.data : error.message);
        setMessageType("error");
        setMessage("Login failed. Please check your credentials.");
      });
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
              <form onSubmit={handleSubmit}>
                <div className="input-area">
                  <div className="input-item mb-5">
                    <InputCom
                      placeholder="Email"
                      label="Email Address*"
                      name="email"
                      type="email"
                      inputClasses="h-[50px]"
                      inputHandler={handleChange}
                      value={data.email}
                    />
                  </div>
                  <div className="input-item mb-5">
                    <InputCom
                      placeholder="Password"
                      label="Password*"
                      name="password"
                      type="password"
                      inputClasses="h-[50px]"
                      inputHandler={handleChange}
                      value={data.password}
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
  );
}
