import React, { useContext, useEffect, useState } from 'react'
import Login from './components/Auth/Login'
import EmployeeDashboard from './components/Dashboard/EmployeeDashboard'
import AdminDashboard from './components/Dashboard/AdminDashboard'
import { AuthContext } from './context/AuthProvider'

const App = () => {

  const [user, setUser] = useState(null)
  const [loggedInUserData, setLoggedInUserData] = useState(null)
  const [userData] = useContext(AuthContext)

  // 🔥 Check already logged in user
  useEffect(() => {
    const loggedInUser = localStorage.getItem('loggedInUser')

    if (loggedInUser) {
      const parsed = JSON.parse(loggedInUser)
      setUser(parsed.role)
      setLoggedInUserData(parsed.data)
    }
  }, [])

  // 🔥 IMPORTANT FIX: sync with context updates
  useEffect(() => {
    if (user === 'employee' && userData && loggedInUserData) {
      const updatedUser = userData.find(
        (e) => e.id === loggedInUserData.id
      )
      setLoggedInUserData(updatedUser)
    }
  }, [userData])

  // 🔥 LOGIN FUNCTION
  const handleLogin = (email, password) => {

    if (email === 'admin@example.com' && password === '123') {
      setUser('admin')
      localStorage.setItem('loggedInUser', JSON.stringify({ role: 'admin' }))
      return
    }

    if (userData) {
      const employee = userData.find(
        (e) => e.email === email && e.password === password
      )

      if (employee) {
        setUser('employee')
        setLoggedInUserData(employee)
        localStorage.setItem(
          'loggedInUser',
          JSON.stringify({ role: 'employee', data: employee })
        )
      } else {
        alert("Invalid Credentials")
      }
    }
  }

  return (
    <>
      {!user && <Login handleLogin={handleLogin} />}

      {user === 'admin' && <AdminDashboard changeUser={setUser} />}

      {user === 'employee' && loggedInUserData && (
        <EmployeeDashboard
          changeUser={setUser}
          data={loggedInUserData}
        />
      )}
    </>
  )
}

export default App