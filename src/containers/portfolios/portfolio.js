import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import PortfolioComponent from '../../components/portfolio/portfolioComponent';
import * as actions from '../../store/actions/indexActions';
import { Row } from 'reactstrap';
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

        let resetButton = null;

        if (this.props.portfolioData !== null && !this.props.loading) {
            Ports = this.props.portfolioData.map(portElement => (
                <PortfolioComponent 
                    key = {portElement.id}
                    title = {portElement.title}
                    img = {portElement.thumbnail}
                    link = {portElement.link}
                />
            ));
            resetButton = <NavLink to = "/portfolioData" className = "direction" style={{
                "marginTop": "35px",
                "marginBottom": "0"
            }}>Reset your portfolio</NavLink>
        }

        if (this.props.portfolioData !== null && !this.props.loading && this.props.portfolioData.length < 1) {
            Ports = (
                <NavLink to = "/portfolioData" className = "direction">
                    Add your works
                </NavLink>
            );
        }

        return (
            <section className = "portfolio">
                <h2 className = "text-center">My Works</h2>
                <div className = "cont">
                    <Row>
                        {Ports}
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