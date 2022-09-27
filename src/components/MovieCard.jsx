import React from 'react';

const MovieCard = ({ img, name, year }) => {
  return (
    <div className='card'>
        <div className="card__img">
            <img src={img} alt={name} />
        </div>
        <div className="card__title">{name}</div>
        <div className="card__year">{year}</div>
    </div>
  )
}

export default MovieCard