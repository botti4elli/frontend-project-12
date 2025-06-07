// import { useEffect, useRef } from 'react'
// import { Modal, Button, Form } from 'react-bootstrap'
// import { useTranslation } from 'react-i18next'
// import { useSelector, useDispatch } from 'react-redux'
// import { useFormik } from 'formik'
// import { toast } from 'react-toastify'
// import leoProfanity from 'leo-profanity'
//
// import { renameChannelThunk } from '../slices/channelsThunks'
// import { selectChannels } from '../slices/channelsSlice'
// import { getRenameChannelSchema } from '../schemas/channelSchemas'
//
// const RenameChannelModal = ({ show, channelId, onHide }) => {
//   const { t } = useTranslation()
//   const dispatch = useDispatch()
//   const channels = useSelector(selectChannels)
//   const channel = channels.find((c) => c.id === channelId) || {}
//
//   const inputRef = useRef(null)
//
//   useEffect(() => {
//     if (show && inputRef.current) {
//       inputRef.current.focus()
//       inputRef.current.select()
//     }
//   }, [show])
//
//   const channelNames = channels
//     .filter((c) => c.id !== channelId)
//     .map((c) => c.name.toLowerCase())
//
//   const validationSchema = getRenameChannelSchema(t, channelNames)
//
//   const formik = useFormik({
//     initialValues: {
//       name: channel.name || '',
//     },
//     enableReinitialize: true,
//     validationSchema,
//     onSubmit: async (values, { setSubmitting }) => {
//       try {
//         const cleanedName = leoProfanity.clean(values.name.trim())
//         await dispatch(renameChannelThunk({
//           id: channelId,
//           name: cleanedName,
//         })).unwrap()
//         toast.success(t('toasts.channelRenamed', { name: cleanedName }), {
//           position: 'top-right',
//           autoClose: 3000,
//           hideProgressBar: false,
//           closeOnClick: true,
//           pauseOnHover: true,
//         })
//         onHide()
//       } catch {
//         toast.error(t('modals.networkError'), {
//           position: 'top-right',
//           autoClose: 3000,
//           hideProgressBar: false,
//           closeOnClick: true,
//           pauseOnHover: true,
//         })
//         setSubmitting(false)
//       }
//     },
//   })
//
//   return (
//     <Modal show={show} onHide={onHide} centered>
//       <Modal.Header closeButton>
//         <Modal.Title>{t('toasts.channelRenamed')}</Modal.Title>
//       </Modal.Header>
//       <Form noValidate onSubmit={formik.handleSubmit}>
//         <Modal.Body>
//           <Form.Group controlId="name">
//             <Form.Label>{t('modals.renameLabel')}</Form.Label>
//             <Form.Control
//               name="name"
//               type="text"
//               value={formik.values.name}
//               onChange={formik.handleChange}
//               onBlur={formik.handleBlur}
//               isInvalid={formik.touched.name && !!formik.errors.name}
//               ref={inputRef}
//               autoComplete="off"
//             />
//             <Form.Control.Feedback type="invalid">
//               {formik.errors.name}
//             </Form.Control.Feedback>
//           </Form.Group>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={onHide}>
//             {t('modals.cancel')}
//           </Button>
//           <Button
//             type="submit"
//             variant="primary"
//             disabled={formik.isSubmitting || !formik.isValid}
//           >
//             {formik.isSubmitting ? (
//               <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" />
//             ) : (
//               t('modals.submit')
//             )}
//           </Button>
//         </Modal.Footer>
//       </Form>
//     </Modal>
//   )
// }
//
// export default RenameChannelModal
import { useEffect, useRef } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { useSelector, useDispatch } from 'react-redux'
import { useFormik } from 'formik'
import { toast } from 'react-toastify'
import leoProfanity from 'leo-profanity'

import { renameChannelThunk } from '../slices/channelsThunks'
import { selectChannels } from '../slices/channelsSlice'
import { getRenameChannelSchema } from '../schemas/channelSchemas'

const RenameChannelModal = ({ show, channelId, onHide }) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const channels = useSelector(selectChannels)
  const channel = channels.find(c => c.id === channelId) || {}

  const inputRef = useRef(null)

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
        await dispatch(renameChannelThunk({
          id: channelId,
          name: cleanedName,
        })).unwrap()
        toast.success(t('toasts.channelRenamed', { name: cleanedName }), {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
        })
        onHide()
      } catch {
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

  return (
      <Modal show={show} onHide={onHide} centered>
        <Modal.Header closeButton>
          <Modal.Title>{t('toasts.channelRenamed')}</Modal.Title>
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
                  isInvalid={formik.touched.name && !!formik.errors.name}
                  ref={inputRef}
                  autoComplete="off"
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.name}
              </Form.Control.Feedback>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={onHide}>
              {t('modals.cancel')}
            </Button>
            <Button
                type="submit"
                variant="primary"
                disabled={formik.isSubmitting || !formik.isValid}
            >
              {formik.isSubmitting
                  ? (
                      <span
                          className="spinner-border spinner-border-sm"
                          role="status"
                          aria-hidden="true"
                      />
                  )
                  : t('modals.submit')
              }
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
  )
}

export default RenameChannelModal
