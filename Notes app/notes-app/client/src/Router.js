import React from "react";
import { Routes, BrowserRouter, Route } from "react-router-dom";
import { APP } from "./constants/index";

const MainContainer = React.lazy(() =>
  import("./components/main/containers/MainContainer")
);

const LoginContainer = React.lazy(() =>
  import("./components/login/containers/LoginContainer")
);

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LoginContainer />} />
        <Route path='/main' element={<MainContainer />} />
        <Route path={APP.ROUTES.LANDING} element={<MainContainer />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
