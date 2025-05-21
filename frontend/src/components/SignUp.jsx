import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Container, Row, Col, Card, Form, Button, Image,
} from 'react-bootstrap';
import { Formik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { setCredentials } from '../slices/authSlice';

const Signup = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [signupError, setSignupError] = useState(null);
  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const initialValues = {
    username: '',
    password: '',
    confirmPassword: '',
  };

  const validationSchema = yup.object().shape({
    username: yup
      .string()
      .min(3, t('errors.usernameLength'))
      .max(20, t('errors.usernameLength'))
      .required(t('errors.required')),
    password: yup
      .string()
      .min(6, t('errors.passwordLength'))
      .required(t('errors.required')),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password'), null], t('errors.passwordsMustMatch'))
      .required(t('errors.required')),
  });

  const handleFormSubmit = async (values, { setSubmitting }) => {
    setSignupError(null);
    try {
      const response = await axios.post('/api/v1/signup', {
        username: values.username,
        password: values.password,
      });
      const { token } = response.data;
      localStorage.setItem('token', token);
      dispatch(setCredentials({ token, username: values.username }));
      navigate('/');
    } catch (err) {
      if (err.response?.status === 409) {
        setSignupError(t('errors.userExists'));
      } else {
        setSignupError(t('errors.signupFailed'));
      }
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
                  src="/avatar_1.jpg"
                  alt="Логотип"
                  width={200}
                  height={200}
                  roundedCircle
                />
              </div>

              <Card className="border-0 w-50">
                <Card.Body className="p-0 ps-4">
                  <Card.Title className="mt-3 mb-4 text-center fs-1">{t('signup')}</Card.Title>

                  <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleFormSubmit}
                  >
                    {({
                      handleSubmit, handleChange, handleBlur, values, touched, errors, isSubmitting,
                    }) => (
                      <Form noValidate onSubmit={handleSubmit} className="position-relative">
                        <Form.Floating className="mb-3">
                          <Form.Control
                            type="text"
                            id="username"
                            name="username"
                            placeholder={t('username')}
                            value={values.username}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isInvalid={touched.username && !!errors.username}
                          />
                          <label htmlFor="username">{t('username')}</label>
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
                            onBlur={handleBlur}
                            isInvalid={touched.password && !!errors.password}
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
                            onBlur={handleBlur}
                            isInvalid={touched.confirmPassword && !!errors.confirmPassword}
                          />
                          <label htmlFor="confirmPassword">{t('confirmPassword')}</label>
                          <Form.Control.Feedback type="invalid" tooltip>
                            {errors.confirmPassword}
                          </Form.Control.Feedback>
                        </Form.Floating>

                        {signupError && (
                        <div className="text-danger mb-3">{signupError}</div>
                        )}

                        <Button variant="outline-primary" type="submit" className="w-100" disabled={isSubmitting}>
                          {t('register')}
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
  );
};

export default Signup;
