import React, { useEffect } from 'react'
import { useTranslation } from '../utils/useTranslation'
import Portfolio from '../components/Portfolio'
import '../styles/pages.css'

const PortfolioPage = () => {
  const { t, currentLanguage } = useTranslation()

  useEffect(() => {

    document.title = `Jetibay Group - ${currentLanguage === 'ru' ? 'Портфолио' : 'Portfolio'}`
  }, [currentLanguage])

  return (
    <main className="page-main portfolio-page">
      <div className="page-content">
        <header className="page-header">
          <div className="page-wrapper">
            <h1 className="page-title">
              {currentLanguage === 'ru' ? 'Наше портфолио' : 'Our Portfolio'}
            </h1>
            <p className="page-subtitle">
              {currentLanguage === 'ru' 
                ? 'Посмотрите на наши успешно реализованные проекты'
                : 'Explore our successfully completed projects'
              }
            </p>
          </div>
        </header>
        <section className="page-section">
          <Portfolio />
        </section>
      </div>
    </main>
  )
}

export default PortfolioPage