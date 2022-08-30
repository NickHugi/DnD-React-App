import React from 'react';

import styles from './LoadFailure.module.css';

const LoadFailure = () => {
    return (
        <div className={styles.loadFailure}>
            Failed to load.
        </div>
    );
}

export default LoadFailure;