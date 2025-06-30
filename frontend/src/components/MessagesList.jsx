const MessagesList = ({ messages }) => {
  return (
    <div>
      {messages.map(msg => (
        <div key={msg.id} className="d-flex mb-2">
          <div className="fw-bold me-2 text-nowrap">
            {msg.username}
            :
          </div>
          <div className="flex-grow-1 text-break">{msg.body}</div>
        </div>
      ))}
    </div>
  )
}

export default MessagesList
