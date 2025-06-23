import { useRef, useEffect, useState } from 'react'
import {
  Modal, Form, Button, Spinner,
} from 'react-bootstrap'
import { useFormik } from 'formik'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'
import leoProfanity from 'leo-profanity'

import {
  useAddChannelMutation,
  useGetChannelsQuery,
} from '../services/chatApi'
import { getAddChannelSchema } from '../schemas/channelSchemas'
import handleApiError from '../utils/handleApiError.js'
import { setCurrentChannelId } from '../slices/uiSlice'

const AddChannelModal = ({ show, onHide }) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const inputRef = useRef(null)
  const [submitAttempted, setSubmitAttempted] = useState(false)

  const { data: channels = [] } = useGetChannelsQuery()
  const [addChannel, { isLoading }] = useAddChannelMutation()

  const channelNames = channels.map(channel => channel.name)
  const validationSchema = getAddChannelSchema(t, channelNames)

  const formik = useFormik({
    initialValues: { name: '' },
    validationSchema,
    validateOnBlur: true,
    validateOnChange: true,
    onSubmit: async ({ name }, { resetForm, setSubmitting }) => {
      setSubmitAttempted(true)
      const cleanedName = leoProfanity.clean(name).trim()

      try {
        const newChannel = await addChannel({ name: cleanedName }).unwrap()
        dispatch(setCurrentChannelId(newChannel.id))

        resetForm()
        setSubmitAttempted(false)

        toast.success(t('toasts.channelCreated', { name: cleanedName }), {
          position: 'top-right',
          autoClose: 3000,
        })

        onHide()
      }
      catch (error) {
        handleApiError(error, t, 'modals.networkError')
        setSubmitting(false)
      }
    },
  })

  useEffect(() => {
    if (show) {
      inputRef.current?.focus()
      formik.resetForm()
      setSubmitAttempted(false)
    }
  }, [show, formik])

  const showError = (formik.touched.name || submitAttempted) && !!formik.errors.name

  return (
    <Modal show={show} centered onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{t('modals.addChannel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form
          onSubmit={(e) => {
            e.preventDefault()
            formik.setTouched({ name: true })
            formik.handleSubmit()
          }}
        >
          <Form.Group controlId="name">
            <Form.Label className="visually-hidden">{t('modals.channelName')}</Form.Label>
            <Form.Control
              name="name"
              required
              ref={inputRef}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
              isInvalid={showError}
              disabled={isLoading}
              autoComplete="off"
              autoFocus
            />
            {showError && (
              <Form.Control.Feedback type="invalid">
                {formik.errors.name}
              </Form.Control.Feedback>
            )}
          </Form.Group>

          <div className="d-flex justify-content-end mt-3">
            <Button
              variant="secondary"
              onClick={onHide}
              className="me-2"
              disabled={isLoading}
            >
              {t('modals.cancel')}
            </Button>
            <Button
              variant="primary"
              type="submit"
              disabled={isLoading || formik.isSubmitting}
            >
              {isLoading
                ? (
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                    />
                  )
                : t('modals.submit')}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  )
}

export default AddChannelModal
