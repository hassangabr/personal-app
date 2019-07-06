import React from 'react';
import NavigationItem from '../../components/navigation/navigationItem/navigationItem';
import chooseTaskImage from '../../assets/choose-task.jpeg';
import Button from '../../components/UI/Button/Button';
import "./ChooseTask.scss";

const chooseTask = () => {
    return  (
        <section className="chooseTask">
            <div className="container">
                <div className="justify-content-center align-items-center row">
                    <div className="col-lg-9 ">
                        <div className="content row">
                            <div className="col-lg-6 sp">
                                <div className="pic">
                                    <div className="pic">
                                        <img src = {chooseTaskImage} className="img-fluid d-block mx-auto" alt="contains peaple looking at a computer"/>
                                        <div className="blur"></div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6 sp">
                                <nav className="chooseTaskNav">
                                    <ul className="list-unstyled">
                                        <NavigationItem link = "/data" exact = {true}>Start adding your personal data</NavigationItem>
                                        <NavigationItem link = "/skillsData" exact = {true}>Start adding your Skills</NavigationItem>
                                        <NavigationItem link = "/resumeData" exact = {true}>Start adding your career history</NavigationItem>
                                        <NavigationItem link = "/portfolioData" exact = {true}>Start adding your works</NavigationItem>
                                        <NavigationItem link = "/home" exact = {true}>
                                            <Button classes="tasksButton">Skip tasks to your profile</Button>
                                        </NavigationItem>
                                    </ul>
                                </nav>
                            </div>
                        </div> {/*content*/ }
                    </div> {/*col-lg-9*/ }
                </div>
            </div>
        </section>
    );
}

export default chooseTask;