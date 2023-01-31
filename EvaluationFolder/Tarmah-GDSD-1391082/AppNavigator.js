/*
 * Contributor: Ahmed Hassan and Mayank Chetan Parvatia
 */
import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/home/Home";
import SignIn from "../pages/SignIn/SignIn";
import SignUp from "../pages/SignUp/SignUp";
import NavBar from "../components/NavBar/NavBar";
import { Chat } from "../pages/Chat/Chat";
import { Authorized } from "./Authorized";
import Seller from "../pages/Seller/Seller";
// import { CONSTANTS } from "../utils";
import Conversation from "../pages/Conversation/conversation";
import Admin from "../pages/Admin/Admin";
import { CONSTANTS } from "../utils";
import BuyerHome from "../pages/Buyer/BuyerHome";
import MediaDetail from "../pages/Buyer/MediaDetail";
import UserDetails from "../pages/Buyer/UserDetails";
import UpdateMedia from "../pages/Seller/UpdateMedia";
import UpdateDetails from "../pages/Seller/UpdateDetails";
import ChangePassword from "../pages/home/ChangePassword";

//Contributor : Hamza Mazhar
/*
 * Contributor: Abdullah Khalid and Tarmah Bin Iqbal
 */
const ROLES = CONSTANTS.ROLES;

function AppNavigator() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route exact path="/home" element={<Home />} />
        <Route exact path="/signin" element={<SignIn />} />
        <Route exact path="/signup" element={<SignUp />} />

        <Route
          exact
          path="/sellerdashboard"
          element={<Authorized component={Seller} Role={ROLES.SELLER} />}
        />
        <Route
          exact
          path="/conversation"
          element={<Authorized component={Conversation} />}
        />

        <Route
          exact
          path="/sellerdashboard"
          element={<Authorized component={Seller} Role={ROLES.SELLER} />}
        />
        <Route
          exact
          path="/buyerdashboard"
          element={<Authorized component={BuyerHome} Role={ROLES.BUYER} />}
        />

        <Route
          exact
          path="/admindashboard"
          element={<Authorized component={Admin} Role={ROLES.ADMIN} />}
        />
        <Route
          exact
          path="/mediadetail"
          element={<Authorized component={MediaDetail} Role={ROLES.BUYER} />}
        />

        <Route
          exact
          path="/updatemedia"
          element={<Authorized component={UpdateMedia} Role={ROLES.SELLER} />}
        />

        <Route
          exact
          path="/updatedetails"
          element={<Authorized component={UpdateDetails} />}
        />

        <Route
          exact
          path="/changepassword"
          element={<Authorized component={ChangePassword} />}
        />

        <Route
          exact
          path="/userdetails"
          element={<Authorized component={UserDetails} Role={ROLES.BUYER} />}
        />
        <Route path="/chat" element={<Chat />} />
        <Route path="*" element={<Navigate to="/signin" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppNavigator;
