import * as actionTypes from './actionTypes';

export const submitSkills = (token, skillsData) => {
    return {
        type: actionTypes.SUBMIT_SKILLS,
        token: token,
        skillsData: skillsData
    }
}

export const submitSkillsStart = () => {
    return {
        type: actionTypes.SUBMIT_SKILLS_START
    }
}

export const submitSkillsSuccess = (id) => {
    return {
        type: actionTypes.SUBMIT_SKILLS_SUCCESS,
        requestId: id
      
    }
}

export const submitSkillsFail = (error) => {
    return {
        type: actionTypes.SUBMIT_SKILLS_FAIL,
        error: error
    }
}

export const setSkillsRedirect = (path) => {
    return {
        type: actionTypes.SET_SKILLS_REDIRECT,
        path: path
    }
}

export const fetchSkills = (token, userId) => {
    return {
        type: actionTypes.FETCH_SKILLS,
        token: token,
        userId: userId
    }
}

export const fetchSkillsStart = () => {
    return {
        type: actionTypes.FETCH_SKILLS_START
    }
}

export const fetchSkillsSuccess = (skills) => {
    return {
        type: actionTypes.FETCH_SKILLS_SUCCESS,
        skills: skills
    }
}

export const fetchSkillsFail = (error) => {
    return {
        type: actionTypes.FETCH_SKILLS_FAIL,
        error: error
    }
}

export const checkSkillsRequestIdState = () => {
    return {
        type: actionTypes.CHECK_SKILLS_REQUEST_ID_STATE
    }
}

export const fetchSkillsRequestIdFromLocalSuccess = (requestId) => {
    return {
        type: actionTypes.FETCH_SKILLS_REQUEST_ID_FROM_LOCAL_SUCCESS,
        requestId: requestId
    }
}