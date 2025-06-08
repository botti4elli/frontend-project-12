import { useRef, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { setCredentials } from '../slices/authSlice.js'
import axios from 'axios'

const useSignupLogic = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { isAuthenticated } = useSelector(state => state.auth)
  const usernameRef = useRef(null)

  const [signupError, setSignupError] = useState(null)
  const [submittedOnce, setSubmittedOnce] = useState(false)
  const [passwordTouchedManually, setPasswordTouchedManually] = useState(false)
  const [confirmPasswordTouchedManually, setConfirmPasswordTouchedManually] = useState(false)

  useEffect(() => {
    if (isAuthenticated) navigate('/')
  }, [isAuthenticated, navigate])

  useEffect(() => {
    usernameRef.current?.focus()
  }, [])

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      const { data } = await axios.post('/api/v1/signup', values)
      localStorage.setItem('token', data.token)
      dispatch(setCredentials({ token: data.token, username: values.username }))
      navigate('/')
    }
    catch (err) {
      if (err.response?.status === 409) {
        setErrors({ username: t('errors.userExists') })
      }
      else {
        setSignupError(t('errors.signupFailed'))
      }
      setSubmitting(false)
    }
  }

  return {
    t,
    usernameRef,
    signupError,
    submittedOnce,
    passwordTouchedManually,
    confirmPasswordTouchedManually,
    setSubmittedOnce,
    setPasswordTouchedManually,
    setConfirmPasswordTouchedManually,
    handleSubmit,
  }
}

export default useSignupLogic
