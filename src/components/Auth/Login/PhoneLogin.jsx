import React, { useState } from 'react';
import HeaderOne from '../../Partials/Headers/HeaderOne';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Footer from '../../Partials/Footers/Footer';

const PhoneLogin = () => {
    const [phone, setPhone] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        setPhone(e.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${import.meta.env.VITE_PUBLIC_URL}/generate-otp/`, { phone });

            if (response.status === 200) {
                // Navigate to the OTP verification page, pass the phone number
                navigate('/mobile-Otp', { state: { phone } });
            } else {
                setError('Failed to send OTP. Please try again.');
            }
        } catch (error) {
            // Handle any error that occurs and display the appropriate error message
            console.log(error)
            const errorMessage = error?.response?.data?.error || 'An error occurred. Please try again.';
            setError(errorMessage);
        }
    }

    return (
        <div>
            <HeaderOne />

            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginTop: '100px' }}>
                <h1 style={{ fontFamily: 'initial', fontSize: '40px', fontWeight: 'bolder' }}>Phone Login</h1>
                <p>We will send you an OTP to verify your phone number.</p>
                <Box
                    sx={{
                        width: 500,
                        maxWidth: '100%',
                        marginTop: '25px'
                    }}
                >
                    <TextField onChange={handleChange} fullWidth label="Phone Number" id="fullWidth" value={phone} />
                </Box>
                <Button onClick={handleSubmit} style={{ marginTop: '30px', padding: '10px 20px' }} variant="contained">Submit</Button>
                {error && <p style={{ color: 'red', marginTop: '20px' }}>{error}</p>}
            </div>
<Footer/>;

        </div>
    );
}

export default PhoneLogin;
