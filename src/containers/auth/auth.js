import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import { updateObject, checkValidity } from '../../shared/Utility';
import { Container, Row, Col } from 'reactstrap';
import * as actions from '../../store/actions/indexActions';
import './auth.scss';

class Auth extends Component {

    state = {
        inputs: {
            email: {
                elementType: 'input',
                config: {
                    type: 'email',
                    placeholder: 'Type your email'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                config: {
                    type: 'password',
                    placeholder: 'Type a strong password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            }
        },
        isLogin:true,
        redirect: '/home'
    }


    inputChangeHandler = (event, controlName) => {
        const updateInputs = updateObject(this.state.inputs, {
            [controlName]: updateObject(this.state.inputs[controlName], {
                value: event.target.value,
                valid: checkValidity(event.target.value, this.state.inputs[controlName].validation),
                touched: true
            })
        });
        this.setState({inputs: updateInputs});
    }

    switchAuthHandler = (event) => {
        event.preventDefault();
        this.setState(prevState => {
            return {isLogin: !prevState.isLogin}
        }, () => {
            if (this.state.isLogin) {
                this.setState(prevState => {
                    return {redirect: prevState.redirect= '/home'}
                }, () => this.props.onAuthRedirect(this.state.redirect));
            }
            if (!this.state.isLogin) {
                this.setState(prevState => {
                    return {redirect: prevState.redirect= '/chooseTask'}
                }, () => this.props.onAuthRedirect(this.state.redirect))
            }
        });
    }

    submitHandler = (event) => {
        event.preventDefault();
        this.props.onAuthUser(this.state.inputs.email.value, this.state.inputs.password.value, this.state.isLogin);
    }

    render() {
        const formElementArray = [];
        for (let key in this.state.inputs) {
            formElementArray.push({
                id: key,
                config: this.state.inputs[key]
            })
        }

        let form = formElementArray.map(formElement => (
            <Input 
                key = {formElement.id}
                elementType = {formElement.config.elementType}
                elementConfig = {formElement.config.config}
                value = {formElement.config.value}
                isValid = {!formElement.config.valid}
                touched = {formElement.config.touched}
                shouldValidate = {formElement.config.validation}
                changed = {(event) => this.inputChangeHandler(event, formElement.id)}
            />
        ));

        let spinner = null;
        if (this.props.loading) {
            spinner = <Spinner />
        }

        let redirect = null;
        if ( this.props.isAuthenticated && this.state.isLogin ) {
            redirect = <Redirect to = '/home'/>
        }

        if ( this.props.isAuthenticated && !this.state.isLogin ) {
            redirect = <Redirect to = '/chooseTask'/>
        }

        let errorMessage = null;
        if (this.props.error) {
            errorMessage = (
                <p className="err">{this.props.error.message}</p>
            );
        }

        return (
            <section className="auth">
                {redirect}
                <Container>
                    <Row className="justify-content-center align-items-center">
                        <Col lg = '6' className="content">
                            {spinner}
                            <form onSubmit={this.submitHandler}>
                                <h2>{this.state.isLogin? "Log in to your profile" : "Create Your own profile"} </h2>
                                {errorMessage}
                                {form}
                                <Button>{this.state.isLogin? "Log in": "Sign up"}</Button>
                            </form>
                            <div className="seperate"></div>
                            <p>
                                    {
                                        this.state.isLogin? 
                                           "You don't have an account?"
                                           :
                                           "Already have an account?"
                                    }
                            </p>
                            <Button classes="switch" clicked = {this.switchAuthHandler}>
                                {this.state.isLogin? "Sign up": "Log in"}
                            </Button>
                        </Col>
                    </Row>
                </Container>
            </section>
        );
    }
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        authRedirectPath: state.auth.authRedirectPath,
        isAuthenticated: state.auth.token !== null,
        error: state.auth.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuthUser: (email, password, isLogin) => dispatch(actions.authUser(email, password, isLogin)),
        onAuthRedirect: (path) => dispatch(actions.setAuthRedirect(path))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);