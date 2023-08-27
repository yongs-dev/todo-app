import {Link, useParams} from "react-router-dom";
import {useState} from "react";
import {retrieveHelloWorld, retrieveHelloWorldBean, retrieveHelloWorldPathVariable} from "./api/HelloWorldApiService";
import {useAuth} from "./security/AuthContext";

function WelcomeComponent() {
    const {username} = useParams()
    const [message, setMessage] = useState()
    const authContext = useAuth();

    function callHelloWorldRestApi() {
        // retrieveHelloWorld()
        // retrieveHelloWorldBean()
        retrieveHelloWorldPathVariable(username, authContext.token)
            .then((response) => successfulResponse(response))
            .catch((error) => errorResponse(error))
            .finally(() => console.log('cleanUp'))
    }

    function successfulResponse(response) {
        setMessage(response.data.message || response.data)
    }

    function errorResponse(error) {
        console.log(error)
    }

    return (
        <div className='WelcomeComponent'>
            <h1>Welcome {username}</h1>
            <div>
                Manage Your todos - <Link to='/todos'>Go here</Link>
            </div>
            <div>
                <button className='btn btn-success' onClick={callHelloWorldRestApi}>Call Hello World</button>
            </div>
            <div className='text-info'>{message}</div>
        </div>
    )
}

export default WelcomeComponent