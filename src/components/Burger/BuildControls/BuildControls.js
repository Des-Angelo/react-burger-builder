import React from 'react';
import buildStyles from './BuildControls.css';
import ControlUnit from './ControlUnit/ControlUnit';

const controls = [
    {label: 'Salad', type: 'salad'},
    {label: 'Bacon', type: 'bacon'},
    {label: 'Cheese', type: 'cheese'},
    {label: 'Meat', type: 'meat'}
];


const buildControls = (props) => (
    <div className={buildStyles.BuildControls}>
        <p>Current Price: <strong>${props.price.toFixed(2)}</strong></p>
        {controls.map(ctrl => (
            <ControlUnit
                key={ctrl.type}
                label={ctrl.label}
                added={() => props.ingredientAdded(ctrl.type)}
                removed={() => props.ingredientRemoved(ctrl.type)}
                disabled={props.disabled[ctrl.type]}/>
        ))}
        <button
            onClick={props.showSummary}
            className={buildStyles.OrderButton}
            disabled={!props.canOrder}>Order Now</button>
    </div>
);

export default buildControls;