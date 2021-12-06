import React from "react";
import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { GoogleLogin } from "react-google-login";
import { APIService } from "../../../services/apiService";
import { useNavigate } from "react-router-dom";
import { MdEventNote } from "react-icons/md";

const clientId =
  "866133952316-a8r10cdbhjlsjroke88n2qrm5ul0jgfj.apps.googleusercontent.com";

const theme = createTheme();

export default function LoginContainer() {
  const navigate = useNavigate();

  const onLoginSuccess = (res) => {
    const profilePic = res.profileObj.imageUrl;
    const userName = res.profileObj.name;
    const userMail = res.profileObj.email;

    const token_id = res.tokenObj.id_token;

    APIService.loginAccess(token_id).then((res) => {
      const userID = res[0].userID;

      const uIdExist = localStorage.getItem("uID");
      if (uIdExist) {
        localStorage.removeItem("uID");
      }
      localStorage.setItem("uID", userID);

      //Storing_access_token
      const AT = res[1].AccessToken;
      localStorage.removeItem("token");
      localStorage.setItem("token", AT);
      //Storing_login_status
      const LS = res[2].LoginStatus;
      localStorage.removeItem("loginStatus");
      localStorage.setItem("loginStatus", LS);
      console.log(LS);
      if (LS === "True") {
        localStorage.setItem("profilePic", profilePic);
        localStorage.setItem("userName", userName);
        localStorage.setItem("userMail", userMail);
        navigate("/main");
      }
    });
  };

  const onLoginFailure = (res) => {
    console.log("Login Failed:", res);
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component='main' sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          className='leftPart'
          item
          xs={false}
          sm={4}
          md={6}
          sx={{
            backgroundImage:
              "url( https://images.unsplash.com/photo-1563121661-cd531f4fb8cb?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=858&q=80)",
            backgroundRepeat: "no-repeat",
            // backgroundColor: "black !important",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid
          item
          xs={12}
          sm={8}
          md={6}
          component={Paper}
          elevation={6}
          square
          sx={{ display: "flex", justifyContent: "center" }}
        >
          <Box
            sx={{
              // my: "153px",
              // mx: 4,
              // width: "320px",
              // height: "330px",
              display: "flex",
              flexDirection: "column",
              // alignItems: "center",
            }}
            className='m-auto'
            style={{ marginBottom: "0" }}
          >
            <div>
              <div className='d-flex align-items-center'>
                <MdEventNote
                  // style={{ width: "18%" }}
                  size='3rem'
                  color='black'
                />
                <div
                  className='text-dark'
                  style={{ fontSize: "2rem", fontWeight: "600" }}
                >
                  Notes
                </div>
              </div>
              <div
                className='text-secondary '
                style={{
                  fontSize: "1.5rem",
                  fontWeight: "400",
                  marginBottom: "5rem",
                }}
              >
                Jot down your thoughts and ideas
              </div>
            </div>
            <div className='mb-5 text-center'>
              <div className='d-flex align-items-center justify-content-center'>
                {/* <Avatar sx={{ m: 1, backgroundColor: "secondary.main" }}>
                  <LockOutlinedIcon />
                </Avatar> */}
                <Typography
                  component='h1'
                  variant='h5'
                  className='m-2 text-dark'
                  style={{ fontWeight: "400" }}
                >
                  Join with us
                </Typography>
              </div>
              <Box component='form' noValidate sx={{ mt: 1 }} className='mt-3'>
                {
                  <div>
                    <GoogleLogin
                      clientId={clientId}
                      buttonText='Sign in With Google'
                      onSuccess={onLoginSuccess}
                      onFailure={onLoginFailure}
                      cookiePolicy={"single_host_origin"}
                      isSignedIn={true}
                    />
                  </div>
                }
              </Box>
            </div>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
