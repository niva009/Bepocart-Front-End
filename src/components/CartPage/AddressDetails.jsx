import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import logo from "../../assets/bepocart.png";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const defaultTheme = createTheme();

export default function AddressDetails({ open, handleClose }) {
  const [value, setValue] = React.useState({
    address: "",
    email: "",
    phone: "",
    city: "",
    state: "",
    pincode: "",
    note:"",
  });


  const handleChange = (e) => {
    const { name, value } = e.target;
    setValue((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
  };

  console.log("value", value);

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    axios.post(
      `${import.meta.env.VITE_PUBLIC_URL}/add-address/`,
      {
        address: value.address,
        email: value.email,
        phone: value.phone,
        city: value.city,
        state: value.state,
        pincode: value.pinCode,
        note:value.note,
      },
      {
        headers: {
          'Authorization': `${token}`,
        },
      }
    )
    .then(response => {
      // Handle successful response
      console.log(response);
      handleClose(); // Close the modal on successful submission
    })
    .catch(error => {
      // Handle error
      console.error(error);
    });
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
              <CssBaseline />
              <Box
                sx={{
                  marginTop: 8,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <Avatar sx={{ m: 1, bgcolor: '#b5ff05' }}>
                  <img src={logo} alt='logo'></img>
                </Avatar>
                <Typography component="h1" variant="h5">
                  Add New Address
                </Typography>
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        autoComplete="given-name"
                        name="phone"
                        required
                        fullWidth
                        id="PhoneNumber"
                        label="Phone"
                        onChange={handleChange}
                        autoFocus
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        fullWidth
                        id="email"
                        label="Email"
                        name="email"
                        onChange={handleChange}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        name="address"
                        onChange={handleChange}
                        label="Address"
                        id="address"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        name="city"
                        required
                        fullWidth
                        onChange={handleChange}
                        id="city"
                        label="City"
                        autoFocus
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        name="state"
                        required
                        fullWidth
                        onChange={handleChange}
                        id="state"
                        label="State"
                        autoFocus
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        onChange={handleChange}
                        name="pinCode"
                        label="Pin Code"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        onChange={handleChange}
                        name="note"
                        label="note"
                      />
                    </Grid>
                  </Grid>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Submit
                  </Button>
                </Box>
              </Box>
            </Container>
          </ThemeProvider>
        </Box>
      </Modal>
    </div>
  );
}
