import { useEffect, useRef } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { useFormik } from 'formik'
import { toast } from 'react-toastify'
import leoProfanity from 'leo-profanity'

import {
  useRenameChannelMutation,
  useGetChannelsQuery,
} from '../services/chatApi'
import { getRenameChannelSchema } from '../schemas/channelSchemas'
import handleApiError from '../utils/handleApiError.js'

const RenameChannelModal = ({ show, channelId, onHide }) => {
  const { t } = useTranslation()
  const inputRef = useRef(null)

  const { data: channels = [] } = useGetChannelsQuery()
  const [renameChannel, { isLoading }] = useRenameChannelMutation()

  const channel = channels.find(c => c.id === channelId) || {}

  useEffect(() => {
    if (show && inputRef.current) {
      inputRef.current.focus()
      inputRef.current.select()
    }
  }, [show])

  const channelNames = channels
    .filter(c => c.id !== channelId)
    .map(c => c.name.toLowerCase())

  const validationSchema = getRenameChannelSchema(t, channelNames)

  const formik = useFormik({
    initialValues: {
      name: channel.name || '',
    },
    enableReinitialize: true,
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const cleanedName = leoProfanity.clean(values.name.trim())
        await renameChannel({ id: channelId, name: cleanedName }).unwrap()

        toast.success(t('toasts.channelRenamed', { name: cleanedName }), {
          position: 'top-right',
          autoClose: 3000,
        })
        onHide()
      }
      catch (error) {
        handleApiError(error, t('modals.networkError'))
        setSubmitting(false)
      }
    },
  })

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>{t('modals.renameChannel')}</Modal.Title>
      </Modal.Header>
      <Form noValidate onSubmit={formik.handleSubmit}>
        <Modal.Body>
          <Form.Group controlId="name">
            <Form.Label>{t('modals.renameLabel')}</Form.Label>
            <Form.Control
              name="name"
              type="text"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              onKeyDown={async (e) => {
                if (e.key === 'Enter') {
                  e.preventDefault()
                  void formik.setTouched({ name: true }) // игнорируем предупреждение
                  await formik.handleSubmit()
                }
              }}
              isInvalid={formik.touched.name && !!formik.errors.name}
              ref={inputRef}
              autoComplete="off"
              disabled={isLoading}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.name}
            </Form.Control.Feedback>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={onHide}
            disabled={isLoading}
          >
            {t('modals.cancel')}
          </Button>
          <Button
            type="submit"
            variant="primary"
            disabled={isLoading || !formik.isValid || formik.isSubmitting}
          >
            {isLoading
              ? (
                  <span
                    className="spinner-border spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                  />
                )
              : t('modals.submit')}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  )
}

export default RenameChannelModal
