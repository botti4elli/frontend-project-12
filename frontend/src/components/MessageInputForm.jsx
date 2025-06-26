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
  const [online, setOnline] = useState(() => window.navigator.onLine)
  const inputRef = useRef(null)
  const { t } = useTranslation()

  const currentChannelId = useSelector(state => state.ui.currentChannelId)
  const username = useSelector(state => state.auth.username)
  const [sendMessage, { isLoading }] = useSendMessageMutation()

  useEffect(() => {
    const update = () => setOnline(window.navigator.onLine)
    window.addEventListener('online', update)
    window.addEventListener('offline', update)
    return () => {
      window.removeEventListener('online', update)
      window.removeEventListener('offline', update)
    }
  }, [])

  useEffect(() => {
    inputRef.current?.focus()
    if (inputRef.current) {
      inputRef.current.style.height = 'auto'
      inputRef.current.style.height = `${inputRef.current.scrollHeight}px`
    }
  }, [currentChannelId])

  const autoGrow = (el) => {
    el.style.height = 'auto'
    el.style.height = `${el.scrollHeight}px`
  }

  const handleChange = (e) => {
    setMessage(e.target.value)
    autoGrow(e.target)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const trimmed = message.trim()
    if (!trimmed || isDisabled || !online || trimmed.length > 1000) return

    try {
      await sendMessage({
        body: leoProfanity.clean(trimmed),
        channelId: currentChannelId,
        username,
      }).unwrap()
      setMessage('')
      inputRef.current.style.height = 'auto'
      inputRef.current?.focus()
    }
    catch (error) {
      handleApiError(error, t, 'sendMessageFailed')
      inputRef.current?.focus()
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      void handleSubmit(e)
    }
  }

  const trimmed = message.trim()
  const isSendDisabled = !trimmed || isDisabled || !online

  return (
    <Form onSubmit={handleSubmit} className="mt-auto px-3">
      <InputGroup className="mb-3">
        <Form.Control
          ref={inputRef}
          as="textarea"
          placeholder={t('chat.newMessage')}
          value={message}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          disabled={isDisabled}
          aria-label={t('chat.newMessage')}
          autoFocus
          rows={1}
          style={{
            resize: 'none',
            overflow: 'hidden',
            maxHeight: '150px',
            transition: 'height 0.15s ease-in-out',
          }}
        />
        <Button
          variant="light"
          type="submit"
          disabled={isSendDisabled}
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
