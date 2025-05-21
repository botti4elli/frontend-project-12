import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NotFound from './notFound';
import Login from './Login.jsx';
import Signup from './SignUp.jsx';
import Header from './Header';
import ChatPage from './ChatPage.jsx'; // импортируй Chat
import PrivateRoute from './PrivateRoute.jsx';

const App = () => (
  <BrowserRouter>
    <Header />
    <Routes>
      <Route
        path="/"
        element={(
          <PrivateRoute>
            <ChatPage />
          </PrivateRoute>
                )}
      />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);

export default App;
