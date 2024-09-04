import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import HeaderOne from '../../Partials/Headers/HeaderOne';
import axios from 'axios';
import Footer from '../../Partials/Footers/Footer';

const VerifyOtp = () => {
    const [otp, setOtp] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const location = useLocation();
    // const { phone } = location.state;

    const handleChange = (e) => {
        setOtp(e.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Verify the OTP with the backend
            const response = await axios.post('https://your-backend-url/verify-otp', { phone, otp });

            if (response.data.success) {
                // OTP is correct, proceed to the next step
                navigate('/home');
            } else {
                setError('Invalid OTP. Please try again.');
            }
        } catch (error) {
            setError('An error occurred. Please try again.');
        }
    }

    return (
        <div>
            <HeaderOne />
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginTop: '100px' }}>
            <h1 style={{ fontFamily: 'initial', fontSize: '40px', fontWeight: 'bolder' }}>Verify OTP</h1>
            <Box
                sx={{
                    width: 500,
                    maxWidth: '100%',
                    marginTop: '25px'
                }}
            >
                <TextField onChange={handleChange} fullWidth label="Enter OTP" id="fullWidth" value={otp} />
            </Box>
            <Button onClick={handleSubmit} style={{ marginTop: '30px', padding: '10px 20px' }} variant="contained">Verify</Button>
            {error && <p style={{ color: 'red', marginTop: '20px' }}>{error}</p>}
        </div>
        <Footer/>
        </div>
    );
}

export default VerifyOtp;
