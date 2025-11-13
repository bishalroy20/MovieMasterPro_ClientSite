import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import SwiperCore from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';

SwiperCore.use([Navigation, Autoplay]);

const Featured_movies = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/featured')
      .then(res => res.json())
      .then(data => setMovies(data))
      .catch(err => console.error('Failed to fetch featured movies:', err));
  }, []);

  if (movies.length === 0) return <p className="text-center text-white">Loading...</p>;

  return (
    <section className="w-full bg-black text-white py-10 px-4">
      <h2 className="text-3xl font-bold text-center mb-6">🎬 Featured Movies</h2>

      <Swiper
        modules={[Navigation, Autoplay]}
        navigation
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop={true}
        slidesPerView={1}
        className="w-full h-[500px]"
      >
        {movies.map(movie => (
          <SwiperSlide key={movie.title}>
            <img
              src={movie.poster}
              alt={movie.title}
              className="w-full h-full object-cover"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Featured_movies;