import React from 'react';
import './pagination.css';
import { usePagination } from '../../../hooks/usePagination';

const Pagination = ({ totalPages, currentPage, changePage }) => {
	let pagesArray = usePagination(totalPages, currentPage);
    
    return (
        <div className="pager__wrapper">
            <button 
                className="page-btn" 
                onClick={() => changePage(1)}
            >
                &#x276E;&#x276E;
            </button>
            <button 
                className="page-btn" 
                onClick={() => changePage(currentPage === 1 ? 1 : currentPage-1)}
            >
                &#x276E;
            </button>
            {pagesArray.map(page =>
                <button
                    onClick={() => changePage(page)}
                    key={page}
                    className={currentPage === page ? 'page-btn page-btn__current' : 'page-btn'}
                >
                    {page}
                </button>
            )}
            <button 
                className="page-btn" 
                onClick={() => changePage(currentPage === totalPages ? totalPages : currentPage+1)}
            >
                &#x276F;
            </button>
            <button 
                className="page-btn" 
                onClick={() => changePage(totalPages)}
            >
                &#x276F;&#x276F;
            </button>
        </div>
    )
}

export default Pagination