import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/indexActions';
import './Home.scss';
import Skills from '../../components/skills/skills';
import About from '../../components/about/about';


class Home extends Component {
    componentDidMount() {
        this.props.onNav();
        this.props.onAuthRedirect('/home');
    }

    render () {
        return(
            <section className="home">
                <Row>
                    <About />
                    <Col lg='12'>
                        <Skills />
                    </Col>
                </Row>
            </section>
        );
    }
}

const mapStateToProps = state => {
    return {
        token: state.auth.token,
        userId: state.auth.userId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetch: (token, userId) => dispatch(actions.fetchSkills(token, userId)),
        onNav: () => dispatch(actions.reachHome()),
        onAuthRedirect: (path) => dispatch(actions.setAuthRedirect(path))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);