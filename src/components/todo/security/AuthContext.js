import {createContext, useContext, useState} from "react";

// 1. create a Context
export const AuthContext = createContext(undefined);

export const useAuth = () => useContext(AuthContext);

// 2. Share the created context with other components
export default function AuthProvider({children}) {

    // 3. Put some state in the context
    const [isAuthenticated, setAuthenticated] = useState(false)
    const [username, setUsername] = useState(null)

    function login(username, password) {
        if (username === 'Ethan' && password === '123123') {
            setAuthenticated(true)
            setUsername(username)
            return true
        } else {
            setAuthenticated(false)
            setUsername(null)
            return false
        }
    }

    function logout() {
        setAuthenticated(false)
    }

    return (
        <AuthContext.Provider value={ {isAuthenticated, login, logout, username} }>
            {children}
        </AuthContext.Provider>
    )
}