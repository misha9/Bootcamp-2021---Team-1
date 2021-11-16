import React from "react";
import { Routes, BrowserRouter, Route } from "react-router-dom";
import { APP } from "./constants/index";
// import CreateNotebook from "./components/main/views/notesMenu/CreateNotebook";
// import DeleteNotebook from "./components/main/views/noteList/DeleteNotebook";
// import RenameNotebook from "./components/main/views/noteList/RenameNotebook";

const MainContainer = React.lazy(() =>
  import("./components/main/containers/MainContainer")
);

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<MainContainer />} />
        <Route path={APP.ROUTES.LANDING} element={<MainContainer />} />
        {/* <Route path='/create-notebook' element={<CreateNotebook />} />
        <Route path='/delete-notebook' element={<DeleteNotebook />} />
        <Route path='/rename-notebook' element={<RenameNotebook />} /> */}
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
