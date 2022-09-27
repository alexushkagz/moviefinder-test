import React, { useState, useEffect } from 'react';
import MovieListing from './MovieListing';
import { useFetching } from '../hooks/useFetching';
import APIService from '../API/themoviedb';

const PopularMovies = () => {
    const [popularMovies, setPopularMovies] = useState([]);
	const [fetchMovies] = useFetching(async () => {
		const response = await APIService.getPopularMovies();
		setPopularMovies(response.data.results.slice(0,5));
		// const totalCount = response.data.total_results;
		// setTotalPages(getPageCount(totalCount, limit));
	})
    useEffect(() => {
		fetchMovies();
	}, [])

    return (
        <section>
            <h2 className="title">Les 10 meilleurs films</h2>
            <MovieListing movies={popularMovies} />
        </section>
    )
}

export default PopularMovies