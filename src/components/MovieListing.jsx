import React from 'react';
import MovieCard from './MovieCard';
import APIService from '../API/themoviedb';

const MovieListing = ({ movies }) => {
  return (
    <div className='listing'>
        {movies.map(movie =>
            <div key={movie.id} className='listing__item'>
                <MovieCard img={APIService.getPoster(movie)} name={movie.title} year={new Date(movie.release_date).getFullYear()} />
            </div>
        )}
    </div>
  )
}

export default MovieListing