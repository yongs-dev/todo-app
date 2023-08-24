import {useEffect, useState} from "react";
import {deleteTodoApi, retrieveTodosForUsernameApi} from "./api/TodoApiService";
import {useAuth} from "./security/AuthContext";
import {useNavigate} from "react-router-dom";

function ListTodosComponent() {
    const authContext = useAuth()
    const username = authContext.username

    const navigate = useNavigate()

    const [todos, setTodos] = useState([])
    const [message, setMessage] = useState(null)

    function refreshTodos() {
        retrieveTodosForUsernameApi(username)
            .then(response => setTodos(response.data))
            .catch(error => console.log(error))
    }

    useEffect (() => refreshTodos, [])

    function deleteTodo(id) {
        deleteTodoApi(username, id)
            .then(
                () => {
                    setMessage(`Delete of todo with id = ${id} successful`)
                    refreshTodos()
                }
            )
            .catch(error => console.log(error))
    }

    function updateTodo(id) {
        navigate(`/todo/${id}`)
    }

    return (
        <div className='container'>
            <h1>Things You Want To Do!</h1>
            {message && <div className='alert alert-warning'>{message}</div>}
            <div>
                <table className='table'>
                    <thead>
                    <tr>
                        <th>Description</th>
                        <th>Is Done?</th>
                        <th>Target Date</th>
                        <th>Delete</th>
                        <th>Update</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        todos.map(
                            todo => (
                                <tr key={todo.id}>
                                    <td>{todo.description}</td>
                                    <td>{todo.done}</td>
                                    <td>{todo.targetDate}</td>
                                    <td><button className='btn btn-warning' onClick={() => deleteTodo(todo.id)}>Delete</button></td>
                                    <td><button className='btn btn-success' onClick={() => updateTodo(todo.id)}>Update</button></td>
                                </tr>
                            )
                        )
                    }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ListTodosComponent