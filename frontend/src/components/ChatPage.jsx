import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import { logout } from '../slices/authSlice';
import { fetchChannels } from '../slices/channelsSlice';

const ChatPage = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const username = useSelector((state) => state.auth.username);
  const channels = useSelector((state) => state.channels.channels ?? []);
  const channelsStatus = useSelector((state) => state.channels.status);
  const channelsError = useSelector((state) => state.channels.error);

  useEffect(() => {
    if (channelsStatus === 'idle') {
      dispatch(fetchChannels())
        .unwrap()
        .catch((e) => {
          toast.error(t('errors.loginFailed'));
          console.error(e);
        });
    }
  }, [dispatch, channelsStatus, t]);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <Container className="h-100 my-4 overflow-hidden rounded shadow">
      <div className="row h-100 bg-white flex-md-row p-3">
        <div className="mb-3 d-flex justify-content-between align-items-center w-100">
          <h1>
            {t('welcome')}
            {' '}
            {username}
          </h1>
          <Button variant="outline-danger" onClick={handleLogout}>
            {t('logout')}
          </Button>
        </div>

        <div className="w-100">
          <h2>{t('channels')}</h2>
          {channelsStatus === 'loading' && <p>{t('chat.newMessage')}</p>}
          {channelsStatus === 'failed' && <p>{channelsError || t('errors.loginFailed')}</p>}
          {channelsStatus === 'succeeded' && (
            <ul>
              {channels.map((channel) => (
                <li key={channel.id}>{channel.name}</li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </Container>
  );
};

export default ChatPage;
