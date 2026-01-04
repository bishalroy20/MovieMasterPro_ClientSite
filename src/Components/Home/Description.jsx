import React from "react";
import { Link } from "react-router";

const Description = ({ theme}) => {
  
  return (
    <section
      className={`py-16 px-6 text-center ${
        theme === "dark"
          ? "bg-gradient-to-r from-gray-900 via-black to-gray-800 text-white"
          : "bg-gray-200 text-black"
      }`}
    >
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">Welcome to MovieMasterPro</h1>
        <p
          className={`text-lg mb-8 ${
            theme === "dark" ? "text-gray-300" : "text-gray-700"
          }`}
        >
          Dive into a world of cinematic brilliance. MovieMasterPro brings you
          the latest blockbusters, timeless classics, and hidden gems—all in one
          place. Whether you're a casual viewer or a film fanatic, our curated
          collection is designed to inspire, entertain, and elevate your movie
          experience.
        </p>
        <div className="flex justify-center gap-4">
          <Link
            to="/movies"
            className={`btn btn-outline ${
              theme === "dark" ? "text-white border-white" : "text-black border-black"
            }`}
          >
            View All Movies
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Description;
