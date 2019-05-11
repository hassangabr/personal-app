import React from 'react';
import Aux from '../../hoc/Aux';
import { Link } from 'react-router-dom';

import './portfolioComponent.scss';

const portfolio = ( props ) => (
    <Aux>
        <div className = "col-xl-4 col-lg-6">
            <div className = "port-container">
                <img src = {props.img} className = "img-fluid d-block mx-auto" alt = "Portfolio: may contains special works"/>
                <div className = "overlay title">
                    <h3>{props.title}</h3>
                </div>
                <div className = "overlay link">
                    <Link target="_blank" to = {{
                        pathname: props.link
                    }}>view</Link>
                </div>
            </div>
        </div>
    </Aux>
);

export default portfolio;