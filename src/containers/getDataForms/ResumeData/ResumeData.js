import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as actions from '../../../store/actions/indexActions';
import { Container, Row } from 'reactstrap';
import Button from '../../../components/UI/Button/Button';
import Input from '../../../components/UI/Input/Input';
import Spinner from '../../../components/UI/Spinner/Spinner';
import SpanButton from '../../../components/UI/spanButton/spanButton';
import { updateObject, checkValidity } from '../../../shared/Utility';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import '../formsData.scss'; 

library.add(faPlus);

class ResumeData extends Component {
    state = {
        inputs: {
            title_0 : {
                elementType: 'input',
                config: {
                    type: 'text',
                    placeholder: 'Title'
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
                classes: 'col-lg-6'
            },
            companyName_0 : {
                elementType: 'input',
                config: {
                    type: 'text',
                    placeholder: 'Company name'
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
                classes: 'col-lg-6'
            },
            position_0 : {
                elementType: 'input',
                config: {
                    type: 'text',
                    placeholder: 'What is your position in this company?'
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
                classes: 'col-lg-12'
            },
            from_0 : {
                elementType: 'input',
                config: {
                    type: 'text',
                    placeholder: 'from...ex(2016, 2018...etc)'
                },
                value: '',
                validation: {
                    required: true,
                    minLength:4,
                    isNumeric: true
                },
                valid: false,
                touched: false,
                classes: 'col-lg-6'
            },
            to_0 : {
                elementType: 'input',
                config: {
                    type: 'text',
                    placeholder: 'to...ex(2016, 2018...etc)'
                },
                value: '',
                validation: {
                    required: true,
                    minLength:4,
                    isNumeric: true
                },
                valid: false,
                touched: false,
                classes: 'col-lg-6'
            },
            description_0 : {
                elementType: 'textarea',
                config: {
                    type: 'text',
                    placeholder: 'Description...'
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
                classes: 'col-lg-12'
            }
        },
        i: 1,
        formIsValid: false
    }

    componentDidMount () {
        if (this.props.resumeRedirect !== '/home') {
            this.props.onSetResumeRedirect();
        }
    }

    inputChangeHandler = (event, inputName) => {
        const updateInputs = updateObject(this.state.inputs, {
            [inputName] : updateObject(this.state.inputs[inputName], {
                value: event.target.value,
                valid: checkValidity(event.target.value, this.state.inputs[inputName].validation),
                touched: true
            })
        });
        let formIsValid = true;
        for (let input in updateInputs) {
            formIsValid = updateInputs[input].valid && formIsValid;
        }
        this.setState({inputs:updateInputs, formIsValid:formIsValid})
    }

    addFormHandler = () => {
        let i = this.state.i;
        const incI = updateObject(this.state, {
            i: this.state.i + 1
        });
        const addInput = updateObject(this.state.inputs, {
            ["title_" + i] : {
                ...this.state.inputs["title_0"],
                value: '',
                valid: false,
                touched:false
            },
            ["companyName_" + i] : {
                ...this.state.inputs["companyName_0"],
                value: '',
                valid: false,
                touched:false
            },
            ["position_" + i] : {
                ...this.state.inputs["position_0"],
                value: '',
                valid: false,
                touched:false
            },
            ["from_" + i] : {
                ...this.state.inputs["from_0"],
                value: '',
                valid: false,
                touched:false
            },
            ["to_" + i] : {
                ...this.state.inputs["to_0"],
                value: '',
                valid: false,
                touched:false
            },
            ["description_" + i] : {
                ...this.state.inputs["description_0"],
                value: '',
                valid: false,
                touched:false
            }
        });
        this.setState({inputs:addInput, i: incI.i, formIsValid: false})
    }

    submitHandler = (event) => {
        event.preventDefault();
        const data = {};
        for (let key in this.state.inputs) {
            data[key] = this.state.inputs[key].value
        }
        const resumeData = {
            info: {
                ...data
            },
            userId: this.props.userId
        }
        this.props.onSubmitResume(this.props.token, resumeData);
    }

    render () {
        const formElementArray = [];
        for (let key in this.state.inputs) {
            formElementArray.push({
                id: key,
                configer: this.state.inputs[key]
            });
        }

        let form = formElementArray.map(formElement => (
            <Input 
                key = {formElement.id}
                elementType = {formElement.configer.elementType}
                value = {formElement.configer.value}
                touched = {formElement.configer.touched}
                isValid = {!formElement.configer.valid}
                shouldValidate = {formElement.configer.validation}
                classes = {formElement.configer.classes}
                elementConfig = {formElement.configer.config}
                changed = {(event) =>this.inputChangeHandler(event, formElement.id)}
            />
        ));

        let redirect = null;
        if (this.props.requestId !== null) {
            redirect = <Redirect to = {this.props.resumeRedirect} />
        }

        let spinner = null;
        if (this.props.loading) {
            spinner = <Spinner />
        }

        let errorMessage = null;
        if (this.props.error) {
            errorMessage = (
                <p className="err">{this.props.error.message}</p>
            );
        }

        let button = <SpanButton/>;

        if (this.state.formIsValid) {
            button = <Button classes="next">Next</Button>;
        }

        return (
            <section className="resume-data text-center">
                {redirect}
                <Container>
                    <form onSubmit = {this.submitHandler}>
                        {spinner}
                        <h2>Start adding your career history</h2>
                        {errorMessage}
                        <Row>
                            {form}
                            {button}
                        </Row>
                    </form>
                    <Button classes="add" clicked= {this.addFormHandler}>
                        <FontAwesomeIcon icon={faPlus} />
                        <span>Add More information?</span>
                    </Button>
                </Container>
            </section>
        );
    }
}

const mapStateToProps = state => {
    return {
        loading: state.resume.loading,
        requestId: state.resume.requestId,
        resumeRedirect: state.resume.setResumeRedirect,
        token: state.auth.token,
        userId: state.auth.userId,
        error: state.resume.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onSubmitResume: (token, data) => dispatch(actions.submitResume(token, data)),
        onSetResumeRedirect: () => dispatch(actions.setResumeRedirect('/home'))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ResumeData);