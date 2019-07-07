import { put } from 'redux-saga/effects';
import * as actions from '../actions/indexActions';
import axios from '../../axios-order';

export function* submitPortfolio (action) {
    yield put(actions.submitPortfolioStart());
    const portfolioData = action.portfolioData;
    try {
        const response = yield axios.post('/portfolio.json?auth=' +  action.token, portfolioData);
        yield put(actions.submitPortfolioSuccess(response.data.name));
        yield localStorage.setItem('requestId', response.data.name);
    } catch (err) {
        yield put(actions.submitPortfolioFail(err.response.data.error));
    }
}

export function* fetchPortfolio (action) {
    yield put(actions.fetchPortfolioStart());
    const queryParams = '?auth=' + action.token + '&orderBy="userId"&equalTo="' + action.userId + '"';
    try {
        const response = yield axios.get('/portfolio.json' + queryParams);
        let fetchPorts = {};
        for (let key in response.data) {
            fetchPorts = {
                ...response.data[key].info
            }
        }
        let portsArray = [];
        for(let key in fetchPorts) {
            portsArray.push({
                [key]: fetchPorts[key]
            })
        }

        let portsArrayArrange = [];
        for (let i = 0; i <=  (portsArray.length - 1) / 3; i++) {
            portsArrayArrange.push({
                "link": fetchPorts["link_" + i],
                "thumbnail" : fetchPorts["thumbnail_" + i],
                "title": fetchPorts["title_" + i],
                id: i
            });
        }
        yield put(actions.fetchPortfolioSuccess(portsArrayArrange));
    } catch(err) {
        yield put(actions.fetchPortfolioFail(err.response.data.error));
    }
}

export function* checkPortfolioRequestIdState(action) {
    const requestId = yield localStorage.getItem("requestId");
    if (requestId) {
        yield put(actions.submitPortfolioSuccess(requestId));
    }
}