import { takeEvery, all } from 'redux-saga/effects';
import * as actionTypes from '../actions/actionTypes';
import { authSaga, authLogout, authCheckTimeOut, authCheckState, reachHome } from './authSaga';
import { submitData, fetchUserSaga, checkUserRequestIdState } from './userSaga';
import { submitSkillsSaga, fetchSkillsSaga, checkSkillsRequestIdState } from './skillsSaga';
import { submitPortfolio, fetchPortfolio, checkPortfolioRequestIdState } from './portfolioSaga';
import { submitResume, fetchResume, checkResumeRequestIdState } from './resumeSaga';

export function* watchAuth () {
    yield all([
        takeEvery(actionTypes.AUTH_USER, authSaga),
        takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, authLogout),
        takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, authCheckTimeOut),
        takeEvery(actionTypes.AUTH_CHECK_STATE, authCheckState),
        takeEvery(actionTypes.REACH_HOME, reachHome),
    ]);
}

export function* watchPersonalData () {
    yield takeEvery(actionTypes.SUBMIT_DATA, submitData);
    yield takeEvery(actionTypes.FETCH_USER, fetchUserSaga);
    yield takeEvery(actionTypes.CHECK_USER_REQUESR_ID_STATE, checkUserRequestIdState);
}

export function* watchSkillsData () {
    yield takeEvery(actionTypes.SUBMIT_SKILLS, submitSkillsSaga);
    yield takeEvery(actionTypes.FETCH_SKILLS, fetchSkillsSaga);
    yield takeEvery(actionTypes.CHECK_SKILLS_REQUEST_ID_STATE, checkSkillsRequestIdState);
}

export function* watchPortfolioData () {
    yield takeEvery(actionTypes.SUBMIT_PORTFOLIO, submitPortfolio);
    yield takeEvery(actionTypes.FETCH_PORTFOLIO, fetchPortfolio);
    yield takeEvery(actionTypes.CHECK_PORTFOLIO_REQUESTID_STATE, checkPortfolioRequestIdState);
}

export function* watchResumeData () {
    yield takeEvery(actionTypes.SUBMIT_RESUME, submitResume);
    yield takeEvery(actionTypes.FETCH_RESUME, fetchResume);
    yield takeEvery(actionTypes.CHECK_RESUME_REQUEST_ID_STATE, checkResumeRequestIdState);
}