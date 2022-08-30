import React from 'react';

import styles from './DiceLoader.module.css';
import dice from '../d20.png';

const DiceLoader = () => {
    return (
        <div className={styles.spinner}>
            <img src={dice} alt="Loading..."/>
        </div>
    );
}

export default DiceLoader;