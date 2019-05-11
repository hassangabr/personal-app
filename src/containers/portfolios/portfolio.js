import React, { Component } from 'react';
import { connect } from 'react-redux';
import PortfolioComponent from '../../components/portfolio/portfolioComponent';
import * as actions from '../../store/actions/indexActions';
import { Container, Row } from 'reactstrap';
import Spinner from '../../components/UI/Spinner/Spinner';
import './portfolio.scss';

class Portfolio extends Component {

    componentDidMount() {
        this.props.onNav();
        this.props.onFetch(this.props.token, this.props.userId);
    }

    render () {
        let Ports = null;

        if (this.props.loading) {
            Ports = <Spinner />
        }
        if (this.props.portfolioData !== null && !this.props.loading) {
            Ports = this.props.portfolioData.map(portElement => (
                <PortfolioComponent 
                    key = {portElement.id}
                    title = {portElement.title}
                    img = {portElement.thumbnail}
                    link = {portElement.link}
                />
            ))
        }

        return (
            <section className = "portfolio">
                <h2 className = "text-center">My Works</h2>
                <Container>
                    <Row>
                        {Ports}
                    </Row>
                </Container>
            </section>
        );
    }
}

const mapStateToProps = state => {
    return {
        token: state.auth.token,
        userId: state.auth.userId,
        loading: state.port.loading,
        portfolioData: state.port.portfolioData
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetch: (token, userId) => dispatch(actions.fetchPortfolio(token, userId)),
        onNav: () => dispatch(actions.reachHome())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Portfolio);