import React, { Component } from 'react';
import { connect } from 'react-redux';
import Aux from '../../hoc/Aux';
import NavigationItems from '../../components/navigation/navigationItems/navigationItems';

class Layout extends Component {
    state = {
        showNav: false
    }


    navToggleHandler = () => {
        this.setState(prevState => {
            return {showNav: !prevState.showNav}
        })
    }

    render () {
        return (
            <Aux>
                {this.props.reachHome? <NavigationItems show = {this.state.showNav} clicked = {this.navToggleHandler}/>: null}
                {this.props.children}
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        reachHome: state.auth.reachHome
    }
}

export default connect(mapStateToProps)(Layout);