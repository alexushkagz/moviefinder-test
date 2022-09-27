import React, {useState, useEffect} from 'react';
import './styles/App.css';
import APIService from './API/themoviedb';
import Header from './components/Header/Header'
import BgWrapper from './components/UI/Background/BgWrapper';
import MovieCard from './components/MovieCard';
import { useFetching } from './hooks/useFetching';
import MovieListing from './components/MovieListing';
import PopularMovies from './components/PopularMovies';
import AllMovies from './components/AllMovies';

function App() {
	const [movies, setMovies] = useState([]);
	const [searchMovies] = useFetching(async (query) => {
		const response = await APIService.searchMovies(query);
		setMovies(response.data.results);
	})


	const handleSearchSubmit = (value) => {
		// console.log(value);
		searchMovies(value);
	}

	return (
		<BgWrapper>
			<div className="App">
				<Header onSearchSubmit={handleSearchSubmit} />
				<PopularMovies />
				<AllMovies searchResult={movies}/>
			</div>
		</BgWrapper>
	);
}

export default App;