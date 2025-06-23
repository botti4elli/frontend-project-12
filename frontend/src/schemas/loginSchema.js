import * as yup from 'yup'

const getLoginSchema = t => yup.object().shape({
  username: yup.string()
    .required(t('errors.required')),
  password: yup.string()
    .required(t('errors.required')),
})

export default getLoginSchema
