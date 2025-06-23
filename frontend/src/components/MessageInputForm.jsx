import { useState, useEffect, useRef } from 'react'
import { Form, Button, InputGroup } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { FiSend } from 'react-icons/fi'
import leoProfanity from 'leo-profanity'
import { useSendMessageMutation } from '../services/chatApi'
import handleApiError from '../utils/handleApiError'

const MessageInputForm = ({ isDisabled }) => {
  const [message, setMessage] = useState('')
  const inputRef = useRef(null)
  const { t } = useTranslation()

  const currentChannelId = useSelector(state => state.ui.currentChannelId)
  const username = useSelector(state => state.auth.username)
  const [sendMessage, { isLoading }] = useSendMessageMutation()

  useEffect(() => {
    inputRef.current?.focus()
  }, [currentChannelId])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const trimmed = message.trim()
    if (!trimmed || isDisabled || !navigator.onLine) return

    try {
      await sendMessage({
        body: leoProfanity.clean(trimmed),
        channelId: currentChannelId,
        username,
      }).unwrap()
      setMessage('')
      inputRef.current?.focus()
    }
    catch (error) {
      handleApiError(error, t, 'sendMessageFailed')
      inputRef.current?.focus()
    }
  }

  const handleChange = (e) => {
    setMessage(e.target.value)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      void handleSubmit(e)
    }
  }

  return (
    <Form onSubmit={handleSubmit} className="mt-auto px-3">
      <InputGroup className="mb-3">
        <Form.Control
          ref={inputRef}
          type="text"
          placeholder={t('chat.newMessage')}
          value={message}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          disabled={isDisabled}
          aria-label={t('chat.newMessage')}
          autoFocus
        />
        <Button
          variant="light"
          type="submit"
          disabled={!message.trim() || isDisabled}
          className="px-3 border"
          style={{ borderRadius: '0 6px 6px 0', backgroundColor: '#fff' }}
        >
          {isLoading
            ? (
                <span className="spinner-border spinner-border-sm" role="status" />
              )
            : (
                <FiSend size={20} color="#007bff" />
              )}
        </Button>
      </InputGroup>
    </Form>
  )
}

export default MessageInputForm
