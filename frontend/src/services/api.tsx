import axios from "axios";
const token = localStorage.getItem('tokenNg')

const apiNg = axios.create({
    baseURL: "http://localhost:3333",
    headers: {          
        'x-access-token': token 
    }
});

export default apiNg;