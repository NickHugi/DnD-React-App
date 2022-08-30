import React from 'react';
import classes from './LoadFailure.module.css';

const LoadFailure = () => {
    return (
        <div className={classes['load-failure']}>
            Failed to load.
        </div>
    );
}

export default LoadFailure;