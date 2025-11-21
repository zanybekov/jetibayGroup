import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useTranslation } from '../utils/useTranslation'
import './Hero.css'

const Hero = () => {
  const { t } = useTranslation()
  const [showVideo, setShowVideo] = useState(false)
  const [activeButton, setActiveButton] = useState(null)
  const navigate = useNavigate()
  const location = useLocation()

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

  const handleServicesClick = () => {
    setActiveButton('services')
    setTimeout(() => setActiveButton(null), 300) 
    
    if (location.pathname === '/') {
      scrollToSection('services')
    } else {
      navigate('/services')
    }
  }

  const handleContactClick = () => {
    setActiveButton('contact')
    setTimeout(() => setActiveButton(null), 300) 
    
    if (location.pathname === '/') {
      scrollToSection('contact')
    } else {
      navigate('/contact')
    }
  }

  const getSlogan = () => {
    return t(
      'heroSlogan',
      'Строим с доверием и качеством',
      'Building with trust and quality'
    )
  }

  const getCompanyDescription = () => {
    return t(
      'heroDescriptionLong',
      'Jetibay Group — ведущая строительная компания Кыргызстана с более чем 8-летним опытом. Мы специализируемся на строительстве жилых и коммерческих объектов, предлагая полный цикл услуг от проектирования до сдачи под ключ.',
      'Jetibay Group is the leading construction company in Kyrgyzstan with over 8 years of experience. We specialize in residential and commercial construction, offering a full cycle of services from design to turnkey delivery.'
    )
  }

  return (
    <section id="home" className="hero">

      <div className="hero-background">
        {showVideo ? (
          <video
            className="hero-video"
            autoPlay
            muted
            loop
            playsInline
          >
            <source src="/construction-video.mp4" type="video/mp4" />
          </video>
        ) : (
          <div
            className="hero-image-bg"
            style={{ backgroundImage: 'url(/images/concrete.jpg)' }}
          ></div>
        )}
        <div className="hero-overlay"></div>
        <div className="hero-decoration">
          <img src="/images/red-brick.jpg" alt="Construction" className="hero-decoration-image" />
        </div>
      </div>

      <div className="container">
        <div className="hero-content">
          <div className="hero-main">
  
            <div className="hero-logo">
              <div className="logo-icon">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2L2 7v10c0 5.55 3.84 10 9 10s9-4.45 9-10V7l-8-5z" />
                  <path d="M12 2v15" />
                  <path d="M8 7v4" />
                  <path d="M16 7v4" />
                </svg>
              </div>
              <h1 className="hero-title">{t('heroTitle')}</h1>
            </div>


            <h2 className="hero-slogan">{getSlogan()}</h2>


            <div className="hero-main-buttons">
              <button
                className={`btn btn-primary btn-large ${activeButton === 'services' ? 'active' : ''}`}
                onClick={handleServicesClick}
              >
                <span>{t('services')}</span>
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z" />
                </svg>
              </button>

              <button
                className={`btn btn-secondary btn-large ${activeButton === 'contact' ? 'active' : ''}`}
                onClick={handleContactClick}
              >
                <span>{t('hero.sendApplication', 'Отправить заявку', 'Send Application')}</span>
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                </svg>
              </button>
            </div>

  
            <div className="hero-image-carousel">
              <div className="carousel-slide">
                <img src="/images/дом.jpg" alt="Construction project 1" />
              </div>
              <div className="carousel-slide">
                <img src="/images/дом2.jpg" alt="Construction project 2" />
              </div>
              <div className="carousel-slide">
                <img src="/images/дом3.jpg" alt="Construction project 3" />
              </div>
              <div className="carousel-slide">
                <img src="/images/дом4.jpg" alt="Construction project 4" />
              </div>
              <div className="carousel-slide">
                <img src="/images/дом5.jpg" alt="Construction project 5" />
              </div>
            </div>

 
            <div className="hero-description">
              <p>{getCompanyDescription()}</p>
            </div>


            <div className="hero-cta-block">
              <div className="cta-content">
                <h3>
                  {t('hero.ctaTitle', 'Готовы начать ваш проект?', 'Ready to start your project?')}
                </h3>
                <p>
                  {t(
                    'hero.ctaText',
                    'Оставьте заявку и получите бесплатную консультацию наших специалистов',
                    'Leave a request and get a free consultation from our specialists'
                  )}
                </p>
                <button
                  className="btn btn-accent btn-cta"
                  onClick={handleContactClick}
                >
                  {t('hero.leaveRequest', 'Оставить заявку', 'Leave Request')}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="hero-scroll-indicator" onClick={() => scrollToSection('about')}>
        <div className="scroll-arrow"></div>
        <span>{t('hero.scrollDown', 'Прокрутите вниз', 'Scroll down')}</span>
      </div>
    </section>
  )
}

export default Hero