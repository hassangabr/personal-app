import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import Spinner from '../UI/Spinner/Spinner';
import * as actions from '../../store/actions/indexActions';
import Skill from './skill/skill';

class Skills extends Component {

    componentDidMount () {
        this.props.onFetch(this.props.token, this.props.userId);
    }

    render () {
        let skills = null;
        
        if (this.props.loading) {
            skills = <Spinner />;
        }

        let resetButton = null;
        
        if (this.props.skillsData !== null && !this.props.loading && this.props.skillsData.length >= 1) {
            skills = this.props.skillsData.map(skillElement => (
                <Skill key = {skillElement.id} skill = {skillElement.skill} rate = {skillElement.rate + "%"}/>
            ));
            resetButton = <NavLink to = "/skillsData" className = "direction" style={{
                "marginTop": "35px",
                "marginBottom": "0"
            }}>Reset your skills</NavLink>
        }

        if (this.props.skillsData !== null && !this.props.loading && this.props.skillsData.length < 1) {
            skills = (
                    <NavLink to = "/skillsData" className = "direction">
                        Add your Skills
                    </NavLink>
            );
        }
        
        return (
            <div className="skills">
                <h3>Skills</h3>
                {skills}
                {resetButton}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        loading: state.skills.loading,
        skillsData: state.skills.skillsData,
        token: state.auth.token,
        userId: state.auth.userId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetch: (token, userId) => dispatch(actions.fetchSkills(token, userId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Skills);