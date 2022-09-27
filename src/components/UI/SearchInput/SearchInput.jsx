import React from 'react';
import classes from './SearchInput.module.css'

const SearchInput = props => {
	return (
		<div className={classes.searchWrapper}>
			<input
				className={classes.searchInput}
				{...props}
			/>
			<div className={classes.searchIcon}></div>
		</div>
	)
};

export default SearchInput;