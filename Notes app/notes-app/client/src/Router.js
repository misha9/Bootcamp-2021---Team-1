import React, { useState, useEffect } from "react";
import { Routes, BrowserRouter, Route, Navigate } from "react-router-dom";
import { APP } from "./constants/index";
import "bootstrap/dist/css/bootstrap.min.css";

const MainContainer = React.lazy(() =>
  import("./components/main/containers/MainContainer")
);

const LoginContainer = React.lazy(() =>
  import("./components/login/containers/LoginContainer")
);

const Router = () => {
  const [isLogged, setIsLogged] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleResponse(response) {
    //console.log(response);
    return response.text().then((text) => {
      const data = text && JSON.parse(text);
      // console.log(data);
      return data;
    });
  }

  const setAuth = (b) => {
    setIsLogged(b);
  };
  async function isAuth() {
    try {
      setLoading(true);
      const AT = localStorage.getItem("token");
      //console.log(localStorage.token);

      const response = await fetch("http://localhost:5000/api/is-verify", {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${AT}`,
        },
      });
      const parseRes = await handleResponse(response);
      //console.log(parseRes, "hello");

      //console.log(parseRes);

      parseRes === true ? setAuth(true) : setAuth(false);
    } catch (err) {
      //console.log(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    isAuth();
  }, [isLogged]);

  //console.log(loading);

  if (loading) {
    return (
      <div className="wrapper">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        {/* {!isLogged ? (
          <Route path='/' element={<LoginContainer setAuth={setAuth} />} />
        ) : (
          <Route path='/main' element={<MainContainer setAuth={setAuth} />} />
        )} */}
        <Route
          path="/"
          exact
          element={
            !isLogged ? (
              <LoginContainer setAuth={setAuth} />
            ) : (
              <Navigate replace to="/main" />
            )
          }
        />
        <Route
          path="/main"
          exact
          element={
            isLogged ? (
              <MainContainer setAuth={setAuth} />
            ) : (
              <Navigate replace to="/" />
            )
          }
        />
        <Route
          path={APP.ROUTES.LANDING}
          element={<MainContainer setAuth={setAuth} />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
