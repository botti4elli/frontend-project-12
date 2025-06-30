import { useEffect, useMemo, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Container, Row, Col, Button } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'

import { openModal, setCurrentChannelId, selectCurrentChannelId } from '../slices/uiSlice'
import { useGetChannelsQuery, useGetMessagesQuery } from '../services/chatApi'

import ChannelsList from '../components/ChannelsList'
import ChatHeader from '../components/ChatHeader'
import MessagesList from '../components/MessagesList'
import MessageInputForm from '../components/MessageInputForm'
import ModalsManager from '../components/ModalsManager'
import MessagesWrapper from '../components/MessagesWrapper'
import { BsPlusSquare } from 'react-icons/bs'

const ChatPage = () => {
  const dispatch = useDispatch()
  const currentChannelId = useSelector(selectCurrentChannelId)

  const { data: channels = [], isLoading: channelsLoading, isError: channelsError } = useGetChannelsQuery()
  const {
    data: messages = [],
    isLoading: messagesLoading,
    isError: messagesError,
  } = useGetMessagesQuery(undefined, {
    pollingInterval: 3000,
  })

  const [scrollToBottomTrigger, setScrollToBottomTrigger] = useState(0)
  const handleMessageSent = () => {
    setScrollToBottomTrigger(prev => prev + 1)
  }

  useEffect(() => {
    if (channels.length > 0 && !currentChannelId) {
      dispatch(setCurrentChannelId(channels[0].id))
    }
  }, [channels, currentChannelId, dispatch])

  const currentChannel = channels.find(c => c.id === currentChannelId)
  const currentMessages = useMemo(
    () => messages.filter(m => m.channelId === currentChannelId),
    [messages, currentChannelId],
  )

  useEffect(() => {
    setScrollToBottomTrigger(prev => prev + 1)
  }, [currentMessages])

  const { t } = useTranslation()

  if (channelsLoading || messagesLoading) {
    return <div className="d-flex justify-content-center p-5">{t('chat.loading')}</div>
  }

  if (channelsError || messagesError) {
    return <div className="text-danger text-center p-5">{t('chat.loadingError')}</div>
  }

  return (
    <Container fluid className="bg-light d-flex justify-content-center align-items-start py-4">
      <div className="shadow rounded bg-white w-100" style={{ maxWidth: '1300px', height: '85vh' }}>
        <Row className="h-100 m-0">

          <Col md={2} className="bg-light d-flex flex-column h-100 min-vh-0 border-end px-3">
            <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4 flex-shrink-0">
              <b>{t('channels')}</b>
              <Button
                variant="group-vertical"
                className="p-0 text-primary"
                onClick={() => dispatch(openModal({ type: 'addChannel' }))}
                aria-label={t('channel.add')}
              >
                <BsPlusSquare size={20} />
                <span className="visually-hidden">+</span>
              </Button>
            </div>
            <div className="flex-grow-1 overflow-hidden">

              <ChannelsList
                channels={channels}
                currentChannelId={currentChannelId}
                onRename={channel =>
                  dispatch(openModal({ type: 'renameChannel', channelId: channel.id, currentName: channel.name }))}
                onRemove={channel =>
                  dispatch(openModal({ type: 'removeChannel', channelId: channel.id }))}
              />
            </div>
          </Col>

          {/* Основной чат */}
          <Col md={10} className="d-flex flex-column h-100 p-0">
            {/* Шапка */}
            <div className="bg-light border-bottom flex-shrink-0">
              <ChatHeader currentChannel={currentChannel} messagesCount={currentMessages.length} />
            </div>

            {/* Прокручиваемые сообщения */}
            <div className="flex-grow-1 overflow-auto px-5 py-3 mt-3" style={{ minHeight: 0 }}>
              <MessagesWrapper scrollToBottomTrigger={scrollToBottomTrigger}>
                <MessagesList messages={currentMessages} />
              </MessagesWrapper>
            </div>

            {/* Ввод сообщения */}
            <div className="border-top px-5 py-3 flex-shrink-0">
              <MessageInputForm isDisabled={!currentChannelId} onMessageSent={handleMessageSent} />

            </div>
          </Col>
        </Row>

        <ModalsManager />
      </div>
    </Container>
  )
}

export default ChatPage
