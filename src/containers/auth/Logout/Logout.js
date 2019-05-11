import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as actions from '../../../store/actions/indexActions';

class Logout extends Component {
    componentDidMount() {
        this.props.outApp();
        this.props.onLogout();
    }

    render () {
        return <Redirect to = "/" />
    }
}


const mapDispatchToProps = dispatch => {
    return {
        onLogout: () => dispatch(actions.logout()),
        outApp: () => dispatch(actions.outApp())
    }
}

export default connect(null, mapDispatchToProps)(Logout);