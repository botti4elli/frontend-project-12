import { lazy } from 'react'
import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectUsername, selectIsAuthChecked } from './slices/authSlice.js'

const ChatPage = lazy(() => import('./pages/ChatPage.jsx'))
const Login = lazy(() => import('./pages/Login.jsx'))
const Signup = lazy(() => import('./pages/SignUp.jsx'))
const NotFound = lazy(() => import('./pages/notFound.jsx'))

const PrivateRoute = ({ children }) => {
  const username = useSelector(selectUsername)
  const isAuthChecked = useSelector(selectIsAuthChecked)

  if (!isAuthChecked) {
    return null
  }

  return username ? children : <Navigate to="/login" replace />
}

export default [
  {
    path: '/',
    element: (
      <PrivateRoute>
        <ChatPage />
      </PrivateRoute>
    ),
  },
  { path: '/login', element: <Login /> },
  { path: '/signup', element: <Signup /> },
  { path: '*', element: <NotFound /> },
]
