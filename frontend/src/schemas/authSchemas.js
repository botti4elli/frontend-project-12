import * as yup from 'yup'
const getSignupSchema = t => yup.object().shape({
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
})
export default getSignupSchema
