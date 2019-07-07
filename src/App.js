import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Auth from './containers/auth/auth';
import UserData from './containers/getDataForms/UserData/UserData';
import SkillsData from './containers/getDataForms/SkillsData/SkillsData';
import ResumeData from './containers/getDataForms/ResumeData/ResumeData';
import PortfolioData from './containers/getDataForms/PortfolioData/PortfolioData';
import Layout from './hoc/Layout/Layout';
import Home from './containers/Home/Home';
import Resume from './containers/resume/resume';
import Portfolio from './containers/portfolios/portfolio';
import Logout from './containers/auth/Logout/Logout';
import ChooseTask from './containers/ChooseTask/ChooseTask';
import * as actions from './store/actions/indexActions';
import './App.scss';

class App extends Component {
  componentDidMount () {
    this.props.onAutoLogin();
    this.props.onCheckPortfolioRequestId();
    this.props.onCheckResumeRequestId();
    this.props.onCheckSkillsRequestId();
    this.props.onCheckUserRequestId();
  }

  render() {
    let routes = (
      <Switch>
        <Route path = '/' exact component = {Auth}/>
        <Route path = '/logout' exact component = {Logout}/>
      </Switch>
    );

    if (this.props.token) {
      routes = (
        <Switch>
          <Route path = '/chooseTask' exact component = {ChooseTask}/>
          <Route path = '/data' component = {UserData}/>
          <Route path = '/skillsData' component = {SkillsData}/>
          <Route path = '/resumeData' component = {ResumeData}/>
          <Route path = '/portfolioData' component = {PortfolioData}/>
          <Route path = '/home' component = {Home}/>
          <Route path = '/resume' exact component = {Resume}/>
          <Route path = '/portfolio' exact component = {Portfolio}/>
          <Route path = '/logout' exact component = {Logout}/>
          <Redirect to= {this.props.redirect} />
        </Switch>
      );
    }
    return (
      <div>
        <Layout>
            {routes}
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    token: state.auth.token !== null,
    redirect: state.auth.authRedirectPath
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAutoLogin: () => dispatch(actions.authCheckState()),
    onCheckPortfolioRequestId: () => dispatch(actions.checkPortfolioRequestIdState()),
    onCheckResumeRequestId: () => dispatch(actions.checkResumeRequestIdState()),
    onCheckSkillsRequestId: () => dispatch(actions.checkSkillsRequestIdState()),
    onCheckUserRequestId: () => dispatch(actions.checkUserRequestIdState())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
