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
import {useState} from 'react'

// import { useHistory } from 'react-router-dom';

import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
// import notepic from '../../../notepic.jpg'
import {APIService} from '../../../apiService';

// import { Formik } from 'formik';
// import * as EmailValidator from "email-validator";
// import * as Yup from 'yup';
import * as yup from 'yup';
import { schema } from './Validation';
import './signUp.css';

const theme = createTheme();

function SignUp() {

        const [usernameReg, setUsernameReg] = useState("");
        const [passwordReg, setPasswordReg] = useState("");
        const [cpasswordReg, setCpasswordReg] = useState("");
        
        // let history = useHistory();
      
        const register = () => {
            
            console.log(usernameReg,passwordReg,cpasswordReg)
            const newReg = {
                reg: usernameReg,
                pas: passwordReg,
                cpas: cpasswordReg,
            }
            // const isValid = await schema.isValid(newReg);
            // console.log(isValid);
            console.log("Hi")
            // const temp1 = newReg.pas;
            // const  temp2 = newReg.cpas;
  
            // const requestOptions = {   
            // method: "POST",
            // headers: {
            //     'Accept': 'application/json',
            //     'Content-type': 'application/json',
            //     },
            //     body: JSON.stringify(newReg)
            // };
            // fetch("http://localhost:5000/api/registration", requestOptions).then(APIService.handleResponse);
            
            //  history.push('/')
            
          //  else {
          //      alert("Password and confirm password do not match");
          //  }
        }
    return (
        <div>
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
                                onChange={(e) => {
                                    setUsernameReg(e.target.value);}}
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
                                onChange={(e) => {
                                    setPasswordReg(e.target.value);}}
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
                                onChange={(e) => {
                                    setCpasswordReg(e.target.value);}}
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
                                    onClick={register}
                                    sx={{ marginTop: 2, marginBottom: 1,width:150}}
                                >
                                Sign up
                                
                                    </Button>
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

export default SignUp