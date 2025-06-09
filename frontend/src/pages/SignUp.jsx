import {
  Container, Row, Col, Card, Form, Button, Image,
} from 'react-bootstrap'
import { Formik } from 'formik'
import getSignupSchema from '../schemas/authSchemas.js'
import useSignupLogic from '../hooks/useSignupLogic.js'
import SignupFormFields from '../components/SignupFormFields.jsx'

const Signup = () => {
  const {
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
  } = useSignupLogic()

  return (
    <Container fluid className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <Row className="w-100 justify-content-center">
        <Col className="col-12 col-md-8 col-xxl-6">
          <div className="shadow-sm bg-white rounded border overflow-hidden">
            <div className="d-flex p-5">
              <div className="w-50 d-flex justify-content-center align-items-center">
                <Image src="/avatar_1.jpg" alt="Avatar" width={200} height={200} roundedCircle />
              </div>
              <Card className="border-0 w-50">
                <Card.Body className="p-0 ps-4">
                  <Card.Title className="mt-3 mb-4 text-center fs-1">{t('register')}</Card.Title>

                  <Formik
                    initialValues={{ username: '', password: '', confirmPassword: '' }}
                    validationSchema={getSignupSchema(t)}
                    onSubmit={handleSubmit}
                  >
                    {({
                      handleSubmit,
                      isSubmitting,
                      errors,
                      values,
                      touched,
                      handleChange,
                      handleBlur,
                      setFieldTouched,
                    }) => (
                      <Form
                        noValidate
                        onSubmit={(e) => {
                          setSubmittedOnce(true)
                          handleSubmit(e)
                        }}
                      >
                        <SignupFormFields
                          t={t}
                          values={values}
                          errors={errors}
                          touched={touched}
                          handleChange={handleChange}
                          handleBlur={handleBlur}
                          usernameRef={usernameRef}
                          setFieldTouched={setFieldTouched}
                          passwordTouchedManually={passwordTouchedManually}
                          confirmPasswordTouchedManually={confirmPasswordTouchedManually}
                          setPasswordTouchedManually={setPasswordTouchedManually}
                          setConfirmPasswordTouchedManually={setConfirmPasswordTouchedManually}
                          submittedOnce={submittedOnce}

                        />

                        {signupError && <div className="text-danger mb-3">{signupError}</div>}

                        <Button type="submit" variant="outline-primary" className="w-100" disabled={isSubmitting}>
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
