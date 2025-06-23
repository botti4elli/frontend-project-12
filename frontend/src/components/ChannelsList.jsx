import {
  Nav, Button, Dropdown, ButtonGroup,
} from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { setCurrentChannelId } from '../slices/uiSlice'
import { BsPlusSquare } from 'react-icons/bs'

const ChannelsList = ({
  channels, currentChannelId, onAddChannel, onRename, onRemove,
}) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()

  const handleSelectChannel = id => dispatch(setCurrentChannelId(id))

  return (
    <>
      {/* Шапка с названием и кнопкой добавления */}
      <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
        <b>{t('channels')}</b>
        <Button
          variant="group-vertical"
          className="p-0 text-primary"
          onClick={onAddChannel}
          aria-label={t('channel.add')}
        >
          <BsPlusSquare size={20} />
          <span className="visually-hidden">+</span>
        </Button>
      </div>

      {/* Список каналов */}
      <Nav
        id="channels-box"
        className="flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block"
        as="ul"
      >
        {channels.map((channel) => {
          const isActive = channel.id === currentChannelId

          if (!channel.removable) {
            return (
              <Nav.Item key={channel.id} className="w-100" as="li">
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
            <Nav.Item key={channel.id} className="w-100" as="li">
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
