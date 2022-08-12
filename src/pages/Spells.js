import { Fragment, React, useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';

import FilterBar from '../components/FilterBar';
import SpellList from '../components/SpellList';
import { spellsActions } from '../store';
import classes from './Spells.module.css';
import DiceLoader from '../components/DiceLoader';
import LoadFailure from '../components/LoadFailure';

const Spells = (props) => {
    const [ filterSpell, setFilterSpell ] = useState("");
    const [ hideNonFavourites, setHideNonFavourites ] = useState(false);
    const [ spells, setSpells ] = useState(null);

    const dispatch = useDispatch();
    const favourites = useSelector((state) => state.favourites);

    function fetchSpellsHandler() {
        axios.get('http://www.dnd5eapi.co/api/spells/')
            .then(res => {
                setSpells(res.data.results);
            })
            .catch(error => {
                setSpells(undefined);
            });
    }

    function onChangeSpellFilter(newFilterSpell) {
        setFilterSpell(newFilterSpell);
    }

    function onHideNonFavourites() {
        setHideNonFavourites(true);
    }

    function onShowNonFavourites() {
        setHideNonFavourites(false);
    }

    function onFavourite(index) {
        dispatch(spellsActions.add(index));
    }

    function onUnfavourite(index) {
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