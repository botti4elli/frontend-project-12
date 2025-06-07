import { useState, useRef, useEffect } from 'react'
import { Form, Button, InputGroup } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { toast } from 'react-toastify'
import { FiSend } from 'react-icons/fi'
import leoProfanity from 'leo-profanity'
import { selectToken, selectUsername } from '../slices/authSlice'
import { selectCurrentChannelId } from '../slices/channelsSlice'

leoProfanity.add(leoProfanity.getDictionary('en'))
leoProfanity.add(leoProfanity.getDictionary('ru'))

const MessageInputForm = ({ isDisabled }) => {
  const [message, setMessage] = useState('')
  const [isFocused, setIsFocused] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { t } = useTranslation()
  const inputRef = useRef(null)

  const currentChannelId = useSelector(selectCurrentChannelId)
  const username = useSelector(selectUsername)
  const token = useSelector(selectToken)

  useEffect(() => {
    setTimeout(() => inputRef.current?.focus(), 0)
  }, [currentChannelId])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const trimmed = message.trim()
    if (!trimmed || isDisabled || !navigator.onLine) {
      return
    }

    const cleaned = leoProfanity.clean(trimmed)
    setIsSubmitting(true)
    try {
      await axios.post(
        '/api/v1/messages',
        {
          body: cleaned,
          channelId: currentChannelId,
          username,
        },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        },
      )
      setMessage('')
      setTimeout(() => inputRef.current?.focus(), 0)
    }
    catch (error) {
      if (error.response?.status === 401) {
        toast.error(t('errors.unauthorized'))
      }
      else {
        toast.error(t('errors.sendMessageFailed'))
      }
    }
    finally {
      setIsSubmitting(false)
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e).catch(() => {})
    }
  }

  return (
    <Form
      onSubmit={e => handleSubmit(e).catch(() => {})}
      className="mt-auto px-3"
    >
      <InputGroup className="mb-3">
        <Form.Control
          ref={inputRef}
          type="text"
          placeholder={t('chat.newMessage')}
          value={message}
          onChange={e => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={isDisabled || !navigator.onLine || isSubmitting}
          aria-label={t('chat.newMessage')}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          style={{
            borderRadius: '6px 0 0 6px',
            backgroundColor: '#f8f9fa',
            boxShadow: isFocused
              ? '0 0 0 0.2rem rgba(13, 110, 253, 0.25)'
              : 'none',
            transition: 'box-shadow 0.2s ease',
          }}
        />
        <Button
          variant="light"
          type="submit"
          disabled={isDisabled || !navigator.onLine || !message.trim() || isSubmitting}
          className="px-3 border"
          style={{
            borderRadius: '0 6px 6px 0',
            backgroundColor: '#fff',
          }}
        >
          {isSubmitting
            ? (
                <span
                  className="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                />
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
