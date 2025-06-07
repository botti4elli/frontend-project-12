import * as yup from 'yup'
export const getAddChannelSchema = (t, existingNames) => yup.object().shape({
  name: yup
    .string()
    .trim()
    .required(t('modals.required'))
    .min(3, t('modals.minLength'))
    .max(20, t('modals.maxLength'))
    .notOneOf(existingNames, t('modals.mustBeUnique')),
})
export const getRenameChannelSchema = (t, otherNames) => yup.object().shape({
  name: yup
    .string()
    .required(t('modals.required'))
    .min(3, t('modals.minLength'))
    .max(20, t('modals.maxLength'))
    .notOneOf(otherNames, t('modals.mustBeUnique')),
})
