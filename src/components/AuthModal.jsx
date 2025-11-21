import React, { useState } from 'react';
import { useUser } from '../contexts/UserContext';
import { useTranslation } from '../utils/useTranslation';
import './AuthModal.css';

const AuthModal = ({ isOpen, onClose }) => {
  const { t, currentLanguage } = useTranslation();
  const { registerUser } = useUser();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isRegistered, setIsRegistered] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

  
    if (!email || !password) {
      setError(currentLanguage === 'ru' ? 'Пожалуйста, заполните все поля' : 'Please fill in all fields');
      return;
    }


    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError(currentLanguage === 'ru' ? 'Неверный формат email' : 'Invalid email format');
      return;
    }

  
    if (password.length < 6) {
      setError(currentLanguage === 'ru' ? 'Пароль должен содержать минимум 6 символов' : 'Password must be at least 6 characters');
      return;
    }

    try {
      registerUser(email, password);
      setIsRegistered(true);

      setTimeout(() => {
        onClose();
        setIsRegistered(false);
        setEmail('');
        setPassword('');
      }, 1500);
    } catch (err) {
      setError(err.message);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="auth-modal-overlay" onClick={onClose}>
      <div className="auth-modal" onClick={(e) => e.stopPropagation()}>
        <div className="auth-modal-header">
          <h2>{currentLanguage === 'ru' ? 'Регистрация' : 'Registration'}</h2>
          <button className="auth-modal-close" onClick={onClose}>×</button>
        </div>
        
        <div className="auth-modal-body">
          {isRegistered ? (
            <div className="auth-success">
              <div className="success-icon">✓</div>
              <p>{currentLanguage === 'ru' ? 'Регистрация успешна!' : 'Registration successful!'}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="email">
                  {currentLanguage === 'ru' ? 'Email почта' : 'Email address'}
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={currentLanguage === 'ru' ? 'Введите ваш email' : 'Enter your email'}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="password">
                  {currentLanguage === 'ru' ? 'Пароль' : 'Password'}
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={currentLanguage === 'ru' ? 'Введите ваш пароль' : 'Enter your password'}
                  required
                />
              </div>
              
              {error && (
                <div className="auth-error">
                  {error}
                </div>
              )}
              
              <button type="submit" className="auth-submit-btn">
                {currentLanguage === 'ru' ? 'Зарегистрироваться' : 'Register'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthModal;