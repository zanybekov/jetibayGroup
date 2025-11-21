import React, { useState, useEffect } from 'react'
import { useTranslation } from '../utils/useTranslation'
import './ProjectCarousel.css'

const ProjectCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const { t, currentLanguage } = useTranslation()

  const projects = [
    {
      id: 1,
      title: currentLanguage === 'ru' ? 'Жилой комплекс "Ала-Тоо"' : 'Residential Complex "Ala-Too"',
      description: currentLanguage === 'ru' ? 'Современный жилой комплекс с развитой инфраструктурой' : 'Modern residential complex with developed infrastructure',
      image: '/images/concrete.jpg',
      category: currentLanguage === 'ru' ? 'Жилищное строительство' : 'Residential Construction',
      year: '2023'
    },
    {
      id: 2,
      title: currentLanguage === 'ru' ? 'Торговый центр "Азия Молл"' : 'Shopping Center "Asia Mall"',
      description: currentLanguage === 'ru' ? 'Многофункциональный торговый комплекс в центре города' : 'Multifunctional shopping complex in the city center',
      image: '/images/red-brick.jpg',
      category: currentLanguage === 'ru' ? 'Коммерческая недвижимость' : 'Commercial Real Estate',
      year: '2022'
    },
    {
      id: 3,
      title: currentLanguage === 'ru' ? 'Офисное здание "Бизнес Парк"' : 'Office Building "Business Park"',
      description: currentLanguage === 'ru' ? 'Современное офисное здание класса А+' : 'Modern A+ class office building',
      image: '/images/metal-profile.jpg',
      category: currentLanguage === 'ru' ? 'Офисная недвижимость' : 'Office Real Estate',
      year: '2023'
    },
    {
      id: 4,
      title: currentLanguage === 'ru' ? 'Коттеджный поселок "Green Hills"' : 'Cottage Village "Green Hills"',
      description: currentLanguage === 'ru' ? 'Элитный коттеджный поселок с ландшафтным дизайном' : 'Elite cottage village with landscape design',
      image: '/images/glass-unit.jpg',
      category: currentLanguage === 'ru' ? 'Загородная недвижимость' : 'Suburban Real Estate',
      year: '2024'
    },
    {
      id: 5,
      title: currentLanguage === 'ru' ? 'Реконструкция исторического здания' : 'Historical Building Reconstruction',
      description: currentLanguage === 'ru' ? 'Восстановление архитектурного памятника XIX века' : 'Restoration of 19th century architectural monument',
      image: '/images/timber.jpg',
      category: currentLanguage === 'ru' ? 'Реконструкция' : 'Reconstruction',
      year: '2022'
    }
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % projects.length)
    }, 5000) 

    return () => clearInterval(interval)
  }, [projects.length])

  const nextSlide = () => {
    setCurrentSlide(prev => (prev + 1) % projects.length)
  }

  const prevSlide = () => {
    setCurrentSlide(prev => (prev - 1 + projects.length) % projects.length)
  }

  const goToSlide = (index) => {
    setCurrentSlide(index)
  }

  return (
    <div className="project-carousel">
      <div className="carousel-header">
        <h3>{currentLanguage === 'ru' ? 'Наши реализованные проекты' : 'Our Completed Projects'}</h3>
        <p>{currentLanguage === 'ru' ? 'Портфолио успешно завершенных строительных объектов' : 'Portfolio of successfully completed construction projects'}</p>
      </div>
      
      <div className="carousel-container">
        <button className="carousel-btn prev-btn" onClick={prevSlide}>
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
          </svg>
        </button>

        <div className="carousel-wrapper">
          <div 
            className="carousel-track"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {projects.map((project, index) => (
              <div key={project.id} className="carousel-slide">
                <div className="project-card">
                  <div 
                    className="project-image"
                    style={{
                      backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${project.image})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      backgroundRepeat: 'no-repeat',
                      width: '100%',
                      height: '100%'
                    }}
                  >
                    <div className="image-overlay"></div>
                  </div>
                  <div className="project-info">
                    <div className="project-category">{project.category}</div>
                    <h4 className="project-title">{project.title}</h4>
                    <p className="project-description">{project.description}</p>
                    <div className="project-meta">
                      <span className="project-year">{currentLanguage === 'ru' ? 'Год: ' : 'Year: '}{project.year}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button className="carousel-btn next-btn" onClick={nextSlide}>
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z"/>
          </svg>
        </button>
      </div>

      <div className="carousel-indicators">
        {projects.map((_, index) => (
          <button
            key={index}
            className={`indicator ${index === currentSlide ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>
    </div>
  )
}

export default ProjectCarousel