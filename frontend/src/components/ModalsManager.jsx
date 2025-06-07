import { lazy, Suspense } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { closeModal } from '../slices/uiSlice'

const AddChannelModal = lazy(() => import('../modals/AddChannelModal'))
const RenameChannelModal = lazy(() => import('../modals/RenameChannelModal'))
const RemoveChannelModal = lazy(() => import('../modals/RemoveChannelModal'))

const ModalsManager = () => {
  const dispatch = useDispatch()
  const modal = useSelector((state) => state.ui.modal)

  if (!modal.type) return null

  const handleClose = () => {
    dispatch(closeModal())
  }

  const { type, channelId } = modal

  return (
    <Suspense fallback={null}>
      {type === 'addChannel' && (
        <AddChannelModal show onHide={handleClose} />
      )}
      {type === 'renameChannel' && (
        <RenameChannelModal show onHide={handleClose} channelId={channelId} />
      )}
      {type === 'removeChannel' && (
        <RemoveChannelModal show onHide={handleClose} channelId={channelId} />
      )}
    </Suspense>
  )
}

export default ModalsManager
