import React from 'react';
import './skill.scss';

const skill = ( props ) => (
    <div className="skill">
        <div className="rate" style={{
            width: props.rate
        }}>
            <p>{props.skill}</p>
            <span>{props.rate}</span>
        </div>
    </div>
);

export default skill;