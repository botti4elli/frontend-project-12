import { useRef, useEffect, useState } from 'react'
import {
  Modal, Form, Button, Spinner,
} from 'react-bootstrap'
import { useFormik } from 'formik'
import { useTranslation } from 'react-i18next'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify'

import leoProfanity from 'leo-profanity'

import { addChannelThunk } from '../slices/channelsThunks'
 import { getAddChannelSchema } from '../schemas/channelSchemas'

leoProfanity.loadDictionary('ru')
leoProfanity.add(leoProfanity.getDictionary('en'))

const AddChannelModal = ({ show, onHide }) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const inputRef = useRef(null)

  const channels = useSelector((state) => state.channels.channels)
  const { status } = useSelector((state) => state.channels)

  const channelNames = channels.map((channel) => channel.name)
  const [submitAttempted, setSubmitAttempted] = useState(false)

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
        await dispatch(addChannelThunk({ name: cleanedName })).unwrap()

        // const newChannel = await dispatch(addChannelThunk({ name: cleanedName })).unwrap();
        // dispatch(setCurrentChannelId(newChannel.id)); // Переключаемся на новый канал

        resetForm()
        setSubmitAttempted(false)

        toast.success(t('toasts.channelCreated', { name: cleanedName }), {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
        })

        onHide()
      } catch (err) {
        toast.error(t('modals.networkError'), {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
        })
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [show])

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
              isInvalid={formik.touched.name && !!formik.errors.name}
              disabled={status === 'loading'}
              autoComplete="off"
              autoFocus
            />
            {formik.touched.name && formik.errors.name && (
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
              disabled={status === 'loading'}
            >
              {t('modals.cancel')}
            </Button>
            <Button
              variant="primary"
              type="submit"
              disabled={status === 'loading' || formik.isSubmitting}
            >
              {status === 'loading' ? (
                <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
              ) : (
                t('modals.submit')
              )}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  )
}

export default AddChannelModal
