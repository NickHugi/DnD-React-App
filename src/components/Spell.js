import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';

import classes from './Spell.module.css';

const Spell = (props) => {
    function addFavouriteHandler(index) {
       props.onFavourite(index);
    }

    function removeFavouriteHandler(index) {
        props.onUnfavourite(index);
    }

    return (
        <li className={classes['spell']}>
            <NavLink to={"/spells/" + props.index}>{props.spellName}</NavLink>
            
            {props.isFavourite && <span className={classes['isFavourite']} onClick={() => removeFavouriteHandler(props.index)}>★</span>}
            {!props.isFavourite && <span className={classes['isNotFavourite']} onClick={() => addFavouriteHandler(props.index)}>★</span>}
        </li>
    )
}

export default Spell;