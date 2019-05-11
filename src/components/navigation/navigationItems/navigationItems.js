import React from 'react';
import NavigationItem from '../navigationItem/navigationItem';
import './navigationItems.scss';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserAlt, faBriefcase, faGripHorizontal, faSignOutAlt, faCogs } from '@fortawesome/free-solid-svg-icons';
library.add(faUserAlt, faBriefcase, faGripHorizontal, faSignOutAlt, faCogs);

const navigationItems = ( props ) => {
    let classes = "closed";
    if (props.show) {
        classes = "opened"
    }
    return (<nav className = {classes}>
                <ul className="list-unstyled">
                    <NavigationItem link = "/home" exact = {true}>
                        <FontAwesomeIcon icon = {faUserAlt}/>
                        <span>My Profile</span>
                    </NavigationItem>
                    <NavigationItem link = "/portfolio" exact = {true}>
                        <FontAwesomeIcon icon = {faBriefcase} />
                        <span>My Portfolio</span>
                    </NavigationItem>
                    <NavigationItem link = "/resume" exact = {true}>
                        <FontAwesomeIcon icon = {faGripHorizontal} />
                        <span>My Resume</span>
                    </NavigationItem>
                    <NavigationItem link = "/logout" exact = {true}>
                        <FontAwesomeIcon icon = {faSignOutAlt} />
                        <span>Log out</span>
                    </NavigationItem>
                </ul>
                <span className="option" onClick = {props.clicked}>
                    <FontAwesomeIcon icon = {faCogs} />
                </span>
        </nav>);
};

export default navigationItems;