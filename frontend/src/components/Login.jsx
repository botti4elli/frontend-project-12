import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { Formik } from 'formik';
import axios from 'axios';
import * as Yup from 'yup';
import { setLocale } from 'yup';
import {
  Button, Card, Form, Nav, Image, Container, Row, Col,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { setCredentials } from '../slices/authSlice';

const Login = () => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [authError, setAuthError] = useState(null);
  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  // Установка локализованных сообщений yup
  useEffect(() => {
    setLocale({
      mixed: {
        required: t('errors.required'),
      },
      string: {
        min: () => t('errors.usernameLength'),
        max: () => t('errors.usernameLength'),
      },
    });
  }, [i18n.language, t]);

  const initialUserValues = {
    username: '',
    password: '',
  };

  const loginSchema = Yup.object().shape({
    username: Yup.string()
      .required()
      .min(3)
      .max(20),
    password: Yup.string()
      .required()
      .min(5, t('errors.passwordLength')),
  });

  const handleOnSubmit = async (values, { setSubmitting }) => {
    setAuthError(null);
    try {
      const response = await axios.post('/api/v1/login', values);
      const { token } = response.data;
      localStorage.setItem('token', token);
      dispatch(setCredentials({ token, username: values.username }));
      navigate('/');
    } catch (err) {
      setAuthError(t('errors.loginFailed'));
      setSubmitting(false);
    }
  };

  return (
    <Container fluid className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <Row className="w-100 justify-content-center">
        <Col className="col-12 col-md-8 col-xxl-6">
          <div className="d-flex flex-column align-items-stretch shadow-sm bg-white rounded overflow-hidden border">
            <div className="d-flex flex-row p-5">
              <div className="d-flex justify-content-center align-items-center w-50">
                <Image
                  src="/avatar.jpg"
                  alt="Логотип"
                  width={200}
                  height={200}
                  roundedCircle
                />
              </div>
              <Card className="border-0 w-50">
                <Card.Body className="p-0">
                  <Card.Title className="mt-2 mb-3 text-center fs-1">{t('login')}</Card.Title>
                  <Formik
                    initialValues={initialUserValues}
                    validationSchema={loginSchema}
                    onSubmit={handleOnSubmit}
                  >
                    {({
                      handleSubmit,
                      handleChange,
                      values,
                      isSubmitting,
                      errors,
                      touched,
                    }) => (
                      <Form noValidate onSubmit={handleSubmit}>
                        <Form.Floating className="mb-3">
                          <Form.Control
                            type="text"
                            id="username"
                            name="username"
                            placeholder={t('username')}
                            value={values.username}
                            onChange={handleChange}
                            isInvalid={(touched.username && !!errors.username) || !!authError}
                          />
                          <label htmlFor="username">{t('username')}</label>
                          <Form.Control.Feedback type="invalid">
                            {(touched.username && errors.username) ? errors.username : authError}
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
                            isInvalid={(touched.password && !!errors.password) || !!authError}
                          />
                          <label htmlFor="password">{t('password')}</label>
                          <Form.Control.Feedback type="invalid">
                            {(touched.password && errors.password) ? errors.password : authError}
                          </Form.Control.Feedback>
                        </Form.Floating>

                        <Button variant="outline-primary" type="submit" className="w-100" disabled={isSubmitting}>
                          {t('login')}
                        </Button>
                      </Form>
                    )}
                  </Formik>
                </Card.Body>
              </Card>
            </div>

            <div className="bg-light text-center py-4 w-100 border-top">
              {t('noAccount')}
              {' '}
              <Nav.Link
                as={Link}
                to="/signup"
                className="d-inline p-0 text-primary text-decoration-underline"
              >
                {t('register')}
              </Nav.Link>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
