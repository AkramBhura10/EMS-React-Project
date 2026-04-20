import React, { createContext, useEffect, useState } from 'react'
import { getLocalStorage, setLocalStorage } from '../utils/localStorage'

export const AuthContext = createContext()

const AuthProvider = ({ children }) => {

    const [userData, setUserData] = useState([])

    useEffect(() => {
        // 🔥 Only initialize ONCE if empty
        const existing = localStorage.getItem('employees')

        if (!existing) {
            setLocalStorage()
        }

        const { employees } = getLocalStorage()
        setUserData(employees)

    }, [])

    return (
        <AuthContext.Provider value={[userData, setUserData]}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider