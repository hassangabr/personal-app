import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/Utility';

const initialState = {
    token: null,
    userId: null,
    error: null,
    loading: false,
    authRedirectPath: '/home',
    reachHome: false
}

const authStart = (state, action) => {
    return updateObject(state, {
        error: null,
        loading: true
    });
}

const authSuccess = (state, action) => {
    return updateObject(state, {
        token: action.idToken,
        userId: action.userId,
        error: null,
        loading:false
    });
}

const authFail = (state, action) => {
    return updateObject(state, {
        loading:false,
        error: action.error
    });
}

const authLogout = (state, action) => {
    return updateObject(state, {
        token: null,
        userId: null
    });
}

const setAuthRedirect = (state, action) => {
    return updateObject(state, {
        authRedirectPath: action.path
    });
}

const reachHome = (state, action) => {
    return updateObject(state, {
        reachHome: true
    });
}

const outApp = (state, action) => {
    return updateObject(state, {
        reachHome: false
    })
}

const reducer = (state= initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_START: return authStart(state, action);
        case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
        case actionTypes.AUTH_FAIL: return authFail(state, action);
        case actionTypes.AUTH_LOGOUT: return authLogout(state, action);
        case actionTypes.SET_AUTH_REDIRECT: return setAuthRedirect(state, action);
        case actionTypes.REACH_HOME: return reachHome(state, action);
        case actionTypes.OUT_APP: return outApp(state, action);
        default: return state;
    }
}

export default reducer;