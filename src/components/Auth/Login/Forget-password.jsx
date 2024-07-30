import React, { useState } from 'react';
import HeaderOne from '../../Partials/Headers/HeaderOne';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ForgetPassword = () => {
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        setEmail(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post(`${import.meta.env.VITE_PUBLIC_URL}/forgot-password/`, {
            email: email
        })
        .then((res) => {

            console.log(res,"response from  ..................")
            if (res.status === 200) {
                navigate(`/otp-verification/${email}`);
            }
        })
        .catch((error) => {
            console.log("email verification error", error);
            setError(error.response.data.message);
        });
    }

    return (
        <div>
            <HeaderOne />

            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginTop: '100px' }}>
                <h1 style={{ fontFamily: 'initial', fontSize: '40px', fontWeight: 'bolder' }}>Reset Your Password</h1>
                <p>We will send you an email to reset your password.</p>
                <Box
                    sx={{
                        width: 500,
                        maxWidth: '100%',
                        marginTop: '25px'
                    }}
                >
                    <TextField onChange={handleChange} fullWidth label="Email" id="fullWidth" value={email} />
                </Box>
                <Button onClick={handleSubmit} style={{ marginTop: '30px', padding: '10px 20px' }} variant="contained">Submit</Button>
                {error && <p style={{ color: 'red', marginTop: '20px' }}>{error}</p>}
            </div>
        </div>
    );
}

export default ForgetPassword;
