import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../contexts/StoreContext';
import { useTranslation } from '../utils/useTranslation';
import { constructionProducts } from './StorePage';
import '../styles/pages.css';
import './StorePage.css';

const ProductCard = ({ product, onRemove }) => {
  const { currentLanguage } = useTranslation();
  const navigate = useNavigate();
  
  const handleViewProduct = () => {
    navigate('/store');
  };

  return (
    <div className="product-card">
      <div className="product-image">
        <img 
          src={product.image} 
          alt={currentLanguage === 'ru' ? product.name : product.nameEn}
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/300x220/f8f9fa/6c757d?text=No+Image';
          }}
        />
        <button 
          className="favorite-btn active"
          onClick={(e) => {
            e.stopPropagation();
            onRemove(product.id);
          }}
          title={currentLanguage === 'ru' ? 'Удалить из избранного' : 'Remove from Favorites'}
          style={{ background: '#dc3545', color: 'white' }}
        >
          ✕
        </button>
      </div>
      <div className="product-info">
        <h3 className="product-name">
          {currentLanguage === 'ru' ? product.name : product.nameEn}
        </h3>
        <div className="product-price">
          {product.price.toLocaleString()} {currentLanguage === 'ru' ? 'сом' : 'som'}
        </div>
        <button 
          className="add-to-cart-btn"
          onClick={handleViewProduct}
        >
          {currentLanguage === 'ru' ? 'Просмотреть' : 'View'}
        </button>
      </div>
    </div>
  );
};

const FavoritesPage = () => {
  const { t, currentLanguage } = useTranslation();
  const { favorites, toggleFavorite } = useStore();
  const navigate = useNavigate();

  const favoriteProducts = Array.from(favorites).map(id => 
    constructionProducts.find(product => product.id === id)
  ).filter(product => product !== undefined);

  const handleRemoveFromFavorites = (productId) => {
    toggleFavorite(productId);
  };

  return (
    <div className="page-main store-page">
      <div className="page-content">
        <div className="page-wrapper">
          {/* Page Header */}
          <div className="store-header">
            <h1 className="store-title">
              {currentLanguage === 'ru' ? 'Избранные товары' : 'Favorite Products'}
            </h1>
            <p className="store-subtitle">
              {currentLanguage === 'ru' 
                ? 'Ваши избранные строительные материалы'
                : 'Your favorite construction materials'
              }
            </p>
          </div>

         
          <div className="store-filters" style={{ marginBottom: '2rem' }}>
            <button 
              className="add-to-cart-btn" 
              onClick={() => navigate('/store')}
              style={{ width: 'auto', padding: '10px 20px' }}
            >
              ← {currentLanguage === 'ru' ? 'Назад в магазин' : 'Back to Store'}
            </button>
          </div>

          <div className="products-section">
            <div className="products-count">
              {currentLanguage === 'ru' 
                ? `Избранных товаров: ${favoriteProducts.length}`
                : `Favorite products: ${favoriteProducts.length}`
              }
            </div>
            
            {favoriteProducts.length > 0 ? (
              <div className="products-grid">
                {favoriteProducts.map(product => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onRemove={handleRemoveFromFavorites}
                  />
                ))}
              </div>
            ) : (
              <div className="no-products">
                <p>
                  {currentLanguage === 'ru' 
                    ? 'У вас пока нет избранных товаров. Перейдите в магазин и добавьте товары в избранное.'
                    : 'You have no favorite products yet. Go to the store and add some products to favorites.'
                  }
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FavoritesPage;