import React from 'react';
import { NavLink } from 'react-router-dom';

import classes from './NavBar.module.css';

const NavBar = (props) => {
    return (
        <div className={classes['navbar']} >
            <NavLink className={(navData) => (navData.isActive ? classes['active'] : 'none')} to='/'>Home</NavLink>
            <NavLink className={(navData) => (navData.isActive ? classes['active'] : 'none')} to='/spells'>Spells</NavLink>
        </div>
    )
}

export default NavBar;