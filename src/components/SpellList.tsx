import React from 'react';

import SpellModel from '../models/spell';
import Spell from './Spell';
import styles from './SpellList.module.css';

type Props = {
    onFavourite: CallableFunction,
    onUnfavourite: CallableFunction,
    favourites: Array<string>,
    spells: Array<SpellModel>,
    hideNonFavourites: boolean,
    filterName: string
}

const SpellList = (props: Props) => {
    // TODO use spells.filter
    return (
        <ul className={styles.spellList}>
            {props.spells.map((spell: SpellModel) => (
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