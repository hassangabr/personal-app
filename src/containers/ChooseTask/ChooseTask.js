import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import NavigationItem from '../../components/navigation/navigationItem/navigationItem';
import chooseTaskImage from '../../assets/choose-task.jpeg';
import Button from '../../components/UI/Button/Button';
import "./ChooseTask.scss";

class ChooseTask extends Component {
    render () {

        let redirect = null;
        if (this.props.userRequestId && this.props.skillsRequestId && this.props.resumeRequestId && this.props.portRequestId) {
            redirect = <Redirect to = '/home' />
        }

        return  (
        <section className="chooseTask">
            {redirect}
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
                                        {this.props.userRequestId? null: <NavigationItem link = "/data" exact = {true}>Start adding your personal data</NavigationItem>}
                                        {this.props.skillsRequestId? null: <NavigationItem link = "/skillsData" exact = {true}>Start adding your Skills</NavigationItem>}
                                        {this.props.resumeRequestId? null: <NavigationItem link = "/resumeData" exact = {true}>Start adding your career history</NavigationItem>}
                                        {this.props.portRequestId? null: <NavigationItem link = "/portfolioData" exact = {true}>Start adding your works</NavigationItem>}
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
}

const mapStateToProps = state => {
    return {
        portRequestId: state.port.requestId !== null,
        resumeRequestId: state.resume.requestId !== null,
        skillsRequestId: state.skills.requestId !== null,
        userRequestId: state.user.requestId !== null
    }
}

export default connect(mapStateToProps)(ChooseTask);