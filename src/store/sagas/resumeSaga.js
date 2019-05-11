import { put } from 'redux-saga/effects';
import * as actions from '../actions/indexActions';
import axios from '../../axios-order';

export function* submitResume (action) {
    yield put(actions.submitResumeStart());
    const resumeData = action.resumeData;
    try {
        const response = yield axios.post('/resume.json?auth=' + action.token, resumeData);
        yield put(actions.submitResumeSuccess(response.data.name));
    } catch (err) {
        yield put (actions.submitResumeFail(err.response.data.error));
    }
}

export function* fetchResume (action) {
    yield put(actions.fetchResumeStart());
    const queryParams = '?auth=' + action.token + '&orderBy="userId"&equalTo="' + action.userId + '"';
    try {
        const response = yield axios.get('/resume.json' + queryParams);
        let fetchResume = {};
        for (let key in response.data) {
            fetchResume = {
                ...response.data[key].info
            }
        }

        let resumeArray = [];
        for (let key in fetchResume) {
            resumeArray.push({
                [key]: fetchResume[key]
            });
        }

        let resumeArrayArrange = [];
        for (let i = 0; i <= (resumeArray.length - 1) / 6; i++) {
            resumeArrayArrange.push({
                "title": fetchResume["title_" + i],
                "company": fetchResume["companyName_" + i],
                "position": fetchResume["position_" + i],
                "from": fetchResume["from_" + i],
                "to": fetchResume["to_" + i],
                "description": fetchResume["description_" + i],
                id: i
            });
        }
        yield put(actions.fetchResumeSuccess(resumeArrayArrange));
    } catch (err) {
        yield put(actions.fetchResumeFail(err.response.data.error));
    }
}