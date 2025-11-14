import React, { useEffect, useState } from "react";
import Description from "./Description";
import Featured_movies from "./Featured_movies";
import About from "./About";
import TopRated from "./TopRated";
import StatisticsSection from "./StatisticsSection";
import GenreSection from "./GenreSection";
import RecentlyAdded from "./RecentlyAdded";
import { ToastContainer } from "react-toastify";
import { FaMoon, FaSun } from "react-icons/fa6";

const Home = () => {
  return (
    <div>
      <ToastContainer />

      <Description></Description>
      <Featured_movies></Featured_movies>
      <StatisticsSection></StatisticsSection>
      <TopRated></TopRated>
      <RecentlyAdded></RecentlyAdded>
      <GenreSection></GenreSection>
      <About></About>
    </div>
  );
};

export default Home;
