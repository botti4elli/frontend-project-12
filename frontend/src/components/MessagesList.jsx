import React from 'react'

const MessagesList = ({ messages }) => (
  <div className="messages-container px-3 py-2 overflow-auto flex-grow-1">
    {messages.map((msg) => (
      <div key={msg.id} className="d-flex mb-2">
        <div className="fw-bold me-2 text-nowrap">
          {msg.username}
          :
        </div>
        <div className="flex-grow-1">{msg.body}</div>
      </div>
    ))}
  </div>
)

export default MessagesList
