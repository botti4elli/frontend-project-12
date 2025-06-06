import React, { useEffect, useState, useRef } from 'react';
import {
  Container, Row, Col,
} from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import useAuth from '../hooks/useAuth';
import { initApp } from '../slices/initSlice';
import socket from '../services/socket';
import { openModal } from '../slices/uiSlice';

import ChannelsList from '../components/ChannelsList';
import ChatHeader from '../components/ChatHeader';
import MessagesList from '../components/MessagesList';
import MessageInputForm from '../components/MessageInputForm';
import ModalsManager from '../components/ModalsManager';

import useSocketEvents from '../hooks/useSocketEvents';

const ChatPage = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { username, token } = useAuth();

  const channels = useSelector((state) => state.channels.channels);
  const currentChannelId = useSelector((state) => state.channels.currentChannelId);
  const messages = useSelector((state) => state.messages);
  const isAppLoading = useSelector((state) => state.init.loading);
  const isAppError = useSelector((state) => state.init.error);

  // const modal = useSelector((state) => state.ui.modal);
  const currentChannel = channels.find((c) => c.id === currentChannelId);
  const currentMessages = messages.filter((m) => m.channelId === currentChannelId);

  const [isSocketConnected, setIsSocketConnected] = useState(socket.connected);
  const hasShownDisconnectToast = useRef(false);

  useEffect(() => {
    dispatch(initApp());
  }, [dispatch]);

  useSocketEvents(
    () => setIsSocketConnected(true),
    () => setIsSocketConnected(false),
  );
  useEffect(() => {
    if (isAppError) {
      toast.error(t('chat.loadingDataFailed'));
    }
  }, [isAppError, t]);

  // Disconnect notice
  useEffect(() => {
    if (!isSocketConnected && !hasShownDisconnectToast.current) {
      toast.warning(t('chat.disconnected'));
      hasShownDisconnectToast.current = true;
    }
    if (isSocketConnected) {
      hasShownDisconnectToast.current = false;
    }
  }, [isSocketConnected, t]);

  if (isAppLoading) return null;

  return (
    <Container fluid className="d-flex justify-content-center bg-light">
      <div className="chat-wrapper shadow bg-white rounded p-0">
        <Row className="h-100 m-0">
          <Col md={2} className="border-end px-3 d-flex flex-column channels-sidebar">
            <ChannelsList
              channels={channels}
              currentChannelId={currentChannelId}
              onAddChannel={() => dispatch(openModal({ type: 'addChannel' }))}
              onRename={(channel) => dispatch(openModal({ type: 'renameChannel', channelId: channel.id }))}
              onRemove={(channel) => dispatch(openModal({ type: 'removeChannel', channelId: channel.id }))}
            />
          </Col>
          <Col md={10} className="chat-column p-0">
            <ChatHeader currentChannel={currentChannel} messagesCount={currentMessages.length} />
            <div className="chat-body d-flex flex-column flex-grow-1 overflow-hidden">
              <MessagesList messages={currentMessages} />
              <div className="input-form-container p-3 border-top">
                <MessageInputForm
                  currentChannelId={currentChannelId}
                  username={username}
                  token={token}
                  isDisabled={!isSocketConnected}
                />
              </div>
            </div>
          </Col>
        </Row>
      </div>
      <ModalsManager />
    </Container>
  );
};

export default ChatPage;
