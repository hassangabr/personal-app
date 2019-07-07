import { put, call, delay } from 'redux-saga/effects';

import axios from 'axios'

import * as actions from '../actions/indexActions';

export function* authSaga (action) {
    yield put(actions.authStart());
    const authData = {
        email: action.email,
        password: action.password,
        returnSecureToken: true
    }
    let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyC8jZLrHIwbWvm6VIX9z_lB19X5GW6C7Jw';
    if (!action.isLogin) {
        url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyC8jZLrHIwbWvm6VIX9z_lB19X5GW6C7Jw';
    }
    try {
        const response = yield axios.post(url, authData);
        const expirationDate = yield new Date(new Date().getTime() + response.data.expiresIn * 1000);
        yield localStorage.setItem('token', response.data.idToken);
        yield localStorage.setItem('expirationTime', expirationDate);
        yield localStorage.setItem('userId', response.data.localId);
        yield put(actions.authSuccess(response.data.idToken, response.data.localId));
        yield put(actions.authCheckTimeOut(response.data.expiresIn));

    } catch (err) {
        yield put(actions.authFail(err.response.data.error));
    }
}

export function* authLogout (action) {
    yield call([localStorage, 'removeItem'], 'token');
    yield call([localStorage, 'removeItem'], 'expirationTime');
    yield call([localStorage, 'removeItem'], 'userId');
    yield call([localStorage, 'removeItem'], 'resumeRequestId');
    yield call([localStorage, 'removeItem'], 'skillsRequestId');
    yield call([localStorage, 'removeItem'], 'portRequestId');
    yield call([localStorage, 'removeItem'], 'userRequestId');
    yield put(actions.logoutSucceed());
}

export function* authCheckTimeOut (action) {
    yield delay(action.expirationTime * 1000);
    yield put(actions.logout());
}

export function* authCheckState (action) {
    const token = yield localStorage.getItem('token');
    if (!token) {
        yield put(actions.logout());
    } else {
        const expirationDate = new Date(localStorage.getItem('expirationTime'));
        if (expirationDate < new Date()) {
            yield put(actions.logout());
        } else {
            const userId = yield localStorage.getItem('userId');
            yield put(actions.authSuccess(token, userId));
            yield put(actions.authCheckTimeOut((expirationDate.getTime() - new Date().getTime()) / 1000));
        }
    }
} 