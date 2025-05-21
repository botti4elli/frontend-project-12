import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { logout } from '../slices/authSlice';

const Header = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.auth);

  const handleLogout = () => {
    localStorage.removeItem('token');
    dispatch(logout());
    navigate('/login');
  };

  return (
    <header className="bg-white text-dark py-3 border-bottom">
      <div className="container d-flex justify-content-between align-items-center">
        <Link to="/" className="fs-5 text-decoration-none text-dark">
          Hexlet Chat
        </Link>
        {isAuthenticated && (
        <Button variant="outline-primary" onClick={handleLogout}>
          {t('logout')}
        </Button>
        )}
      </div>
    </header>
  );
};

export default Header;
