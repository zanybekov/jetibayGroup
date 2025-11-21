import React, { useState, useEffect } from 'react'
import { useTranslation } from '../utils/useTranslation'
import EmailService from '../services/EmailService'
import './Contact.css'

const Contact = () => {
  const { t, currentLanguage } = useTranslation()
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus(null)
    
    try {

      const result = await EmailService.sendContactForm(formData)
      
      if (result.success) {

        setFormData({
          name: '',
          phone: '',
          email: '',
          message: ''
        })
        setSubmitStatus('success')
      } else {
        setSubmitStatus('error')
      }
    } catch (error) {
      console.error('Form submission error:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

 
  useEffect(() => {
    if (submitStatus) {
      const timer = setTimeout(() => {
        setSubmitStatus(null)
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [submitStatus])

  return (
    <section id="contact" className="contact">
      <div className="container">
        <div className="contact-header">
          <div className="contact-image">
            <img src="/images/drill.jpg" alt="Contact Us" />
          </div>
          <h2 className="section-title">{t('contact.formTitle', 'Отправить заявку', 'Арыз жөнөтүү')}</h2>
          <p className="contact-description">{t('contact.formSubtitle', 'Оставьте свои контакты и мы свяжемся с вами', 'Байланыш маалыматыңызды калтырыңыз, биз сиз менен байланышабыз')}</p>
        </div>

        <div className="contact-content">
          <div className="contact-form-section">
            <div className="form-header">
              <h3>{t('contact.formTitle', 'Отправить заявку', 'Арыз жөнөтүү')}</h3>
              <p>{t('contact.formSubtitle', 'Оставьте свои контакты и мы свяжемся с вами', 'Байланыш маалыматыңызды калтырыңыз, биз сиз менен байланышабыз')}</p>
            </div>
            
            {submitStatus && (
              <div className={`status-message ${submitStatus}`}>
                {submitStatus === 'success' && (
                  <span>{t('contact.successMessage', 'Сообщение успешно отправлено!', 'Кабар ийгиликтүү жөнөтүлдү!')}</span>
                )}
                {submitStatus === 'error' && (
                  <span>{t('contact.errorMessage', 'Ошибка отправки. Попробуйте еще раз.', 'Жөнөтүүдө ката. Кайра аракет кылыңыз.')}</span>
                )}
              </div>
            )}
            
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <input
                    type="text"
                    name="name"
                    placeholder={t('name')}
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <input
                    type="tel"
                    name="phone"
                    placeholder={t('phone')}
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="form-input"
                  />
                </div>
              </div>
              
              <div className="form-group">
                <input
                  type="email"
                  name="email"
                  placeholder={t('email')}
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="form-input"
                />
              </div>
              
              <div className="form-group">
                <textarea
                  name="message"
                  placeholder={t('message')}
                  rows="5"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  className="form-input form-textarea"
                ></textarea>
              </div>
              
              <button type="submit" className="submit-btn" disabled={isSubmitting}>
                {isSubmitting ? (
                  <span className="btn-loading">
                    <span className="spinner"></span>
                    {t('contact.sending', 'Отправка...', 'Жөнөтүлүүдө...')}
                  </span>
                ) : (
                  t('contact.sendApplication', 'Отправить заявку', 'Арыз жөнөтүү')
                )}
              </button>
            </form>
          </div>

          <div className="contact-info-section">
            <div className="contact-info">
              <h3 className="contact-info-title">{t('contact.ourContacts', 'Наши контакты', 'Биздин байланыштар')}</h3>
              
              <div className="contact-item">
                <div className="contact-icon">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                  </svg>
                </div>
                <div className="contact-details">
                  <h4>{t('contact.address', 'Адрес', 'Дарек')}</h4>
                  <p>г. Бишкек, ул. Турусбекова 109</p>
                  <p className="address-note">{t('contact.nearCenter', 'В центре города', 'Шаардын борборунда')}</p>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-icon">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                  </svg>
                </div>
                <div className="contact-details">
                  <h4>{t('contact.phone', 'Телефон', 'Телефон')}</h4>
                  <p><a href="tel:+996706688886">+996 (706) 688-886</a></p>
                  <p><a href="tel:+996552664461">+996 (552) 664-461</a></p>
                  <p className="phone-note">{t('contact.callFree', 'Звонки бесплатные', 'Чалуулар бекер')}</p>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-icon">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                  </svg>
                </div>
                <div className="contact-details">
                  <h4>{t('contact.email', 'Email', 'Email')}</h4>
                  <p><a href="janybekovadilet91@gmail.com">janybekovadilet91@gmail.com</a></p>
                  <p><a href="zanybekovadilet29@gmail.com">zanybekovadilet29@gmail.com</a></p>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-icon">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/>
                    <path d="M12.5 7H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>
                  </svg>
                </div>
                <div className="contact-details">
                  <h4>{t('contact.workHours', 'Время работы', 'Иш убактысы')}</h4>
                  <p>{t('contact.weekdays', 'Пн-Пт: 09:00 - 18:00', 'Дш-Жм: 09:00 - 18:00')}</p>
                  <p>{t('contact.saturday', 'Сб: 10:00 - 16:00', 'Иш: 10:00 - 16:00')}</p>
                  <p>{t('contact.sunday', 'Вс: выходной', 'Жк: эс алуу')}</p>
                </div>
              </div>
            </div>

            <div className="contact-methods">
              <h4>{t('contact.formSubtitle', 'Оставьте свои контакты и мы свяжемся с вами', 'Байланыш маалыматыңызды калтырыңыз, биз сиз менен байланышабыз')}</h4>
              <div className="social-links">
                <a href="https://wa.me/996555123456" className="social-link whatsapp" target="_blank" rel="noopener noreferrer">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                  </svg>
                  <span>WhatsApp</span>
                </a>
                <a href="https://t.me/jetibaygroup" className="social-link telegram" target="_blank" rel="noopener noreferrer">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                  </svg>
                  <span>Telegram</span>
                </a>
              </div>
            </div>
          </div>
        </div>
        
        <div className="map-section">
          <h3>{t('contact.findUs', 'Как нас найти', 'Бизди кантип табса болот')}</h3>
          <div className="map-container">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2925.0!2d74.606!3d42.874!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x389eb7dc81c6a653%3A0x1e5c8b1f1a5b9a7a!2z0YPQuy4g0KLRg9GA0YPRgdCx0LXQutC-0LLQsCAxMDksINCR0LjRiNC60LXQug%3D%3D!5e0!3m2!1sru!2skg!4v1633024800000!5m2!1sru!2skg"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Jetibay Group Office - ул. Турусбекова 109, Бишкек"
            ></iframe>
          </div>
          <div className="map-info">
            <p>{t('contact.mapNote', 'Офис находится на улице Турусбекова, удобная парковка для клиентов', 'Кеңсе Турусбеков көчөсүндө, кардарлар үчүн ыңгайлуу автотокток')}</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact