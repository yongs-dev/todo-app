import axios from "axios";

const apiClient = axios.create(
    {
        baseURL: 'http://localhost:8088'
    }
);

export const retrieveTodosForUsernameApi = (username) => apiClient.get(`/users/${username}/todos`)
export const retrieveTodoApi = (username, id) => apiClient.get(`/users/${username}/todos/${id}`)
export const deleteTodoApi = (username, id) => apiClient.delete(`/users/${username}/todos/${id}`)
export const updateTodoApi = (username, id, todo) => apiClient.put(`/users/${username}/todos/${id}`, todo)
export const createTodoApi = (username, todo) => apiClient.post(`/users/${username}/todos`)
