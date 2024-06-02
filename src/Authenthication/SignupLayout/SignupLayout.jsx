import React from 'react'
import Header from '../../components/Header/Header';
import Signup from '../Signup/Signup';
import FooterUser from '../../components/Footer/Footer';

const SignupLayout = () => {
    return (
        <div>
            <Header />
            <Signup />
            <FooterUser />

        </div>
    )
}

export default SignupLayout