import { useRef, useState } from 'react'
import {
  Container, Row, Col, Card, Form, Button, Image,
} from 'react-bootstrap'
import { Formik, Field, ErrorMessage } from 'formik'
import { useTranslation } from 'react-i18next'

import getSignupSchema from '../schemas/authSchemas'
import useAuth from '../hooks/useAuth'
import handleApiError from '../utils/handleApiError'
import avatar_1 from '../assets/avatar_1.jpg'

const Signup = () => {
  const { t, i18n } = useTranslation()
  const { handleSignupSubmit } = useAuth()
  const usernameRef = useRef(null)

  const [signupError, setSignupError] = useState(null)

  return (
    <Container fluid className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <Row className="w-100 justify-content-center">
        <Col className="col-12 col-md-8 col-xxl-6">
          <div className="shadow-sm bg-white rounded border overflow-hidden">
            <div className="d-flex p-5">
              <div className="w-50 d-flex justify-content-center align-items-center">
                <Image
                  src={avatar_1}
                  alt={t('logoAlt')}
                  width={200}
                  height={200}
                  roundedCircle
                />
              </div>
              <Card className="border-0 w-50">
                <Card.Body className="p-0 ps-4">
                  <Card.Title className="mt-3 mb-4 text-center fs-1">
                    {t('register')}
                  </Card.Title>

                  <Formik
                    key={i18n.language}
                    initialValues={{
                      username: '',
                      password: '',
                      confirmPassword: '',
                    }}
                    validationSchema={getSignupSchema(t)}

                    onSubmit={async (values, { setSubmitting, setFieldError, setTouched }) => {
                      setSignupError(null)
                      await setTouched({
                        username: true,
                        password: true,
                        confirmPassword: true,
                      })

                      try {
                        await handleSignupSubmit(
                          values,
                          {
                            setSubmitting,
                            setSignupError,
                            setFieldError: (field, message) => {
                              setFieldError(field, message)
                              if (field === 'username') {
                                usernameRef.current.focus()
                              }
                            },
                          },
                          t,
                        )
                      }
                      catch (error) {
                        const errorKey = handleApiError(error, t)
                        setSignupError(t(errorKey))
                      }
                    }}
                  >
                    {({
                      handleSubmit,
                      isSubmitting,
                      errors,
                      touched,
                      values,
                      handleChange,
                      handleBlur,
                    }) => (
                      <Form noValidate onSubmit={handleSubmit}>

                        <Form.Floating className="mb-3">
                          <Form.Control
                            name="username"
                            id="username"
                            placeholder={t('usernameLabel')}
                            isInvalid={touched.username && !!errors.username}
                            autoComplete="username"
                            ref={usernameRef}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.username}
                          />
                          <label htmlFor="username">{t('usernameLabel')}</label>
                          {touched.username && errors.username && (
                            <Form.Control.Feedback type="invalid" tooltip>
                              {errors.username}
                            </Form.Control.Feedback>
                          )}
                        </Form.Floating>

                        <Form.Floating className="mb-3">
                          <Field
                            as={Form.Control}
                            name="password"
                            type="password"
                            id="password"
                            placeholder={t('password')}
                            isInvalid={touched.password && !!errors.password}
                            onBlur={handleBlur}
                            autoComplete="new-password"
                          />
                          <label htmlFor="password">{t('password')}</label>
                          {touched.password && (
                            <ErrorMessage name="password" component={Form.Control.Feedback} type="invalid" tooltip />
                          )}
                        </Form.Floating>

                        <Form.Floating className="mb-3">
                          <Field
                            as={Form.Control}
                            name="confirmPassword"
                            type="password"
                            id="confirmPassword"
                            placeholder={t('confirmPassword')}
                            isInvalid={touched.confirmPassword && !!errors.confirmPassword}
                            onBlur={handleBlur}
                            autoComplete="new-password"
                          />
                          <label htmlFor="confirmPassword">{t('confirmPassword')}</label>
                          {touched.confirmPassword && (
                            <ErrorMessage name="confirmPassword" component={Form.Control.Feedback} type="invalid" tooltip />
                          )}
                        </Form.Floating>

                        {signupError && (
                          <div className="text-danger mb-3">
                            {signupError}
                          </div>
                        )}
                        <Button
                          type="submit"
                          variant="primary"
                          className="w-100 mb-3"
                          disabled={isSubmitting}
                        >
                          {t('signupButton')}
                        </Button>
                      </Form>
                    )}
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
