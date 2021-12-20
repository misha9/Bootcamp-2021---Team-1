import React, { useEffect } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { GoogleLogin } from "react-google-login";
import { APIService } from "../../../services/apiService";
import { useNavigate } from "react-router-dom";
import { MdEventNote } from "react-icons/md";
import GoogleIcon from "../views/GoogleIcon";
import AppleIcon from "@mui/icons-material/Apple";
import ImageSlide from "../views/ImageSlide";
import ImageSlider from "../views/ImageSlider";
import BootstrapSlider from "../views/BootstrapSlider";

const clientId =
  "866133952316-a8r10cdbhjlsjroke88n2qrm5ul0jgfj.apps.googleusercontent.com";

const theme = createTheme();

export default function LoginContainer({ setAuth }) {
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
      // localStorage.removeItem("token");
      localStorage.setItem("token", AT);

      console.log(res);
      //Storing_login_status
      const LS = res[2].LoginStatus;
      // localStorage.removeItem("loginStatus");
      localStorage.setItem("loginStatus", LS);
      console.log(LS);

      if (LS === "True") {
        localStorage.setItem("profilePic", profilePic);
        localStorage.setItem("userName", userName);
        localStorage.setItem("userMail", userMail);

        setAuth(true);
      }
    });
  };

  const onLoginFailure = (res) => {
    console.log("Login Failed:", res);
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid className="leftPart" item xs={false} sm={4} md={7}>
          {/* <ImageSlide /> */}
          {/* <ImageSlider /> */}
          <BootstrapSlider />
        </Grid>
        <Grid
          item
          xs={12}
          sm={8}
          md={5}
          component={Paper}
          elevation={6}
          square
          sx={{ display: "flex", justifyContent: "center" }}
        >
          <Box>
            <Box component="form" noValidate sx={{ mt: 1 }} className="mt-3">
              {
                <div className="text-center">
                  <div
                    className="d-flex align-items-center justify-content-center mt-5"
                    style={{ marginBottom: "7rem" }}
                  >
                    <MdEventNote size="3.5rem" />
                    <div style={{ fontSize: "2rem", fontWeight: "600" }}>
                      Notes
                    </div>
                  </div>
                  <h2>Create your account</h2>
                  <p
                    style={{
                      color: "#464646",
                      fontSize: "1.125rem",
                      marginBottom: "3.5rem",
                    }}
                  >
                    It’s free and easy
                  </p>
                  <GoogleLogin
                    clientId={clientId}
                    buttonText="Sign in With Google"
                    render={(renderProps) => (
                      <div
                        className="d-flex align-items-center"
                        style={{
                          maxWidth: "387px",
                          border: "1px solid #DEDEDE",
                          padding: "1rem 6.25rem",
                          borderRadius: "9px",
                          cursor: "pointer",
                        }}
                        onClick={renderProps.onClick}
                      >
                        <div className="me-2">
                          <GoogleIcon />
                        </div>
                        <div style={{ color: "#464646" }}>
                          Connect with google
                        </div>
                      </div>
                    )}
                    onSuccess={onLoginSuccess}
                    onFailure={onLoginFailure}
                    cookiePolicy={"single_host_origin"}
                    isSignedIn={true}
                  />
                  <div
                    className="d-flex align-items-center mt-3"
                    style={{
                      maxWidth: "387px",
                      border: "1px solid #DEDEDE",
                      padding: "1rem 6.25rem",
                      borderRadius: "9px",
                      cursor: "pointer",
                    }}
                  >
                    <div className="mb-1 me-2">
                      <AppleIcon fontSize="medium" />
                    </div>
                    <div style={{ color: "#464646" }}>Connect with apple</div>
                  </div>
                </div>
              }
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
