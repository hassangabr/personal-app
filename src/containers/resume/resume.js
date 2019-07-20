import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import * as actions from '../../store/actions/indexActions';
import Spinner from '../../components/UI/Spinner/Spinner';
import { Row } from 'reactstrap';
import ResumeComponent from '../../components/resume/resumeComponent';
import './resume.scss';

class Resume extends Component {

    componentDidMount () {
        this.props.onNav();
        this.props.onFetch(this.props.token, this.props.userId);
    }

    render () {
        let resumes = null;

        if (this.props.loading) {
            resumes = <Spinner />
        }

        let resetButton = null;

        if (this.props.resumeData !== null && !this.props.loading) {
            resumes = this.props.resumeData.map(resumeElements => (
                <ResumeComponent
                    key = {resumeElements.id}
                    title = {resumeElements.title}
                    company = {resumeElements.company}
                    position = {resumeElements.position}
                    from = {resumeElements.from}
                    to = {resumeElements.to}
                    description = {resumeElements.description}
                 />
            ));
            resetButton = <NavLink to = "/resumeData" className = "direction" style={{
                "marginTop": "35px",
                "marginBottom": "0"
            }}>Reset your resumes</NavLink>
        }

        if (this.props.resumeData !== null && !this.props.loading && this.props.resumeData.length < 1) {
            resumes = (
                <NavLink to = "/resumeData" className = "direction">
                    Add your career history
                </NavLink>
            );
        }

        return (
            <section className = "resume">
                <h2 className = "text-center">My career history</h2>
                <div className = "cont">
                    <Row>
                        {resumes}
                    </Row>
                    {resetButton}
                </div>
                
            </section>
        );
    }
}

const mapStateToProps = state => {
    return {
        token: state.auth.token,
        userId: state.auth.userId,
        loading: state.resume.loading,
        resumeData: state.resume.resumeData
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetch: (token, userId) => dispatch(actions.fetchResume(token, userId)),
        onNav: () => dispatch(actions.reachHome())
    }
}

export default connect(mapStateToProps ,mapDispatchToProps)(Resume);