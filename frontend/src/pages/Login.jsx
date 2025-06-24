import { useRef, useEffect } from 'react'
import {
  // Button, Card, Form, Nav, Image, Container, Row, Col,
  Button, Card, Form, Image, Container, Row, Col,

} from 'react-bootstrap'
import { useFormik } from 'formik'
import { useTranslation } from 'react-i18next'
// import { Link, useNavigate } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

import getLoginSchema from '../schemas/loginSchema'
import useAuth from '../hooks/useAuth'
import { APP_ROUTES } from '../constants/routes'

const Login = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { login, isAuthenticated, handleLoginSubmit } = useAuth()
  const usernameInputRef = useRef(null)

  useEffect(() => {
    if (isAuthenticated) {
      navigate(APP_ROUTES.HOME)
    }
  }, [isAuthenticated, navigate])

  useEffect(() => {
    usernameInputRef.current?.focus()
  }, [])

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: getLoginSchema(t),
    onSubmit: async (values, formikHelpers) => {
      const { setTouched, validateForm } = formikHelpers

      await setTouched({ username: true, password: true })

      const errors = await validateForm()

      if (Object.keys(errors).length > 0) {
        return
      }

      await handleLoginSubmit(login, t)(values, formikHelpers)
    },
  })

  return (
    <Container fluid className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <Row className="w-100 justify-content-center">
        <Col className="col-12 col-md-8 col-xxl-6">
          <div className="d-flex flex-column align-items-stretch shadow-sm bg-white rounded overflow-hidden border">
            <div className="d-flex flex-row p-5">
              <div className="d-flex justify-content-center align-items-center w-50">
                <Image
                  src="/avatar.jpg"
                  alt={t('logoAlt')}
                  width={200}
                  height={200}
                  roundedCircle
                />
              </div>
              <Card className="border-0 w-50">
                <Card.Body className="p-0 ps-4">
                  <Card.Title className="mt-3 mb-4 text-center fs-1">{t('login')}</Card.Title>
                  <Form noValidate onSubmit={formik.handleSubmit}>
                    <Form.Group className="mb-3" controlId="username">
                      <Form.Control
                        type="text"
                        name="username"
                        placeholder={t('username')}
                        ref={usernameInputRef}
                        value={formik.values.username}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        isInvalid={formik.touched.username && !!formik.errors.username}
                        autoComplete="username"
                        autoFocus
                      />
                      <Form.Control.Feedback type="invalid">
                        {formik.errors.username}
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="password">
                      <Form.Control
                        type="password"
                        name="password"
                        placeholder={t('password')}
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        isInvalid={formik.touched.password && !!formik.errors.password}
                        autoComplete="current-password"
                      />
                      <Form.Control.Feedback type="invalid">
                        {formik.errors.password}
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Button
                      variant="primary"
                      type="submit"
                      className="w-100 mb-3"
                      disabled={formik.isSubmitting}
                    >
                      {t('login')}
                    </Button>
                  </Form>
                </Card.Body>
              </Card>
            </div>

            {/* <div className="bg-light text-center py-4 w-100 border-top"> */}
            {/*  {t('noAccount')} */}
            {/*  {' '} */}
            {/*  <Nav.Link */}
            {/*    as={Link} */}
            {/*    to="/signup" */}
            {/*    className="d-inline p-0 text-primary text-decoration-underline" */}
            {/*  > */}
            {/*    {t('register')} */}
            {/*  </Nav.Link> */}
            {/* </div> */}
            <div className="bg-light text-center py-4 w-100 border-top">
              {t('noAccount')}
              {' '}
              <a
                href="/signup"
                className="d-inline p-0 text-primary text-decoration-underline nav-link"
              >
                {t('register')}
              </a>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  )
}

export default Login
