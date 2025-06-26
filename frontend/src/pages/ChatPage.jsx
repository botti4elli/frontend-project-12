import { useEffect, useMemo, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Container, Row, Col } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'

import { openModal, setCurrentChannelId, selectCurrentChannelId } from '../slices/uiSlice'
import { useGetChannelsQuery, useGetMessagesQuery } from '../services/chatApi'

import ChannelsList from '../components/ChannelsList'
import ChatHeader from '../components/ChatHeader'
import MessagesList from '../components/MessagesList'
import MessageInputForm from '../components/MessageInputForm'
import ModalsManager from '../components/ModalsManager'

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

  const scrollAnchorRef = useRef(null)

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

  const { t } = useTranslation()

  if (channelsLoading || messagesLoading) {
    return <div className="d-flex justify-content-center p-5">{t('chat.loading')}</div>
  }

  if (channelsError || messagesError) {
    return <div className="text-danger text-center p-5">{t('chat.loadingError')}</div>
  }

  return (
    <Container fluid className="d-flex justify-content-center bg-light">
      <div className="chat-wrapper shadow bg-white rounded p-0">
        <Row className="h-100 m-0">
          <Col md={2} className="border-end px-3 d-flex flex-column channels-sidebar">
            <ChannelsList
              channels={channels}
              currentChannelId={currentChannelId}
              onAddChannel={() => dispatch(openModal({ type: 'addChannel' }))}
              onRename={channel =>
                dispatch(openModal({ type: 'renameChannel', channelId: channel.id, currentName: channel.name }))}
              onRemove={channel =>
                dispatch(openModal({ type: 'removeChannel', channelId: channel.id }))}
            />
          </Col>
          <Col md={10} className="chat-column p-0">
            <ChatHeader currentChannel={currentChannel} messagesCount={currentMessages.length} />
            <div className="chat-body d-flex flex-column flex-grow-1 overflow-hidden">
              <MessagesList
                messages={currentMessages}
                scrollAnchorRef={scrollAnchorRef}
              />
              <div className="input-form-container p-3 border-top">
                <MessageInputForm isDisabled={!currentChannelId} />
              </div>
            </div>
          </Col>
        </Row>
      </div>
      <ModalsManager />
    </Container>
  )
}

export default ChatPage
