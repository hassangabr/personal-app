import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/Utility';

const initialState = {
    loading:false,
    error: null,
    portfolioData: null,
    setPortfolioRedirect: '/chooseTask',
    requestId: null
}

const submitPortfolioStart = (state, action) => {
    return updateObject(state, {
        loading:true,
        error: null
    });
};

const submitPortfolioSuccess = (state, action) => {
    return updateObject(state, {
        loading: false,
        requestId: action.requestId
    });
};

const submitPortfolioFail = (state, action) => {
    return updateObject(state, {
        loading:false,
        error: action.error
    });
}

const setPortfolioRedirect = (state, action) => {
    return updateObject(state, {
        setPortfolioRedirect: action.path
    });
}

const fetchPortfolioStart = (state, action) => {
    return updateObject(state, {
        loading: true,
        error: null
    });
}

const fetchPortfolioSuccess = (state, action) => {
    return updateObject(state, {
        loading: false,
        portfolioData: action.portfolioData
    });
}

const fetchPortfolioFail = (state, action) => {
    return updateObject(state, {
        loading: false,
        error: action.error
    });
}

const fetchRequestIdFromLocalSuccess = (state, action) => {
    return updateObject(state, {
        requestId: action.requestId
    })
}

const reachHome = (state, action) => {
    return updateObject(state, {
        requestId: null
    });
}

const reducer = (state = initialState, action) =>{
    switch(action.type) {
        case actionTypes.SUBMIT_PORTFOLIO_START: return submitPortfolioStart(state, action);
        case actionTypes.SUBMIT_PORTFOLIO_SUCCESS: return submitPortfolioSuccess(state, action);
        case actionTypes.SUBMIT_PORTFOLIO_FAIL: return submitPortfolioFail(state, action);
        case actionTypes.SET_PORTFOLIO_REDIRECT: return setPortfolioRedirect(state, action);
        case actionTypes.FETCH_PORTFOLIO_START: return fetchPortfolioStart(state, action);
        case actionTypes.FETCH_PORTFOLIO_SUCCESS: return fetchPortfolioSuccess(state, action);
        case actionTypes.FETCH_PORTFOLIO_FAIL: return fetchPortfolioFail(state, action);
        case actionTypes.FETCH_PORT_REQUESTID_FROM_LOCAL_SUCCESS: return fetchRequestIdFromLocalSuccess(state, action);
        case actionTypes.REACH_HOME: return reachHome(state, action);
        default: return state;
    }
}

export default reducer;