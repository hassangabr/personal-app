import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/Utility';

const initialState = {
    loading: false,
    error: null,
    userRedirectPath: '/chooseTask',
    data: null,
    requestId: null
}

const submitDataStart = (state, action) => {
    return updateObject(state, {
        loading:true,
        error: null
    })
}

const submitDataSuccess = (state, action) => {
    return updateObject(state, {
        loading: false,
        error: null,
        requestId: action.requestId
    });
}

const submitDataFail = (state, action) => {
    return updateObject(state, {
        loading:false,
        error: action.error
    });
}

const setUserRedirectPath = (state, action) => {
    return updateObject(state, {
        userRedirectPath: action.path
    });
}

const fetchDataStart = (state, action) => {
    return updateObject(state, {
        loading:true,
        error: null
    });
}

const fetchDataSuccess = (state, action) => {
    return updateObject(state, {
        data: action.userData,
        loading:false,
        error: null
    });
}

const fetchDataFail = (state, action) => {
    return updateObject(state, {
        loading: false,
        error: action.error
    });
}

const fetchUserRequestIdSuccess = (state, action) => {
    return updateObject(state, {
        requestId: action.requestId
    })
}

const reachHome = (state, action) => {
    return updateObject(state, {
        requestId: null
    });
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SUBMIT_DATA_START: return submitDataStart(state, action);
        case actionTypes.SUBMIT_DATA_SUCCESS: return submitDataSuccess(state, action);
        case actionTypes.SUBMIT_DATA_FAIL: return submitDataFail(state, action);
        case actionTypes.SET_USER_REDIRECT: return setUserRedirectPath(state, action);
        case actionTypes.FETCH_USER_START: return fetchDataStart(state, action);
        case actionTypes.FETCH_USER_SUCCESS: return fetchDataSuccess(state, action);
        case actionTypes.FETCH_USER_FAIL: return fetchDataFail(state, action);
        case actionTypes.FETCH_USER_REQUEST_ID_SUCCESS: return fetchUserRequestIdSuccess(state, action);
        case actionTypes.REACH_HOME: return reachHome(state, action);
        default: return state;
    }
}

export default reducer;