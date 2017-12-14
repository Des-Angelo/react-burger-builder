import React from 'react';

import styles from './NavItem.css'

const navItem = (props) => (
    <li className={styles.NavItem}>
        <a className={props.active ? styles.active : null} href={props.destination}>{props.children}</a>
    </li>
);

export default navItem;