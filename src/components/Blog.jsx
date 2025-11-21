import React, { useState } from 'react';
import { useTranslation } from '../utils/useTranslation';
import { Link } from 'react-router-dom';
import './Blog.css';

const Blog = () => {
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showUnsubscribe, setShowUnsubscribe] = useState(false);

  const blogPosts = [
    {
      id: 1,
      category: 'tips',
      title: {
        ru: 'Современные технологии строительства: что выбрать в 2024 году',
        ky: 'Заманбап курулуш технологиялары: 2024-жылы эмнени тандоо керек'
      },
      excerpt: {
        ru: 'Обзор инновационных строительных технологий, которые изменят индустрию в ближайшие годы.',
        ky: 'Жакынкы жылдары индустрияны өзгөртүүчү инновациялык курулуш технологияларынын обзору.'
      },
      content: {
        ru: 'В строительной индустрии происходят революционные изменения. Новые технологии позволяют строить быстрее, экономичнее и экологичнее...',
        ky: 'Курулуш индустриясында революциялык өзгөрүүлөр болуп жатат. Жаңы технологиялар тезирээк, экономдуу жана экологиялык таза курууга мүмкүндүк берет...'
      },
      author: 'Жаныбеков Адилет',
      date: '2024-01-15',
      readTime: 5,
      image: 'https://static.tildacdn.net/tild6461-6538-4665-a463-353934646464/0000000011111.jpg',
      tags: ['технологии', 'инновации', 'строительство']
    },
    {
      id: 2,
      category: 'projects',
      title: {
        ru: 'Реконструкция исторического здания в центре Бишкека',
        ky: 'Бишкектин борборундагы тарыхый имараттын реконструкциясы'
      },
      excerpt: {
        ru: 'Как мы сохранили архитектурное наследие, адаптировав здание под современные потребности.',
        ky: 'Биз имаратты заманбап муктаждыктарга ылайыкташтыруу менен архитектуралык мурасты кантип сактап калдык.'
      },
      content: {
        ru: 'Проект реконструкции здания XIX века стал одним из самых сложных в нашей практике...',
        ky: 'XIX кылымдын имаратын реконструкциялоо долбоору биздин практикадагы эң татаалдардын бири болду...'
      },
      author: 'Мээрим Алымбекова',
      date: '2024-01-10',
      readTime: 8,
      image: 'https://knews.kg/wp-content/uploads/2016/04/istoricheskii-muzei-Bishkek.jpg',
      tags: ['реконструкция', 'история', 'проект']
    },
    {
      id: 3,
      category: 'tips',
      title: {
        ru: 'Планирование бюджета строительства: 10 важных советов',
        ky: 'Курулуш бюджетин пландаштыруу: 10 маанилүү кеңеш'
      },
      excerpt: {
        ru: 'Практические советы о том, как правильно спланировать бюджет строительства и избежать лишних трат.',
        ky: 'Курулуш бюджетин туура пландаштыруу жана ашыкча чыгымдардан качуу жөнүндө практикалык кеңештер.'
      },
      content: {
        ru: 'Правильное планирование бюджета - основа успешного строительства...',
        ky: 'Бюджетти туура пландаштыруу - ийгиликтүү курулуштун негизи...'
      },
      author: 'Бакыт Осмонов',
      date: '2024-01-05',
      readTime: 6,
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSK78wXudr7aBD4FW_qG1zeCL8RkWJH33JG3ZQ8H7rGfT_9YLdZPs_AUF3JyXJ72rXYwxg&usqp=CAU',
      tags: ['бюджет', 'планирование', 'советы']
    },
    {
      id: 4,
      category: 'news',
      title: {
        ru: 'Jetibay Group получила сертификат ISO 9001:2015',
        ky: 'Jetibay Group ISO 9001:2015 сертификатын алды'
      },
      excerpt: {
        ru: 'Наша компания официально сертифицирована по международному стандарту качества.',
        ky: 'Биздин компания эл аралык сапат стандарты боюнча расмий түрдө сертификатталды.'
      },
      content: {
        ru: 'Мы гордимся получением международного сертификата качества ISO 9001:2015...',
        ky: 'Биз ISO 9001:2015 эл аралык сапат сертификатын алгандыгыбызды мактанабыз...'
      },
      author: 'Jetibay Group',
      date: '2024-01-01',
      readTime: 3,
      image: '/images/лого груп2',
      tags: ['новости', 'сертификат', 'качество']
    },
    {
      id: 5,
      category: 'projects',
      title: {
        ru: 'Новый жилой комплекс "Ак-Орго Сити" сдан в эксплуатацию',
        ky: '"Ак-Орго Сити" жаңы турак комплекси пайдаланууга берилди'
      },
      excerpt: {
        ru: 'Завершение строительства современного жилого комплекса на 200 квартир.',
        ky: '200 батирден турган заманбап турак комплексинин курулушунун аякталышы.'
      },
      content: {
        ru: 'После 18 месяцев строительства мы успешно завершили проект жилого комплекса...',
        ky: '18 ай курулуштан кийин биз турак комплекстин долбоорун ийгиликтүү аяктадык...'
      },
      author: 'Азамат Токтосунов',
      date: '2023-12-28',
      readTime: 7,
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_96g1ksy3gTOiF3pynE0Ry-feEeekXBpq8w&s',
      tags: ['проект', 'жилой комплекс', 'завершение']
    },
    {
      id: 6,
      category: 'tips',
      title: {
        ru: 'Экологичные строительные материалы: тренды и перспективы',
        ky: 'Экологиялык курулуш материалдары: тренддер жана келечектер'
      },
      excerpt: {
        ru: 'Обзор современных экологичных материалов и их применение в строительстве.',
        ky: 'Заманбап экологиялык материалдардын обзору жана алардын курулуштагы колдонулушу.'
      },
      content: {
        ru: 'Экологичность становится ключевым фактором в выборе строительных материалов...',
        ky: 'Экологиялыктык курулуш материалдарын тандоодо негизги фактор болуп калды...'
      },
      author: 'Гүлнара Касымова',
      date: '2023-12-20',
      readTime: 6,
      image: 'https://novatorstroy.com/wa-data/public/blog/img/img-451.jpg',
      tags: ['экология', 'материалы', 'тренды']
    }
  ];

  const categories = [
    { id: 'all', name: { ru: 'Все статьи', ky: 'Бардык макалалар' } },
    { id: 'news', name: { ru: 'Новости', ky: 'Жаңылыктар' } },
    { id: 'projects', name: { ru: 'Проекты', ky: 'Долбоорлор' } },
    { id: 'tips', name: { ru: 'Советы', ky: 'Кеңештер' } }
  ];

  const filteredPosts = selectedCategory === 'all' 
    ? blogPosts 
    : blogPosts.filter(post => post.category === selectedCategory);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubscribe = async (e) => {
    e.preventDefault();
    setError('');

    if (!validateEmail(email)) {
      setError(t('blog.invalidEmail', 'Пожалуйста, введите действительный адрес электронной почты', 'Сураныч, жарактуу электрондук почта дарегин киргизиңиз'));
      return;
    }

    setIsLoading(true);

    try {
     
      const subscriptions = JSON.parse(localStorage.getItem('subscriptions') || '[]');
      const existingSubscription = subscriptions.find(sub => sub.email === email);
      
      if (existingSubscription) {
        setIsSubscribed(true);
        setShowUnsubscribe(true);
        setEmail('');
        return;
      }

 
      subscriptions.push({
        email,
        subscribedAt: new Date().toISOString()
      });
      localStorage.setItem('subscriptions', JSON.stringify(subscriptions));
      
      setIsSubscribed(true);
      setShowUnsubscribe(true);
      setEmail('');
    } catch (err) {
      setError(t('blog.subscribeError', 'Произошла ошибка. Пожалуйста, попробуйте еще раз.', 'Ката кетти. Сураныч, дагы аракет кылыңыз.'));
    } finally {
      setIsLoading(false);
    }
  };

  const handleUnsubscribe = async (e) => {
    e.preventDefault();
    setError('');

    if (!validateEmail(email)) {
      setError(t('blog.invalidEmail', 'Пожалуйста, введите действительный адрес электронной почты', 'Сураныч, жарактуу электрондук почта дарегин киргизиңиз'));
      return;
    }

    setIsLoading(true);

    try {
    
      const subscriptions = JSON.parse(localStorage.getItem('subscriptions') || '[]');
      const updatedSubscriptions = subscriptions.filter(sub => sub.email !== email);
      localStorage.setItem('subscriptions', JSON.stringify(updatedSubscriptions));
      
      setIsSubscribed(false);
      setShowUnsubscribe(false);
      setEmail('');
    } catch (err) {
      setError(t('blog.subscribeError', 'Произошла ошибка. Пожалуйста, попробуйте еще раз.', 'Ката кетти. Сураныч, дагы аракет кылыңыз.'));
    } finally {
      setIsLoading(false);
    }
  };

  const handleUnsubscribeClick = () => {
    setIsSubscribed(false);
    setShowUnsubscribe(true);
    setEmail('');
  };

  return (
    <section className="blog" id="blog">
      <div className="container">
        <div className="section-header">
          <div className="blog-image-header">
            <img src="/images/paint.jpg" alt="Blog" />
          </div>
          <h2>{t('blog.title', 'Блог и новости', 'Блог жана жаңылыктар')}</h2>
          <p>{t('blog.subtitle', 'Полезная информация о строительстве и наши последние новости', 'Курулуш жөнүндө пайдалуу маалымат жана биздин акыркы жаңылыктар')}</p>
        </div>

        <div className="blog-filters">
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

        <div className="blog-grid">
          {filteredPosts.map(post => (
            <article key={post.id} className="blog-card">
              <div className="blog-image">
                <img 
                  src={post.image} 
                  alt={t('', post.title.ru, post.title.ky)}
                  onError={(e) => {
                    e.target.src = '/images/concrete.jpg';
                  }}
                />
                <div className="blog-category">
                  {categories.find(cat => cat.id === post.category) && 
                    t('', categories.find(cat => cat.id === post.category).name.ru, 
                       categories.find(cat => cat.id === post.category).name.ky)
                  }
                </div>
              </div>

              <div className="blog-content">
                <div className="blog-meta">
                  <span className="blog-date">{formatDate(post.date)}</span>
                  <span className="blog-read-time">
                    {post.readTime} {t('blog.minRead', 'мин чтения', 'мүн окуу')}
                  </span>
                </div>

                <h3 className="blog-title">
                  {t('', post.title.ru, post.title.ky)}
                </h3>

                <p className="blog-excerpt">
                  {t('', post.excerpt.ru, post.excerpt.ky)}
                </p>

                <div className="blog-tags">
                  {post.tags.map((tag, index) => (
                    <span key={index} className="blog-tag">
                      #{tag}
                    </span>
                  ))}
                </div>

                <div className="blog-footer">
                  <div className="blog-author">
                    <span>{t('blog.author', 'Автор:', 'Автор:')} {post.author}</span>
                  </div>
                  <button className="read-more-btn">
                    {t('blog.readMore', 'Читать далее', 'Дагы окуу')}
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M13.025 1l-2.847 2.828 6.176 6.176h-16.354v3.992h16.354l-6.176 6.176 2.847 2.828 10.975-11z"/>
                    </svg>
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="blog-cta">
          <h3>{t('blog.ctaTitle', 'Хотите быть в курсе наших новостей?', 'Биздин жаңылыктарыбыздан кабардар болгуңуз келеби?')}</h3>
          <p>{t('blog.ctaText', 'Подпишитесь на нашу рассылку и получайте актуальную информацию о строительстве', 'Биздин рассылкага жазылып, курулуш жөнүндө актуалдуу маалымат алыңыз')}</p>
          
          {isSubscribed && showUnsubscribe ? (
            <div className="subscription-success">
              <h4>{t('blog.thankYou', 'Спасибо за подписку!', 'Жазылганыңыз үчүн рахмат!')}</h4>
              <p>{t('blog.subscriptionConfirmed', 'Вы успешно подписались на нашу рассылку.', 'Сиз биздин рассылкага ийгиликтүү жазылдыңыз.')}</p>
              <button 
                onClick={handleUnsubscribeClick} 
                className="unsubscribe-link"
              >
                {t('blog.unsubscribe', 'Отписаться', 'Жазылууну токтотуу')}
              </button>
              <p className="unsubscribe-info">
                {t('blog.or', 'Или ', 'Же ')}
                <Link to="/unsubscribe" className="unsubscribe-page-link">
                  {t('blog.unsubscribeLater', 'отписаться позже', 'кийинчерээк жазылууну токтотуу')}
                </Link>
              </p>
            </div>
          ) : showUnsubscribe ? (
            <div className="unsubscribe-section">
              <h4>{t('blog.unsubscribeTitle', 'Отписаться от рассылки', 'Жаңылыктар тизмегинен чыгуу')}</h4>
              <p>{t('blog.unsubscribeText', 'Введите email, от которого хотите отписаться', 'Жазылууну токтоткуңуз келген email даректи киргизиңиз')}</p>
              
              <form onSubmit={handleUnsubscribe} className="newsletter-form">
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t('blog.emailPlaceholder', 'Ваш email', 'Сиздин email')}
                  className="newsletter-input"
                  required
                  disabled={isLoading}
                />
                <button 
                  type="submit" 
                  className="newsletter-btn unsubscribe-btn"
                  disabled={isLoading || !email}
                >
                  {isLoading ? (
                    t('blog.processing', 'Обработка...', 'Иштетүүдө...')
                  ) : (
                    t('blog.unsubscribe', 'Отписаться', 'Жазылууну токтотуу')
                  )}
                </button>
                <button 
                  type="button" 
                  onClick={() => {
                    setShowUnsubscribe(false);
                    setEmail('');
                    setError('');
                  }}
                  className="back-to-subscribe-btn"
                >
                  {t('blog.backToSubscribe', 'Назад к подписке', 'Жазылууга кайтуу')}
                </button>
                {error && <div className="error-message">{error}</div>}
                <p className="unsubscribe-info">
                  {t('blog.or', 'Или ', 'Же ')}
                  <Link to="/unsubscribe" className="unsubscribe-page-link">
                    {t('blog.unsubscribeLater', 'отписаться позже', 'кийинчерээк жазылууну токтотуу')}
                  </Link>
                </p>
              </form>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="newsletter-form">
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t('blog.emailPlaceholder', 'Ваш email', 'Сиздин email')}
                className="newsletter-input"
                required
                disabled={isLoading}
              />
              <button 
                type="submit" 
                className="newsletter-btn"
                disabled={isLoading || !email}
              >
                {isLoading ? (
                  t('blog.sending', 'Отправка...', 'Жөнөтүүдө...')
                ) : (
                  t('blog.subscribe', 'Подписаться', 'Жазылуу')
                )}
              </button>
              {error && <div className="error-message">{error}</div>}
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default Blog;