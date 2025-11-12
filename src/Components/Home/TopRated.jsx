import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

const TopRated = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/toprated')
      .then(res => res.json())
      .then(data => setMovies(data))
      .catch(err => console.error('Failed to fetch top-rated movies:', err));
  }, []);

  return (
    <section className="w-full bg-black text-white py-10 px-4">
      <h2 className="text-3xl font-bold text-center mb-6">🌟 Top Rated Movies</h2>
      <Swiper
        modules={[Navigation, Autoplay]}
        navigation
        autoplay={{ delay: 3000 }}
        loop={true}
        slidesPerView={1}
        breakpoints={{
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        className="w-full h-[400px]"
      >
        {movies.map(movie => (
          <SwiperSlide key={movie.title}>
            <img
              src={movie.posterUrl}
              alt={movie.title}
              className="w-full h-full object-cover rounded-lg shadow-lg"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default TopRated;