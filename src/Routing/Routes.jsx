import React from "react";
import { Route, Routes } from "react-router-dom";
import Footer from "../Components/Arfeen/Footer/Footer";
import { Navbar } from "../Components/Navbar";
import SinglePage from "../Components/Arfeen/SinglePage";

import Login from "../Pages/bharat_page/Login";


import { Homepage } from "../Pages/Homepage";




const MainRoutes = () => {
  return (
    <>
      <Navbar />
      <div>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/body-care" element={<AllCare />} />
          <Route path="/candle" element={<Candle />} />
          <Route path="/handsoap" element={<HandSoap />} />
          <Route path="/homefragrance" element={<HomeFragnance />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/cart" element={<Cart />}></Route>
          <Route
            path="/checkout"
            element={
              <RequiredAuth>
                <Checkout />
              </RequiredAuth>
            }
          />

          <Route path="/allcareProducts/:id" element={<SinglePage />} />

          {/* page not found */}
          <Route path="*" element={<PageNotFound />} />
        </Routes>
        <Footer />
      </div>
    </>
  );
};

export default MainRoutes;