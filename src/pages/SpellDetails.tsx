import axios from 'axios';
import React, { Fragment, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import DiceLoader from '../components/DiceLoader';
import LoadFailure from '../components/LoadFailure';

import styles from './SpellDetails.module.css';

const SpellDetails = () => {
    const params = useParams();

    // spellData states include:
    //  - null => loading
    //  - undefined => failed to load
    //  - {...} => loaded
    const [spellData, setSpellData] = useState<any>(null);

    function fetchSpellDetails() {
        axios.get('http://www.dnd5eapi.co/api/spells/' + params.spellIndex)
            .then(res => {
                setSpellData(res.data);
            })
            .catch(error => {
                setSpellData(undefined);
            });
    }

    useEffect(() => {
        fetchSpellDetails();
    }, []);

    if (spellData === null) {
        return <DiceLoader />
    }
    else if (spellData === undefined) {
        return <LoadFailure />
    }
    else {
        
        let concentration = spellData['concentration'] ? "Yes" : "No";
        let ritual = spellData['ritual'] ? "Yes" : "No";
        let attackType = spellData['attack_type'] ? spellData['attack_type'] : "N/A";

        return (
            <div className={styles.spellDetails}>
                <h1>{spellData['name']}</h1>

                <hr />

                <div className={styles.databox}>
                    <div> <b>Level</b> <br/> {spellData['level']} </div>
                    <div> <b>Duration</b> <br/> {spellData['duration']} </div>
                    <div> <b>Casting Time</b> <br/> {spellData['casting_time']} </div>
                    <div> <b>Attack Type</b> <br/> {attackType} </div>
                    <div> <b>Ritual</b> <br/> {ritual} </div>
                    <div> <b>School</b> <br/> {spellData['school']['name']} </div>
                    <div> <b>Concentration</b> <br/> {concentration} </div>
                    <div> <b>Range</b> <br/> {spellData['range']} </div>
                </div>

                <hr />

                <p>{spellData['desc']}</p>

                <hr />

                <p>{spellData['higher_level']}</p>

                <hr />

                <b>Materials:</b> {spellData['material']} <br />

                <p>
                    <b>Components:</b>
                    {spellData.components.map((spellComp: any) => <span key={spellComp} className={styles.bubble}>{spellComp}</span>)}
                </p>

                <p>
                    <b>Classes: </b>
                    {spellData.classes.map((spellClass: any) => <span key={spellClass.name} className={styles.bubble}>{spellClass.name}</span>)}
                </p>

                <p>
                    <b>Subclasses: </b>
                    {spellData.subclasses.map((spellSubclass: any) => <span key={spellSubclass.name} className={styles.bubble}>{spellSubclass.name}</span>)}
                </p>
            </div>
        )
    }
}

export default SpellDetails;