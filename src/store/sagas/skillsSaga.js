import { put } from 'redux-saga/effects';
import * as actions from '../actions/indexActions';
import axios from '../../axios-order';

export function* submitSkillsSaga (action) {
    yield put(actions.submitSkillsStart());
    const skillsData = action.skillsData;
    try {
        const response = yield axios.post('/skills.json?auth=' + action.token, skillsData);
        yield put(actions.submitSkillsSuccess(response.data.name));
    } catch (error) {
        yield put(actions.submitSkillsFail(error.response.data.error));
    }
}

export function* fetchSkillsSaga (action) {
    yield put(actions.fetchSkillsStart());
    const queryParams = '?auth=' + action.token + '&orderBy="userId"&equalTo="' + action.userId + '"';
    try {
        const response = yield axios.get('/skills.json' + queryParams);
        let fetchSkills = {};
        for (let key in response.data) {
            fetchSkills = {
                ...response.data[key].info
            }
        }

        let skillsArray = [];
        for (let key in fetchSkills) {
            skillsArray.push({
                [key]: fetchSkills[key]
            })
        }

        let skillsArrayArrenge = [];
        for (let i = 0; i <= (skillsArray.length - 1) / 2; i++) {
            skillsArrayArrenge.push({
                "skill": fetchSkills["skill_" + i],
                "rate": fetchSkills["rate_" + i],
                id: "skill_" + i
            })
        }
        yield put(actions.fetchSkillsSuccess(skillsArrayArrenge));
    } catch (err) {
        yield put (actions.fetchSkillsFail(err.response.data.error));
    }
}