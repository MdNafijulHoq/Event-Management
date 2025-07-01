import React, { Children } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

const RootLayout = ({ children }) => {
  return (
    <div>
      <Navbar />
      <div className="min-h-[calc(100vh-370px)] max-w-7xl mx-auto px-4 sm:px-6">
        {children}
       </div>
      <Footer />
    </div>
  );
};

export default RootLayout;
