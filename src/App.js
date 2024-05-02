import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
// import Header from './components/Header/Header';
import Homepage from './Allpages/Homepage/Homepage';
import MainLayout from './MainLayout/MainLayout';
import Signup from './Authenthication/Signup/Signup';
import Login from './Authenthication/Login/Login';
import './App.scss';
import AdminLogin from './Dashboard/AdminLogin/AdminLogin';
import AdminPanel from './Dashboard/AdminPanel/AdminPanel';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/adminpanel" element={<AdminPanel />} />
        <Route path="/" element={<MainLayout />} >
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

