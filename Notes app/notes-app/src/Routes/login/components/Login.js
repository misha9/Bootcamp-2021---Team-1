import React from 'react'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';


// import {APIService} from '../../../apiService';
// import {useState} from 'react'
// import { Formik } from 'formik';
// import * as EmailValidator from "email-validator";
// import * as Yup from 'yup';
import * as yup from 'yup';
import { schema } from './Validation';
import './Login.css';

import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

function Login() {
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        // eslint-disable-next-line no-console
        alert({
          email: data.get('email'),
          password: data.get('password'),
        });
    };
    return (
        <div className="Login">
            <ThemeProvider theme={theme}>
                <Grid container component="main" sx={{ height: '100vh' }}>
                    <CssBaseline />
                    <Grid
                        item
                        xs={false}
                        sm={4}
                        md={6}
                        sx={{
                            // backgroundImage:{notepic} ,
                            backgroundRepeat: 'no-repeat',
                            backgroundColor: (t) =>
                            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                        }}
                    />
                    <Grid item xs={12} sm={8} md={6} component={Paper} elevation={6} square sx={{display: "flex", justifyContent:"center"}}>
                        <Box
                            sx={{
                            // my: "167px",
                            margin:"auto 0",
                            // mx: 4,
                            width:"320px",
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',

                            }}
                        >
                            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                                <LockOutlinedIcon />
                            </Avatar>
                            <Typography component="h1" variant="h5">
                                Create new account
                            </Typography>
                            <Box component="form" noValidate  sx={{ mt: 1 }}>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email"
                                    name="email"
                                    autoComplete="email"
                                    autoFocus
                                    variant="standard"
                                    helperText=""
                                    // onChange={(e) => {
                                    //     setUsernameReg(e.target.value);}}
                                />
                                
                                            
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    helperText=""
                                    variant="standard"
                                    autoComplete="current-password"
                                    // onChange={(e) => {
                                    //     setPasswordReg(e.target.value);}}
                                />
                                
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Confirm password"
                                    type="Confirm password"
                                    id="password"
                                    variant="standard"
                                    helperText=""
                                    autoComplete="current-password"
                                    // onChange={(e) => {
                                    //     setCpasswordReg(e.target.value);}}
                                />
                                                
                                <div style={{marginTop:"1.5rem"}}>
                                    <FormControlLabel 
                                        control={<Checkbox value="remember" color="primary" />}
                                        label="I read and agree to " sx={{marginRight:"0.25rem"}}
                                    />
                                    <Link href="#" variant="body2" sx={{textDecoration:"none"}}>
                                        {"Terms and conditions"}
                                    </Link>
                                </div>
                            
                                <div className="submitButton" style={{textAlign:"center"}}>
                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        onClick={handleSubmit}
                                        sx={{ marginTop: 2, marginBottom: 1,width:150}}
                                    >Sign up</Button>
                                </div>
                                <Grid container justifyContent="center">
                                    <Grid item >
                                    <Link href="#" variant="body2" sx={{textDecoration:"none"}}>
                                        {"Already have an account? Login"}
                                    </Link>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </ThemeProvider>
        </div>
    )
}

export default Login
