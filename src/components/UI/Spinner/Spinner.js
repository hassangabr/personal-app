import React from 'react';
import './Spinner.scss';

const spinner = () => {
    return (
        <div className="Container">
            <div className="spinner">
                <div className="bounce1"></div>
                <div className="bounce2"></div>
                <div className="bounce3"></div>
            </div>
        </div>
    );
};

export default spinner;