import React from "react";
import ReactDOM from "react-dom/client";
import "./main.css";
// import Home from "./pages/Home";
import CustomMap from "./pages/Map";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    {/* <Home /> */}
    <CustomMap />
  </React.StrictMode>
);
