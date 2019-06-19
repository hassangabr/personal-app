import React, { Component } from 'react';
import { Container, Row } from 'reactstrap';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { updateObject, checkValidity } from '../../../shared/Utility';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import Input from '../../../components/UI/Input/Input';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import SpanButton from '../../../components/UI/spanButton/spanButton';
import * as actions from '../../../store/actions/indexActions';
import '../formsData.scss';

library.add(faPlus);

class PortfolioData extends Component {
    state = {
        inputs: {
            thumbnail_0: {
                elementType: 'inputFile',
                config: {
                    type: 'file'
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: true,
                touched: false,
                classes: 'col-lg-12',
                uploadImage: ''
            },
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
            link_0 : {
                elementType: 'input',
                config: {
                    type: 'text',
                    placeholder: 'Put the link to this item'
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
                classes: 'col-lg-6'
            }
        },
        i: 1,
        formIsValid: false
    }

    componentDidMount () {
        if (this.props.portRedirect !== '/resumeData') {
            this.props.onSetPortRedirect();
        }
    }

    inputChangeHandler = (event, inputName) => {
        const updateInputs = updateObject(this.state.inputs, {
            [inputName]: updateObject(this.state.inputs[inputName], {
                value: event.target.value,
                touched: true,
                valid: checkValidity(event.target.value, this.state.inputs[inputName].validation)
            })
        });
        let formIsValid = true;
        for (let input in updateInputs) {
            formIsValid = updateInputs[input].valid && formIsValid;
        }
        this.setState({inputs: updateInputs, formIsValid:formIsValid});
    }

    addFormHandler = () => {
        let i = this.state.i;
        const incI = updateObject(this.state, {
            i: this.state.i + 1
        });
        const addInput = updateObject(this.state.inputs, {
            ["thumbnail_" + i]: {
                ...this.state.inputs["thumbnail_0"],
                value: '',
                valid: true,
                touched: false,
                uploadImage: ''
            },
            ["title_" + i]: {
                ...this.state.inputs["title_0"],
                value: '',
                valid: false,
                touched: false
            },
            ["link_" + i]: {
                ...this.state.inputs["link_0"],
                value: '',
                valid: false,
                touched: false
            }
        });
        this.setState({inputs:addInput, i: incI.i, formIsValid:false})
    }

    addThumbnailImage = (event, inputName) => {
        event.preventDefault();
        let reader = new FileReader();
        let file = event.target.files[0];
        // console.log(event.target.value);
        reader.onloadend = () => {
            const updateImage = updateObject(this.state.inputs, {
                [inputName]: updateObject(this.state.inputs[inputName], {
                    uploadImage: reader.result,
                    touched:true,
                    valid:true
                })
            });
            
            this.setState({inputs:updateImage})
        };
        if ( event.target.files[0] ) {
            reader.readAsDataURL(file);
        }
    }

    submitHandler = (event) => {
        event.preventDefault();
        const data = {};
        for (let key in this.state.inputs) {
            data[key] = this.state.inputs[key].uploadImage;
            if (this.state.inputs[key].uploadImage == null) {
                data[key] = this.state.inputs[key].value;
            }
        }
        const portData = {
            info: {
                ...data
            },
            userId: this.props.userId
        };
        this.props.onSubmitPort(this.props.token, portData);
    }


    render() {
        const formElementArray = [];
        for (let key in this.state.inputs) {
            formElementArray.push({
                id: key,
                configer: this.state.inputs[key]
            });
        }

        let form = formElementArray.map(formElemnt => (
            <Input 
                key = {formElemnt.id}
                value = {formElemnt.configer.value}
                elementType = {formElemnt.configer.elementType}
                isValid = {!formElemnt.configer.valid}
                touched = {formElemnt.configer.touched}
                classes = {formElemnt.configer.classes}
                shouldValidate = {formElemnt.configer.validation}
                elementConfig = {formElemnt.configer.config}
                changed = {(event) => this.inputChangeHandler(event, formElemnt.id)}
                file = {(event) => this.addThumbnailImage(event, formElemnt.id)}
                src = {formElemnt.configer.uploadImage}
            />
        ));

        let spinner = null;
        if (this.props.loading) {
            spinner = <Spinner />
        }

        let redirect = null;
        if (this.props.requestId) {
            redirect = <Redirect to = {this.props.portRedirect} />
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
            <section className="port-data text-center">
                {redirect}
                <Container>
                    <form onSubmit = {this.submitHandler}>
                        {spinner}
                        <h2>Start adding your works</h2>
                        {errorMessage}
                        <Row>
                            {form}
                            {button}
                        </Row>
                    </form>
                    <Button classes="add" clicked= {this.addFormHandler}>
                        <FontAwesomeIcon icon={faPlus} />
                        <span>Add More works?</span>
                    </Button>
                </Container>
            </section>
        );
    }
}

const mapStateToProps = state => {
    return {
        loading: state.port.loading,
        requestId: state.port.requestId !== null,
        portRedirect: state.port.setPortfolioRedirect,
        userId: state.auth.userId,
        token: state.auth.token,
        error: state.port.error
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onSubmitPort: (token, data) => dispatch(actions.submitPortfolio(token, data)),
        onSetPortRedirect: () => dispatch(actions.setPortfolioRedirect('/resumeData'))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PortfolioData);