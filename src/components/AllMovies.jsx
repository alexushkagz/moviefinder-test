import React, { useState, useEffect } from 'react';
import MovieListing from './MovieListing';
import { useFetching } from '../hooks/useFetching';
import APIService from '../API/themoviedb';
import MovieFilters from './MovieFilters/MovieFilters';
import Pagination from './UI/Pagination/Pagination';

const MAX_PAGES = 500; // API limitation

const AllMovies = ({ searchQuery }) => {
	const [movies, setMovies] = useState([]);
    const [filters, setFilters] = useState({
        sortBy: null,
        genre: null,
        year: null,
    });
    const [totalPages, setTotalPages] = useState();
    const [currentPage, setCurrentPage] = useState(1);

	const [searchMovies] = useFetching(async (query) => {
		const response = await APIService.searchMovies(query);
		setMovies(response.data.results);
        const pagesCount = response.data.total_pages > MAX_PAGES ? MAX_PAGES : response.data.total_pages;
        setTotalPages(pagesCount);
        setCurrentPage(1);
	})
    useEffect(() => {
        if (searchQuery && searchQuery.length) {
            searchMovies(searchQuery);
        }
    }, [searchQuery])

	const [fetchMovies] = useFetching(async () => {
		const response = await APIService.getMoviesFiltered(filters, currentPage);
		setMovies(response.data.results);
		// const totalCount = response.data.total_results;
		const pagesCount = response.data.total_pages > MAX_PAGES ? MAX_PAGES : response.data.total_pages;
        setTotalPages(pagesCount);
	})
    useEffect(() => {
        setCurrentPage(1);
		fetchMovies();
	}, [filters])
    useEffect(() => {
		fetchMovies();
	}, [currentPage])


    return (
        <section>
            <h2 className="title">Tous les movies</h2>
            
            <MovieFilters onChange={setFilters}/>

            <MovieListing movies={movies} />

            <Pagination 
                totalPages={totalPages}
                currentPage={currentPage}
                changePage={setCurrentPage}
            />
        </section>
    )
}

export default AllMovies;