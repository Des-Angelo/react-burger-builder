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
        {controls.map(ctrl => (
            <ControlUnit
                key={ctrl.type}
                label={ctrl.label}
                added={() => props.ingredientAdded(ctrl.type)}
                removed={() => props.ingredientRemoved(ctrl.type)}
                disabled={props.disabled[ctrl.type]}/>
        ))}
    </div>
);

export default buildControls;