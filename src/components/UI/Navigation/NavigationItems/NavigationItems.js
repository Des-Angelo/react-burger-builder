import React from 'react';
import NavItem from './NavItem/NavItem';

import styles from './NavigationItems.css';

const navigationItems = (props) => (
    <ul className={styles.NavigationItems}>
        <NavItem destination="/">Burger Builder</NavItem>
        {props.isAuthenticated ? <NavItem destination="/my-orders">My Orders</NavItem> : null}
        {props.isAuthenticated
            ? <NavItem destination="/logout">Logout</NavItem>
            : <NavItem destination="/auth">Profile</NavItem>}
    </ul>
);

export default navigationItems;