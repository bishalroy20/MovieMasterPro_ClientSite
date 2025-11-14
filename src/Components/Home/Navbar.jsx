import React, { use, useState } from 'react';
import { Link, Navigate, NavLink } from 'react-router';
import { AuthContext } from '../../contexts/AuthContext';
import { toast, ToastContainer } from 'react-toastify';



const Navbar = ({theme,setTheme}) => {
    const { user, signOutUser } = use(AuthContext);
    const handletoggle=(e)=>{
         setTheme(e.target.checked ? "dark" : "light");
    }

    // const handleSignOut = () => {
    //     signOutUser()
    //         .then(() => {
           
    //         toast.success('Signed out successfully!');
    //         Navigate('/login'); 
    //         })
    //         .catch(err => {
    //         toast.error('Sign out failed. Please try again.');
    //         console.error(err);
    //         });
    //     };      

    const links = <>
        <li><NavLink className='hover:bg-yellow-200 hover:text-black' to="/">Home</NavLink></li>
        <li><NavLink className='hover:bg-yellow-200 hover:text-black' to="/movies">All Movies</NavLink></li>
        <li><NavLink className='hover:bg-yellow-200 hover:text-black' to="/movies/my-collection">My Collection</NavLink></li>
        

    </>

    return (
        <div className="navbar bg-gradient-to-r from-gray-900 via-black to-gray-800 text-white shadow-sm w-full">
            <ToastContainer />
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                    </div>
                    <ul
                        tabIndex="-1"
                        className="menu menu-sm dropdown-content bg-black rounded-box z-1 mt-3 w-52 p-2 shadow">
                        {links}
                    </ul>
                </div>
                
                <h1 className="ghost text-xl">Movie<span>Master</span></h1>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {links}
                </ul>
            </div>
            <div className="navbar-end">
                  <label className="relative inline-flex items-center cursor-pointer ml-6">
              <input
                type="checkbox"
                checked={theme === "dark"}
                onChange={handletoggle}
                className="sr-only peer"
              />
              <div className="w-14 h-8 bg-gray-200 rounded-full peer-checked:bg-blue-600 transition-colors duration-300"></div>
              <div className="absolute left-1 top-1 w-6 h-6 bg-white rounded-full border border-gray-300 peer-checked:translate-x-6 peer-checked:border-blue-600 transition-transform duration-300"></div>
            </label>

                {user ? (
                <div className="flex items-center gap-4">
                    <div className="dropdown dropdown-end">
                    <label tabIndex={0} className="btn btn-circle avatar">
                        <div className="w-10 rounded-full">
                        <img src={user.photoURL || '/default-avatar.png'} alt="profile" />
                        </div>
                    </label>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-black  rounded-box w-52"
                    >
                        <li><Link className='hover:bg-yellow-200 hover:text-black' to="/profile">Profile</Link></li>
                        <li><button className='hover:bg-yellow-200 hover:text-black' onClick={signOutUser}>Logout</button></li>
                    </ul>
                    </div>
                </div>
                ) : (
                <div className="flex gap-4">
                    <Link to="/login" className="btn btn-outline">Login</Link>
                    <Link to="/register" className="btn btn-outline">Register</Link>
                </div>
                )}
            </div>

               
        </div>
    );
};

export default Navbar;