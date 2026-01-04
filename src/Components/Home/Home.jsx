import React from "react";
import { useOutletContext } from "react-router";
import Description from "./Description";
import Featured_movies from "./Featured_movies";
import About from "./About";
import TopRated from "./TopRated";
import StatisticsSection from "./StatisticsSection";
import GenreSection from "./GenreSection";
import RecentlyAdded from "./RecentlyAdded";
import { ToastContainer } from "react-toastify";
import Contact from "./Contact";

const Home = () => {
  // Grab theme + setTheme from Outlet context
  const { theme, setTheme } = useOutletContext();

  return (
    <div>
      <ToastContainer />
      <Description theme={theme} setTheme={setTheme} />
      <Featured_movies theme={theme} setTheme={setTheme} />
      <StatisticsSection theme={theme} setTheme={setTheme} />
      <TopRated theme={theme} setTheme={setTheme} />
      <RecentlyAdded theme={theme} setTheme={setTheme} />
      <GenreSection theme={theme} setTheme={setTheme} />
      <About theme={theme} setTheme={setTheme} />
      <Contact theme={theme} setTheme={setTheme} />
    </div>
  );
};

export default Home;
