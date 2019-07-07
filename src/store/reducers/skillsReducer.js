import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/Utility';

const initialState = {
    loading:false,
    error: null,
    skillsData: null,
    requestId: null,
    setSkillsRedirect: '/chooseTask'
}

const skillsSubmitStart = (state, action) => {
    return updateObject(state, {
        loading: true,
        error: null
    });
};

const skillsSubmitFail = (state, action) => {
    return updateObject(state, {
        loading: false,
        error: action.error
    });
};

const skillsSubmitSuccess = (state, action) => {
    return updateObject(state, {
        loading: false,
        error: null,
        requestId: action.requestId
    })
}

const setSkillsRedirect = (state, action) => {
    return updateObject(state, {
        setSkillsRedirect: action.path
    })
}

const fetchSkillsStart = (state, action) => {
    return updateObject(state, {
        loading: true,
        error: null
    });
}

const fetchSkillsSuccess = (state, action) => {
    return updateObject(state, {
        loading: false,
        skillsData: action.skills
    })
}

const fetchSkillsFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false
    });
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SUBMIT_SKILLS_START: return skillsSubmitStart(state, action);
        case actionTypes.SUBMIT_SKILLS_SUCCESS: return skillsSubmitSuccess(state, action);
        case actionTypes.SUBMIT_SKILLS_FAIL: return skillsSubmitFail(state, action);
        case actionTypes.SET_SKILLS_REDIRECT: return setSkillsRedirect(state, action);
        case actionTypes.FETCH_SKILLS_START: return fetchSkillsStart(state, action);
        case actionTypes.FETCH_SKILLS_SUCCESS: return fetchSkillsSuccess(state, action);
        case actionTypes.FETCH_SKILLS_FAIL: return fetchSkillsFail(state, action);
        default: return state;
    }
}

export default reducer;