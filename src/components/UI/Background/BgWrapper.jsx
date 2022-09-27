import React from 'react';
import classes from './BgWrapper.module.css';

const BgWrapper = ({ children }) => {
  return (
    <>
        <div className={classes['bg-wrapper']}>
            <div className={classes['bg-gradient']}>
            </div>
        </div>
        {children}
    </>
  )
}

export default BgWrapper