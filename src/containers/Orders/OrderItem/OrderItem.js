import React from 'react';

import Burger from '../../../components/Burger/Burger';

import styles from './OrderItem.css';


const orderItem = (props) => {
    return(
        <div className={styles.OrderItem}>
            <h3>Order Details</h3>
            <Burger ingredients={props.order.ingredients}/>
            <b>Price:</b> $ {props.order.price}
        </div>
    )
};

export default orderItem;
