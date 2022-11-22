import axios from "axios";

const apiNg = axios.create({
    baseURL: "http://localhost:3333"
});

export default apiNg;