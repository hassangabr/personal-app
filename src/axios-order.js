import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://personal-app-54349.firebaseio.com/'
});

export default instance;