// src/pages/ChatPage.jsx
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../slices/authSlice';

const ChatPage = () => {
  const dispatch = useDispatch();
  const username = useSelector((state) => state.auth.username);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div>
      <h1>
        Добро пожаловать,
        {username}
      </h1>
      <button type="button" onClick={handleLogout}>Выйти</button>
    </div>
  );
};

export default ChatPage;
