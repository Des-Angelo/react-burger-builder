import React from 'react';

import styles from './Button.css';

const button = (props) => (
    <button id={props.Id} className={[styles.Button, styles[props.buttonType]].join(' ')}
    onClick={props.clicked} disabled={props.disabled}>{props.children}</button>
);

export default button;