import React, { useEffect } from 'react'
import { useTranslation } from '../utils/useTranslation'
import Contact from '../components/Contact'
import '../styles/pages.css'

const ContactPage = () => {
  const { t, currentLanguage } = useTranslation()

  useEffect(() => {

    document.title = `Jetibay Group - ${currentLanguage === 'ru' ? 'Контакты' : 'Contact'}`
  }, [currentLanguage])

  return (
    <main className="page-main contact-page">
      <div className="page-content">
        <header className="page-header">
          <div className="page-wrapper">
            <h1 className="page-title">
            </h1>
            <p className="page-subtitle">
            </p>
          </div>
        </header>
        <section className="page-section">
          <Contact />
        </section>
      </div>
    </main>
  )
}

export default ContactPage