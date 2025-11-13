import React, { useEffect, useState } from 'react';

const StatisticsSection = () => {
  const [stats, setStats] = useState({ totalMovies: 0, totalUsers: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [moviesRes, usersRes] = await Promise.all([
          fetch('http://localhost:3000/stats/movies'),
          fetch('http://localhost:3000/stats/users'),
        ]);

        const moviesData = await moviesRes.json();
        const usersData = await usersRes.json();

        setStats({
          totalMovies: moviesData.totalMovies,
          totalUsers: usersData.totalUsers,
        });
      } catch (err) {
        console.error('Failed to fetch statistics:', err);
      }
    };

    fetchStats();
  }, []);

  return (
    <section className="bg-gray-900 text-white py-12 px-6 text-center">
      <h2 className="text-3xl font-bold mb-6">📊 Platform Statistics</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-xl mx-auto">
        <div className="bg-gray-800 p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold">🎬 Total Movies</h3>
          <p className="text-4xl font-bold mt-2">{stats.totalMovies}</p>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold">👥 Total Users</h3>
          <p className="text-4xl font-bold mt-2">{stats.totalUsers}</p>
        </div>
      </div>
    </section>
  );
};

export default StatisticsSection;