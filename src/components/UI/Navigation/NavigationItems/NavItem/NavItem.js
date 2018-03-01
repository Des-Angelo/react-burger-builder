import React from 'react';
import {NavLink} from 'react-router-dom';

import styles from './NavItem.css'

const navItem = (props) => (
    <li className={styles.NavItem}>
        <NavLink
            exact
            to={props.destination}
            activeClassName={styles.active}>{props.children}</NavLink>
        {/*<a className={props.active ? styles.active : null} href={props.destination}>{props.children}</a>*/}
    </li>
);

export default navItem;