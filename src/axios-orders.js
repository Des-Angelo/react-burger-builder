import axios from 'axios';

const instance = axios.create({
    baseURL: "https://wacky-s-burger-buidler.firebaseio.com/"
});

export default instance;