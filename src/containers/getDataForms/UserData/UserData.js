import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { updateObject, checkValidity } from '../../../shared/Utility';
import { Container, Row } from 'reactstrap';
import Input from '../../../components/UI/Input/Input';
import Button from '../../../components/UI/Button/Button';
import SpanButton from '../../../components/UI/spanButton/spanButton';
import Spinner from '../../../components/UI/Spinner/Spinner';
import * as actions from '../../../store/actions/indexActions';
import '../formsData.scss';

class UserData extends Component {
    state = {
        inputs : {
            profile : {
                elementType: 'inputFile',
                config: {
                    type: 'file',
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: true,
                touched: false,
                classes: 'col-lg-12'
            },
            fname : {
                elementType: 'input',
                config: {
                    type: 'text',
                    placeholder: 'Type your first name'
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
                classes: 'col-lg-6'
            },
            lname : {
                elementType: 'input',
                config: {
                    type: 'text',
                    placeholder: 'Type your last name'
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
                classes: 'col-lg-6'
            },
            jobTitle : {
                elementType: 'input',
                config: {
                    type: 'text',
                    placeholder: 'Type your job title'
                },
                value: '',
                validation: {
                    required: true, 
                },
                valid: false,
                touched: false,
                classes: 'col-lg-6'
            },
            birth : {
                elementType: 'input',
                config: {
                    type: 'date',
                    placeholder: 'Date of birth'
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
                classes: 'col-lg-6'
            },
            phone : {
                elementType: 'input',
                config: {
                    type: 'text',
                    placeholder: 'Type your phone number'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 11,
                    isNumeric: true
                },
                valid: false,
                touched: false,
                classes: 'col-lg-6'
            },
            email : {
                elementType: 'input',
                config: {
                    type: 'email',
                    placeholder: 'Type your email address'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false,
                classes: 'col-lg-6'
            },
            bio : {
                elementType: 'textarea',
                config: {
                    type: 'text',
                    placeholder: 'Tell us about yourself'
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
                classes: 'col-12'
            },
        },
        uploadImage: '',
        formIsValid: false
    }

    componentDidMount () {
        if (this.props.userRedirectPath !== '/chooseTask') {
            this.props.onUserRedirect();
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

    addProfileImage = (event) => {
        event.preventDefault();
        let reader = new FileReader();
        let file = event.target.files[0];
        const fileReader = updateObject(this.state.inputs, {
            "profile" : {
                ...this.state.inputs.profile,
                touched:true,
                valid:true
            }
        })
        reader.onloadend = () => {
            this.setState({uploadImage: reader.result, inputs:fileReader})
        };
        if ( event.target.files[0] ) {
            reader.readAsDataURL(file);
        }
    }

    onSubmitHandler = (event) => {
        event.preventDefault();
        const userData = {};
        for ( let key in this.state.inputs) {
            userData[key] = this.state.inputs[key].value
        }
        const profilePic = this.state.uploadImage;
        const personalData = {
            info: {
                ...userData,
                "profile": profilePic
            },
            userId: this.props.userId
        }
        this.props.onSubmitData(this.props.token, personalData);
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
                value = {formElement.configer.value}
                elementType = {formElement.configer.elementType}
                touched = {formElement.configer.touched}
                isValid = {!formElement.configer.valid}
                shouldValidate = {formElement.configer.validation}
                elementConfig = {formElement.configer.config}
                changed = {(event) => this.inputChangeHandler(event, formElement.id)}
                classes = {formElement.configer.classes}
                onDrop = {this.onDrop}
                file = {(event) => this.addProfileImage(event)}
                src = {this.state.uploadImage}
            />
        ));

        let spinner = null;
        if (this.props.loading) {
            spinner = <Spinner />
        }

        let redirect = null;
        if (this.props.submited) {
            redirect = <Redirect to = {this.props.userRedirectPath} />
        }

        let button = <SpanButton/>;

        if (this.state.formIsValid) {
            button = <Button classes="next">Next</Button>;
        }


        return (
            <section className="data text-center">
                {redirect}
                <Container>
                    <form onSubmit = {this.onSubmitHandler}>
                        {spinner}
                        <h2>Start creating your profile</h2>
                        <Row>
                            {form}
                            {button}
                        </Row>
                    </form>
                </Container>
            </section>
        );
    }    
}

const mapStateToProps = state => {
    return {
        token: state.auth.token,
        userId: state.auth.userId,
        loading: state.user.loading,
        userRedirectPath: state.user.userRedirectPath,
        submited: state.user.requestId !== null
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onSubmitData: (token, data) => dispatch(actions.submitData(token, data)),
        onUserRedirect: () => dispatch(actions.setUserRedirectPath('/chooseTask'))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserData);