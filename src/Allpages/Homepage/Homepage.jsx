import React from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import Header from '../../components/Header/Header';
import HeroSection from '../../components/HeroSection/HeroSection';
import Picture from '../../components/Picture_Section/Picture_Section';
import New_Arrival from '../../components/New_Arrival/New_Arrival';
import Big_Saving_zone from '../../components/Big_Saving_Zone/Big_Saving_zone';
import Footer from '../../components/Footer/Footer';
import Cookie from 'js-cookie'
const Homepage = () => {
    const Navigate = useNavigate();
    const isLoggedIn = Cookie.get('token');

    if (!isLoggedIn) {
        return <Navigate to="/login" />;
    }

    return (
        <div>
            {/* <Header /> */}
            <HeroSection />
            <Picture />
            <New_Arrival />
            <Big_Saving_zone />
            {/* <Footer /> */}
        </div>
    );
};

export default Homepage;
