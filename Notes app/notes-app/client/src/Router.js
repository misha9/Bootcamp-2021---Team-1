import React, { useState, useEffect } from "react";
import { Routes, BrowserRouter, Route, Navigate } from "react-router-dom";
import { APP } from "./constants/index";

const MainContainer = React.lazy(() =>
  import("./components/main/containers/MainContainer")
);

const LoginContainer = React.lazy(() =>
  import("./components/login/containers/LoginContainer")
);

const Router = () => {
  const [isLogged, setIsLogged] = useState(false);
  const setAuth = (b) => {
    setIsLogged(b);
  };
  async function isAuth() {
    try {
      const response = await fetch("http://localhost:5000/api/is-verify", {
        method: "GET",
        headers: { authorization: localStorage.token },
      });
      const parseRes = await response.json();
      console.log(parseRes);
      parseRes == true ? setAuth(true) : setAuth(false);
    } catch (err) {
      console.error(err.message);
    }
  }
  useEffect(() => {
    isAuth();
  });
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path='/'
          element={
            !isLogged ? (
              <LoginContainer setAuth={setAuth} />
            ) : (
              <Navigate replace to='/main' />
            )
          }
        />
        <Route
          path='/main'
          element={
            isLogged ? (
              <MainContainer setAuth={setAuth} />
            ) : (
              <Navigate replace to='/' />
            )
          }
        />
        <Route path={APP.ROUTES.LANDING} element={<MainContainer />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
