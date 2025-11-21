import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useTranslation } from '../utils/useTranslation'
import Subscription from './Subscription'
import './Footer.css'

const Footer = () => {
  const { t, language } = useTranslation()
  const location = useLocation()
  const navigate = useNavigate()

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
    } else if (path === '/' && sectionId) {
      navigate(`/#${sectionId}`)
    } else {
      navigate(path)
    }
  }

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
       
          <div className="footer-section">
            <div className="footer-logo">
              <h3>Jetibay Group</h3>
            </div>
            <div className="footer-about">
              <h4>{t('aboutCompany')}</h4>
              <p>{t('aboutText')}</p>
            </div>
            <div className="footer-social">
              <h4>{t('followUs')}</h4>
              <div className="social-links">
                <a
                  href="https://wa.me/996552664461"
                  className="social-link whatsapp"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884"/>
                  </svg>
                </a>

                <a
                  href="https://t.me/jetibaygroup"
                  className="social-link telegram"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                  </svg>
                </a>

                <a
                  href="https://instagram.com/jetibay_group"
                  className="social-link instagram"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>

     
          <div className="footer-section">
            <h4>{t('quickLinks')}</h4>
            <ul className="footer-links">
              <li><button onClick={() => handleNavigation('/', 'home')} className="footer-link">{t('home')}</button></li>
              <li><Link to="/about" className="footer-link">{t('about')}</Link></li>
              <li><Link to="/services" className="footer-link">{t('services')}</Link></li>
              <li><Link to="/portfolio" className="footer-link">{t('portfolio')}</Link></li>
              <li><Link to="/blog" className="footer-link">{language === 'ru' ? 'Блог и Новости' : 'Blog and News'}</Link></li>
              <li><Link to="/contact" className="footer-link">{t('contact')}</Link></li>
              <li>
                <Link to="/qr" className="footer-link">
                  {language === 'ru' ? '📱 QR Код' : '📱 QR Code'}
                </Link>
              </li>
            </ul>
   
            <div className="footer-subscription">
              <Subscription />
            </div>
          </div>

          <div className="footer-section">
            <h4>{t('ourContacts')}</h4>
            <div className="footer-contact-info">
              <div className="footer-contact-item">
                <span>📍 г. Бишкек, ул. Турусбекова 109</span>
              </div>
              <div className="footer-contact-item">
                <span>📞 +996 (552) 664-461</span>
              </div>
              <div className="footer-contact-item">
                <span>✉️ janibekovadilet91@gmail.com </span>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2024 Jetibay Group. {t('rights')}</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer