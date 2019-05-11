import React, { Component } from 'react';
import * as actions from '../../store/actions/indexActions';
import { connect } from 'react-redux';
import Aux from '../../hoc/Aux'
import { Col } from 'reactstrap';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faAt, faPhoneVolume } from '@fortawesome/free-solid-svg-icons';
import Spinner from '../UI/Spinner/Spinner';
library.add(faCalendarAlt, faAt, faPhoneVolume);

class About extends Component {
    componentDidMount () {
        if (this.props.token !== null && this.props.userId !== null) {
            this.props.onFetch(this.props.token, this.props.userId);
        }
        // this.props.onFetch(this.props.token, this.props.userId);
    }

    render () {

        let userData = null;

        if (this.props.loading) {
            userData = <Spinner />
        }

        if (this.props.data !== null && !this.props.loading) {
            userData = (
                <Aux>
                    <Col xl = '4' lg = '6'>
                    <div className="profile">
                        <img src = {this.props.data.profile} alt="Profile: usually contains a person" className="d-block mx-auto img-fluid"/>
                    </div>
                    </Col>
                    <Col xl = '8' lg = '6'>
                        <h2>Hello, I'm {this.props.data.fname} {this.props.data.lname}</h2>
                        <p className="title">I'm a {this.props.data.jobTitle}</p>
                        <p className="desc">{this.props.data.bio}</p>
                        <ul className="list-unstyled info">
                            <li>
                                <span className="text-center mark"><FontAwesomeIcon icon = {faCalendarAlt} /></span>
                                <p><span>Date of birth:</span> {this.props.data.birth}</p>
                            </li>
                            <li>
                                <span className="text-center mark"><FontAwesomeIcon icon = {faAt} /></span>
                                <p><span>Email:</span> {this.props.data.email}</p>
                            </li>
                            <li>
                                <span className="text-center mark"><FontAwesomeIcon icon = {faPhoneVolume} /></span>
                                <p><span>Phone:</span> {this.props.data.phone}</p>
                            </li>
                        </ul>
                    </Col>
                </Aux>
            );
        }

        return (
            <Aux>
                {userData}
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        token: state.auth.token,
        userId: state.auth.userId,
        data: state.user.data,
        loading: state.user.loading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetch: (token, userId) => dispatch(actions.fetchUser(token, userId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(About);