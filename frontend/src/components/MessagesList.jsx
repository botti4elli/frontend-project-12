import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { selectCurrentChannelId } from '../slices/uiSlice'

const MessagesList = ({ messages, scrollAnchorRef }) => {
  const currentChannelId = useSelector(selectCurrentChannelId)

  useEffect(() => {
    scrollAnchorRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [currentChannelId, messages.length, scrollAnchorRef])

  return (
    <div className="overflow-auto flex-grow-1 px-5">
      {messages.map(msg => (
        <div key={msg.id} className="d-flex mb-2">
          <div className="fw-bold me-2 text-nowrap">
            {msg.username}
            :
          </div>
          <div className="flex-grow-1 text-break">{msg.body}</div>
        </div>
      ))}
      <div ref={scrollAnchorRef} />
    </div>
  )
}

export default MessagesList
