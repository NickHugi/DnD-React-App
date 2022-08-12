import React from 'react';

import Spell from './Spell';
import classes from './SpellList.module.css';

const SpellList = (props) => {
    // TODO use spells.filter
    return (
        <ul className={classes['spell-list']}>
            {props.spells.map((spell) => (
                spell.name.toLowerCase().includes(props.filterName.toLowerCase())
                &&
                (props.favourites.includes(spell.index) || !props.hideNonFavourites)
                &&
                <Spell
                    key={spell.index}
                    index={spell.index}
                    spellName={spell.name}
                    isFavourite={props.favourites.includes(spell.index)}
                    onFavourite={props.onFavourite}
                    onUnfavourite={props.onUnfavourite}
                />
            ))}
        </ul>
    )
}

export default SpellList;