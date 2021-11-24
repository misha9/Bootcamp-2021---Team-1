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

const clientId =
  "866133952316-a8r10cdbhjlsjroke88n2qrm5ul0jgfj.apps.googleusercontent.com";

const theme = createTheme();

export default function LoginContainer() {
  const navigate = useNavigate();

  const onLoginSuccess = (res) => {
    const token_id = res.tokenObj.id_token;

    APIService.loginAccess(token_id).then((res) => {
      //Storing_access_token
      const AT = res[0].AccessToken;
      localStorage.removeItem("token");
      localStorage.setItem("token", AT);
      //Storing_login_status
      const LS = res[1].LoginStatus;
      localStorage.removeItem("loginStatus");
      localStorage.setItem("loginStatus", LS);
      console.log(LS);
      if (LS) {
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
              my: "153px",
              mx: 4,
              width: "320px",
              height: "330px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, backgroundColor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component='h1' variant='h5'>
              Sign in
            </Typography>
            <Box
              component='form'
              noValidate
              sx={{ mt: 1, position: "absolute", top: "40%", left: "71.5%" }}
            >
              {
                <div>
                  <GoogleLogin
                    clientId={clientId}
                    buttonText='Sign in'
                    onSuccess={onLoginSuccess}
                    onFailure={onLoginFailure}
                    cookiePolicy={"single_host_origin"}
                    isSignedIn={true}
                  />
                </div>
              }
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
