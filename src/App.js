import React from "react";
import { BrowserRouter } from "react-router-dom";
import { RouteList } from "./routes";


export const App = () => {
  return (
    <BrowserRouter>
      <RouteList/>
    </BrowserRouter>
    
  );
};
