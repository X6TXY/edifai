import { Analytics } from '@vercel/analytics/react';
import React from "react";
import { BrowserRouter } from "react-router-dom";
import { RouteList } from "./routes";

export const App = () => {
  return (
    <BrowserRouter>
      <RouteList/>
      <Analytics />
    </BrowserRouter>
    
  );
};
