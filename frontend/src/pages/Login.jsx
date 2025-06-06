import React, { useState, useEffect, useRef } from 'react';
import {
  Button, Card, Form, Nav, Image, Container, Row, Col,
} from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { Formik } from 'formik';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { setCredentials } from '../slices/authSlice.js';

const Login = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [authError, setAuthError] = useState(false);
  const usernameInputRef = useRef(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      navigate('/');
    }
  }, [navigate]);

  useEffect(() => {
    if (usernameInputRef.current) {
      usernameInputRef.current.focus();
    }
  }, []);

  const initialValues = {
    username: '',
    password: '',
  };

  const handleOnSubmit = async (values, { setSubmitting }) => {
    const { username, password } = values;
    setAuthError(false);

    if (!username.trim() || !password.trim()) {
      setSubmitting(false);
      return;
    }

    try {
      const response = await axios.post('/api/v1/login', values);
      const { token } = response.data;
      localStorage.setItem('token', token);
      dispatch(setCredentials({ token, username }));
      navigate('/');
    } catch (err) {
      setAuthError(true);
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
                <Card.Body className="p-0 ps-4">
                  <Card.Title className="mt-3 mb-4 text-center fs-1">{t('login')}</Card.Title>
                  <Formik initialValues={initialValues} onSubmit={handleOnSubmit}>
                    {({
                      handleSubmit,
                      handleChange,
                      values,
                      isSubmitting,
                    }) => {
                      const bothFieldsFilled = values.username.trim() && values.password.trim();

                      return (
                        <Form noValidate onSubmit={handleSubmit}>
                          <div className="mb-3 position-relative">
                            <label htmlFor="username" className="form-label visually-hidden">{t('username')}</label>
                            <div className="input-group has-validation">
                              <Form.Control
                                type="text"
                                id="username"
                                name="username"
                                placeholder={t('username')}
                                ref={usernameInputRef}
                                value={values.username}
                                onChange={handleChange}
                                autoComplete="username"
                              />
                            </div>
                          </div>

                          <div className="mb-3 position-relative">
                            <label htmlFor="password" className="form-label visually-hidden">{t('password')}</label>
                            <div className="input-group has-validation">
                              <Form.Control
                                type="password"
                                id="password"
                                name="password"
                                placeholder={t('password')}
                                value={values.password}
                                onChange={handleChange}
                                autoComplete="current-password"
                                isInvalid={authError && bothFieldsFilled}
                              />
                              <div className="invalid-tooltip">
                                {t('errors.loginFailed')}
                              </div>
                            </div>
                          </div>

                          <Button
                            variant="outline-primary"
                            type="submit"
                            className="w-100"
                            disabled={isSubmitting}
                          >
                            {t('login')}
                          </Button>
                        </Form>
                      );
                    }}
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
