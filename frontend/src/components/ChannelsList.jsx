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
//       <div className="channels-header d-flex justify-content-between align-items-center mb-2">
//         <h5 className="mb-0">{t('channels')}</h5>
//         <Button
//           variant="outline-primary"
//           size="sm"
//           onClick={onAddChannel}
//           aria-label={t('channel.add')}
//         >
//           +
//         </Button>
//       </div>
//
//       <div className="channels-list-wrapper">
//         <ListGroup variant="flush">
//           {channels.map((channel) => {
//             const isActive = channel.id === currentChannelId
//             const variant = isActive ? 'primary' : 'light'
//
//             return (
//               <ListGroup.Item key={channel.id} className="p-0 border-0">
//                 <div className="d-flex align-items-center">
//                   <Button
//                     variant={variant}
//                     onClick={() => handleSelectChannel(channel.id)}
//                     className="rounded-0 text-start flex-grow-1 text-truncate"
//                     aria-label={t('channel.open', { name: channel.name })}
//                   >
//                     <span aria-hidden="true"># </span>
//                     {channel.name}
//                   </Button>
//
//                   {channel.removable && (
//                     <Dropdown as={ButtonGroup} onClick={e => e.stopPropagation()} className="ms-1">
//                       <Dropdown.Toggle
//                         split
//                         variant={variant}
//                         className="rounded-0 px-2"
//                         aria-label={t('channel.manage')}
//                         style={{ width: '36px', flexShrink: 0 }}
//                       >
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
//                 </div>
//               </ListGroup.Item>
//             )
//           })}
//         </ListGroup>
//       </div>
//     </div>
//   )
// }
//
// export default ChannelsList
// import React from 'react' // обязательно
// import {
//   ListGroup, Button, Dropdown,
// } from 'react-bootstrap'
// import { BsThreeDotsVertical } from 'react-icons/bs'
//
// // остальной код без изменений
//
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
//   const handleSelectChannel = (id, e) => {
//     // Проверяем, не кликнули ли по дропдауну
//     if (!e.target.closest('.dropdown')) {
//       dispatch(setCurrentChannelId(id))
//     }
//   }
//
//   // Кастомный компонент для Dropdown.Toggle
//   const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
//     <a
//       href="#"
//       ref={ref}
//       onClick={(e) => {
//         e.preventDefault()
//         e.stopPropagation()
//         onClick(e)
//       }}
//       className="text-decoration-none text-secondary p-1"
//     >
//       {children}
//     </a>
//   ))
//
//   return (
//     <div className="channels-sidebar">
//       <div className="channels-header d-flex justify-content-between align-items-center mb-3">
//         <h5 className="mb-0">{t('channels')}</h5>
//         <Button variant="outline-primary" size="sm" onClick={onAddChannel}>+</Button>
//       </div>
//       <div className="channels-list-wrapper">
//         <ListGroup variant="flush">
//           {channels.map((channel) => {
//             const isActive = channel.id === currentChannelId
//             const variant = isActive ? 'primary' : 'light'
//
//             return (
//               <ListGroup.Item
//                 key={channel.id}
//                 className="p-0 border-0"
//                 onClick={e => handleSelectChannel(channel.id, e)}
//               >
//                 <div className={`d-flex align-items-center w-100 rounded-0 text-start ${isActive ? 'bg-primary text-white' : 'bg-light'}`}>
//                   <span className="text-truncate ps-3 py-2 flex-grow-1">
//                     <span aria-hidden="true"># </span>
//                     {channel.name}
//                   </span>
//
//                   {channel.removable && isActive && (
//                     <Dropdown onClick={e => e.stopPropagation()}>
//                       <Dropdown.Toggle as={CustomToggle}>
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
//                 </div>
//               </ListGroup.Item>
//             )
//           })}
//         </ListGroup>
//       </div>
//     </div>
//   )
// }
//
// export default ChannelsList
import React from 'react'
import {
  ListGroup, Button, Dropdown,
} from 'react-bootstrap'
import { BsCaretDownFill, BsThreeDotsVertical } from 'react-icons/bs'
import { useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { setCurrentChannelId } from '../slices/channelsSlice'

const ChannelsList = ({
  channels, currentChannelId, onAddChannel, onRename, onRemove,
}) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()

  const handleSelectChannel = (id, e) => {
    if (!e.target.closest('.dropdown')) {
      dispatch(setCurrentChannelId(id))
    }
  }

  const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <a
      href="#"
      ref={ref}
      onClick={(e) => {
        e.preventDefault()
        e.stopPropagation()
        onClick(e)
      }}
      className="text-decoration-none text-secondary p-1"
    >
      <span className="visually-hidden">{t('channel.manage')}</span>
      <span className="ms-1 text-white"><BsCaretDownFill size="12" /></span>
      {children}
    </a>
  ))

  return (
    <div className="channels-sidebar">
      <div className="channels-header d-flex justify-content-between align-items-center mb-3">
        <h5 className="mb-0">{t('channels')}</h5>
        <Button variant="outline-primary" size="sm" onClick={onAddChannel}>+</Button>
      </div>
      <div className="channels-list-wrapper">
        <ListGroup variant="flush">
          {channels.map((channel) => {
            const isActive = channel.id === currentChannelId

            return (
              // <ListGroup.Item
              //   key={channel.id}
              //   className="p-0 border-0"
              //   onClick={e => handleSelectChannel(channel.id, e)}
              // >
              //   <div className={`d-flex align-items-center w-100 rounded-0 text-start ${isActive ? 'bg-primary text-white' : 'bg-light'}`}>
              //     <span className="text-truncate ps-3 py-2 flex-grow-1">
              //       <span aria-hidden="true"># </span>
              //       {channel.name}
              //     </span>
              //
              //     {channel.removable && isActive && (
              //       <Dropdown onClick={e => e.stopPropagation()}>
              //         <Dropdown.Toggle as={CustomToggle}>
              //           <BsThreeDotsVertical />
              //         </Dropdown.Toggle>
              //
              //         <Dropdown.Menu>
              //           <Dropdown.Item onClick={() => onRename(channel)}>
              //             {t('channel.rename')}
              //           </Dropdown.Item>
              //           <Dropdown.Item onClick={() => onRemove(channel)}>
              //             {t('channel.remove')}
              //           </Dropdown.Item>
              //         </Dropdown.Menu>
              //       </Dropdown>
              //     )}
              //   </div>
              // </ListGroup.Item>
              <ListGroup.Item
                key={channel.id}
                className="p-0 border-0"
              >
                <div className="d-flex align-items-center w-100">
                  <Button
                    onClick={e => handleSelectChannel(channel.id, e)}
                    variant={isActive ? 'primary' : 'light'}
                    className="text-start flex-grow-1 text-truncate rounded-0 ps-3 py-2 border-0"
                    role="button"
                  >
                    <span aria-hidden="true"># </span>
                    {channel.name}
                  </Button>

                  {channel.removable && isActive && (
                    <Dropdown onClick={e => e.stopPropagation()}>
                      <Dropdown.Toggle as={CustomToggle}>
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
                </div>
              </ListGroup.Item>
            )
          })}
        </ListGroup>
      </div>
    </div>
  )
}

export default ChannelsList
