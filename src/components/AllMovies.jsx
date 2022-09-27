import React, { useState, useEffect } from 'react';
import MovieListing from './MovieListing';
import { useFetching } from '../hooks/useFetching';
import APIService from '../API/themoviedb';
import MovieFilters from './MovieFilters/MovieFilters';

const AllMovies = ({ searchResult }) => {
    const [movies, setMovies] = useState([]);
	const [fetchMovies] = useFetching(async () => {
		const response = await APIService.getMovies();
		setMovies(response.data.results);
		// const totalCount = response.data.total_results;
		// setTotalPages(getPageCount(totalCount, limit));
	})
    useEffect(() => {
		fetchMovies();
	}, [])
    
    if (searchResult && searchResult.length) {
        // setMovies(searchResult);
        console.log('Search');
    }

    return (
        <section>
            <h2 className="title">Tous les movies</h2>
            
            <MovieFilters />

            <MovieListing movies={
                searchResult && searchResult.length 
                ? searchResult
                : movies
                }
            />
        </section>
    )
}

export default AllMovies;