import React, { useState } from 'react';
import { useTranslation } from '../utils/useTranslation';
import './UnsubscribePage.css';
import '../styles/pages.css';

const UnsubscribePage = () => {
  const { t, currentLanguage } = useTranslation();
  const [email, setEmail] = useState('');
  const [isUnsubscribed, setIsUnsubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleUnsubscribe = async (e) => {
    e.preventDefault();
    setError('');

    if (!validateEmail(email)) {
      setError(currentLanguage === 'ru' ? 'Пожалуйста, введите действительный адрес электронной почты' : 'Please enter a valid email address');
      return;
    }

    setIsLoading(true);

    try {

      const subscriptions = JSON.parse(localStorage.getItem('subscriptions') || '[]');
      const updatedSubscriptions = subscriptions.filter(sub => sub.email !== email);
      localStorage.setItem('subscriptions', JSON.stringify(updatedSubscriptions));
      
      setIsUnsubscribed(true);
      setEmail('');
    } catch (err) {
      setError(currentLanguage === 'ru' ? 'Произошла ошибка. Пожалуйста, попробуйте еще раз.' : 'An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="page-main unsubscribe-page">
      <section className="page-section section-spacing">
        <div className="container">
          <div className="unsubscribe-container">
            <h1>{currentLanguage === 'ru' ? 'Отписаться от рассылки' : 'Unsubscribe from Newsletter'}</h1>
            
            {isUnsubscribed ? (
              <div className="unsubscribe-success">
                <h2>{currentLanguage === 'ru' ? 'Вы успешно отписались!' : 'You have been unsubscribed!'}</h2>
                <p>{currentLanguage === 'ru' ? 'Ваш email был успешно удален из нашей рассылки.' : 'Your email has been successfully removed from our newsletter.'}</p>
              </div>
            ) : (
              <>
                <p>{currentLanguage === 'ru' ? 'Введите email, от которого хотите отписаться от нашей рассылки:' : 'Enter the email you want to unsubscribe from our newsletter:'}</p>
                
                <form onSubmit={handleUnsubscribe} className="unsubscribe-form">
                  <div className="form-group">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={currentLanguage === 'ru' ? 'Ваш email' : 'Your email'}
                      required
                      disabled={isLoading}
                      className="form-input"
                    />
                  </div>
                  
                  <button 
                    type="submit" 
                    className="unsubscribe-btn"
                    disabled={isLoading || !email}
                  >
                    {isLoading ? (
                      currentLanguage === 'ru' ? 'Обработка...' : 'Processing...'
                    ) : (
                      currentLanguage === 'ru' ? 'Отписаться' : 'Unsubscribe'
                    )}
                  </button>
                  
                  {error && <div className="error-message">{error}</div>}
                </form>
              </>
            )}
          </div>
        </div>
      </section>
    </main>
  );
};

export default UnsubscribePage;