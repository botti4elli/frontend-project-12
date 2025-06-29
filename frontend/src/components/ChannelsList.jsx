import {
  Nav, Button, Dropdown, ButtonGroup,
} from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { setCurrentChannelId } from '../slices/uiSlice'

const ChannelsList = ({
  channels, currentChannelId, onRename, onRemove,
}) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()

  const handleSelectChannel = id => dispatch(setCurrentChannelId(id))

  return (
    <>

      {/* Список каналов */}
      <Nav
        id="channels-box"
        className="flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block"
        as="ul"
      >

        {channels.map((channel, index) => {
          const isActive = channel.id === currentChannelId
          const isLast = index === channels.length - 1
          const itemClass = `w-100 ${isLast ? 'mb-3' : ''}`

          if (!channel.removable) {
            return (
              <Nav.Item key={channel.id} className={itemClass} as="li">
                <Button
                  type="button"
                  variant={isActive ? 'secondary' : 'light'}
                  className="w-100 rounded-0 text-start"
                  onClick={() => handleSelectChannel(channel.id)}
                >
                  <span className="me-1">#</span>
                  {channel.name}
                </Button>
              </Nav.Item>
            )
          }

          return (
            <Nav.Item key={channel.id} className={itemClass} as="li">
              <div role="group" className="d-flex dropdown btn-group">
                <Button
                  type="button"
                  variant={isActive ? 'secondary' : 'light'}
                  className="w-100 rounded-0 text-start text-truncate"
                  onClick={() => handleSelectChannel(channel.id)}
                >
                  <span className="me-1">#</span>
                  {channel.name}
                </Button>
                <Dropdown as={ButtonGroup} className="flex-grow-0">
                  <Dropdown.Toggle
                    split
                    variant={isActive ? 'secondary' : 'light'}
                    id={`dropdown-${channel.id}`}
                    className="dropdown-toggle-split"
                  >
                    <span className="visually-hidden">{t('channel.manage')}</span>
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
              </div>
            </Nav.Item>
          )
        })}

      </Nav>
    </>
  )
}

export default ChannelsList
