import React from 'react';

import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';

import styles from './CheckoutSummary.css';

const checkoutSummary = (props) => {
    return (
        <div className={styles.CheckoutSummary}>
            <h1>We hope you enjoy your meal!</h1>
            <div style={{width: '100%', margin: 'auto'}}>
                <Burger ingredients={props.ingredients}/>
            </div>
            <Button
                buttonType='Danger'
                clicked={props.onCheckoutCancelled}>Back to Burger Builder</Button>
            <Button
                Id={props.readyBtnId}
                buttonType='Success'
                clicked={props.onCheckoutProceed}>Ready to Order</Button>
        </div>
    )
};

export default checkoutSummary;