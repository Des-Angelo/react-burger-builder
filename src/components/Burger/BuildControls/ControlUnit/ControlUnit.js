import React from 'react';
import ControlUnitStyles from './ControlUnit.css';

const controlUnit = (props) => (
    <div className={ControlUnitStyles.ControlUnit}>
        <label className={ControlUnitStyles.Label}>{props.label}</label>
        <button
            className={ControlUnitStyles.Less}
            onClick={props.removed}
            disabled={props.disabled}>-
        </button>
        <button
            className={ControlUnitStyles.More}
            onClick={props.added}>+
        </button>
    </div>
);

export default controlUnit;