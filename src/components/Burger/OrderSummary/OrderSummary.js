import React from 'react';

import Aux from '../../../hoc/Auxiliary/Auxiliary';
import Button from '../../UI/Button/Button';

const orderSummary = (props) =>{
        const ingredientSummary = Object.keys(props.ingredients)
            .map(igKey => {
                return (
                    <li key={igKey}>
                        <span style={{textTransform: 'capitalize'}}>{igKey}</span> - <strong>Qty: </strong>({props.ingredients[igKey]})
                    </li>
                )
            });
        return (
            <Aux>
                <h3>Your Order</h3>
                <p>Please review your order below:</p>
                <ul>
                    {ingredientSummary}
                </ul>
                <p>Total Price: <strong>${props.totalPrice.toFixed(2)}</strong></p>
                <Button
                    clicked={props.checkoutCancelled}
                    buttonType="Danger">Cancel</Button>
                <Button
                    clicked={props.checkOut}
                    buttonType="Success">Continue to checkout</Button>
            </Aux>
        )    
};
    

export default orderSummary;