import { useState, useRef, useLayoutEffect } from 'react'
import { Form, Button, InputGroup } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { FiSend } from 'react-icons/fi'
import leoProfanity from 'leo-profanity'
import { useSendMessageMutation } from '../services/chatApi'
import handleApiError from '../utils/handleApiError'

const MessageInputForm = ({ isDisabled, onMessageSent }) => {
  const { t } = useTranslation()
  const currentChannelId = useSelector(state => state.ui.currentChannelId)
  const username = useSelector(state => state.auth.username)
  const [sendMessage, { isLoading }] = useSendMessageMutation()

  const [message, setMessage] = useState('')
  const formRef = useRef(null)

  const adjustHeight = (textarea) => {
    textarea.style.height = 'auto'
    textarea.style.height = `${textarea.scrollHeight}px`
  }

  const handleChange = (e) => {
    setMessage(e.target.value)

    const textarea = e.target
    adjustHeight(textarea)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const trimmed = message.trim()
    if (!trimmed || isDisabled || trimmed.length > 1000) return

    try {
      await sendMessage({
        body: leoProfanity.clean(trimmed),
        channelId: currentChannelId,
        username,
      }).unwrap()

      setMessage('')
      if (onMessageSent) onMessageSent()
    }
    catch (error) {
      handleApiError(error, t, 'sendMessageFailed')
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      void handleSubmit(e)
    }
  }

  useLayoutEffect(() => {
    if (message !== '') return

    const textarea = formRef.current?.elements?.body
    if (!textarea) return

    requestAnimationFrame(() => {
      adjustHeight(textarea)
      textarea.focus()
    })
  }, [message])

  useLayoutEffect(() => {
    const textarea = formRef.current?.elements?.body
    if (!textarea) return

    textarea.focus()
    adjustHeight(textarea)
  }, [currentChannelId])

  const trimmed = message.trim()
  const isSendDisabled = !trimmed || isDisabled

  return (
    <Form ref={formRef} onSubmit={handleSubmit} noValidate>
      <InputGroup>
        <Form.Control
          as="textarea"
          name="body"
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
