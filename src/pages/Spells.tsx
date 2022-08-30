import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';

import { spellsActions, FavouritesState, } from '../store/index';
import FilterBar from '../components/FilterBar';
import SpellList from '../components/SpellList';
import DiceLoader from '../components/DiceLoader';
import LoadFailure from '../components/LoadFailure';
import classes from './Spells.module.css';

const Spells = () => {
    const [ filterSpell, setFilterSpell ] = useState("");
    const [ hideNonFavourites, setHideNonFavourites ] = useState(false);
    const [ spells, setSpells ] = useState<any>(null);

    const dispatch = useDispatch();
    const favourites = useSelector((state: FavouritesState) => state.favourites);

    function fetchSpellsHandler() {
        axios.get('http://www.dnd5eapi.co/api/spells/')
            .then(res => {
                setSpells(res.data.results);
            })
            .catch(error => {
                setSpells(undefined);
            });
    }

    function onChangeSpellFilter(newFilterSpell: string) {
        setFilterSpell(newFilterSpell);
    }

    function onHideNonFavourites() {
        setHideNonFavourites(true);
    }

    function onShowNonFavourites() {
        setHideNonFavourites(false);
    }

    function onFavourite(index: string) {
        dispatch(spellsActions.add(index));
    }

    function onUnfavourite(index: string) {
        dispatch(spellsActions.remove(index));
    }

    useEffect(() => {
        fetchSpellsHandler();
    }, []);

    if (spells === null) {
        return <DiceLoader />
    }
    else if (spells === undefined) {
        return <LoadFailure />
    }
    else {
        return (
            <Fragment>
                <FilterBar
                    onChangeSpellFilter={onChangeSpellFilter}
                    onHideNonFavourites={onHideNonFavourites}
                    onShowNonFavourites={onShowNonFavourites}
                    hideNonFavourites={hideNonFavourites}
                />
                <SpellList
                    spells={spells}
                    favourites={favourites}
                    filterName={filterSpell}
                    hideNonFavourites={hideNonFavourites}
                    onFavourite={onFavourite}
                    onUnfavourite={onUnfavourite}
                />
            </Fragment>);
    }
}

export default Spells