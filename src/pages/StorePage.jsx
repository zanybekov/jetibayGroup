import React, { useState, useCallback } from 'react'
import { useTranslation } from '../utils/useTranslation'
import { useStore } from '../contexts/StoreContext'
import EmailService from '../services/EmailService'
import '../styles/pages.css'
import './StorePage.css'

// Sample construction materials data
export const constructionProducts = [
  // Cement and concrete
  { id: 1, name: 'Портландцемент М500', nameEn: 'Portland Cement M500', price: 450, image: '/images/cement.jpg', category: 'cement' },
  { id: 2, name: 'Цемент белый М400', nameEn: 'White Cement M400', price: 650, image: '/images/white-cement.jpg', category: 'cement' },
  { id: 3, name: 'Бетон готовый М200', nameEn: 'Ready Mix Concrete M200', price: 3200, image: '/images/concrete.jpg', category: 'concrete' },
  { id: 4, name: 'Пескобетон М300', nameEn: 'Sand Concrete M300', price: 280, image: '/images/sand-concrete.jpg', category: 'concrete' },

  // Bricks and blocks
  { id: 5, name: 'Кирпич красный одинарный', nameEn: 'Red Single Brick', price: 12, image: '/images/red-brick.jpg', category: 'bricks' },
  { id: 6, name: 'Кирпич силикатный белый', nameEn: 'White Silicate Brick', price: 15, image: '/images/white-brick.jpg', category: 'bricks' },
  { id: 7, name: 'Блок газобетонный 200мм', nameEn: 'Aerated Concrete Block 200mm', price: 85, image: '/images/gas-block.jpg', category: 'blocks' },
  { id: 8, name: 'Блок керамзитобетонный', nameEn: 'Expanded Clay Block', price: 65, image: '/images/clay-block.jpg', category: 'blocks' },

  // Reinforcement and metal
  { id: 9, name: 'Арматура А500С Ø12мм', nameEn: 'Rebar A500C Ø12mm', price: 55000, image: '/images/rebar-12.jpg', category: 'metal' },
  { id: 10, name: 'Арматура А500С Ø16мм', nameEn: 'Rebar A500C Ø16mm', price: 54000, image: '/images/rebar-16.jpg', category: 'metal' },
  { id: 11, name: 'Сетка кладочная 50х50', nameEn: 'Masonry Mesh 50x50', price: 180, image: '/images/mesh.jpg', category: 'metal' },
  { id: 12, name: 'Профиль металлический 60х27', nameEn: 'Metal Profile 60x27', price: 320, image: '/images/metal-profile.jpg', category: 'metal' },

  // Roofing materials
  { id: 13, name: 'Металлочерепица Монтеррей', nameEn: 'Metal Tile Monterrey', price: 450, image: '/images/metal-tile.jpg', category: 'roofing' },
  { id: 14, name: 'Профнастил С21', nameEn: 'Corrugated Sheet C21', price: 380, image: '/images/corrugated.jpg', category: 'roofing' },
  { id: 15, name: 'Ондулин классический', nameEn: 'Classic Ondulin', price: 520, image: '/images/ondulin.jpg', category: 'roofing' },
  { id: 16, name: 'Шифер волновой 8-волн', nameEn: '8-Wave Slate', price: 290, image: '/images/slate.jpg', category: 'roofing' },

  // Insulation
  { id: 17, name: 'Минвата Роклайт 50мм', nameEn: 'Rockwool Rocklite 50mm', price: 280, image: '/images/rockwool.jpg', category: 'insulation' },
  { id: 18, name: 'Пенопласт ПСБ-С 25', nameEn: 'Foam PSB-S 25', price: 180, image: '/images/foam.jpg', category: 'insulation' },
  { id: 19, name: 'Пеноплэкс 50мм', nameEn: 'Penoplex 50mm', price: 420, image: '/images/penoplex.jpg', category: 'insulation' },
  { id: 20, name: 'Изоспан А (гидроизоляция)', nameEn: 'Isospan A (Waterproofing)', price: 1250, image: '/images/isospan.jpg', category: 'insulation' },

  // Drywall and partitions
  { id: 21, name: 'Гипсокартон ГКЛ 12.5мм', nameEn: 'Drywall GKL 12.5mm', price: 320, image: '/images/drywall.jpg', category: 'drywall' },
  { id: 22, name: 'Профиль ПП 60х27', nameEn: 'Profile PP 60x27', price: 180, image: '/images/pp-profile.jpg', category: 'drywall' },
  { id: 23, name: 'Профиль ПН 28х27', nameEn: 'Profile PN 28x27', price: 150, image: '/images/pn-profile.jpg', category: 'drywall' },
  { id: 24, name: 'Саморезы по металлу 3.5х25', nameEn: 'Metal Screws 3.5x25', price: 85, image: '/images/screws.jpg', category: 'fasteners' },

  // Tiles and finishing
  { id: 25, name: 'Плитка керамическая 30х30', nameEn: 'Ceramic Tile 30x30', price: 680, image: '/images/ceramic-tile.jpg', category: 'tiles' },
  { id: 26, name: 'Керамогранит 60х60', nameEn: 'Porcelain Stoneware 60x60', price: 1250, image: '/images/porcelain.jpg', category: 'tiles' },
  { id: 27, name: 'Мозаика стеклянная', nameEn: 'Glass Mosaic', price: 890, image: '/images/mosaic.jpg', category: 'tiles' },
  { id: 28, name: 'Затирка для швов белая', nameEn: 'White Tile Grout', price: 180, image: '/images/grout.jpg', category: 'tiles' },

  // Paint and coatings
  { id: 29, name: 'Краска акриловая белая', nameEn: 'White Acrylic Paint', price: 980, image: '/images/paint.jpg', category: 'paint' },
  { id: 30, name: 'Грунтовка глубокого проникновения', nameEn: 'Deep Penetration Primer', price: 450, image: '/images/primer.jpg', category: 'paint' },
  { id: 31, name: 'Шпатлевка финишная', nameEn: 'Finish Putty', price: 380, image: '/images/putty.jpg', category: 'paint' },
  { id: 32, name: 'Эмаль ПФ-115 белая', nameEn: 'White PF-115 Enamel', price: 320, image: '/images/enamel.jpg', category: 'paint' },

  // Doors and windows
  { id: 33, name: 'Дверь межкомнатная', nameEn: 'Interior Door', price: 8500, image: '/images/interior-door.jpg', category: 'doors' },
  { id: 34, name: 'Дверь входная металлическая', nameEn: 'Metal Entry Door', price: 15500, image: '/images/entry-door.jpg', category: 'doors' },
  { id: 35, name: 'Окно ПВХ 1200х1400', nameEn: 'PVC Window 1200x1400', price: 12000, image: '/images/pvc-window.jpg', category: 'windows' },
  { id: 36, name: 'Стеклопакет двухкамерный', nameEn: 'Double Chamber Glass Unit', price: 2800, image: '/images/glass-unit.jpg', category: 'windows' },

  // Plumbing
  { id: 37, name: 'Унитаз-компакт', nameEn: 'Compact Toilet', price: 7500, image: '/images/toilet.jpg', category: 'plumbing' },
  { id: 38, name: 'Раковина с пьедесталом', nameEn: 'Pedestal Sink', price: 4200, image: '/images/sink.jpg', category: 'plumbing' },
  { id: 39, name: 'Смеситель для ванны', nameEn: 'Bath Mixer', price: 3200, image: '/images/mixer.jpg', category: 'plumbing' },
  { id: 40, name: 'Трубы ПВХ Ø110мм', nameEn: 'PVC Pipes Ø110mm', price: 280, image: '/images/pvc-pipe.jpg', category: 'plumbing' },

  // Electrical
  { id: 41, name: 'Кабель ВВГ 3х2.5', nameEn: 'VVG Cable 3x2.5', price: 85, image: '/images/cable.jpg', category: 'electrical' },
  { id: 42, name: 'Розетка с заземлением', nameEn: 'Grounded Outlet', price: 180, image: '/images/outlet.jpg', category: 'electrical' },
  { id: 43, name: 'Выключатель одноклавишный', nameEn: 'Single Switch', price: 120, image: '/images/switch.jpg', category: 'electrical' },
  { id: 44, name: 'Светильник LED 36Вт', nameEn: 'LED Light 36W', price: 850, image: '/images/led-light.jpg', category: 'electrical' },

  // Fasteners and hardware
  { id: 45, name: 'Дюбели пластиковые 6х40', nameEn: 'Plastic Dowels 6x40', price: 45, image: '/images/dowels.jpg', category: 'fasteners' },
  { id: 46, name: 'Шурупы по дереву 4х50', nameEn: 'Wood Screws 4x50', price: 65, image: '/images/wood-screws.jpg', category: 'fasteners' },
  { id: 47, name: 'Анкерные болты М10х80', nameEn: 'Anchor Bolts M10x80', price: 25, image: '/images/anchor-bolts.jpg', category: 'fasteners' },
  { id: 48, name: 'Гвозди строительные 100мм', nameEn: 'Construction Nails 100mm', price: 120, image: '/images/nails.jpg', category: 'fasteners' },

  // Tools and equipment
  { id: 49, name: 'Дрель ударная 750Вт', nameEn: 'Impact Drill 750W', price: 4500, image: '/images/drill.jpg', category: 'tools' },
  { id: 50, name: 'Перфоратор SDS-Plus', nameEn: 'SDS-Plus Hammer Drill', price: 8500, image: '/images/hammer-drill.jpg', category: 'tools' },
  { id: 51, name: 'Шуруповерт аккумуляторный', nameEn: 'Cordless Screwdriver', price: 3200, image: '/images/screwdriver.jpg', category: 'tools' },
  { id: 52, name: 'Болгарка 125мм', nameEn: 'Angle Grinder 125mm', price: 2800, image: '/images/grinder.jpg', category: 'tools' },

  // Adhesives and sealants
  { id: 53, name: 'Клей плиточный', nameEn: 'Tile Adhesive', price: 350, image: '/images/tile-glue.jpg', category: 'adhesives' },
  { id: 54, name: 'Герметик силиконовый', nameEn: 'Silicone Sealant', price: 180, image: '/images/sealant.jpg', category: 'adhesives' },
  { id: 55, name: 'Монтажная пена', nameEn: 'Mounting Foam', price: 220, image: '/images/foam-sealant.jpg', category: 'adhesives' },
  { id: 56, name: 'Клей ПВА строительный', nameEn: 'Construction PVA Glue', price: 120, image: '/images/pva-glue.jpg', category: 'adhesives' },

  // Lumber and wood materials
  { id: 57, name: 'Доска обрезная 40х150', nameEn: 'Edged Board 40x150', price: 18000, image: '/images/lumber.jpg', category: 'lumber' },
  { id: 58, name: 'Брус строганый 100х100', nameEn: 'Planed Timber 100x100', price: 25000, image: '/images/timber.jpg', category: 'lumber' },
  { id: 59, name: 'Фанера березовая 18мм', nameEn: 'Birch Plywood 18mm', price: 1850, image: '/images/plywood.jpg', category: 'lumber' },
  { id: 60, name: 'ДСП ламинированная 16мм', nameEn: 'Laminated Chipboard 16mm', price: 1200, image: '/images/chipboard.jpg', category: 'lumber' }
]

const categories = [
  { id: 'all', nameRu: 'Все товары', nameEn: 'All Products' },
  { id: 'cement', nameRu: 'Цемент', nameEn: 'Cement' },
  { id: 'concrete', nameRu: 'Бетон', nameEn: 'Concrete' },
  { id: 'bricks', nameRu: 'Кирпич', nameEn: 'Bricks' },
  { id: 'blocks', nameRu: 'Блоки', nameEn: 'Blocks' },
  { id: 'metal', nameRu: 'Металл', nameEn: 'Metal' },
  { id: 'roofing', nameRu: 'Кровля', nameEn: 'Roofing' },
  { id: 'insulation', nameRu: 'Утеплители', nameEn: 'Insulation' },
  { id: 'drywall', nameRu: 'Гипсокартон', nameEn: 'Drywall' },
  { id: 'tiles', nameRu: 'Плитка', nameEn: 'Tiles' },
  { id: 'paint', nameRu: 'Краски', nameEn: 'Paint' },
  { id: 'doors', nameRu: 'Двери', nameEn: 'Doors' },
  { id: 'windows', nameRu: 'Окна', nameEn: 'Windows' },
  { id: 'plumbing', nameRu: 'Сантехника', nameEn: 'Plumbing' },
  { id: 'electrical', nameRu: 'Электрика', nameEn: 'Electrical' },
  { id: 'fasteners', nameRu: 'Крепеж', nameEn: 'Fasteners' },
  { id: 'tools', nameRu: 'Инструменты', nameEn: 'Tools' },
  { id: 'adhesives', nameRu: 'Клеи и герметики', nameEn: 'Adhesives' },
  { id: 'lumber', nameRu: 'Пиломатериалы', nameEn: 'Lumber' }
]

const ProductCard = ({ product, onAddToCart, onOrderNow, onToggleFavorite, isFavorite, isInCart }) => {
  const { currentLanguage } = useTranslation()

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const message = `
📦 Новый заказ!
🛍️ Товар: ${currentLanguage === 'ru' ? product.name : product.nameEn}
💰 Цена: ${product.price} сом
👤 Имя: ${formData.name}
📞 Телефон: ${formData.phone}
✉️ Email: ${formData.email}
🏙️ Город: ${formData.city}
`;

      const TELEGRAM_TOKEN = '8266889473:AAEhqxQGHwob5-CBCDVgsXNpqXmNfpbCsX0';
      const CHAT_ID = '5259361228';

      await fetch(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          text: message,
          parse_mode: 'HTML',
        }),
      });

      alert(currentLanguage === 'ru' ? 'Заказ успешно отправлен!' : 'Order sent successfully!');
      onClose();
    } catch (error) {
      console.error('Ошибка при отправке заказа:', error);
      setSubmitError(currentLanguage === 'ru'
        ? 'Ошибка при отправке. Попробуйте снова.'
        : 'Error submitting order. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };


  return (
    <div className="product-card">
      <div className="product-image">
        {/* <img
          src={product.image}
          alt={currentLanguage === 'ru' ? product.name : product.nameEn}
          onError={(e) => {
            // Fallback to a generic construction image
            e.target.src = 'https://images.unsplash.com/photo-1595514146242-9d0a3cb50b7b?auto=format&fit=crop&w=300&h=220&q=80';
          }}
        /> */}
        <button
          className={`favorite-btn ${isFavorite ? 'active' : ''}`}
          onClick={(e) => {
            e.stopPropagation()
            onToggleFavorite(product.id)
          }}
          title={currentLanguage === 'ru' ? 'Добавить в избранное' : 'Add to Favorites'}
        >
          ♥
        </button>
      </div>
      <div className="product-info">
        <h3 className="product-name">
          {currentLanguage === 'ru' ? product.name : product.nameEn}
        </h3>
        <div className="product-price">
          {product.price.toLocaleString()} {currentLanguage === 'ru' ? 'сом' : 'som'}
        </div>
        <div className="product-actions">
          <button
            className={`add-to-cart-btn ${isInCart ? 'in-cart' : ''}`}
            onClick={() => onAddToCart(product)}
          >
            {isInCart
              ? (currentLanguage === 'ru' ? 'В корзине ✓' : 'In Cart ✓')
              : (currentLanguage === 'ru' ? 'В корзину' : 'Add to Cart')
            }
          </button>
          <button
            className="order-now-btn"
            onClick={() => onOrderNow(product)}
          >
            {currentLanguage === 'ru' ? 'Заказать' : 'Order'}
          </button>
        </div>
      </div>
    </div>
  )
}

// import React, { useState } from 'react';

const OrderModal = ({ onClose, product, currentLanguage }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    city: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);


    const message = `
📦 Новый заказ!
🛍️ Товар: ${currentLanguage === 'ru' ? product.name : product.nameEn}
💰 Цена: ${product.price} сом
👤 Имя: ${formData.name}
📞 Телефон: ${formData.phone}
✉️ Email: ${formData.email}
🏙️ Город: ${formData.city}
`;

  
    const TELEGRAM_TOKEN = '8266889473:AAEhqxQGHwob5-CBCDVgsXNpqXmNfpbCsX0'; 
    const CHAT_ID = '5259361228'; 
    try {
      const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          text: message,
          parse_mode: 'HTML',
        }),
      });

      if (!response.ok) {
        throw new Error('Ошибка отправки сообщения');
      }

      alert(currentLanguage === 'ru' ? '✅ Заказ успешно отправлен!' : '✅ Order sent successfully!');
      onClose();
    } catch (error) {
      console.error('Ошибка при отправке заказа:', error);
      setSubmitError(
        currentLanguage === 'ru'
          ? 'Ошибка при отправке. Попробуйте снова.'
          : 'Error submitting order. Please try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="order-modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{currentLanguage === 'ru' ? 'Оформление заказа' : 'Place Order'}</h2>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>

        <div className="modal-body">
          <div className="product-preview">
            <div className="product-image">
              <img
                src={product.image}
                alt={currentLanguage === 'ru' ? product.name : product.nameEn}
                onError={(e) => {
                  e.target.src = 'https://images.unsplash.com/photo-1595514146242-9d0a3cb50b7b?auto=format&fit=crop&w=300&h=220&q=80';
                }}
              />
            </div>
            <div className="product-details">
              <h3>{currentLanguage === 'ru' ? product.name : product.nameEn}</h3>
              <p className="product-price">
                {product.price.toLocaleString()} {currentLanguage === 'ru' ? 'сом' : 'som'}
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="order-form">
            {submitError && <div className="error-message">{submitError}</div>}

            <div className="form-group">
              <label htmlFor="name">
                {currentLanguage === 'ru' ? 'Ваше имя*' : 'Your Name*'}
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone">
                {currentLanguage === 'ru' ? 'Телефон*' : 'Phone*'}
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">
                {currentLanguage === 'ru' ? 'Email*' : 'Email*'}
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="city">
                {currentLanguage === 'ru' ? 'Город*' : 'City*'}
              </label>
              <input
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-actions">
              <button
                type="button"
                className="cancel-btn"
                onClick={onClose}
                disabled={isSubmitting}
              >
                {currentLanguage === 'ru' ? 'Отмена' : 'Cancel'}
              </button>
              <button
                type="submit"
                className="submit-btn"
                disabled={isSubmitting}
              >
                {isSubmitting
                  ? (currentLanguage === 'ru' ? 'Отправка...' : 'Sending...')
                  : (currentLanguage === 'ru' ? 'Отправить заказ' : 'Submit Order')
                }
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};




const StorePage = () => {
  const { t, currentLanguage } = useTranslation()
  const { addToCart, toggleCart, toggleFavorite, isFavorite, isInCart } = useStore()
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [orderModalOpen, setOrderModalOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)

  const filteredProducts = constructionProducts.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory
    const matchesSearch = searchTerm === '' ||
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.nameEn.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const handleAddToCart = useCallback((product) => {
  
    toggleCart(product)
  }, [toggleCart])

  const handleOrderNow = useCallback((product) => {
    setSelectedProduct(product)
    setOrderModalOpen(true)
  }, [])

  const handleCloseOrderModal = useCallback(() => {
    setOrderModalOpen(false)
    setSelectedProduct(null)
  }, [])

  const handleSubmitOrder = useCallback(async (orderData) => {
    
    try {
      await EmailService.sendOrderNotification({
        productName: orderData.product,
        customerName: orderData.name,
        customerPhone: orderData.phone,
        customerEmail: orderData.email,
        customerCity: orderData.city
      })
      console.log('Order notification sent successfully')
      return Promise.resolve();
    } catch (error) {
      console.error('Failed to send order notification:', error)
      return Promise.reject(error);
    }
  }, [])

  const handleToggleFavorite = useCallback((productId) => {
    toggleFavorite(productId)
  }, [toggleFavorite])

  return (
    <div className="page-main store-page">
      <div className="page-content">
        <div className="page-wrapper">
    
          <div className="page-header">
            <div className="store-image">
              <img src="/images/plywood.jpg" alt="Store" />
            </div>
            <h1 className="page-title">
              {currentLanguage === 'ru' ? 'Строительный магазин' : 'Construction Store'}
            </h1>
            <p className="page-subtitle">
              {currentLanguage === 'ru'
                ? 'Широкий ассортимент строительных материалов и инструментов'
                : 'Wide range of construction materials and tools'
              }
            </p>
          </div>

  
          <div className="store-filters">
            <div className="search-container">
              <input
                type="text"
                placeholder={currentLanguage === 'ru' ? 'Поиск товаров...' : 'Search products...'}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </div>

            <div className="category-filters">
              {categories.map(category => (
                <button
                  key={category.id}
                  className={`category-btn ${selectedCategory === category.id ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(category.id)}
                >
                  {currentLanguage === 'ru' ? category.nameRu : category.nameEn}
                </button>
              ))}
            </div>
          </div>

          <div className="products-section">
            <div className="products-count">
              {currentLanguage === 'ru'
                ? `Найдено товаров: ${filteredProducts.length}`
                : `Products found: ${filteredProducts.length}`
              }
            </div>

            <div className="products-grid">
              {filteredProducts.map(product => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={handleAddToCart}
                  onOrderNow={handleOrderNow}
                  onToggleFavorite={handleToggleFavorite}
                  isFavorite={isFavorite(product.id)}
                  isInCart={isInCart(product.id)}
                />
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="no-products">
                <p>
                  {currentLanguage === 'ru'
                    ? 'Товары не найдены. Попробуйте изменить фильтры или поисковый запрос.'
                    : 'No products found. Try changing filters or search term.'
                  }
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {orderModalOpen && selectedProduct && (
        <OrderModal
          product={selectedProduct}
          onClose={handleCloseOrderModal}
          onSubmit={handleSubmitOrder}
          currentLanguage={currentLanguage}
        />
      )}
    </div>
  )
}

export default StorePage