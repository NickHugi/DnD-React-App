import React from 'react';

import classes from './FilterBar.module.css';

const FilterBar = (props) => {
    const textChangeHandler = (event) => {
        props.onChangeSpellFilter(event.target.value);
    }

    const hideButtonHandler = (event) => {
        props.onHideNonFavourites();
    }

    const showAllButtonHandler = (event) => {
        props.onShowNonFavourites();
    }

    return (
        <div className={classes["filterbar"]}>
            <input type='text' placeholder='filter...' onChange={textChangeHandler} />

            {!props.hideNonFavourites && <button onClick={hideButtonHandler}>Show Favourites Only</button>}
            {props.hideNonFavourites && <button onClick={showAllButtonHandler}>Show All</button>}
        </div>
    )
}

export default FilterBar;