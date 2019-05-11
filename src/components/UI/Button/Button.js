import React from 'react';
import './Button.scss';

const button = ( props ) => {
    let buttonClasses = ["button"];
    buttonClasses.push(props.classes);
    return (
        <button onClick={props.clicked} className={buttonClasses.join(' ')} disabled={props.disabled}>
            {props.children}
        </button>
    );
}

export default button;
