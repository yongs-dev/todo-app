import {createContext, useContext, useState} from "react";
import {executeBasicAuthenticationService} from "../api/HelloWorldApiService";
import {apiClient} from "../api/ApiClient";

// 1. create a Context
export const AuthContext = createContext(undefined);

export const useAuth = () => useContext(AuthContext);

// 2. Share the created context with other components
export default function AuthProvider({children}) {

    // 3. Put some state in the context
    const [isAuthenticated, setAuthenticated] = useState(false)
    const [username, setUsername] = useState(null)
    const [token, setToken] = useState(null)


    async function login(username, password) {
        const basicAuthenticationToken = 'Basic ' + window.btoa(username + ':' + password);
        try {
            const response = await executeBasicAuthenticationService(basicAuthenticationToken);

            if (response.status === 200) {
                setAuthenticated(true)
                setUsername(username)
                setToken(basicAuthenticationToken)

                // Intercepting and adding a token
                apiClient.interceptors.request.use(
                    (config) => {
                        config.headers.Authorization = basicAuthenticationToken
                        return config
                    }
                )

                return true
            } else {
                logout()
                return false
            }
        } catch (erorr) {
            logout()
            return false
        }
    }

    function logout() {
        setAuthenticated(false)
        setUsername(null)
        setToken(null)
    }

    return (
        <AuthContext.Provider value={ {isAuthenticated, login, logout, username, token} }>
            {children}
        </AuthContext.Provider>
    )
}