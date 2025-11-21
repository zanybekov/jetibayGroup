import React, { useMemo, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { setLanguage } from '../store/languageSlice'
import { useTranslation } from '../utils/useTranslation'
import { useTheme } from '../contexts/ThemeContext'
import { useStore } from '../contexts/StoreContext'
import { useUser } from '../contexts/UserContext'
import AuthModal from './AuthModal'
import './Header.css'

const Header = () => {
  const dispatch = useDispatch()
  const { t, currentLanguage } = useTranslation()
  const { isDarkMode, toggleTheme } = useTheme()
  const { cart, favorites, getTotalCartItems, getFavoritesCount } = useStore()
  const { currentUser, logout } = useUser()
  const location = useLocation()
  const navigate = useNavigate()
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  
  const cartCount = useMemo(() => getTotalCartItems(), [cart])
  const favoritesCount = useMemo(() => getFavoritesCount(), [favorites])

  const handleLanguageChange = (lang) => {
    dispatch(setLanguage(lang))
  }

  const scrollToSection = (sectionId) => {

    if (location.pathname === '/') {
      const element = document.getElementById(sectionId)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    } else {
 
      navigate(`/#${sectionId}`)
    }
  }

  const handleNavigation = (path, sectionId) => {
    if (path === '/' && location.pathname === '/') {
 
      scrollToSection('home')
    } else {
 
      navigate(path)
    }

    setIsMobileMenuOpen(false)
  }

  const handleUserIconClick = () => {
    if (currentUser) {
  
      navigate('/profile');
    } else {

      setIsAuthModalOpen(true);
    }

    setIsMobileMenuOpen(false)
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  const handleOverlayClick = (e) => {
    if (e.target.classList.contains('mobile-menu') && isMobileMenuOpen) {
      closeMobileMenu();
    }
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">

          <div className="logo">
            <Link to="/" onClick={closeMobileMenu}>
              <h2>Jetibay Group</h2>
            </Link>
          </div>

          <nav className="navigation">
            <ul className="nav-list">
              <li>
                <Link to="/about" className="nav-link">
                  {t('about')}
                </Link>
              </li>
              <li>
                <Link to="/services" className="nav-link">
                  {t('services')}
                </Link>
              </li>
              <li>
                <Link to="/portfolio" className="nav-link">
                  {t('portfolio')}
                </Link>
              </li>
              <li>
                <Link to="/blog" className="nav-link">
                  {currentLanguage === 'ru' ? 'Блог' : 'Blog'}
                </Link>
              </li>
              <li>
                <Link to="/contact" className="nav-link">
                  {t('contact')}
                </Link>
              </li>
              <li>
                <Link to="/store" className="nav-link">
                  {t('store')}
                </Link>
              </li>
              <li>
                <Link to="/qr" className="nav-link qr-link">
                  {currentLanguage === 'ru' ? '📱 QR' : '📱 QR'}
                </Link>
              </li>
            </ul>
          </nav>

      
          <div className="store-icons">
            <div className="cart-icon-container">
              <button 
                className="store-icon-btn" 
                title={currentLanguage === 'ru' ? 'Корзина' : 'Cart'}
                onClick={() => {
                  navigate('/cart')
                  closeMobileMenu()
                }}
              >
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M7 4V2C7 1.45 7.45 1 8 1H16C16.55 1 17 1.45 17 2V4H20C20.55 4 21 4.45 21 5S20.55 6 20 6H19V19C19 20.1 18.1 21 17 21H7C5.9 21 5 20.1 5 19V6H4C3.45 6 3 5.55 3 5S3.45 4 4 4H7ZM9 3V4H15V3H9ZM7 6V19H17V6H7Z"/>
                  <path d="M9 8V17H11V8H9ZM13 8V17H15V8H13Z"/>
                </svg>
                {cartCount > 0 && (
                  <span className="store-badge">{cartCount}</span>
                )}
              </button>
            </div>
            
            <div className="favorites-icon-container">
              <button 
                className="store-icon-btn" 
                title={currentLanguage === 'ru' ? 'Избранное' : 'Favorites'}
                onClick={() => {
                  navigate('/favorites')
                  closeMobileMenu()
                }}
              >
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 21.35L10.55 20.03C5.4 15.36 2 12.27 2 8.5C2 5.41 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.08C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.41 22 8.5C22 12.27 18.6 15.36 13.45 20.03L12 21.35Z"/>
                </svg>
                {favoritesCount > 0 && (
                  <span className="store-badge favorites">{favoritesCount}</span>
                )}
              </button>
            </div>
            

            <div className="user-icon-container">
              <button 
                className="store-icon-btn" 
                title={currentUser ? (currentLanguage === 'ru' ? 'Профиль' : 'Profile') : (currentLanguage === 'ru' ? 'Войти' : 'Login')}
                onClick={handleUserIconClick}
              >
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                </svg>
                {currentUser && (
                  <span className="user-status-indicator"></span>
                )}
              </button>
            </div>
          </div>

 
          <div className="theme-toggle">
            <button className="theme-btn" onClick={toggleTheme} title={isDarkMode ? 'Светлая тема' : 'Темная тема'} aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}>
              {isDarkMode ? (
                <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                  <path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zm1.06-10.96c.39-.39.39-1.03 0-1.41-.39-.39-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06zm-12.37 12.37c-.39-.39-1.03-.39-1.41 0-.39.39-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0 .39-.39.39-1.03 0-1.41l-1.06-1.06zm1.06-10.96c.39-.39.39-1.03 0-1.41-.39-.39-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06zM7.05 18.36c.39-.39.39-1.03 0-1.41-.39-.39-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06z"/>
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                  <path d="M9.37,5.51C9.19,6.15,9.1,6.82,9.1,7.5c0,4.08,3.32,7.4,7.4,7.4c0.68,0,1.35-0.09,1.99-0.27C17.45,17.19,14.93,19,12,19 c-3.86,0-7-3.14-7-7C5,9.07,6.81,6.55,9.37,5.51z M12,3c-4.97,0-9,4.03-9,9s4.03,9,9,9s9-4.03,9-9c0-0.46-0.04-0.92-0.1-1.36 c-0.98,1.37-2.58,2.26-4.4,2.26c-2.98,0-5.4-2.42-5.4-5.4c0-1.81,0.89-3.42,2.26-4.4C12.92,3.04,12.46,3,12,3L12,3z"/>
                </svg>
              )}
            </button>
          </div>


          <div className="language-switcher">
            <button
              className={`lang-btn ${currentLanguage === 'ru' ? 'active' : ''}`}
              onClick={() => handleLanguageChange('ru')}
            >
              РУС
            </button>
            <button
              className={`lang-btn ${currentLanguage === 'en' ? 'active' : ''}`}
              onClick={() => handleLanguageChange('en')}
            >
              ENG
            </button>
          </div>


          <button className={`mobile-menu-btn ${isMobileMenuOpen ? 'active' : ''}`} onClick={toggleMobileMenu}>
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
      
 
      <div className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`} onClick={handleOverlayClick}>
        <div className="mobile-menu-content">

          <button className="mobile-menu-close-btn" onClick={closeMobileMenu}>
            <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
            </svg>
          </button>
          
          <ul className="mobile-nav-list">
            <li>
              <Link to="/" className="mobile-nav-link" onClick={closeMobileMenu}>
                {currentLanguage === 'ru' ? 'Главная' : 'Home'}
              </Link>
            </li>
            <li>
              <Link to="/about" className="mobile-nav-link" onClick={closeMobileMenu}>
                {t('about')}
              </Link>
            </li>
            <li>
              <Link to="/services" className="mobile-nav-link" onClick={closeMobileMenu}>
                {t('services')}
              </Link>
            </li>
            <li>
              <Link to="/portfolio" className="mobile-nav-link" onClick={closeMobileMenu}>
                {t('portfolio')}
              </Link>
            </li>
            <li>
              <Link to="/blog" className="mobile-nav-link" onClick={closeMobileMenu}>
                {currentLanguage === 'ru' ? 'Блог' : 'Blog'}
              </Link>
            </li>
            <li>
              <Link to="/contact" className="mobile-nav-link" onClick={closeMobileMenu}>
                {t('contact')}
              </Link>
            </li>
            <li>
              <Link to="/store" className="mobile-nav-link" onClick={closeMobileMenu}>
                {t('store')}
              </Link>
            </li>
            <li>
              <Link to="/qr" className="mobile-nav-link qr-link" onClick={closeMobileMenu}>
                {currentLanguage === 'ru' ? '📱 QR' : '📱 QR'}
              </Link>
            </li>
          </ul>
          
   
          <div className="mobile-store-icons">
            <div className="mobile-cart-icon-container">
              <button 
                className="mobile-store-icon-btn" 
                onClick={() => {
                  navigate('/cart')
                  closeMobileMenu()
                }}
              >
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M7 4V2C7 1.45 7.45 1 8 1H16C16.55 1 17 1.45 17 2V4H20C20.55 4 21 4.45 21 5S20.55 6 20 6H19V19C19 20.1 18.1 21 17 21H7C5.9 21 5 20.1 5 19V6H4C3.45 6 3 5.55 3 5S3.45 4 4 4H7ZM9 3V4H15V3H9ZM7 6V19H17V6H7Z"/>
                  <path d="M9 8V17H11V8H9ZM13 8V17H15V8H13Z"/>
                </svg>
                {cartCount > 0 && (
                  <span className="store-badge">{cartCount}</span>
                )}
                <span className="mobile-icon-label">
                  {currentLanguage === 'ru' ? 'Корзина' : 'Cart'}
                </span>
              </button>
            </div>
            
            <div className="mobile-favorites-icon-container">
              <button 
                className="mobile-store-icon-btn" 
                onClick={() => {
                  navigate('/favorites')
                  closeMobileMenu()
                }}
              >
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 21.35L10.55 20.03C5.4 15.36 2 12.27 2 8.5C2 5.41 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.08C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.41 22 8.5C22 12.27 18.6 15.36 13.45 20.03L12 21.35Z"/>
                </svg>
                {favoritesCount > 0 && (
                  <span className="store-badge favorites">{favoritesCount}</span>
                )}
                <span className="mobile-icon-label">
                  {currentLanguage === 'ru' ? 'Избранное' : 'Favorites'}
                </span>
              </button>
            </div>
            
            <div className="mobile-user-icon-container">
              <button 
                className="mobile-store-icon-btn" 
                onClick={handleUserIconClick}
              >
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                </svg>
                {currentUser && (
                  <span className="user-status-indicator"></span>
                )}
                <span className="mobile-icon-label">
                  {currentUser ? (currentLanguage === 'ru' ? 'Профиль' : 'Profile') : (currentLanguage === 'ru' ? 'Войти' : 'Login')}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
      

      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
      />
    </header>
  )
}

export default Header