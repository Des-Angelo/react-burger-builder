import React from 'react';
import NavItem from './NavItem/NavItem';

import styles from './NavigationItems.css';

const navigationItems = () => (
    <ul className={styles.NavigationItems}>
        <NavItem destination="/">Burger Builder</NavItem>
        <NavItem destination="/my-orders">My Orders</NavItem>
    </ul>
);

export default navigationItems;