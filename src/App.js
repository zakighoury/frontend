import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./Allpages/Homepage/Homepage";
import MainLayout from "./MainLayout/MainLayout";
import Signup from "./Authenthication/Signup/Signup";
import Login from "./Authenthication/Login/Login";
import AdminLogin from "./Dashboard/AdminLogin/AdminLogin";
import UserProfile from "./Authenthication/UserProfile/UserProfile";
import ResetPassword from "./Authenthication/Reset_Password/Resent_Password";
import AdminLayout from "./Dashboard/AdminLayout/AdminLayout";
import Result from "./Dashboard/Result";
import AdminPrivate from "./Dashboard/AdminLogin/AdminPrivate";
import SignupLayout from "./Authenthication/SignupLayout/SignupLayout";
import Shop from "./HeaderPages/Shop/Shop";
import Men from "./HeaderPages/Men/Men";
import CartDetail from "./HeaderPages/Shop/CartDetail/CartDetail";
import AddToCart from "./HeaderPages/AddToCart/AddToCart";
import Success from "./HeaderPages/AddToCart/checkout/Success.jsx";
import Order from "./Authenthication/UserProfile/MYOrder/OrderPage";
import OrderDetailPage from "./Authenthication/UserProfile/OrderDetail/OrderDetail.jsx";
import WishlistPage from "./Authenthication/UserProfile/Wishlistpage/Wishlistpage.jsx";
import PasswordReset from "./Authenthication/Reset_Password/PasswordReset/PasswordReset.jsx";
function App() {
  return (
    <Router>
      <Routes>
        <Route index element={<SignupLayout />} />
        <Route path="/admin" element={<AdminPrivate />} />
        <Route path="/adminpanel" element={<AdminLayout />} />
        <Route path="/result" element={<Result />} />
        <Route path="" element={<MainLayout />}>
          <Route path="/home" element={<Homepage />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/api/cart/:id" element={<CartDetail />} />
          <Route path="/cart" element={<AddToCart />} />
          <Route path="/success" element={<Success />} />
          <Route path="/order" element={<Order />} />
          <Route path="/wishlist" element={<WishlistPage />} />
          <Route path="/order-detail/:id/:id" element={<OrderDetailPage />} />
          <Route path="/men" element={<Men />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/reset" element={<ResetPassword />} />
          <Route path="/reset-password/verify-token/:userId/:token" element={<PasswordReset />} />
          <Route path="/login" element={<Login />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
