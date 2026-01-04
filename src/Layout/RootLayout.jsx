import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router';
import Navbar from '../Components/Home/Navbar';
import Footer from '../Components/Home/Footer';

const RootLayout = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.querySelector("html").setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <div>
      <Navbar theme={theme} setTheme={setTheme} />
      <Outlet context={{ theme, setTheme }} />
      {/* <Outlet theme={theme} setTheme={setTheme} /> */}
      <Footer theme={theme} setTheme={setTheme} />
    </div>
  );
};

export default RootLayout;
