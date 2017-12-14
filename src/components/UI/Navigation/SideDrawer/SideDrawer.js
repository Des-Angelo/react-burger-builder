import React from 'react';

import styles from './SideDrawer.css';

import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Backdrop from '../../../UI/Backdrop/Backdrop';
import Aux from '../../../../hoc/Auxiliary/Auxiliary';

const sideDrawer = (props) => {
    let classes = [styles.SideDrawer, styles.Close];
    if(props.open){
        classes = [styles.SideDrawer, styles.Open]
    }
    return(
        <Aux>
            <Backdrop show={props.open} clicked={props.closed}/>
            <div className={classes.join(' ')}>
                <div className={styles.Logo}>
                    <Logo/>
                </div>
                <nav>
                    <NavigationItems/>
                </nav>
            </div>
        </Aux>
    );
};

export default sideDrawer;