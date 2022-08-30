import React from 'react';
import { NavLink } from 'react-router-dom';

import styles from './NavBar.module.css';

const NavBar = () => {
    return (
        <div className={styles.navbar} >
            <NavLink className={(navData) => (navData.isActive ? styles.active : 'none')} to='/'>Home</NavLink>
            <NavLink className={(navData) => (navData.isActive ? styles.active : 'none')} to='/spells'>Spells</NavLink>
        </div>
    )
}

export default NavBar;