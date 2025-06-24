import { useMemo, useCallback } from 'react'
import { Modal, Button } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'

import { useRemoveChannelMutation, useGetChannelsQuery } from '../services/chatApi'
import { setCurrentChannelId } from '../slices/uiSlice'
import handleApiError from '../utils/handleApiError.js'

const RemoveChannelModal = ({ show, channelId, onHide }) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()

  const [removeChannel, { isLoading }] = useRemoveChannelMutation()
  const { data: channels = [] } = useGetChannelsQuery()

  const defaultChannelId = useMemo(
    () => channels[0]?.id,
    [channels],
  )

  const handleRemove = useCallback(async () => {
    try {
      await removeChannel(channelId).unwrap()

      if (defaultChannelId) {
        dispatch(setCurrentChannelId(defaultChannelId))
      }

      toast.success(t('toasts.channelRemoved'), {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      })

      onHide()
    }
    catch (error) {
      handleApiError(error, t('modals.networkError'))
    }
  }, [channelId, defaultChannelId, dispatch, removeChannel, t, onHide])

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>{t('modals.removeChannel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="mb-0">{t('modals.confirm')}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide} disabled={isLoading}>
          {t('modals.cancel')}
        </Button>
        <Button variant="danger" onClick={handleRemove} disabled={isLoading}>
          {isLoading
            ? (
                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" />
              )
            : t('modals.remove')}
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default RemoveChannelModal
