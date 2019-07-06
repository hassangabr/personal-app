import React from 'react';
import NavigationItem from '../../components/navigation/navigationItem/navigationItem';
import "./ChooseTask.scss";

const chooseTask = () => {
    return  (
        <section className="chooseTask">
            <nav className="chooseTaskNav">
                <ul className="list-unstyled">
                    <NavigationItem link = "/data" exact = {true}>Start adding your personal data</NavigationItem>
                    <NavigationItem link = "/skillsData" exact = {true}>Start adding your Skills</NavigationItem>
                    <NavigationItem link = "/resumeData" exact = {true}>Start adding your career history</NavigationItem>
                    <NavigationItem link = "/portfolioData" exact = {true}>Start adding your works</NavigationItem>
                </ul>
            </nav>
        </section>
    );
}

export default chooseTask;