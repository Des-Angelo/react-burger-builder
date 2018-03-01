import React from 'react';

import styles from './Input.css';

const Input = props => {
    let inputElement = null;
    const inputStyle = [styles.InputElement];

    let validationError = null;
    if (props.invalid && props.touched) {
        inputStyle.push(styles.Invalid);
        validationError = <p className={styles.ErrorMessage}>{props.errorMessage}</p>
    }

    switch (props.elementType) {
        case 'input':
            inputElement = <input
                className={inputStyle.join(' ')}
                {...props.elementConfig}
                value={props.value}
                onChange={props.change}/>;
            break;
        case 'select':

            inputElement = (
                <select
                    className={inputStyle.join(' ')}
                    value={props.value}
                    onChange={props.change}>
                    {props.elementConfig.options.map(option => (
                        <option
                            key={option.value}
                            value={option.value}>
                            {option.displayValue}
                        </option>
                    ))}
                </select>
            );
            break;
        default:
            inputElement = <input
                className={inputStyle.join(' ')}
                {...props.elementConfig}
                value={props.value}
                onChange={props.change}/>
    }

    return (
        <div className={styles.Input}>
            <label className={styles.Label} htmlFor="">{props.label}</label>
            {inputElement}
            {validationError}
        </div>
    );
};

export default Input;
