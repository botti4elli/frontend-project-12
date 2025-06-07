import {
  ListGroup, Button, Dropdown, ButtonGroup,
} from 'react-bootstrap'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { setCurrentChannelId } from '../slices/channelsSlice'

const ChannelsList = ({
  channels, currentChannelId, onAddChannel, onRename, onRemove,
}) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()

  const handleSelectChannel = (id) => dispatch(setCurrentChannelId(id))

  return (
    <div className="channels-sidebar">
      <div className="channels-header">
        <h5 className="mb-0">{t('channels')}</h5>
        <Button variant="outline-primary" size="sm" onClick={onAddChannel}>+</Button>
      </div>
      <div className="channels-list-wrapper">

        <ListGroup variant="flush">
          {channels.map((channel) => {
            const isActive = channel.id === currentChannelId
            const variant = isActive ? 'primary' : 'light'

            return (
              <ListGroup.Item key={channel.id} className="p-0 border-0">
                <Button
                  variant={variant}
                  onClick={() => handleSelectChannel(channel.id)}
                  className="w-100 rounded-0 text-start d-flex justify-content-between align-items-center"
                  role="button"
                >
                  <span className="text-truncate">
                    <span aria-hidden="true"># </span>
                    {channel.name}
                  </span>

                  {channel.removable && (
                    <Dropdown as={ButtonGroup} onClick={(e) => e.stopPropagation()}>
                      <Dropdown.Toggle
                        variant="secondary"
                        className="btn btn-secondary btn-sm dropdown-toggle"
                      >
                        <span className="visually-hidden">{t('channel.manage')}</span>
                        <BsThreeDotsVertical />
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                        <Dropdown.Item onClick={() => onRename(channel)}>
                          {t('channel.rename')}
                        </Dropdown.Item>
                        <Dropdown.Item onClick={() => onRemove(channel)}>
                          {t('channel.remove')}
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  )}
                </Button>
              </ListGroup.Item>
            )
          })}
        </ListGroup>

      </div>
    </div>
  )
}

export default ChannelsList
