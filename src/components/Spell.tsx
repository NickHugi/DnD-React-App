import React from 'react';
import { NavLink } from 'react-router-dom';

import styles from './Spell.module.css';

type Props = {
    onFavourite: CallableFunction,
    onUnfavourite: CallableFunction,
    isFavourite: boolean,
    index: string,
    spellName: string
}

const Spell = (props: Props) => {
    function addFavouriteHandler(index: string) {
       props.onFavourite(index);
    }

    function removeFavouriteHandler(index: string) {
        props.onUnfavourite(index);
    }

    return (
        <li className={styles.spell}>
            <NavLink to={"/spells/" + props.index}>{props.spellName}</NavLink>
            
            {props.isFavourite && <span className={styles.isFavourite} onClick={() => removeFavouriteHandler(props.index)}>★</span>}
            {!props.isFavourite && <span className={styles.isNotFavourite} onClick={() => addFavouriteHandler(props.index)}>★</span>}
        </li>
    )
}

export default Spell;