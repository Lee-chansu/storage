import axios from "axios";

const instance = axios.create({
  baseURL: "https://learn.codeit.kr/api/codeitmall/",
});

export default instance;
