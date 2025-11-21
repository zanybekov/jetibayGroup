import React, { useState, useEffect } from 'react';
import { useTranslation } from '../utils/useTranslation';
import './Testimonials.css';

const Testimonials = () => {
  const { t } = useTranslation();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  const testimonials = [
    {
      id: 1,
      name: 'Алибек Ысманов',
      position: 'Директор ООО "Бизнес-Центр"',
      project: 'Торгово-офисный комплекс',
      location: 'г. Бишкек',
      rating: 5,
      photo: '/images/concrete.jpg',
      text: {
        ru: 'Отличная работа команды Jetibay Group! Проект был выполнен точно в срок, качество строительства превзошло наши ожидания. Особенно впечатлила внимательность к деталям и профессионализм всей команды.',
        en: 'Excellent work by the Jetibay Group team! The project was completed exactly on time, the construction quality exceeded our expectations. We were particularly impressed by the attention to detail and professionalism of the entire team.'
      }
    },
    {
      id: 2,
      name: 'Гульнара Осмонова',
      position: 'Владелец недвижимости',
      project: 'Частный дом 250 м²',
      location: 'с. Ак-Орго',
      rating: 5,
      photo: '/images/red-brick.jpg',
      text: {
        ru: 'Мы очень довольны результатом! Наш дом был построен с использованием современных технологий и материалов. Команда работала организованно, всегда были на связи и консультировали по всем вопросам.',
        ky: 'Биз натыйжага абдан ыраазыбыз! Биздин үй заманбап технологиялар жана материалдар менен курулган. Команда уюшкан иштеди, дайыма байланышта болуп, бардык суроолор боюнча кеңеш беришти.'
      }
    },
    {
      id: 3,
      name: 'Максат Жумабеков',
      position: 'Генеральный директор "Строй-Инвест"',
      project: 'Реконструкция завода',
      location: 'г. Ош',
      rating: 5,
      photo: '/images/metal-profile.jpg',
      text: {
        ru: 'Сложный проект реконструкции был выполнен на высочайшем уровне. Jetibay Group показали себя как надежные партнеры, способные решать самые сложные инженерные задачи.',
        ky: 'Реконструкциянын татаал долбоору эң жогорку деңгээлде аткарылды. Jetibay Group өздөрүн эң татаал инженердик маселелерди чече ала турган ишенимдүү өнөктөш катары көрсөттү.'
      }
    },
    {
      id: 4,
      name: 'Эльмира Токтосунова',
      position: 'Предприниматель',
      project: 'Ремонт ресторана',
      location: 'г. Бишкек',
      rating: 5,
      photo: '/images/paint.jpg',
      text: {
        ru: 'Быстро и качественно провели полный ремонт нашего ресторана. Работы велись в ночное время, чтобы не нарушать работу заведения. Очень ответственный подход!',
        ky: 'Биздин ресторандын толук оңдоосун тез жана сапаттуу жүргүздү. Мекеменин ишин бузбоо үчүн түнкү убакытта иш жүргүзүлдү. Абдан жоопкерчиликтүү мамиле!'
      }
    },
    {
      id: 5,
      name: 'Асанбек Турдубаев',
      position: 'Директор "Агро-Комплекс"',
      project: 'Складской комплекс',
      location: 'Чуйская область',
      rating: 5,
      photo: '/images/timber.jpg',
      text: {
        ru: 'Построили современный складской комплекс с учетом всех наших специфических требований. Отличное соотношение цены и качества. Рекомендуем всем!',
        ky: 'Биздин бардык өзгөчө талаптарды эске алуу менен заманбап склад комплексин курушту. Баанын жана сапаттын мыкты катышы. Баарыга сунуштайбыз!'
      }
    }
  ];

  useEffect(() => {
    if (isAutoPlay) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % testimonials.length);
      }, 6000);
      return () => clearInterval(interval);
    }
  }, [isAutoPlay, testimonials.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
    setIsAutoPlay(false);
    setTimeout(() => setIsAutoPlay(true), 10000);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % testimonials.length);
    setIsAutoPlay(false);
    setTimeout(() => setIsAutoPlay(true), 10000);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setIsAutoPlay(false);
    setTimeout(() => setIsAutoPlay(true), 10000);
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span key={index} className={`star ${index < rating ? 'filled' : ''}`}>
        ★
      </span>
    ));
  };

  return (
    <section className="testimonials" id="testimonials">
      <div className="container">
        <div className="section-header">
          <div className="testimonials-image">
            <img src="/images/cement.jpg" alt="Testimonials" />
          </div>
          <h2>{t('testimonials.title', 'Отзывы клиентов', 'Кардарлардын пикирлери')}</h2>
          <p>{t('testimonials.subtitle', 'Что говорят о нас наши клиенты', 'Кардарларыбыз биз жөнүндө эмне дейишет')}</p>
        </div>

        <div className="testimonials-carousel">
          <button className="carousel-btn prev-btn" onClick={prevSlide}>
            &#8249;
          </button>

          <div className="carousel-container">
            <div 
              className="carousel-track"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="testimonial-card">
                  <div className="testimonial-content">
                    <div className="quote-mark">"</div>
                    <p className="testimonial-text">
                      {t('', testimonial.text.ru, testimonial.text.ky)}
                    </p>
                    <div className="rating">
                      {renderStars(testimonial.rating)}
                    </div>
                  </div>
                  
                  <div className="client-info">
                    <div className="client-photo">
                      <img 
                        src={testimonial.photo} 
                        alt={testimonial.name}
                        onError={(e) => {
                          e.target.src = '/images/concrete.jpg';
                        }}
                      />
                    </div>
                    <div className="client-details">
                      <h4 className="client-name">{testimonial.name}</h4>
                      <p className="client-position">{testimonial.position}</p>
                      <div className="project-info">
                        <span className="project-name">{testimonial.project}</span>
                        <span className="project-location">{testimonial.location}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button className="carousel-btn next-btn" onClick={nextSlide}>
            &#8250;
          </button>
        </div>

        <div className="carousel-dots">
          {testimonials.map((_, index) => (
            <button
              key={index}
              className={`dot ${currentSlide === index ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;