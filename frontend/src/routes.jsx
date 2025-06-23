import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectUsername, selectIsAuthChecked } from './slices/authSlice.js'
import ChatPage from './pages/ChatPage.jsx'
import Login from './pages/Login.jsx'
import Signup from './pages/SignUp.jsx'
import NotFound from './pages/NotFound.jsx'

/* eslint-disable react-refresh/only-export-components */
const PrivateRoute = ({ children }) => {
  const username = useSelector(selectUsername)
  const isAuthChecked = useSelector(selectIsAuthChecked)

  if (!isAuthChecked) {
    return null
  }

  return username ? children : <Navigate to="/login" replace />
}

export default [
  { path: '/', element: <PrivateRoute><ChatPage /></PrivateRoute> },
  { path: '/login', element: <Login /> },
  { path: '/signup', element: <Signup /> },
  { path: '*', element: <NotFound /> },
]
