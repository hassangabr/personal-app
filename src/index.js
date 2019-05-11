import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.css';
import authReducer from './store/reducers/authReducer';
import userReducer from './store/reducers/userReducer';
import skillsReducer from './store/reducers/skillsReducer';
import portfolioReducer from './store/reducers/portfolioReducer';
import resumeReducer from './store/reducers/resumeReducer';
import { watchAuth, watchPersonalData, watchSkillsData, watchPortfolioData, watchResumeData } from './store/sagas/indexSaga';


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
    auth: authReducer,
    user: userReducer,
    skills: skillsReducer,
    port: portfolioReducer,
    resume: resumeReducer
});

const sagaMiddleware = createSagaMiddleware()

const store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(sagaMiddleware)
));

sagaMiddleware.run(watchAuth);
sagaMiddleware.run(watchPersonalData);
sagaMiddleware.run(watchSkillsData);
sagaMiddleware.run(watchPortfolioData);
sagaMiddleware.run(watchResumeData);

const app = (
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
);

ReactDOM.render(app , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
