import React from 'react';
import { NavLink } from 'react-router-dom';
import './navigationItem.scss';

const navigationItem = ( props ) => (
    <li className = "navItem">
        <NavLink to = {props.link} exact = {props.exact} activeClassName = "active">{props.children}</NavLink>
    </li>
);

export default navigationItem;