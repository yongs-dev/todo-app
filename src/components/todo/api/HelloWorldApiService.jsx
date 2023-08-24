import axios from "axios";

const apiClient = axios.create(
    {
        baseURL: 'http://localhost:8088'
    }
);

export const retrieveHelloWorld = () => apiClient.get('/hello-world')
export const retrieveHelloWorldBean = () => apiClient.get('/hello-world-bean')
export const retrieveHelloWorldPathVariable = (username) => apiClient.get(`/hello-world/path-variable/${username}`)
