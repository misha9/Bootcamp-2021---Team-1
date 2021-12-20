import React, { Suspense } from "react";
import "./App.css";
import Router from "./Router";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <Suspense
      fallback={
        <div className="wrapper">
          <div className="loader"></div>
        </div>
      }
    >
      <Router />
    </Suspense>
  );
}

export default App;
