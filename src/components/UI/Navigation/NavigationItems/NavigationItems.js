import React from 'react';
import NavItem from './NavItem/NavItem';

import styles from './NavigationItems.css';

const navigationItems = () => (
    <ul className={styles.NavigationItems}>
        <NavItem link="/" active>Burger Builder</NavItem>
        <NavItem link="/">Checkout</NavItem>
    </ul>
);

export default navigationItems;