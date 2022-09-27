import React, { useState, useEffect, useRef } from 'react';
import classes from './MovieFilters.module.css'
import DatePicker from "react-datepicker";
import APIService from '../../API/themoviedb';
import '../../styles/react-datepicker.css';
import Select from '../UI/Select/Select';

const MovieFilters = () => {
    const [startDate, setStartDate] = useState(null);
    const genresList = useRef([]);
    const sortOptions = [
        {value: 'popularity.desc', text: 'Pertinence'},
        {value: 'original_title.asc', text: 'Ordre alphabétique'},
        {value: 'release_date.asc', text: 'Année croissante'},
        {value: 'release_date.desc', text: 'Année décroissante'},
    ];

    useEffect(() => {
        async function fetchGenres() {
            const response = await APIService.getGenres();
            genresList.current = response.data.genres.map(genre => {
                return {value: genre.id, text: genre.name}     
            });
        }
        fetchGenres();
    }, [])
    console.log(genresList.current)

    return (
        <form className={classes.filtersWrapper}>
            <Select
                name="order_by"
                label="Trier par :"
                // placeholder="Choisissez l'option"
                options={sortOptions}
            />
            <Select
                name="filter"
                label="Filtrer par :"
                placeholder="Choisissez le genre"
                options={genresList.current}
            />
            <div>
                <DatePicker
                    selected={startDate}
                    placeholderText="Année"
                    onChange={(date) => setStartDate(date)}
                    showYearPicker
                    dateFormat="yyyy"
                    yearItemNumber={9}
                />
            </div>
        </form>
    )
}

export default MovieFilters