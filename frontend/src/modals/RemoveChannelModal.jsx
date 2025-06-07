import { Modal, Button } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
import { removeChannelThunk } from '../slices/channelsThunks'

const RemoveChannelModal = ({ show, channelId, onHide }) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()

  const handleRemove = () => {
    dispatch(removeChannelThunk(channelId))
      .unwrap()
      .then(() => {
        toast.success(t('toasts.channelRemoved'), {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
        })
        onHide()
      })
      .catch(() => {
        toast.error(t('modals.networkError'), {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
        })
      })
  }

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>{t('modals.removeChannel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="mb-0">{t('modals.confirm')}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          {t('modals.cancel')}
        </Button>
        <Button variant="danger" onClick={handleRemove}>
          {t('modals.remove')}
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default RemoveChannelModal
