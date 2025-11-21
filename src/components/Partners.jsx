import React, { useState, useEffect } from 'react';
import { useTranslation } from '../utils/useTranslation';
import './Partners.css';

const Partners = () => {
  const { t } = useTranslation();
  const [currentSlide, setCurrentSlide] = useState(0);

  const partners = [
    {
      id: 1,
      name: 'KyrgyzCement',
      logo: 'https://jcement.ru/upload/resize_cache/iblock/5a9/igmsf06kqmbh6lq89iqk9nhfoeo41tg1/224_142_2/%D1%82%D1%83%D1%80%D1%86%D0%B8%D1%8F.webp',
      category: 'materials',
      description: {
        ru: 'Ведущий производитель цемента в Кыргызстане',
        ky: 'Кыргызстандагы цементтин жетекчи өндүрүүчүсү'
      },
      website: 'https://kyrgyzcement.kg'
    },
    {
      id: 2,
      name: 'Bishkek Steel',
      logo: 'https://lh6.googleusercontent.com/proxy/-Svbo6fZWjXx_hxZPl4q9EQjO2A5S2MdIQArsc1JRGKEv58_RnQFBD9y-A5TcH59PtfB2X66I1_c6nyn479hoN5f-tlfEKx_99KFJlhtFxtdfuEWEmLY66lL76Nn',
      category: 'materials',
      description: {
        ru: 'Поставщик металлоконструкций и арматуры',
        ky: 'Металл конструкциялар жана арматура камсыздоочу'
      },
      website: 'https://bishkeksteel.kg'
    },
    {
      id: 3,
      name: 'EcoMaterials KG',
      logo: 'https://stroitelstvoproektirovanie.com/wp-content/uploads/2024/05/file-JFtNari92B1j8xdp2rKuAkCD.jpg',
      category: 'materials',
      description: {
        ru: 'Экологичные строительные материалы',
        ky: 'Экологиялык курулуш материалдары'
      },
      website: 'https://ecomaterials.kg'
    },
    {
      id: 4,
      name: 'TechBuild Systems',
      logo: 'https://cifrastroy.ru/uploads/items/664/771/original.jpg?_=2612961451',
      category: 'equipment',
      description: {
        ru: 'Современное строительное оборудование',
        ky: 'Заманбап курулуш жабдуулары'
      },
      website: 'https://techbuild.kg'
    },
    {
      id: 5,
      name: 'KG Finance Bank',
      logo: 'https://tower.am/wp-content/uploads/2025/05/756178008944025.jpg',
      category: 'financial',
      description: {
        ru: 'Финансовый партнер для строительных проектов',
        ky: 'Курулуш долбоорлору үчүн каржылык өнөктөш'
      },
      website: 'https://kgfinance.kg'
    },
    {
      id: 6,
      name: 'Design Studio Arch',
      logo: 'https://studcar.ru/wp-content/uploads/2019/07/PoliMi-arhitekturnii-dizain-800x386.jpg',
      category: 'design',
      description: {
        ru: 'Архитектурное проектирование и дизайн',
        ky: 'Архитектуралык долбоорлоо жана дизайн'
      },
      website: 'https://archstudio.kg'
    },
    {
      id: 7,
      name: 'Smart Home KG',
      logo: 'https://mvmarket.pro/wp-content/uploads/2021/09/smart_home_photo.jpg',
      category: 'technology',
      description: {
        ru: 'Системы умного дома и автоматизации',
        ky: 'Акылдуу үй жана автоматташтыруу системалары'
      },
      website: 'https://smarthome.kg'
    },
    {
      id: 8,
      name: 'Green Energy Solutions',
      logo: 'https://tcip.ru/wp-content/uploads/2018/06/Vidy-alternativnoj-energii.jpg',
      category: 'technology',
      description: {
        ru: 'Солнечные панели и альтернативная энергетика',
        ky: 'Күн панелдери жана альтернативдүү энергетика'
      },
      website: 'https://greenenergy.kg'
    },
    {
      id: 9,
      name: 'Professional Tools',
      logo: 'https://instrumental.by/ru/files/news/image/0/0/1616483007.jpg',
      category: 'equipment',
      description: {
        ru: 'Профессиональный инструмент для строительства',
        ky: 'Курулуш үчүн профессионалдык куралдар'
      },
      website: 'https://protools.kg'
    },
    {
      id: 10,
      name: 'Logistics Trans KG',
      logo: 'https://logistics.ru/sites/default/files/2019-07/top-10-supply-chain-innovations-2018.jpg',
      category: 'logistics',
      description: {
        ru: 'Транспортные и логистические услуги',
        ky: 'Транспорттук жана логистикалык кызматтар'
      },
      website: 'https://logisticstrans.kg'
    }
  ];

  const categories = [
    { id: 'all', name: { ru: 'Все партнеры', ky: 'Бардык өнөктөштөр' } },
    { id: 'materials', name: { ru: 'Материалы', ky: 'Материалдар' } },
    { id: 'equipment', name: { ru: 'Оборудование', ky: 'Жабдуулар' } },
    { id: 'technology', name: { ru: 'Технологии', ky: 'Технологиялар' } },
    { id: 'design', name: { ru: 'Дизайн', ky: 'Дизайн' } },
    { id: 'financial', name: { ru: 'Финансы', ky: 'Каржы' } },
    { id: 'logistics', name: { ru: 'Логистика', ky: 'Логистика' } }
  ];

  const [selectedCategory, setSelectedCategory] = useState('all');
  const filteredPartners = selectedCategory === 'all' 
    ? partners 
    : partners.filter(partner => partner.category === selectedCategory);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % Math.ceil(partners.length / 4));
    }, 4000);
    return () => clearInterval(interval);
  }, [partners.length]);

  const achievements = [
    {
      number: '50+',
      label: { ru: 'Надежных партнеров', ky: 'Ишенимдүү өнөктөш' },
      icon: '🤝'
    },
    {
      number: '5',
      label: { ru: 'Лет сотрудничества', ky: 'Жыл кызматташуу' },
      icon: '⏰'
    },
    {
      number: '100%',
      label: { ru: 'Качество материалов', ky: 'Материалдардын сапаты' },
      icon: '✅'
    },
    {
      number: '24/7',
      label: { ru: 'Поддержка партнеров', ky: 'Өнөктөштөрдү колдоо' },
      icon: '🛠️'
    }
  ];

  return (
    <section className="partners" id="partners">
      <div className="container">
        <div className="section-header">
          <div className="partners-image">
            <img src="/images/metal-tile.jpg" alt="Partners" />
          </div>
          <h2>{t('partners.title', 'Наши партнеры и поставщики', 'Биздин өнөктөштөр жана камсыздоочулар')}</h2>
          <p>{t('partners.subtitle', 'Мы работаем только с проверенными и надежными компаниями', 'Биз текшерилген жана ишенимдүү компаниялар менен гана иштейбиз')}</p>
        </div>

        <div className="achievements-grid">
          {achievements.map((achievement, index) => (
            <div key={index} className="achievement-card">
              <div className="achievement-icon">{achievement.icon}</div>
              <div className="achievement-number">{achievement.number}</div>
              <div className="achievement-label">
                {t('', achievement.label.ru, achievement.label.ky)}
              </div>
            </div>
          ))}
        </div>

        <div className="partners-filters">
          {categories.map(category => (
            <button
              key={category.id}
              className={`filter-btn ${selectedCategory === category.id ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category.id)}
            >
              {t('', category.name.ru, category.name.ky)}
            </button>
          ))}
        </div>

        <div className="partners-grid">
          {filteredPartners.map(partner => (
            <div key={partner.id} className="partner-card">
              <div className="partner-logo">
                <img 
                  src={partner.logo} 
                  alt={partner.name}
                    onError={(e) => {
                      e.target.src = '/images/concrete.jpg';
                    }}
                />
              </div>
              <div className="partner-info">
                <h3 className="partner-name">{partner.name}</h3>
                <p className="partner-description">
                  {t('', partner.description.ru, partner.description.ky)}
                </p>
                <a 
                  href={partner.website} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="partner-link"
                >
                  {t('partners.visitWebsite', 'Посетить сайт', 'Сайтка баруу')}
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M14,3V5H17.59L7.76,14.83L9.17,16.24L19,6.41V10H21V3M19,19H5V5H12V3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V12H19V19Z"/>
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="partners-carousel">
          <h3>{t('partners.trustedBy', 'Нам доверяют', 'Бизге ишенишет')}</h3>
          <div className="carousel-container">
            <div 
              className="carousel-track"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {Array.from({ length: Math.ceil(partners.length / 4) }).map((_, slideIndex) => (
                <div key={slideIndex} className="carousel-slide">
                  {partners.slice(slideIndex * 4, (slideIndex + 1) * 4).map(partner => (
                    <div key={partner.id} className="carousel-logo">
                      <img 
                        src={partner.logo} 
                        alt={partner.name}
                    onError={(e) => {
                      e.target.src = '/images/concrete.jpg';
                    }}
                      />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
          
          <div className="carousel-dots">
            {Array.from({ length: Math.ceil(partners.length / 4) }).map((_, index) => (
              <button
                key={index}
                className={`dot ${currentSlide === index ? 'active' : ''}`}
                onClick={() => setCurrentSlide(index)}
              />
            ))}
          </div>
        </div>

        <div className="partnership-cta">
          <div className="cta-content">
            <h3>{t('partners.becomePartner', 'Станьте нашим партнером', 'Биздин өнөктөш болуңуз')}</h3>
            <p>{t('partners.partnershipText', 'Присоединяйтесь к нашей сети надежных партнеров и развивайте бизнес вместе с нами', 'Биздин ишенимдүү өнөктөштөр тармагына кошулуп, биз менен чогуу бизнести өнүктүрүңүз')}</p>
            <div className="cta-buttons">
              <button className="cta-primary">
                {t('partners.contactUs', 'Связаться с нами', 'Биз менен байланышуу')}
              </button>
              <button className="cta-secondary">
                {t('partners.learnMore', 'Узнать больше', 'Көбүрөөк билүү')}
              </button>
            </div>
          </div>
          <div className="cta-image">
            <img src="/images/concrete.jpg" alt="Partnership" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Partners;