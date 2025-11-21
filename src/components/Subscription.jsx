import React, { useState } from 'react';
import { useTranslation } from '../utils/useTranslation';
import { Link } from 'react-router-dom';
import './Subscription.css';

const Subscription = () => {
  const { t, currentLanguage } = useTranslation();
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showUnsubscribe, setShowUnsubscribe] = useState(false);

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!validateEmail(email)) {
      setError(currentLanguage === 'ru' ? 'Пожалуйста, введите действительный адрес электронной почты' : 'Please enter a valid email address');
      return;
    }

    setIsLoading(true);

    try {
   
      const subscriptions = JSON.parse(localStorage.getItem('subscriptions') || '[]');
      const existingSubscription = subscriptions.find(sub => sub.email === email);
      
      if (existingSubscription) {
        setIsSubscribed(true);
        setShowUnsubscribe(true);
        setEmail('');
        return;
      }


      subscriptions.push({
        email,
        subscribedAt: new Date().toISOString()
      });
      localStorage.setItem('subscriptions', JSON.stringify(subscriptions));
      
      setIsSubscribed(true);
      setShowUnsubscribe(true);
      setEmail('');
    } catch (err) {
      setError(currentLanguage === 'ru' ? 'Произошла ошибка. Пожалуйста, попробуйте еще раз.' : 'An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
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
      
      setIsSubscribed(false);
      setShowUnsubscribe(false);
      setEmail('');
    } catch (err) {
      setError(currentLanguage === 'ru' ? 'Произошла ошибка. Пожалуйста, попробуйте еще раз.' : 'An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleUnsubscribeClick = () => {
    setIsSubscribed(false);
    setShowUnsubscribe(true);
    setEmail('');
  };

  if (isSubscribed && showUnsubscribe) {
    return (
      <div className="subscription-success">
        <h4>{currentLanguage === 'ru' ? 'Спасибо за подписку!' : 'Thank you for subscribing!'}</h4>
        <p>{currentLanguage === 'ru' ? 'Вы успешно подписались на нашу рассылку.' : 'You have successfully subscribed to our newsletter.'}</p>
        <button 
          onClick={handleUnsubscribeClick} 
          className="unsubscribe-link"
        >
          {currentLanguage === 'ru' ? 'Отписаться' : 'Unsubscribe'}
        </button>
        <p className="unsubscribe-info">
          {currentLanguage === 'ru' ? 'Или ' : 'Or '}
          <Link to="/unsubscribe" className="unsubscribe-page-link">
            {currentLanguage === 'ru' ? 'отписаться позже' : 'unsubscribe later'}
          </Link>
        </p>
      </div>
    );
  }

  if (showUnsubscribe) {
    return (
      <div className="subscription-section">
        <h4>{currentLanguage === 'ru' ? 'Отписаться от рассылки' : 'Unsubscribe from Newsletter'}</h4>
        <p>{currentLanguage === 'ru' ? 'Введите email, от которого хотите отписаться' : 'Enter the email you want to unsubscribe from'}</p>
        
        <form onSubmit={handleUnsubscribe} className="subscription-form">
          <div className="input-group">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={currentLanguage === 'ru' ? 'Ваш email' : 'Your email'}
              required
              disabled={isLoading}
            />
            <button 
              type="submit" 
              className="subscribe-btn"
              disabled={isLoading || !email}
            >
              {isLoading ? (
                currentLanguage === 'ru' ? 'Обработка...' : 'Processing...'
              ) : (
                currentLanguage === 'ru' ? 'Отписаться' : 'Unsubscribe'
              )}
            </button>
          </div>
          
          {error && <div className="error-message">{error}</div>}
          
          <button 
            type="button" 
            onClick={() => {
              setShowUnsubscribe(false);
              setEmail('');
              setError('');
            }}
            className="back-to-subscribe"
          >
            {currentLanguage === 'ru' ? 'Назад к подписке' : 'Back to subscribe'}
          </button>
          
          <p className="unsubscribe-info">
            {currentLanguage === 'ru' ? 'Или ' : 'Or '}
            <Link to="/unsubscribe" className="unsubscribe-page-link">
              {currentLanguage === 'ru' ? 'отписаться позже' : 'unsubscribe later'}
            </Link>
          </p>
        </form>
      </div>
    );
  }

  return (
    <div className="subscription-section">
      <h4>{currentLanguage === 'ru' ? 'Подписаться на рассылку' : 'Subscribe to Newsletter'}</h4>
      <p>{currentLanguage === 'ru' ? 'Получайте последние новости и специальные предложения' : 'Get the latest news and special offers'}</p>
      
      <form onSubmit={handleSubmit} className="subscription-form">
        <div className="input-group">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={currentLanguage === 'ru' ? 'Ваш email' : 'Your email'}
            required
            disabled={isLoading}
          />
          <button 
            type="submit" 
            className="subscribe-btn"
            disabled={isLoading || !email}
          >
            {isLoading ? (
              currentLanguage === 'ru' ? 'Отправка...' : 'Sending...'
            ) : (
              currentLanguage === 'ru' ? 'Подписаться' : 'Subscribe'
            )}
          </button>
        </div>
        
        {error && <div className="error-message">{error}</div>}
      </form>
    </div>
  );
};

export default Subscription;