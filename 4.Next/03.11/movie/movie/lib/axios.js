import axios from "axios";

const instance = axios.create({
    baseURL : 'https://learn.codeit.kr/api/'
});

export default instance;