import React, { useState } from 'react';
import HeaderOne from '../../Partials/Headers/HeaderOne';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

const ChangePassword = () => {
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const navigate = useNavigate();
    const { id: email } = useParams();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (newPassword !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        axios.post(`${import.meta.env.VITE_PUBLIC_URL}/change-password/`, {
            new_password:newPassword,
             confirm_password:confirmPassword,
              email: email,
           })
            .then((res) => {
                console.log("Password change response", res);
                setSuccess("Password changed successfully");
                navigate('/login'); // navigate to the login page or desired route
            })
            .catch((error) => {
                console.log("Password change error", error);
                setError(error.response?.data?.message || "An error occurred. Please try again.");
            });
    };

    return (
        <div>
            <HeaderOne />
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginTop: '100px' }}>
                <h1 style={{ fontFamily: 'initial', fontSize: '40px', fontWeight: 'bolder' }}>Change Password</h1>
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginTop: '25px' }}>
                    <Box style={{ marginBottom: '20px' }}>
                        <label style={{ display: 'block', marginBottom: '5px',margin:"1px solid black" }}>New Password</label>
                        <input
                            type="password"
                            name='new-password'
                            onChange={e => setNewPassword(e.target.value)}
                            style={{ padding: '10px', width: '300px', margin:"1px solid black" }}
                        />
                    </Box>
                    <Box style={{ marginBottom: '20px' }}>
                        <label style={{ display: 'block', marginBottom: '5px', margin:"1px solid black" }}>Confirm Password</label>
                        <input
                            name="conform-password"
                            onChange={e => setConfirmPassword(e.target.value)}
                            style={{ padding: '10px', width: '300px' }}
                        />
                    </Box>
                    <Button type="submit" style={{ padding: '10px 20px' }} variant="contained">Change Password</Button>
                </form>
                {error && <p style={{ color: 'red', marginTop: '20px' }}>{error}</p>}
                {success && <p style={{ color: 'green', marginTop: '20px' }}>{success}</p>}
            </div>
        </div>
    );
}

export default ChangePassword;
