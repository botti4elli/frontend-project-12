import { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {
  Container, Row, Col, Card, Form, Button, Image,
} from 'react-bootstrap'
import { Formik } from 'formik'
import axios from 'axios'
import { useTranslation } from 'react-i18next'
import getSignupSchema from '../schemas/authSchemas.js'
import { setCredentials } from '../slices/authSlice.js'

const Signup = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { isAuthenticated } = useSelector((state) => state.auth)

  const [signupError, setSignupError] = useState(null)
  const [submittedOnce, setSubmittedOnce] = useState(false)
  const [passwordTouchedManually, setPasswordTouchedManually] = useState(false)
  const [confirmPasswordTouchedManually, setConfirmPasswordTouchedManually] = useState(false)

  const [usernameActivated, setUsernameActivated] = useState(false)
  const usernameInputRef = useRef(null)

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/')
    }
  }, [isAuthenticated, navigate])

  useEffect(() => {
    if (usernameInputRef.current) {
      usernameInputRef.current.focus()
    }
  }, [])

  const initialValues = {
    username: '',
    password: '',
    confirmPassword: '',
  }

  const validationSchema = getSignupSchema(t)

  const handleFormSubmit = async (values, { setSubmitting, validateForm }) => {
    setSignupError(null)
    setSubmittedOnce(true)

    const errors = await validateForm()

    if (Object.keys(errors).length > 0) {
      if (errors.username && usernameInputRef.current) {
        setUsernameActivated(true)
        usernameInputRef.current.focus()
        setTimeout(() => setUsernameActivated(false), 300)
      }
      setSubmitting(false)
      return
    }

    try {
      const response = await axios.post('/api/v1/signup', {
        username: values.username,
        password: values.password,
      })
      const { token } = response.data
      localStorage.setItem('token', token)
      dispatch(setCredentials({ token, username: values.username }))
      navigate('/')
    } catch (err) {
      if (err.response?.status === 409) {
        setSignupError(t('errors.userExists'))
      } else {
        setSignupError(t('errors.signupFailed'))
      }
      setSubmitting(false)
    }
  }

  return (
    <Container fluid className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <Row className="w-100 justify-content-center">
        <Col className="col-12 col-md-8 col-xxl-6">
          <div className="d-flex flex-column align-items-stretch shadow-sm bg-white rounded overflow-hidden border">
            <div className="d-flex flex-row p-5">
              <div className="d-flex justify-content-center align-items-center w-50">
                <Image
                  src="/avatar_1.jpg"
                  alt="Аватар"
                  width={200}
                  height={200}
                  roundedCircle
                />
              </div>

              <Card className="border-0 w-50">
                <Card.Body className="p-0 ps-4">
                  <Card.Title className="mt-3 mb-4 text-center fs-1">{t('register')}</Card.Title>

                  <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleFormSubmit}
                  >
                    {({
                      handleSubmit,
                      handleChange,
                      handleBlur,
                      values,
                      touched,
                      errors,
                      isSubmitting,
                      setFieldTouched,
                      // validateForm,
                    }) => {
                      const showUsernameError = (
                        submittedOnce || touched.username || usernameActivated)
                            && Boolean(errors.username)

                      return (
                        <Form noValidate onSubmit={handleSubmit}>
                          <Form.Floating className="mb-3">
                            <Form.Control
                              type="text"
                              id="username"
                              name="username"
                              placeholder={t('usernameLabel')}
                              ref={usernameInputRef}
                              value={values.username}
                              onChange={(e) => {
                                handleChange(e)
                                if (usernameActivated) setUsernameActivated(false)
                              }}
                              onBlur={(e) => {
                                handleBlur(e)
                                 
                                void setFieldTouched('username', true, true)
                              }}
                              isInvalid={showUsernameError}
                              style={
                                      showUsernameError && usernameActivated
                                        ? {
                                          outline: '2px solid rgba(255,0,0,0.3)',
                                          outlineOffset: '2px',
                                          transition: 'outline 0.3s ease',
                                        }
                                        : undefined
                                    }
                              autoComplete="username"
                            />
                            <label htmlFor="username">{t('usernameLabel')}</label>
                            <Form.Control.Feedback type="invalid" tooltip>
                              {errors.username}
                            </Form.Control.Feedback>
                          </Form.Floating>

                          <Form.Floating className="mb-3">
                            <Form.Control
                              type="password"
                              id="password"
                              name="password"
                              placeholder={t('password')}
                              value={values.password}
                              onChange={handleChange}
                              onBlur={(e) => {
                                handleBlur(e)
                                setPasswordTouchedManually(true)
                              }}
                              isInvalid={
                                        (passwordTouchedManually || submittedOnce) && !!errors.password
                                    }
                              autoComplete="new-password"
                            />
                            <label htmlFor="password">{t('password')}</label>
                            <Form.Control.Feedback type="invalid" tooltip>
                              {errors.password}
                            </Form.Control.Feedback>
                          </Form.Floating>

                          <Form.Floating className="mb-3">
                            <Form.Control
                              type="password"
                              id="confirmPassword"
                              name="confirmPassword"
                              placeholder={t('confirmPassword')}
                              value={values.confirmPassword}
                              onChange={handleChange}
                              onBlur={(e) => {
                                handleBlur(e)
                                setConfirmPasswordTouchedManually(true)
                              }}
                              isInvalid={
                                    (confirmPasswordTouchedManually || submittedOnce)
                                    && !!errors.confirmPassword
                                }
                              autoComplete="new-password"
                            />
                            <label htmlFor="confirmPassword">{t('confirmPassword')}</label>
                            <Form.Control.Feedback type="invalid" tooltip>
                              {errors.confirmPassword}
                            </Form.Control.Feedback>
                          </Form.Floating>

                          {signupError && <div className="text-danger mb-3">{signupError}</div>}

                          <Button
                            variant="outline-primary"
                            type="submit"
                            className="w-100"
                            disabled={isSubmitting}
                          >
                            {t('signupButton')}
                          </Button>
                        </Form>
                      )
                    }}
                  </Formik>
                </Card.Body>
              </Card>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  )
}

export default Signup
