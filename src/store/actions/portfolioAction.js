import * as actionTypes from './actionTypes';

export const submitPortfolio = (token, portfolioData) => {
    return {
        type: actionTypes.SUBMIT_PORTFOLIO,
        token: token,
        portfolioData: portfolioData
    }
}

export const submitPortfolioStart = () => {
    return {
        type: actionTypes.SUBMIT_PORTFOLIO_START
    }
}

export const submitPortfolioSuccess = (requestId) => {
    return {
        type: actionTypes.SUBMIT_PORTFOLIO_SUCCESS,
        requestId: requestId
    }
}

export const submitPortfolioFail = (error) => {
    return {
        type: actionTypes.SUBMIT_PORTFOLIO_FAIL,
        error: error
    }
}

export const setPortfolioRedirect = (path) => {
    return {
        type: actionTypes.SET_PORTFOLIO_REDIRECT,
        path: path
    }
}

export const fetchPortfolio = (token, userId) => {
    return {
        type: actionTypes.FETCH_PORTFOLIO,
        token: token,
        userId: userId
    }
}

export const fetchPortfolioStart = () => {
    return {
        type: actionTypes.FETCH_PORTFOLIO_START
    }
}

export const fetchPortfolioSuccess = (portfolioData) => {
    return {
        type: actionTypes.FETCH_PORTFOLIO_SUCCESS,
        portfolioData: portfolioData
    }
}

export const fetchPortfolioFail = (error) => {
    return {
        type: actionTypes.FETCH_PORTFOLIO_FAIL,
        error: error
    }
}