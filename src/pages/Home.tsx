import React from 'react';

import classes from './Home.module.css';

const Home = () => {
    return (
        <div className={classes['home']}>
            <p>
                This is a small app demonstrating the use of React. You can browse through a list of
                spells on the Spells page and click on them to view more information.
            </p>
        </div>
    );
}

export default Home;
