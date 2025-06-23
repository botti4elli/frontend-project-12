import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {
  setCredentials,
  logout as logoutAction,
  selectCurrentUser,
} from '../slices/authSlice'
import { APP_ROUTES } from '../constants/routes'
import handleApiError from '../utils/handleApiError'
import { useLoginMutation, useSignupMutation } from '../services/chatApi'

const useAuth = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector(selectCurrentUser)

  const [loginMutation] = useLoginMutation()
  const [signupMutation] = useSignupMutation()

  const handleAuthSuccess = useCallback(({ token, username }) => {
    dispatch(setCredentials({ token, username }))
    navigate(APP_ROUTES.HOME)
    return { success: true }
  }, [dispatch, navigate])

  const login = useCallback(async (credentials) => {
    try {
      const authData = await loginMutation(credentials).unwrap()
      return handleAuthSuccess(authData)
    }
    catch (error) {
      console.error('Login error:', error)
      throw error
    }
  }, [loginMutation, handleAuthSuccess])

  const signup = useCallback(async (userData) => {
    try {
      const authData = await signupMutation(userData).unwrap()
      return handleAuthSuccess(authData)
    }
    catch (error) {
      console.error('Signup error:', error)
      throw error
    }
  }, [signupMutation, handleAuthSuccess])
  const handleSignupSubmit = useCallback(
    async (values, { setSubmitting, setSignupError, setFieldError }, t) => {
      try {
        setSignupError(null)
        const authData = await signupMutation(values).unwrap()
        handleAuthSuccess(authData)
      }
      catch (error) {
        const errorKey = handleApiError(error, t)

        if (errorKey === 'errors.userExists') {
          setFieldError('username', t(errorKey))
        }
        else {
          setSignupError(t(errorKey))
        }
      }
      finally {
        setSubmitting(false)
      }
    },
    [signupMutation, handleAuthSuccess],
  )
  const handleLoginSubmit = (loginFn, t) => async (values, { setSubmitting, setFieldError }) => {
    try {
      await loginFn(values)
    }
    catch (error) {
      const message = handleApiError(error, t, 'errors.loginFailed')
      setFieldError('password', t(message))
    }
    finally {
      setSubmitting(false)
    }
  }

  const logout = useCallback(() => {
    dispatch(logoutAction())
    navigate(APP_ROUTES.LOGIN)
  }, [dispatch, navigate])

  return {
    user,
    login,
    logout,
    signup,
    handleSignupSubmit,
    handleLoginSubmit,
    isAuthenticated: !!user?.token,
  }
}

export default useAuth
