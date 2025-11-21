import React, { useState } from 'react'
import { useTranslation } from '../utils/useTranslation'
import './Portfolio.css'

const Portfolio = () => {
  const { t, currentLanguage } = useTranslation()
  const [activeFilter, setActiveFilter] = useState('all')
  const [selectedProject, setSelectedProject] = useState(null)

 
  const projects = [
    {
      id: 1,
      title: currentLanguage === 'ru' ? 'Жилой комплекс "Ала-Тоо"' : 'Жашоо комплекси "Ала-Тоо"',
      category: 'residential',
      location: currentLanguage === 'ru' ? 'г. Бишкек, мкр. Джал' : 'Бишкек ш., Жал ч/а',
      duration: currentLanguage === 'ru' ? '18 месяцев' : '18 ай',
      year: '2023',
      area: '15,000 м²',
      description: currentLanguage === 'ru' 
        ? 'Современный жилой комплекс премиум-класса в центральной части города. Включает 120 квартир различной планировки, подземную парковку и зеленую зону отдыха.'
        : 'Шаардын борборундагы премиум класстагы заманбап жашоо комплекси. 120 ар түрдүү пландаштырылган батир, жер астындагы автоунаа токтотуучу жай жана жашыл эс алуу аймагын камтыйт.',
      image: 'https://holz-house.ru/userfiles/blog/2021/domamerica/Blog-write-2-400250-prv.jpg',
      features: currentLanguage === 'ru'
        ? ['Энергоэффективные технологии', 'Собственная котельная', 'Детская площадка', 'Охраняемая территория']
        : ['Энергия үнөмдөөчү технологиялар', 'Өзүнүн казан бөлмөсү', 'Балдар аянтчасы', 'Коргоочу аймак']
    },
    {
      id: 2,
      title: currentLanguage === 'ru' ? 'Торговый центр "Бишкек Парк"' : 'Соода борбору "Бишкек Парк"',
      category: 'commercial',
      location: currentLanguage === 'ru' ? 'г. Бишкек, пр. Чуй' : 'Бишкек ш., Чүй пр.',
      duration: currentLanguage === 'ru' ? '24 месяца' : '24 ай',
      year: '2022',
      area: '25,000 м²',
      description: currentLanguage === 'ru'
        ? 'Крупный торговый центр с современной архитектурой. 4 этажа торговых площадей, кинотеатр, фуд-корт и многоуровневая парковка на 500 машиномест.'
        : 'Заманбап архитектура менен чоң соода борбору. 4 кабаттуу соода аянттары, кинотеатр, тамак-аш дүкөндөрү жана 500 автоунааны токтотуу үчүн көп деңгээлдүү автоунаа токтотуучу жай.',
      image: 'https://avatars.mds.yandex.net/get-altay/758957/2a00000186b287416eda5824bad41ecd35e6/orig',
      features: currentLanguage === 'ru'
        ? ['Современные инженерные системы', 'Панорамное остекление', 'Система пожаротушения', 'Smart-технологии']
        : ['Заманбап инженердик системалар', 'Панорамалык айнектер', 'Өрт өчүрүү системасы', 'Smart-технологиялар']
    },
    {
      id: 3,
      title: currentLanguage === 'ru' ? 'Офисное здание "Центр"' : 'Кеңсе имараты "Борбор"',
      category: 'commercial',
      location: currentLanguage === 'ru' ? 'г. Бишкек, ул. Киевская' : 'Бишкек ш., Киев к.',
      duration: currentLanguage === 'ru' ? '15 месяцев' : '15 ай',
      year: '2023',
      area: '8,500 м²',
      description: currentLanguage === 'ru'
        ? 'Современное офисное здание класса A с эко-технологиями. 12 этажей офисных помещений с возможностью гибкой планировки и конференц-залами.'
        : 'Эко-технологиялар менен A класстагы заманбап кеңсе имараты. Ийкемдүү пландаштыруу мүмкүнчүлүгү жана конференц-залдары менен 12 кабаттуу кеңсе бөлмөлөрү.',
      image: 'https://bigfoto.name/uploads/posts/2021-11/1636885524_1-bigfoto-name-p-ofisnie-zdaniya-2.jpg',
      features: currentLanguage === 'ru'
        ? ['LEED сертификация', 'Умная система кондиционирования', 'Высокоскоростные лифты', 'Зеленая крыша']
        : ['LEED сертификациясы', 'Акылдуу кондиционер системасы', 'Жогорку ылдамдыктагы лифттер', 'Жашыл чатыр']
    },
    {
      id: 4,
      title: currentLanguage === 'ru' ? 'Частный дом "Элит"' : 'Жеке үй "Элит"',
      category: 'residential',
      location: currentLanguage === 'ru' ? 'г. Бишкек, с. Ала-Арча' : 'Бишкек ш., Ала-Арча с.',
      duration: currentLanguage === 'ru' ? '12 месяцев' : '12 ай',
      year: '2023',
      area: '450 м²',
      description: currentLanguage === 'ru'
        ? 'Элитный частный дом с авторским дизайном и ландшафтом. Включает бассейн, сауну, гараж на 3 автомобиля и большую террасу для отдыха.'
        : 'Автордук дизайн жана ландшафт менен элиталык жеке үй. Бассейн, сауна, 3 автоунаага арналган гараж жана эс алуу үчүн чоң террасаны камтыйт.',
      image: 'https://ro-stroj.ru/uploads/images/00-00-2018-02.jpg',
      features: currentLanguage === 'ru'
        ? ['Авторский дизайн', 'Умный дом', 'Ландшафтный дизайн', 'Система безопасности']
        : ['Автордук дизайн', 'Акылдуу үй', 'Ландшафт дизайны', 'Коопсуздук системасы']
    },
    {
      id: 5,
      title: currentLanguage === 'ru' ? 'Реконструкция отеля "Достук"' : '"Достук" мейманканасын кайра куруу',
      category: 'renovation',
      location: currentLanguage === 'ru' ? 'г. Бишкек, ул. Фрунзе' : 'Бишкек ш., Фрунзе к.',
      duration: currentLanguage === 'ru' ? '10 месяцев' : '10 ай',
      year: '2022',
      area: '3,200 м²',
      description: currentLanguage === 'ru'
        ? 'Полная реконструкция исторического отеля с сохранением архитектурного стиля. Модернизация всех инженерных систем и дизайна интерьеров.'
        : 'Архитектуралык стилди сактоо менен тарыхый мейманкананы толук кайра куруу. Бардык инженердик системаларды жана интерьер дизайнын модернизациялоо.',
      image: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/06/db/45/a8/plaza-hotel.jpg?w=1200&h=-1&s=1',
      features: currentLanguage === 'ru'
        ? ['Сохранение исторического фасада', 'Современные номера', 'Новая система отопления', 'Ресторан и конференц-зал']
        : ['Тарыхый фасадды сактоо', 'Заманбап бөлмөлөр', 'Жаңы жылытуу системасы', 'Ресторан жана конференц-зал']
    },
    {
      id: 6,
      title: currentLanguage === 'ru' ? 'Производственный комплекс' : 'Өндүрүш комплекси',
      category: 'commercial',
      location: currentLanguage === 'ru' ? 'г. Бишкек, промзона' : 'Бишкек ш., өнөр жай аймагы',
      duration: currentLanguage === 'ru' ? '20 месяцев' : '20 ай',
      year: '2021',
      area: '12,000 м²',
      description: currentLanguage === 'ru'
        ? 'Современный производственный комплекс с административным корпусом. Включает производственные цеха, складские помещения и офисы.'
        : 'Административдик корпус менен заманбап өндүрүш комплекси. Өндүрүш цехтерин, кампа бөлмөлөрүн жана кеңселерди камтыйт.',
      image: 'https://www.m24.ru/b/d/nBkSUhL2hFgmn8exJr6BrNOp2Z3z8Zj21iDEh_fH_nKUPXuaDyXTjHou4MVO6BCVoZKf9GqVe5Q_CPawk214LyWK9G1N5ho=XDHaiBZBej4vcckStnesfA.jpg',
      features: currentLanguage === 'ru'
        ? ['Промышленная вентиляция', 'Подъемные механизмы', 'Административный блок', 'Охранная система']
        : ['Өнөр жай желдетүүсү', 'Көтөрүүчү механизмдер', 'Административдик блок', 'Коргоо системасы']
    }
  ]

  const categories = [
    { id: 'all', label: currentLanguage === 'ru' ? 'Все проекты' : 'Бардык долбоорлор' },
    { id: 'residential', label: currentLanguage === 'ru' ? 'Жилые' : 'Жашоо үйлөр' },
    { id: 'commercial', label: currentLanguage === 'ru' ? 'Коммерческие' : 'Коммерциялык' },
    { id: 'renovation', label: currentLanguage === 'ru' ? 'Ремонт' : 'Оңдоо' }
  ]

  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeFilter)

  const openLightbox = (project) => {
    setSelectedProject(project)
    document.body.style.overflow = 'hidden'
  }

  const closeLightbox = () => {
    setSelectedProject(null)
    document.body.style.overflow = 'unset'
  }

  return (
    <section id="portfolio" className="portfolio">
      <div className="container">
        <div className="portfolio-header">
          <div className="portfolio-image">
  
          </div>
          <h2 className="section-title">{t('portfolioTitle')}</h2>
          <p className="section-subtitle">{t('portfolioSubtitle')}</p>
        </div>

        <div className="portfolio-filters">
          {categories.map((category) => (
            <button
              key={category.id}
              className={`filter-btn ${activeFilter === category.id ? 'active' : ''}`}
              onClick={() => setActiveFilter(category.id)}
            >
              {category.label}
            </button>
          ))}
        </div>

        <div className="portfolio-grid">
          {filteredProjects.map((project) => (
            <div key={project.id} className="portfolio-card">
              <div className="portfolio-image">
                <img 
                  src={project.image} 
                  alt={project.title}
                  onError={(e) => {
                    e.target.src = '/images/concrete.jpg';
                  }}
                />
                <div className="portfolio-overlay">
                  <button 
                    className="view-project-btn"
                    onClick={() => openLightbox(project)}
                  >
                    {t('viewProject')}
                  </button>
                </div>
              </div>
              <div className="portfolio-content">
                <div className="portfolio-meta">
                  <span className="portfolio-year">{project.year}</span>
                  <span className="portfolio-area">{project.area}</span>
                </div>
                <h3 className="portfolio-title">{project.title}</h3>
                <p className="portfolio-location">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="location-icon">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                  </svg>
                  {project.location}
                </p>
                <p className="portfolio-duration">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="duration-icon">
                    <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/>
                    <path d="M12.5 7H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>
                  </svg>
                  {project.duration}
                </p>
              </div>
            </div>
          ))}
        </div>

        {selectedProject && (
          <div className="lightbox-overlay" onClick={closeLightbox}>
            <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
              <button className="lightbox-close" onClick={closeLightbox}>
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                </svg>
              </button>
              
              <div className="lightbox-image">
                <img 
                  src={selectedProject.image} 
                  alt={selectedProject.title}
                  onError={(e) => {
                    e.target.src = '/images/concrete.jpg';
                  }}
                />
              </div>
              
              <div className="lightbox-details">
                <h3 className="lightbox-title">{selectedProject.title}</h3>
                
                <div className="lightbox-meta">
                  <div className="meta-item">
                    <span className="meta-label">{currentLanguage === 'ru' ? 'Местоположение:' : 'Жайгашкан жери:'}</span>
                    <span className="meta-value">{selectedProject.location}</span>
                  </div>
                  <div className="meta-item">
                    <span className="meta-label">{currentLanguage === 'ru' ? 'Сроки:' : 'Мөөнөттөр:'}</span>
                    <span className="meta-value">{selectedProject.duration}</span>
                  </div>
                  <div className="meta-item">
                    <span className="meta-label">{currentLanguage === 'ru' ? 'Площадь:' : 'Аянты:'}</span>
                    <span className="meta-value">{selectedProject.area}</span>
                  </div>
                  <div className="meta-item">
                    <span className="meta-label">{currentLanguage === 'ru' ? 'Год:' : 'Жылы:'}</span>
                    <span className="meta-value">{selectedProject.year}</span>
                  </div>
                </div>
                
                <p className="lightbox-description">{selectedProject.description}</p>
                
                <div className="lightbox-features">
                  <h4>{currentLanguage === 'ru' ? 'Особенности проекта:' : 'Долбоордун өзгөчөлүктөрү:'}</h4>
                  <ul>
                    {selectedProject.features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default Portfolio