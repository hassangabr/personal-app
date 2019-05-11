import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/Utility';

const initialState = {
    loading: false,
    error: null,
    requestId: null,
    setResumeRedirect: '/home',
    resumeData: null
}

const submitResumeStart = (state, action) => {
    return updateObject(state, {
        loading: true,
        error: null
    });
};

const submitResumeSuccess = (state, action) => {
    return updateObject(state, {
        loading: false,
        requestId: action.requestId
    });
};

const submitResumeFail = (state, action) => {
    return updateObject(state, {
        loading: false,
        error: action.error
    });
};

const setResumeRedirect = (state, action) => {
    return updateObject(state, {
        path: action.path
    });
}

const fetchResumeStart = (state, action) => {
    return updateObject(state, {
        loading: true,
        error: null
    });
}

const fetchResumeSuccess = (state, action) => {
    return updateObject(state, {
        loading: false,
        resumeData: action.resumeData
    });
}

const fetchResumeFail = (state, action) => {
    return updateObject(state, {
        loading: false,
        error: action.error
    });
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SUBMIT_RESUME_START: return submitResumeStart(state, action);
        case actionTypes.SUBMIT_RESUME_SUCCESS: return submitResumeSuccess(state, action);
        case actionTypes.SUBMIT_RESUME_FAIL: return submitResumeFail(state, action);
        case actionTypes.SET_RESUME_REDIRECT: return setResumeRedirect(state, action);
        case actionTypes.FETCH_RESUME_START: return fetchResumeStart(state, action);
        case actionTypes.FETCH_RESUME_SUCCESS: return fetchResumeSuccess(state, action);
        case actionTypes.FETCH_RESUME_FAIL: return fetchResumeFail(state, action);
        default: return state;
    }
}

export default reducer;