import * as actionTypes from './actionTypes';

export const submitResume = (token, resumeData) => {
    return {
        type: actionTypes.SUBMIT_RESUME,
        token: token,
        resumeData: resumeData
    };
};

export const submitResumeStart = () => {
    return {
        type: actionTypes.SUBMIT_RESUME_START
    };
};

export const submitResumeSuccess = (requestId) => {
    return {
        type: actionTypes.SUBMIT_RESUME_SUCCESS,
        requestId: requestId
    };
};

export const submitResumeFail = (error) => {
    return {
        type: actionTypes.SUBMIT_RESUME_FAIL,
        error: error
    };
};

export const setResumeRedirect = (path) => {
    return {
        type: actionTypes.SET_RESUME_REDIRECT,
        path: path
    };
};

export const fetchResume = (token, userId) => {
    return {
        type: actionTypes.FETCH_RESUME,
        token: token,
        userId: userId
    }
}

export const fetchResumeStart = () => {
    return {
        type: actionTypes.FETCH_RESUME_START
    }
}

export const fetchResumeSuccess = (resumeData) => {
    return {
        type: actionTypes.FETCH_RESUME_SUCCESS,
        resumeData: resumeData
    }
}

export const fetchResumeFail = (error) => {
    return {
        type: actionTypes.FETCH_RESUME_FAIL,
        error: error
    }
}