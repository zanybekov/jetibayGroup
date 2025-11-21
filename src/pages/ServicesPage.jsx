import React, { useEffect } from 'react'
import { useTranslation } from '../utils/useTranslation'
import Services from '../components/Services'
import '../styles/pages.css'

const ServicesPage = () => {
  const { t, currentLanguage } = useTranslation()

  useEffect(() => {

    document.title = `Jetibay Group - ${currentLanguage === 'ru' ? 'Услуги' : 'Services'}`
  }, [currentLanguage])

  return (
    <main className="page-main services-page">
      <div className="page-content">
        <section className="page-section">
          <Services />
        </section>
      </div>
    </main>
  )
}

export default ServicesPage