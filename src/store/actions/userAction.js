import * as actionTypes from './actionTypes';

export const submitData = (token, personalData) => {
    return {
        type: actionTypes.SUBMIT_DATA,
        data: personalData,
        token: token
    }
}

export const submitDataStart = () => {
    return {
        type: actionTypes.SUBMIT_DATA_START
    }
}

export const submitDataSuccess = (id) => {
    return {
        type: actionTypes.SUBMIT_DATA_SUCCESS,
        requestId: id
    }
}

export const submitDataFail = (error) => {
    return {
        type: actionTypes.SUBMIT_DATA_FAIL,
        error: error
    }
}

export const setUserRedirectPath = (path) => {
    return {
        type: actionTypes.SET_USER_REDIRECT,
        path: path
    }
}

export const fetchUser = (token, userId) => {
    return {
        type: actionTypes.FETCH_USER,
        token: token,
        userId: userId
    }
}

export const fetchUserStart = () => {
    return {
        type: actionTypes.FETCH_USER_START
    }
}

export const fetchUserSuccess = (userData) => {
    return {
        type: actionTypes.FETCH_USER_SUCCESS,
        userData: userData
    }
}

export const fetchUserFail = (error) => {
    return {
        type: actionTypes.FETCH_USER_FAIL,
        error: error
    }
}

export const checkUserRequestIdState = () => {
    return {
        type: actionTypes.CHECK_USER_REQUESR_ID_STATE
    }
}

export const fetchUserRequestIdSuccess = (requestId) => {
    return {
        type: actionTypes.FETCH_USER_REQUEST_ID_SUCCESS,
        requestId: requestId
    }
}