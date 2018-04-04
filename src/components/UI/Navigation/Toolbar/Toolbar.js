import React from 'react';
import Nav from '../NavigationItems/NavigationItems';
import Logo from '../../Logo/Logo';
import SideDrawerToggle from '../SideDrawer/SideDrawerToggle/SideDrawerToggle';

import styles from './Toolbar.css';

const toolbar = (props) => (
    <header className={styles.Toolbar}>
        <div>
            <SideDrawerToggle clicked={props.sideDrawerToggle} />
        </div>
        <div className={styles.Logo}>
            <Logo/>
        </div>
        <nav className={styles["hides-on-large"]}>
            <Nav isAuthenticated={props.isAuth} />
        </nav>
    </header>
);

export default toolbar;