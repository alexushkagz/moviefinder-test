import React, { useState } from 'react';
import classes from './Header.module.css';
import SearchInput from '../UI/SearchInput/SearchInput';
import { useFetching } from '../../hooks/useFetching';
import APIService from '../../API/themoviedb';

const Header = ({ onSearchSubmit }) => {
    const [inputValue, setInputValue] = useState('');
    const [keywords, setKeywords] = useState([]);
    const [fetchKeywords] = useFetching(async query => {
        const response = await APIService.fetch('/search/keyword', {query});
		setKeywords(response.data.results);
    })

    const handleSubmit = (e) => {
        e.preventDefault();
        setInputValue('');
        setKeywords([]);
        onSearchSubmit(inputValue);
    }

    const handleChange = e => {
        setInputValue(e.target.value);
        fetchKeywords(e.target.value);
    }

    return (
        <header className={classes.header}>
            <div>
                <img src="/assets/logo.svg" alt="" />
            </div>
            <form onSubmit={handleSubmit}>
                <SearchInput 
                    value={inputValue}
                    onChange={handleChange}
                    type="search"
                    placeholder="Rechercher un film"
                    list="keywords" 
                />
                <datalist id="keywords">
                    {keywords.slice(0, 9).map(keyword => 
                        <option key={keyword.id} value={keyword.name}></option>
                    )}
                </datalist>
            </form>
        </header>
    )
}

export default Header