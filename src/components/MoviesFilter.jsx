import React, { useState, useEffect } from 'react';
import MovieListing from './MovieListing';
import { useFetching } from '../hooks/useFetching';
import APIService from '../API/themoviedb';
import SearchInput from './UI/SearchInput/SearchInput';
import DatePicker from "react-datepicker";
import '../styles/react-datepicker.css';

const MoviesFilter = ({ searchResult }) => {
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

    const [startDate, setStartDate] = useState(new Date());

    return (
        <section>
            <h2 className="title">Tous les movies</h2>
            <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                showYearPicker
                dateFormat="yyyy"
                yearItemNumber={9}
            />
            <MovieListing movies={
                searchResult && searchResult.length 
                ? searchResult
                : movies
                }
            />
        </section>
    )
}

export default MoviesFilter;