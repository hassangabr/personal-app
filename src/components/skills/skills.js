import React, { Component } from 'react';
import { connect } from 'react-redux';
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
       
        if (this.props.skillsData !== null && !this.props.loading) {
            skills = this.props.skillsData.map(skillElement => (
                <Skill key = {skillElement.id} skill = {skillElement.skill} rate = {skillElement.rate + "%"}/>
            ))
        }
        
        return (
            <div className="skills">
                <h3>Skills</h3>
                {skills}
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