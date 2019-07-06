import React from 'react';
import NavigationItem from '../../components/navigation/navigationItem/navigationItem';

const chooseTask = () => {
    return  (
        <nav className="chooseTask">
            <ul className="list-unstyled">
                <NavigationItem link = "/data" exact = {true}>Personal Data</NavigationItem>
            </ul>
        </nav>
    );
}

export default chooseTask;