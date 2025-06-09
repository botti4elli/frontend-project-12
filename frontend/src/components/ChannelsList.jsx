// import {
//   ListGroup, Button, Dropdown, ButtonGroup,
// } from 'react-bootstrap'
// import { BsThreeDotsVertical } from 'react-icons/bs'
// import { useDispatch } from 'react-redux'
// import { useTranslation } from 'react-i18next'
// import { setCurrentChannelId } from '../slices/channelsSlice'
//
// const ChannelsList = ({
//   channels, currentChannelId, onAddChannel, onRename, onRemove,
// }) => {
//   const { t } = useTranslation()
//   const dispatch = useDispatch()
//
//   const handleSelectChannel = id => dispatch(setCurrentChannelId(id))
//
//   return (
//     <div className="channels-sidebar">
//       <div className="channels-header">
//         <h5 className="mb-0">{t('channels')}</h5>
//         <Button variant="outline-primary" size="sm" onClick={onAddChannel}>+</Button>
//       </div>
//       <div className="channels-list-wrapper">
//
//         <ListGroup variant="flush">
//           {channels.map((channel) => {
//             const isActive = channel.id === currentChannelId
//             const variant = isActive ? 'primary' : 'light'
//
//             return (
//               <ListGroup.Item key={channel.id} className="p-0 border-0">
//                 <Button
//                   variant={variant}
//                   onClick={() => handleSelectChannel(channel.id)}
//                   className="w-100 rounded-0 text-start d-flex justify-content-between align-items-center"
//                   role="button"
//                 >
//                   <span className="text-truncate">
//                     <span aria-hidden="true"># </span>
//                     {channel.name}
//                   </span>
//
//                   {channel.removable && (
//                     <Dropdown as={ButtonGroup} onClick={e => e.stopPropagation()}>
//                       <Dropdown.Toggle
//                         variant="secondary"
//                         className="btn btn-secondary btn-sm dropdown-toggle"
//                       >
//                         <span className="visually-hidden">{t('channel.manage')}</span>
//                         <BsThreeDotsVertical />
//                       </Dropdown.Toggle>
//
//                       <Dropdown.Menu>
//                         <Dropdown.Item onClick={() => onRename(channel)}>
//                           {t('channel.rename')}
//                         </Dropdown.Item>
//                         <Dropdown.Item onClick={() => onRemove(channel)}>
//                           {t('channel.remove')}
//                         </Dropdown.Item>
//                       </Dropdown.Menu>
//                     </Dropdown>
//                   )}
//                 </Button>
//               </ListGroup.Item>
//             )
//           })}
//         </ListGroup>
//
//       </div>
//     </div>
//   )
// }
//
// export default ChannelsList
// import {
//   ListGroup, Button, Dropdown, ButtonGroup,
// } from 'react-bootstrap'
// import { useDispatch } from 'react-redux'
// import { useTranslation } from 'react-i18next'
// import { setCurrentChannelId } from '../slices/channelsSlice'
//
// const ChannelsList = ({
//   channels, currentChannelId, onAddChannel, onRename, onRemove,
// }) => {
//   const { t } = useTranslation()
//   const dispatch = useDispatch()
//
//   const handleSelectChannel = id => dispatch(setCurrentChannelId(id))
//
//   return (
//     <div className="channels-sidebar">
//       <div className="channels-header">
//         <h5 className="mb-0">{t('channels')}</h5>
//         <Button variant="outline-primary" size="sm" onClick={onAddChannel}>+</Button>
//       </div>
//       <div className="channels-list-wrapper">
//
//         <ListGroup variant="flush">
//           {channels.map((channel) => {
//             const isActive = channel.id === currentChannelId
//
//             return (
//
//               // <ListGroup.Item key={channel.id} className="p-0 border-0">
//               //   <div className="d-flex">
//               //     <button
//               //       type="button"
//               //       className={`w-100 rounded-0 text-start btn text-truncate ${isActive ? 'btn-primary' : 'btn-light'}`}
//               //       onClick={() => handleSelectChannel(channel.id)}
//               //     >
//               //
//               //       <span className="me-2 text-truncate flex-grow-1">
//               //         <span aria-hidden="true"># </span>
//               //         {channel.name}
//               //       </span>
//               //
//               //     </button>
//               //
//               //     {channel.removable && (
//               //       <Dropdown as={ButtonGroup} onClick={e => e.stopPropagation()} className="flex-shrink-0">
//               //         <Dropdown.Toggle
//               //           split
//               //           variant={isActive ? 'primary' : 'light'}
//               //           id={`dropdown-${channel.id}`}
//               //           className="border-0"
//               //         >
//               //           <span className="visually-hidden">{t('channel.manage')}</span>
//               //         </Dropdown.Toggle>
//               //
//               //         <Dropdown.Menu>
//               //           <Dropdown.Item onClick={() => onRename(channel)}>
//               //             {t('channel.rename')}
//               //           </Dropdown.Item>
//               //           <Dropdown.Item onClick={() => onRemove(channel)}>
//               //             {t('channel.remove')}
//               //           </Dropdown.Item>
//               //         </Dropdown.Menu>
//               //       </Dropdown>
//               //     )}
//               //   </div>
//               // </ListGroup.Item>
//               <ListGroup.Item key={channel.id} className="p-0 border-0">
//                 <div className="d-flex align-items-center">
//                   <button
//                     type="button"
//                     onClick={() => handleSelectChannel(channel.id)}
//                     className={`btn rounded-0 text-start d-flex align-items-center flex-grow-1 ${isActive ? 'btn-primary text-white' : 'btn-light text-dark'}`}
//                     style={{ minWidth: 0 }}
//                   >
//                     <span
//                       className="text-truncate"
//                       style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
//                     >
//                       <span aria-hidden="true"># </span>
//                       {channel.name}
//                     </span>
//                   </button>
//
//                   {channel.removable && (
//                     <Dropdown as={ButtonGroup} onClick={e => e.stopPropagation()} className="ms-1 flex-shrink-0">
//                       <Dropdown.Toggle
//                         split
//                         variant={isActive ? 'primary' : 'light'}
//                         id={`dropdown-${channel.id}`}
//                         className="border-0"
//                       >
//                         <span className="visually-hidden">{t('channel.manage')}</span>
//                       </Dropdown.Toggle>
//
//                       {/* <Dropdown.Menu> */}
//                       {/*  <Dropdown.Item onClick={() => onRename(channel)}> */}
//                       {/*    {t('channel.rename')} */}
//                       {/*  </Dropdown.Item> */}
//                       {/*  <Dropdown.Item onClick={() => onRemove(channel)}> */}
//                       {/*    {t('channel.remove')} */}
//                       {/*  </Dropdown.Item> */}
//                       {/* </Dropdown.Menu> */}
//                       <Dropdown.Menu>
//                         <Dropdown.Item onClick={() => onRename(channel)}>
//                           {t('channel.rename')}
//                         </Dropdown.Item>
//                         <Dropdown.Item onClick={() => onRemove(channel)}>
//                           {t('channel.remove')}
//                         </Dropdown.Item>
//                       </Dropdown.Menu>
//                     </Dropdown>
//                   )}
//                 </div>
//               </ListGroup.Item>
//
//             )
//           })}
//         </ListGroup>
//
//       </div>
//     </div>
//   )
// }
//
// export default ChannelsList
import {
  Nav, Button, Dropdown, ButtonGroup,
} from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { setCurrentChannelId } from '../slices/channelsSlice'
import { BsPlusSquare } from 'react-icons/bs'

const ChannelsList = ({
  channels, currentChannelId, onAddChannel, onRename, onRemove,
}) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()

  const handleSelectChannel = id => dispatch(setCurrentChannelId(id))

  return (
    <div>
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
    </div>
  )
}

export default ChannelsList
