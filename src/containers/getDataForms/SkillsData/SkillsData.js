import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as actions from '../../../store/actions/indexActions';
import { Container, Row } from 'reactstrap';
import Input from '../../../components/UI/Input/Input';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import SpanButton from '../../../components/UI/spanButton/spanButton';
import { updateObject, checkValidity } from '../../../shared/Utility';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import '../formsData.scss';

library.add(faPlus);

class SkillsData extends Component {
    state = {
        inputs: {
            skill_0 : {
                elementType: 'input',
                config: {
                    type: 'text',
                    placeholder: 'Type your skill'
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
                classes: 'col-lg-6'
            },
            rate_0 : {
                elementType: 'input',
                config: {
                    type: 'text',
                    placeholder: 'Type this skill rate'
                },
                value: '',
                validation: {
                    required: true,
                    maxLength: 3,
                    isNumeric: true
                },
                valid: false,
                touched: false,
                classes: 'col-lg-6'
            },
        },
        i: 1,
        formIsValid: false
    }

    componentDidMount () {
        if (this.props.setSkillsRedirect !== '/portfolioData') {
            this.props.onSetSkillsRedirect();
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
        this.setState({inputs: updateInputs, formIsValid: formIsValid});
    }

    addFormHandler = () => {
        let i = this.state.i;
        const incI = updateObject(this.state, {
            i: this.state.i + 1
        });
        const addInput = updateObject(this.state.inputs, {
            ["skill_" + i] : {
                ...this.state.inputs["skill_0"],
                value: '',
                touched: false,
                valid: false
            },
            ["rate_" + i] : {
                ...this.state.inputs["rate_0"],
                value: '',
                touched: false,
                valid: false
            },
        });
        this.setState({inputs:addInput, i:incI.i, formIsValid: false});
    }

    submitHandler = (event) => {
        event.preventDefault();
        const skillsData = {};
        for (let key in this.state.inputs) {
            skillsData[key] = this.state.inputs[key].value
        }
        const skillsInfo = {
            info: {
                ...skillsData
            },
            userId: this.props.userId
        }
        this.props.onSubmitSkills(this.props.token, skillsInfo);
    }

    render () {
        const formInputsArray = [];
        for (let key in this.state.inputs) {
            formInputsArray.push({
                id: key,
                configer: this.state.inputs[key]
            });
        }

        let form = formInputsArray.map(formElement => (
            <Input 
                key = {formElement.id}
                elementType = {formElement.configer.elementType}
                value = {formElement.configer.value}
                touched = {formElement.configer.touched}
                elementConfig = {formElement.configer.config}
                classes = {formElement.configer.classes}
                shouldValidate = {formElement.configer.validation}
                isValid = {!formElement.configer.valid}
                changed = {(event) => this.inputChangeHandler(event, formElement.id)}
            />
        ));

        let spinner = null;
        if (this.props.loading) {
            spinner = <Spinner />
        }

        let redirect = null;
        if (this.props.requestId) {
            redirect = <Redirect to = {this.props.setSkillsRedirect}/>
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
            <section className="skill-data text-center">
                {redirect}
                <Container>
                    <form onSubmit = {this.submitHandler}>
                        {spinner}
                        <h2>Start Adding your Skills</h2>
                        {errorMessage}
                        <Row>
                            {form}
                            {button}
                        </Row>
                    </form>
                    <Button classes="add" clicked= {this.addFormHandler}>
                        <FontAwesomeIcon icon={faPlus} />
                        <span>Add Another skill?</span>
                    </Button>
                </Container>
            </section>
        );
    }
}

const mapStateToProps = state => {
    return {
        userId: state.auth.userId,
        token: state.auth.token,
        loading: state.skills.loading,
        requestId: state.skills.requestId !== null,
        setSkillsRedirect: state.skills.setSkillsRedirect,
        error: state.skills.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onSubmitSkills: (token, data) => dispatch(actions.submitSkills(token, data)),
        onSetSkillsRedirect: () => dispatch(actions.setSkillsRedirect('/portfolioData'))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SkillsData);