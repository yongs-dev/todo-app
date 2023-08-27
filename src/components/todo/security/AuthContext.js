import {createContext, useContext, useState} from "react";
import {apiClient} from "../api/ApiClient";
import {executeJwtAuthenticationService} from "../api/AuthenticationApiService";

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
        try {
            const response = await executeJwtAuthenticationService(username, password);

            if (response.status === 200) {
                const jwtToken = 'Bearer ' + response.data.token
                setAuthenticated(true)
                setUsername(username)
                setToken(jwtToken)

                // Intercepting and adding a token
                apiClient.interceptors.request.use(
                    (config) => {
                        config.headers.Authorization = jwtToken
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