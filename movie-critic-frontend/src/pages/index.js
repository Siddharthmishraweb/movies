import React from 'react';
import MovieCard from '../components/MovieCard';

const Home = ({ movies }) => {
  return (
    <div>
      <h1 className="text-3xl font-bold">MOVIECRITIC</h1>
      <div className="mt-4 mb-8">
        <p className="text-lg">The Best movie reviews site!</p>
      </div>
      <div>
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
      <footer className="bg-gray-200 text-center p-4">
        <p>Copyright</p>
        <p>Follow us on Instagram</p>
      </footer>
    </div>
  );
};

export async function getServerSideProps() {
  const res = await fetch('http://localhost:3000/api/movies');
  const movies = await res.json();

  return {
    props: {
      movies,
    },
  };
}

export default Home;
