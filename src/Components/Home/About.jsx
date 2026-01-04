import React from 'react';

const About = ({ theme }) => {
  return (
    <section
      className={`w-full py-16 px-6 md:px-20 ${
        theme === "dark"
          ? "bg-gray-900 text-white"
          : "bg-gray-300 text-black"
      }`}
    >
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-6">🎥 About MovieMaster Pro</h2>
        <p
          className={`text-lg mb-8 leading-relaxed ${
            theme === "dark" ? "text-gray-300" : "text-gray-700"
          }`}
        >
          MovieMaster Pro is your ultimate destination for discovering,
          showcasing, and celebrating cinematic excellence. Whether you're a
          casual viewer or a passionate film buff, our platform brings together
          top-rated movies, featured gems, and insightful stats — all in one
          seamless experience.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
          <div>
            <h3 className="text-xl font-semibold mb-2">🌟 Featured Movies</h3>
            <p className={theme === "dark" ? "text-gray-400" : "text-gray-600"}>
              Handpicked selections that highlight emotional depth, visual
              brilliance, and storytelling mastery. Updated regularly to keep
              your watchlist fresh.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2">📊 Movie Stats</h3>
            <p className={theme === "dark" ? "text-gray-400" : "text-gray-600"}>
              Real-time insights into total movies and user engagement. Built
              for transparency and growth tracking.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2">🏆 Top Rated Picks</h3>
            <p className={theme === "dark" ? "text-gray-400" : "text-gray-600"}>
              Explore the highest-rated films based on community feedback and
              curated scores. Perfect for finding your next favorite.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2">🔐 Seamless Experience</h3>
            <p className={theme === "dark" ? "text-gray-400" : "text-gray-600"}>
              Built with modern tech for speed, security, and smooth navigation.
              MovieMaster Pro is optimized for all devices and audiences.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
