import React from 'react';
import Aux from '../../hoc/Aux';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faCalendarAlt, faPenAlt } from '@fortawesome/free-solid-svg-icons';
import './resumeComponent.scss';

library.add(faStar, faCalendarAlt, faPenAlt);

const resumeComponent = ( props ) => (
    <Aux>
        <div className = "resume-box col-xl-6 col-lg-12">
            <div className = "title"><h3>{props.title} at {props.company}</h3></div>
                <div className = "resume-content">
                    <ul className="list-unstyled">
                        <li>
                            <span className = "icon">
                                <FontAwesomeIcon icon = {faStar} />
                            </span>
                                
                            <p>
                                <span className = "info-title">Position: </span>
                                {props.position}
                            </p>
                        </li>

                        <li>
                            <span className = "icon">
                                <FontAwesomeIcon icon = {faCalendarAlt} />
                            </span>
                            <p><span className = "info-title">from</span> <span className="date">{props.from}</span> <span className = "info-title">to</span> <span className="date">{props.to}</span></p>
                        </li>

                        <li>
                            <span className = "icon">
                                <FontAwesomeIcon icon = {faPenAlt} />
                            </span>
                            <p>{props.description}</p>
                        </li>
                    </ul>
                </div>
                {/*resume-content*/}
        </div>
        {/* resume-box */}
    </Aux>
);

export default resumeComponent;