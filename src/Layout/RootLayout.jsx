import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../Components/Home/Navbar';
import Footer from '../Components/Home/Footer';

const RootLayout = () => {
    return (
        <div className=''>
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default RootLayout;