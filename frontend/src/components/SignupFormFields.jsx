// import { Form } from 'react-bootstrap'
// import { Field, ErrorMessage } from 'formik'
//
// const SignupFormFields = ({
//   t,
//   values,
//   errors,
//   touched,
//   handleChange,
//   handleBlur,
//   usernameRef,
//   setFieldTouched,
//   passwordTouchedManually,
//   confirmPasswordTouchedManually,
//   setPasswordTouchedManually,
//   setConfirmPasswordTouchedManually,
// }) => (
//   <>
//
//     {/* <Form.Floating className="mb-3"> */}
//     {/*  <Field */}
//     {/*    innerRef={usernameRef} */}
//     {/*    as={Form.Control} */}
//     {/*    name="username" */}
//     {/*    id="username" */}
//     {/*    placeholder={t('usernameLabel')} */}
//     {/*    isInvalid={!!errors.username} */}
//     {/*    autoComplete="username" */}
//     {/*  /> */}
//     {/*  <label htmlFor="username">{t('usernameLabel')}</label> */}
//     {/*  <ErrorMessage name="username" component={Form.Control.Feedback} type="invalid" tooltip /> */}
//     {/* </Form.Floating> */}
//     <Form.Floating className="mb-3">
//       <Form.Control
//         name="username"
//         id="username"
//         placeholder={t('usernameLabel')}
//         isInvalid={!!errors.username}
//         autoComplete="username"
//         ref={usernameRef}
//         onChange={handleChange}
//         onBlur={handleBlur}
//         value={values.username}
//       />
//       <label htmlFor="username">{t('usernameLabel')}</label>
//       {errors.username && touched.username && (
//         <Form.Control.Feedback type="invalid" tooltip>{errors.username}</Form.Control.Feedback>
//       )}
//     </Form.Floating>
//
//     <Form.Floating className="mb-3">
//       <Field
//         as={Form.Control}
//         name="password"
//         type="password"
//         id="password"
//         placeholder={t('password')}
//         isInvalid={passwordTouchedManually && !!errors.password}
//         onBlur={() => {
//           setFieldTouched('password', true)
//           setPasswordTouchedManually(true)
//         }}
//         autoComplete="new-password"
//       />
//       <label htmlFor="password">{t('password')}</label>
//       <ErrorMessage name="password" component={Form.Control.Feedback} type="invalid" tooltip />
//     </Form.Floating>
//
//     <Form.Floating className="mb-3">
//       <Field
//         as={Form.Control}
//         name="confirmPassword"
//         type="password"
//         id="confirmPassword"
//         placeholder={t('confirmPassword')}
//         isInvalid={confirmPasswordTouchedManually && !!errors.confirmPassword}
//         onBlur={() => {
//           setFieldTouched('confirmPassword', true)
//           setConfirmPasswordTouchedManually(true)
//         }}
//         autoComplete="new-password"
//       />
//       <label htmlFor="confirmPassword">{t('confirmPassword')}</label>
//       <ErrorMessage name="confirmPassword" component={Form.Control.Feedback} type="invalid" tooltip />
//     </Form.Floating>
//   </>
// )
//
// export default SignupFormFields
import { Form } from 'react-bootstrap'
import { Field, ErrorMessage } from 'formik'

const SignupFormFields = ({
  t,
  values,
  errors,
  handleChange,
  handleBlur,
  usernameRef,
  setFieldTouched,
  passwordTouchedManually,
  confirmPasswordTouchedManually,
  setPasswordTouchedManually,
  setConfirmPasswordTouchedManually,
  submittedOnce,
}) => (
  <>
    <Form.Floating className="mb-3">
      <Form.Control
        name="username"
        id="username"
        placeholder={t('usernameLabel')}
        isInvalid={submittedOnce && !!errors.username}
        autoComplete="username"
        ref={usernameRef}
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.username}
      />
      <label htmlFor="username">{t('usernameLabel')}</label>
      {submittedOnce && errors.username && (
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
        isInvalid={(submittedOnce || passwordTouchedManually) && !!errors.password}
        onBlur={() => {
          setFieldTouched('password', true)
          setPasswordTouchedManually(true)
        }}
        autoComplete="new-password"
      />
      <label htmlFor="password">{t('password')}</label>
      {(submittedOnce || passwordTouchedManually) && (
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
        isInvalid={(submittedOnce || confirmPasswordTouchedManually) && !!errors.confirmPassword}
        onBlur={() => {
          setFieldTouched('confirmPassword', true)
          setConfirmPasswordTouchedManually(true)
        }}
        autoComplete="new-password"
      />
      <label htmlFor="confirmPassword">{t('confirmPassword')}</label>
      {(submittedOnce || confirmPasswordTouchedManually) && (
        <ErrorMessage name="confirmPassword" component={Form.Control.Feedback} type="invalid" tooltip />
      )}
    </Form.Floating>
  </>
)

export default SignupFormFields
