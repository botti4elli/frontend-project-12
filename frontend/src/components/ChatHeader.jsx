import React from 'react'
import { Badge } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'

const ChatHeader = ({ currentChannel, messagesCount }) => {
  const { t } = useTranslation()

  return (
    <div className="chat-header shadow-sm">
      <div className="d-flex justify-content-between align-items-center w-100 px-3 py-3">
        <div>
          <h5 className="mb-0">
            {currentChannel ? `#${currentChannel.name}` : t('chat.noChannelSelected')}
          </h5>
          {currentChannel && (
            <div className="text-muted mt-1" style={{ fontSize: '0.9rem' }}>
              <Badge bg="secondary" pill>
                {t('chat.messageCount', { count: messagesCount })}
              </Badge>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ChatHeader
