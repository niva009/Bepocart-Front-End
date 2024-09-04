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
            // Make an API call to your backend to generate and send the OTP
            const response = await axios.post('https://your-backend-url/send-otp', { phone });

            if (response.data.success) {
                // Navigate to the OTP verification page, pass the phone number
                navigate('/verify-otp', { state: { phone } });
            } else {
                setError('Failed to send OTP. Please try again.');
            }
        } catch (error) {
            setError('An error occurred. Please try again.');
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
