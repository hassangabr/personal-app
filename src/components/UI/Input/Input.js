import React from 'react';
// import ImageUploader from 'react-images-upload';
import Aux from '../../../hoc/AuxC';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera } from '@fortawesome/free-solid-svg-icons';
import './Input.scss';

library.add(faCamera);

const input = ( props ) => {
    let inputElement = null;
    const inputClasses = ["input"];
    const UploadImage = ["upload"];
    if ( props.isValid && props.shouldValidate && props.touched) {
        inputClasses.push("Invalid");
        UploadImage.push("Invalid");
    }
    switch ( props.elementType ) {
        case 'input':
            inputElement = <input 
                                className = {inputClasses.join(' ')}
                                {...props.elementConfig}
                                value = {props.value}
                                onChange = {props.changed}
                            />
            break;
        case 'textarea':
            inputElement = <Aux>
                                <textarea 
                                    className = {inputClasses.join(' ')}
                                    {...props.elementConfig}
                                    value = {props.value}
                                    onChange = {props.changed}
                                />
                                <div className="seperate"></div>
                            </Aux>
            break;
        case 'inputFile':
            inputClasses.push("file");
            inputElement = <Aux>
                                <div className="seperate"></div>
                                <input 
                                    className = {inputClasses.join(' ')}
                                    {...props.elementConfig}
                                    onChange = {props.file}
                                />
                                <div className={UploadImage.join(' ')}>
                                    <FontAwesomeIcon icon={faCamera}/>
                                    <img src={props.src} alt="" className="img-fluid d-block mx-auto"/>
                                </div>
                           </Aux>
            break;
        case 'select':
            inputElement = <select></select>
            break;
        default:
            inputElement = <input 
                                className = {inputClasses.join(' ')}
                                {...props.elementConfig}
                                value = {props.value}
                                onChange = {props.changed}
                            />
    }
    return (
        <div className={["input-group", props.classes].join(' ')}>
            {inputElement}
        </div>
    );
}

export default input;