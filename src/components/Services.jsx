import React from 'react'
import { useTranslation } from '../utils/useTranslation'
import './Services.css'

const Services = () => {
  const { t, currentLanguage } = useTranslation()

  const scrollToContact = () => {
    const element = document.getElementById('contact')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const services = [
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M19 7h-3V6c0-1.1-.9-2-2-2H10c-1.1 0-2 .9-2 2v1H5c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2zM10 6h4v1h-4V6zm9 13H5V9h14v10z"/>
        </svg>
      ),
      title: t('residentialConstruction'),
      description: currentLanguage === 'ru' 
        ? 'Комплексное строительство частных домов, коттеджей и жилых комплексов. От фундамента до крыши — полный цикл строительных работ.'
        : 'Жеке үйлөр, коттедждер жана жашоо комплекстерин комплекстүү куруу. Негизден чатырга чейин — курулуш иштеринин толук циклы.',
      features: currentLanguage === 'ru' 
        ? ['Современные материалы', 'Индивидуальные проекты', 'Гарантия 5 лет']
        : ['Заманбап материалдар', 'Жеке долбоорлор', '5 жыл кепилдик']
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      ),
      title: t('commercialConstruction'),
      description: currentLanguage === 'ru'
        ? 'Строительство офисных зданий, торговых центров и промышленных объектов. Профессиональный подход к каждому проекту.'
        : 'Кеңсе имараттары, соода борборлору жана өнөр жай объекттерин куруу. Ар бир долбоорго кесиптик мамиле.',
      features: currentLanguage === 'ru'
        ? ['Соблюдение стандартов', 'Современные технологии', 'Полное сопровождение']
        : ['Стандарттарды сактоо', 'Заманбап технологиялар', 'Толук колдоо']
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
        </svg>
      ),
      title: t('renovation'),
      description: currentLanguage === 'ru'
        ? 'Капитальный и косметический ремонт любой сложности. Отделка квартир, домов и офисов под ключ.'
        : 'Каалаган татаалдыктагы капиталдык жана косметикалык оңдоо. Патирлерди, үйлөрдү жана кеңселерди ачкычка чейин бүтүрүү.',
      features: currentLanguage === 'ru'
        ? ['Качественные материалы', 'Опытные мастера', 'Гибкие сроки']
        : ['Сапаттуу материалдар', 'Тажрыйбалуу усталар', 'Икемдүү мөөнөттөр']
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      ),
      title: t('design'),
      description: currentLanguage === 'ru'
        ? 'Архитектурное проектирование и дизайн интерьеров. Создаем уникальные и функциональные пространства.'
        : 'Архитектуралык долбоорлоо жана интерьердин дизайны. Өзгөчө жана функционалдуу мейкиндиктерди жаратабыз.',
      features: currentLanguage === 'ru'
        ? ['3D визуализация', 'Авторский надзор', 'Полная документация']
        : ['3D визуализация', 'Автордук көзөмөл', 'Толук документация']
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
        </svg>
      ),
      title: currentLanguage === 'ru' ? 'Консультации' : 'Консультациялар',
      description: currentLanguage === 'ru'
        ? 'Профессиональные консультации по всем вопросам строительства и ремонта. Помогаем принять правильные решения.'
        : 'Курулуш жана оңдоо боюнча бардык суроолорго кесиптик консультациялар. Туура чечимдерди кабыл алууга жардам беребиз.',
      features: currentLanguage === 'ru'
        ? ['Экспертная оценка', 'Техническая поддержка', 'Индивидуальный подход']
        : ['Эксперттик баалоо', 'Техникалык колдоо', 'Жеке мамиле']
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M19 7h-3V6c0-1.1-.9-2-2-2H10c-1.1 0-2 .9-2 2v1H5c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2zM10 6h4v1h-4V6zm9 13H5V9h14v10z"/>
        </svg>
      ),
      title: currentLanguage === 'ru' ? 'Гарантийное обслуживание' : 'Кепилдик кызмат',
      description: currentLanguage === 'ru'
        ? 'Полное гарантийное обслуживание всех выполненных работ. Быстрое устранение любых неисправностей.'
        : 'Аткарылган бардык иштердин толук кепилдик кызматы. Каалаган бузулуштарды тез оңдоо.',
      features: currentLanguage === 'ru'
        ? ['Гарантия до 5 лет', 'Круглосуточная поддержка', 'Бесплатные выезды']
        : ['5 жылга чейин кепилдик', 'Түн-күнү колдоо', 'Акысыз чыгуулар']
    }
  ]

  return (
    <section id="services" className="services">
      <div className="container">
        <div className="services-grid">
          {services.map((service, index) => (
            <div key={index} className="service-card">
              <div className="service-image">
                <img 
                  src={index === 0 ? 'https://content.onliner.by/news/1100x5616/197aacf4411649ee068d5ce4fe4e6ca9.jpeg' : 
                        index === 1 ? 'https://nosorogdesign.ru/upload/w_400/5e68e3e9e23a8-10-min.jpg' : 
                        index === 2 ? 'https://gostei.ru/uploads/posts/2024-02/1708805605_22013.jpg' : 
                        index === 3 ? 'https://studio-mint.com.kg/sites/default/files/styles/kartinka_stranica_diz_pro/public/house.jpg' : 
                        index === 4 ? 'https://help-booh.com.ua/wp-content/uploads/2019/11/business-konsalting.jpg' : 
                        'https://static.tildacdn.com/tild6634-3064-4335-b366-646539343431/photo.png'} 
                  alt={service.title}
                  onError={(e) => {
                    e.target.src = '/images/concrete.jpg';
                  }}
                />
              </div>
              
              <div className="service-content">
                <h3 className="service-title">{service.title}</h3>
                <p className="service-description">{service.description}</p>
                
                <ul className="service-features">
                  {service.features.map((feature, idx) => (
                    <li key={idx}>{feature}</li>
                  ))}
                </ul>
                
                <button 
                  className="service-cta-btn"
                  onClick={scrollToContact}
                >
                  {currentLanguage === 'ru' ? 'Оставить заявку' : 'Өтүнүч калтыруу'}
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="services-cta">
          <div className="cta-content">
            <h3>{currentLanguage === 'ru' ? 'Готовы начать проект?' : 'Долбоорду баштоого даярсызбы?'}</h3>
            <p>
              {currentLanguage === 'ru' 
                ? 'Свяжитесь с нами для консультации и расчета стоимости вашего проекта'
                : 'Долбооруңузду консультациялоо жана наркын эсептөө үчүн биз менен байланышыңыз'
              }
            </p>
            <button 
              className="cta-button"
              onClick={scrollToContact}
            >
              {currentLanguage === 'ru' ? 'Связаться с нами' : 'Биз менен байланышуу'}
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Services