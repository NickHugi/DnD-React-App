import React, { ChangeEvent } from 'react';

import styles from './FilterBar.module.css';

type Props = {
    onChangeSpellFilter: CallableFunction,
    onHideNonFavourites: CallableFunction,
    onShowNonFavourites: CallableFunction,
    hideNonFavourites: boolean
};

const FilterBar = (props: Props) => {
    const textChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        props.onChangeSpellFilter(event.target.value);
    }

    const hideButtonHandler = () => {
        props.onHideNonFavourites();
    }

    const showAllButtonHandler = () => {
        props.onShowNonFavourites();
    }

    return (
        <div className={styles.filterbar}>
            <input type='text' placeholder='filter...' onChange={textChangeHandler} />

            {!props.hideNonFavourites && <button onClick={hideButtonHandler}>Show Favourites Only</button>}
            {props.hideNonFavourites && <button onClick={showAllButtonHandler}>Show All</button>}
        </div>
    )
}

export default FilterBar;