import React, { useEffect, useState } from "react";

const StatisticsSection = ({ theme }) => {
  const [stats, setStats] = useState({ totalMovies: 0, totalUsers: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [moviesRes, usersRes] = await Promise.all([
          fetch("https://movie-master-pro-server-side.vercel.app/stats/movies"),
          fetch("https://movie-master-pro-server-side.vercel.app/stats/users"),
        ]);

        const moviesData = await moviesRes.json();
        const usersData = await usersRes.json();

        setStats({
          totalMovies: moviesData.totalMovies || 0,
          totalUsers: usersData.totalUsers || 0,
        });
      } catch (err) {
        console.error("Failed to fetch statistics:", err);
      }
    };

    fetchStats();
  }, []);

  return (
    <section
      className={`py-12 px-6 text-center ${
        theme === "dark"
          ? "bg-gray-900 text-white"
          : "bg-gray-300 text-black"
      }`}
    >
      <h2 className="text-3xl font-bold mb-6">📊 Platform Statistics</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-xl mx-auto">
        <div
          className={`p-6 rounded-lg shadow-md ${
            theme === "dark" ? "bg-gray-800" : "bg-white"
          }`}
        >
          <h3 className="text-xl font-semibold">🎬 Total Movies</h3>
          <p className="text-4xl font-bold mt-2">{stats.totalMovies}</p>
        </div>
        <div
          className={`p-6 rounded-lg shadow-md ${
            theme === "dark" ? "bg-gray-800" : "bg-white"
          }`}
        >
          <h3 className="text-xl font-semibold">👥 Total Users</h3>
          <p className="text-4xl font-bold mt-2">10K</p>

        </div>
      </div>
    </section>
  );
};

export default StatisticsSection;
