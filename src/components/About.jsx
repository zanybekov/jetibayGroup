import React from 'react'
import { useTranslation } from '../utils/useTranslation'
import './About.css'

const About = () => {
  const { t, currentLanguage } = useTranslation()

  const stats = [
    {
      number: '50+',
      label: currentLanguage === 'ru' ? 'Завершенных проектов' : 'Аяктаган долбоорлор'
    },
    {
      number: '2016',
      label: currentLanguage === 'ru' ? 'Год основания' : 'Түзүлгөн жылы'
    },
    {
      number: '100%',
      label: currentLanguage === 'ru' ? 'Довольных клиентов' : 'Кубанган кардарлар'
    },
    {
      number: '25+',
      label: currentLanguage === 'ru' ? 'Специалистов' : 'Адистер'
    }
  ]

  const achievements = [
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      ),
      title: currentLanguage === 'ru' ? 'Лучшая строительная компания 2023' : '2023-жылдагы мыкты курулуш компаниясы',
      description: currentLanguage === 'ru' ? 'Награда от Ассоциации строителей КР' : 'Кыргыз Республикасынын курулушчулар ассоциациясынын сыйлыгы'
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>
      ),
      title: currentLanguage === 'ru' ? 'ISO 9001:2015' : 'ISO 9001:2015',
      description: currentLanguage === 'ru' ? 'Сертификат качества международного стандарта' : 'Эл аралык стандарттын сапат сертификаты'
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M19 7h-3V6c0-1.1-.9-2-2-2H10c-1.1 0-2 .9-2 2v1H5c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2zM10 6h4v1h-4V6zm9 13H5V9h14v10z"/>
        </svg>
      ),
      title: currentLanguage === 'ru' ? 'Лицензия на строительство' : 'Курулуш лицензиясы',
      description: currentLanguage === 'ru' ? 'Государственная лицензия на все виды строительных работ' : 'Курулуш иштеринин бардык түрлөрүнө мамлекеттик лицензия'
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      ),
      title: currentLanguage === 'ru' ? 'Экологичный подход' : 'Экологиялык мамиле',
      description: currentLanguage === 'ru' ? 'Признание за использование экологичных материалов и технологий' : 'Экологиялык материалдар менен технологияларды колдонуу үчүн таануу'
    }
  ]

  const teamMembers = [
    {
      name: currentLanguage === 'ru' ? 'Джаныбеков Тилек' : 'Джаныбеков Тилек',
      position: currentLanguage === 'ru' ? 'Генеральный директор' : 'Башкы директор',
      experience: currentLanguage === 'ru' ? '15 лет опыта' : '15 жыл тажрыйба',
      image: 'https://img3.stockfresh.com/files/k/kraska/m/97/808337_stock-photo-user-icon.jpg'
    },
    {
      name: currentLanguage === 'ru' ? 'Джаныбеков Алибек' : 'Джаныбеков Алибек',
      position: currentLanguage === 'ru' ? 'Главный архитектор' : 'Башкы архитектор',
      experience: currentLanguage === 'ru' ? '12 лет опыта' : '12 жыл тажрыйба',
      image: 'https://img3.stockfresh.com/files/k/kraska/m/97/808337_stock-photo-user-icon.jpg'
    },
    {
      name: currentLanguage === 'ru' ? 'Джаныбеков Адилет' : 'Джаныбеков Адилет',
      position: currentLanguage === 'ru' ? 'Прораб' : 'Прораб',
      experience: currentLanguage === 'ru' ? '10 лет опыта' : '10 жыл тажрыйба',
      image: 'https://img3.stockfresh.com/files/k/kraska/m/97/808337_stock-photo-user-icon.jpg'
    }
  ]

  const services = [
    {
      title: currentLanguage === 'ru' ? 'Строительство жилых комплексов' : 'Жашоо комплекстерин куруу',
      description: currentLanguage === 'ru' ? 'Проектирование и строительство современных жилых комплексов под ключ' : 'Заманбап жашоо комплекстерин долбоорлоо жана ачкычка чейин куруу'
    },
    {
      title: currentLanguage === 'ru' ? 'Коммерческие объекты' : 'Коммерциялык объекттер',
      description: currentLanguage === 'ru' ? 'Строительство офисных зданий, торговых центров и промышленных объектов' : 'Кеңсе имараттары, соода борборлору жана өнөр жай объекттерин куруу'
    },
    {
      title: currentLanguage === 'ru' ? 'Реконструкция' : 'Кайра куруу',
      description: currentLanguage === 'ru' ? 'Капитальный ремонт и реконструкция существующих зданий' : 'Учурдагы имараттарды капитальдүү оңдоо жана кайра куруу'
    },
    {
      title: currentLanguage === 'ru' ? 'Архитектурный дизайн' : 'Архитектуралык дизайн',
      description: currentLanguage === 'ru' ? 'Проектирование и дизайн интерьеров и экстерьеров' : 'Интерьер жана экстерьерди долбоорлоо жана дизайндоо'
    }
  ]

  return (
    <section id="about" className="about">
      <div className="container">

        <div className="about-stats-section">
          <div className="stats-container">
            <div className="stats-grid">
              {stats.map((stat, index) => (
                <div key={index} className="stat-card">
                  <div className="stat-number">{stat.number}</div>
                  <div className="stat-label">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="company-story">
          <div className="story-content">
            <div className="story-text">
              <h2 className="section-heading">
                {currentLanguage === 'ru' ? 'Наша история' : 'Биздин тарых'}
              </h2>
              <div className="story-timeline">
                <div className="timeline-item">
                  <div className="timeline-year">2016</div>
                  <div className="timeline-content">
                    <h3>{currentLanguage === 'ru' ? 'Основание компании' : 'Компаниянын негизделүүсү'}</h3>
                    <p>
                      {currentLanguage === 'ru' 
                        ? 'Jetibay Group была основана группой опытных строителей и архитекторов с целью создания надежной строительной компании.'
                        : 'Jetibay Group тажрыйбалуу курулушчулар жана архитекторлордун тобу тарабынан ишенимдүү курулуш компаниясын түзүү максатында негизделген.'}
                    </p>
                  </div>
                </div>
                <div className="timeline-item">
                  <div className="timeline-year">2018</div>
                  <div className="timeline-content">
                    <h3>{currentLanguage === 'ru' ? 'Первые крупные проекты' : 'Биринчи чоң долбоорлор'}</h3>
                    <p>
                      {currentLanguage === 'ru'
                        ? 'Выполнены первые крупные жилые проекты, что укрепило репутацию компании на рынке.'
                        : 'Биринчи чоң жашоо долбоорлору аткарылып, компаниянын базардагы имиджи күчөтүлдү.'}
                    </p>
                  </div>
                </div>
                <div className="timeline-item">
                  <div className="timeline-year">2021</div>
                  <div className="timeline-content">
                    <h3>{currentLanguage === 'ru' ? 'Расширение направлений' : 'Багыттарды кеңейтүү'}</h3>
                    <p>
                      {currentLanguage === 'ru'
                        ? 'Компания расширила свои направления деятельности, начав выполнять коммерческие и промышленные проекты.'
                        : 'Компания иш аракеттеринин багыттарын кеңейтип, коммерциялык жана өнөр жай долбоорлорун аткара баштады.'}
                    </p>
                  </div>
                </div>
                <div className="timeline-item">
                  <div className="timeline-year">2023</div>
                  <div className="timeline-content">
                    <h3>{currentLanguage === 'ru' ? 'Лидерство на рынке' : 'Базардагы лидерлик'}</h3>
                    <p>
                      {currentLanguage === 'ru'
                        ? 'Признана лучшей строительной компанией года и продолжает расти, реализуя масштабные проекты.'
                        : 'Жылдын мыкты курулуш компаниясы деп таанылып, ири долбоорлорду ишке ашырып жатат.'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="story-image">
              <img src="https://catalog-plans.ru/files/2016/04/29/01972a012327ca5a714aa01ef430a4cc.jpg" alt="Company History" />
            </div>
          </div>
        </div>


        <div className="about-values">
          <h2 className="section-heading">
            {currentLanguage === 'ru' ? 'Наши ценности' : 'Биздин баалуулуктар'}
          </h2>
          <div className="values-grid">
            <div className="value-item">
              <div className="value-icon">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              </div>
              <h3>{currentLanguage === 'ru' ? 'Качество' : 'Сапат'}</h3>
              <p>
                {currentLanguage === 'ru' 
                  ? 'Мы используем только качественные материалы и проверенные технологии.'
                  : 'Биз сапаттуу материалдарды жана текшерилген технологияларды гана колдонобуз.'}
              </p>
            </div>
            <div className="value-item">
              <div className="value-icon">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
              </div>
              <h3>{currentLanguage === 'ru' ? 'Надежность' : 'Ишенимдүүлүк'}</h3>
              <p>
                {currentLanguage === 'ru'
                  ? 'Соблюдаем сроки и выполняем все обязательства перед клиентами.'
                  : 'Мөөнөттөрдү сактайбыз жана кардарлардын алдындагы милдеттемелерди аткарабыз.'}
              </p>
            </div>
            <div className="value-item">
              <div className="value-icon">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.14,12.94c0.04-0.3,0.06-0.61,0.06-0.94c0-0.32-0.02-0.64-0.07-0.94l2.03-1.58c0.18-0.14,0.23-0.41,0.12-0.61 l-1.92-3.32c-0.12-0.22-0.37-0.29-0.59-0.22l-2.39 0.96c-0.5-0.38-1.03-0.7-1.62-0.94L14.4 2.81c-0.04-0.24-0.24-0.41-0.48-0.41 h-3.84c-0.24 0-0.43 0.17-0.47 0.41L9.25 5.35C8.66 5.59 8.12 5.92 7.63 6.29L5.24 5.33c-0.22-0.08-0.47 0-0.59 0.22L2.74 8.87 C2.62 9.08 2.66 9.34 2.86 9.48l2.03 1.58C4.84 11.36 4.8 11.69 4.8 12s0.02 0.64 0.07 0.94l-2.03 1.58 c-0.18 0.14-0.23 0.41-0.12 0.61l1.92 3.32c0.12 0.22 0.37 0.29 0.59 0.22l2.39-0.96c0.5 0.38 1.03 0.7 1.62 0.94l0.36 2.54 c0.05 0.24 0.24 0.41 0.48 0.41h3.84c0.24 0 0.44-0.17 0.47-0.41l0.36-2.54c0.59-0.24 1.13-0.56 1.62-0.94l2.39 0.96 c0.22 0.08 0.47 0 0.59-0.22l1.92-3.32c0.12-0.22 0.07-0.47-0.12-0.61L19.14 12.94z M12 15.6c-1.98 0-3.6-1.62-3.6-3.6 s1.62-3.6 3.6-3.6s3.6 1.62 3.6 3.6S13.98 15.6 12 15.6z"/>
                </svg>
              </div>
              <h3>{currentLanguage === 'ru' ? 'Инновации' : 'Инновациялар'}</h3>
              <p>
                {currentLanguage === 'ru'
                  ? 'Применяем современные технологии и инновационные решения.'
                  : 'Заманбап технологияларды жана инновациялык чечимдерди колдонобуз.'}
              </p>
            </div>
            <div className="value-item">
              <div className="value-icon">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zm4 18v-6h2.5l-2.54-7.63A1.5 1.5 0 0 0 18.54 8H16c-.8 0-1.54.37-2 1l-3 4v7h2v7h3v-7h2v7h3z"/>
                </svg>
              </div>
              <h3>{currentLanguage === 'ru' ? 'Профессионализм' : 'Кесиптилдик'}</h3>
              <p>
                {currentLanguage === 'ru'
                  ? 'Наша команда состоит из высококвалифицированных специалистов.'
                  : 'Биздин команда жогорку квалификациялуу адистерден турат.'}
              </p>
            </div>
          </div>
        </div>


        <div className="about-services">
          <h2 className="section-heading">
            {currentLanguage === 'ru' ? 'Наши услуги' : 'Биздин кызматтар'}
          </h2>
          <div className="services-grid">
            {services.map((service, index) => (
              <div key={index} className="service-card">
                <h3 className="service-title">{service.title}</h3>
                <p className="service-description">{service.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="about-team">
          <h2 className="section-heading">
            {currentLanguage === 'ru' ? 'Наша команда' : 'Биздин команда'}
          </h2>
          <p className="team-intro">
            {currentLanguage === 'ru'
              ? 'Профессиональная команда опытных специалистов, которые воплощают ваши мечты в реальность'
              : 'Сиздин кыялдарыңызды чындыкка айландырган тажрыйбалуу адистердин кесиптик командасы'
            }
          </p>
          <div className="team-grid">
            {teamMembers.map((member, index) => (
              <div key={index} className="team-member">
                <div className="member-photo">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    onError={(e) => {
                      e.target.src = '/images/concrete.jpg';
                    }}
                  />
                </div>
                <div className="member-info">
                  <h3 className="member-name">{member.name}</h3>
                  <p className="member-position">{member.position}</p>
                  <p className="member-experience">{member.experience}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

    
        <div className="about-achievements">
          <h2 className="section-heading">
            {currentLanguage === 'ru' ? 'Наши достижения' : 'Биздин жетишкендиктер'}
          </h2>
          <div className="achievements-grid">
            {achievements.map((achievement, index) => (
              <div key={index} className="achievement-card">
                <div className="achievement-icon">
                  {achievement.icon}
                </div>
                <h3 className="achievement-title">{achievement.title}</h3>
                <p className="achievement-description">{achievement.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default About