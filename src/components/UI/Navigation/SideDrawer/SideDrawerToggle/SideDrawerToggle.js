import React from 'react';

import styles from './SideDrawerToggle.css';

const sideDrawerToggle = (props) => (
    <div className={styles.SideDrawerToggle}>
        <i className="fa fa-bars fa-3x"
           onClick={props.clicked}
           style={{
               cursor: 'pointer',
               color: 'white'
           }}></i>
    </div>
);

export default sideDrawerToggle;