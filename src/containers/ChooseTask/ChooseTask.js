import React from 'react';
import NavigationItem from '../../components/navigation/navigationItem/navigationItem';
import "./ChooseTask.scss";

const chooseTask = () => {
    return  (
        <section className="chooseTask">
            <div className="container">
                <div className="justify-content-center align-items-center row">
                    <div className="col-lg-9 row">
                        <div className="col-lg-6">
                            
                        </div>
                        <div className="col-lg-6">
                            <nav className="chooseTaskNav">
                                <ul className="list-unstyled">
                                    <NavigationItem link = "/data" exact = {true}>Start adding your personal data</NavigationItem>
                                    <NavigationItem link = "/skillsData" exact = {true}>Start adding your Skills</NavigationItem>
                                    <NavigationItem link = "/resumeData" exact = {true}>Start adding your career history</NavigationItem>
                                    <NavigationItem link = "/portfolioData" exact = {true}>Start adding your works</NavigationItem>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default chooseTask;