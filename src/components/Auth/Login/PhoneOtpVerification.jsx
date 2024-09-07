import React, { useState } from 'react';
import HeaderOne from '../../Partials/Headers/HeaderOne';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';


const PhoneOtpVerification = () => {
    const [otp, setOtp] = useState(new Array(6).fill(""));
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const location = useLocation();
    const { phone } = location.state || {}; // Destructure phone, handle case where state is undefined


    const handleChange = (element, index) => {
        if (isNaN(element.value)) return;

        setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

        // Focus next input
        if (element.nextSibling) {
            element.nextSibling.focus();
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const otpCode = otp.join("");
        axios.post(`${import.meta.env.VITE_PUBLIC_URL}/verification-otp/`, { otp: otpCode, phone: phone })
            .then((res) => {
                localStorage.setItem("token",res.data.token)

                if(res.status === 200){

                    navigate('/');
                }else{
                    setError("otp verification not successfull")
                }
            })
            .catch((error) => {
                setError(error.response?.data?.error || "An error occurred. Please try again.");
            });
    };

    return (
        <div>
            <HeaderOne />
            <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" mt={10}>
                <h1 style={{ fontFamily: 'initial', fontSize: '40px', fontWeight: 'bolder' }}>Enter OTP</h1>
                <p>Enter the 6-digit OTP sent to your phone.</p>
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginTop: '25px' }}>
                    <Box display="flex">
                        {otp.map((data, index) => (
                            <input
                                type="number"
                                name="otp"
                                maxLength="1"
                                key={index}
                                value={data}
                                onChange={e => handleChange(e.target, index)}
                                onFocus={e => e.target.select()}
                                style={{
                                    width: '40px',
                                    height: '40px',
                                    margin: '0 10px',
                                    textAlign: 'center',
                                    fontSize: '20px',
                                    color: "white",
                                    backgroundColor: "#6495ED"
                                }}
                            />
                        ))}
                    </Box>
                    <Button type="submit" style={{ marginTop: '30px', padding: '10px 20px' }} variant="contained">Submit</Button>
                </form>
                {error && <p style={{ color: 'red', marginTop: '20px' }}>{error}</p>}
            </Box>
        </div>
    );
};

export default PhoneOtpVerification;

