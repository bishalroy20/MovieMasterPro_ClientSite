import React from 'react';

const genres = [
  { name: '🎭 Comedy', description: 'Laugh-out-loud stories and feel-good moments.', color: 'bg-yellow-500' },
  { name: '🔪 Thriller', description: 'Edge-of-your-seat suspense and psychological twists.', color: 'bg-red-600' },
  { name: '💥 Action', description: 'High-octane sequences and heroic adventures.', color: 'bg-blue-600' },
  { name: '❤️ Romance', description: 'Heartfelt tales of love and connection.', color: 'bg-pink-500' },
  { name: '🧙 Fantasy', description: 'Magical worlds and epic quests.', color: 'bg-purple-600' },
  { name: '👽 Sci-Fi', description: 'Futuristic tech and mind-bending ideas.', color: 'bg-green-600' },
  { name: '🎶 Musical', description: 'Stories told through rhythm and melody.', color: 'bg-indigo-500' },
  { name: '🎬 Drama', description: 'Emotionally rich narratives and character depth.', color: 'bg-gray-700' },
];

const GenreSection = ({ theme }) => {
  return (
    <section
      className={`w-full py-16 px-6 md:px-20 ${
        theme === "dark" ? "bg-gray-950 text-white" : "bg-gray-100 text-black"
      }`}
    >
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-10">🎞️ Explore by Genre</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {genres.map((genre, index) => (
            <div
              key={index}
              className={`rounded-xl shadow-lg p-6 hover:scale-105 transition-transform duration-300 ${genre.color}`}
            >
              <h3 className="text-xl font-semibold mb-2">{genre.name}</h3>
              <p
                className={`text-sm ${
                  theme === "dark" ? "text-white/90" : "text-black/80"
                }`}
              >
                {genre.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GenreSection;
