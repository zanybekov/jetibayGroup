import React from 'react';
import { useUser } from '../contexts/UserContext';
import { useTranslation } from '../utils/useTranslation';
import { useNavigate } from 'react-router-dom';
import '../styles/pages.css';
import './UserProfilePage.css';

const UserProfilePage = () => {
  const { t, currentLanguage } = useTranslation();
  const { currentUser, logout } = useUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (!currentUser) {

    navigate('/');
    return null;
  }

  return (
    <div className="page-main user-profile-page">
      <div className="page-content">
        <div className="page-wrapper">
          <div className="profile-header">
            <h1 className="page-title">
              {currentLanguage === 'ru' ? 'Личный кабинет' : 'User Profile'}
            </h1>
            <button className="logout-btn" onClick={handleLogout}>
              {currentLanguage === 'ru' ? 'Выйти' : 'Logout'}
            </button>
          </div>

          <div className="profile-content">
            <div className="profile-card">
              <div className="profile-avatar">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                </svg>
              </div>
              
              <div className="profile-info">
                <h2 className="profile-name">
                  {currentLanguage === 'ru' ? 'Пользователь' : 'User'}
                </h2>
                <p className="profile-email">{currentUser.email}</p>
                <p className="profile-registered">
                  {currentLanguage === 'ru' ? 'Зарегистрирован:' : 'Registered:'}{' '}
                  {new Date(currentUser.registeredAt).toLocaleDateString(currentLanguage === 'ru' ? 'ru-RU' : 'en-US')}
                </p>
              </div>
            </div>

            <div className="profile-sections">
              <div className="profile-section">
                <h3>{currentLanguage === 'ru' ? 'Мои заказы' : 'My Orders'}</h3>
                <p className="empty-message">
                  {currentLanguage === 'ru' ? 'У вас пока нет заказов' : 'You have no orders yet'}
                </p>
              </div>

              <div className="profile-section">
                <h3>{currentLanguage === 'ru' ? 'Избранные товары' : 'Favorite Products'}</h3>
                <p className="empty-message">
                  {currentLanguage === 'ru' ? 'У вас пока нет избранных товаров' : 'You have no favorite products yet'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;