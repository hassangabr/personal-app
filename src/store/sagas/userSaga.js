import { put } from 'redux-saga/effects';
import axios from '../../axios-order';
import * as actions from '../actions/indexActions';

export function* submitData (action) {
    yield put(actions.submitDataStart());
    const personalData = action.data;
    try {
        const response = yield axios.post('/personal.json?auth=' + action.token, personalData);
        yield put(actions.submitDataSuccess(response.data.name));
    } catch (err) {
        yield put(actions.submitDataFail(err.response.data.error))
    }
}

export function* fetchUserSaga (action) {
    yield put(actions.fetchUserStart());
    const queryParms = '?auth=' + action.token + '&orderBy="userId"&equalTo="' + action.userId + '"';
    try {
        const response = yield axios.get('/personal.json' + queryParms);
        let userData= {};
        for (let key in response.data) {
            userData= {
                ...response.data[key].info
            }
        }
        yield put(actions.fetchUserSuccess(userData));
    } catch (err) {
        yield put(actions.fetchUserFail(err.response.data.error));
    }
}