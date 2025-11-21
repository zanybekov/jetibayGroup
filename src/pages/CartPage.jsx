import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../contexts/StoreContext';
import { useTranslation } from '../utils/useTranslation';
import { constructionProducts } from './StorePage';
import '../styles/pages.css';
import './StorePage.css';

const ProductCard = ({ product, quantity, onRemove }) => {
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
          className="favorite-btn"
          onClick={(e) => {
            e.stopPropagation();
            onRemove(product.id);
          }}
          title={currentLanguage === 'ru' ? 'Удалить из корзины' : 'Remove from Cart'}
          style={{ background: '#dc3545', color: 'white' }}
        >
          ✕
        </button>
        <div className="cart-quantity-badge">
          {quantity}
        </div>
      </div>
      <div className="product-info">
        <h3 className="product-name">
          {currentLanguage === 'ru' ? product.name : product.nameEn}
        </h3>
        <div className="product-price">
          {product.price.toLocaleString()} {currentLanguage === 'ru' ? 'сом' : 'som'}
        </div>
        <div className="cart-total-price">
          {currentLanguage === 'ru' ? 'Итого: ' : 'Total: '}
          {(product.price * quantity).toLocaleString()} {currentLanguage === 'ru' ? 'сом' : 'som'}
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

const CartPage = () => {
  const { t, currentLanguage } = useTranslation();
  const { cart, getTotalCartItems, getTotalCartValue, removeFromCart } = useStore();
  const navigate = useNavigate();

  const totalItems = getTotalCartItems();
  const totalValue = getTotalCartValue();

  const handleRemoveFromCart = (productId) => {
    removeFromCart(productId);
  };

  return (
    <div className="page-main store-page">
      <div className="page-content">
        <div className="page-wrapper">
  
          <div className="store-header">
            <h1 className="store-title">
              {currentLanguage === 'ru' ? 'Корзина' : 'Shopping Cart'}
            </h1>
            <p className="store-subtitle">
              {currentLanguage === 'ru' 
                ? 'Ваши выбранные товары'
                : 'Your selected products'
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

          {cart.length > 0 && (
            <div className="store-filters" style={{ marginBottom: '2rem' }}>
              <div className="cart-summary">
                <div className="cart-summary-item">
                  <span>{currentLanguage === 'ru' ? 'Товаров в корзине: ' : 'Items in cart: '}</span>
                  <strong>{totalItems}</strong>
                </div>
                <div className="cart-summary-item">
                  <span>{currentLanguage === 'ru' ? 'Общая стоимость: ' : 'Total cost: '}</span>
                  <strong>{totalValue.toLocaleString()} {currentLanguage === 'ru' ? 'сом' : 'som'}</strong>
                </div>
              </div>
            </div>
          )}

          <div className="products-section">
            <div className="products-count">
              {currentLanguage === 'ru' 
                ? `Товаров в корзине: ${cart.length}`
                : `Products in cart: ${cart.length}`
              }
            </div>
            
            {cart.length > 0 ? (
              <div className="products-grid">
                {cart.map(cartItem => {
                  const product = constructionProducts.find(p => p.id === cartItem.id);
                  return product ? (
                    <ProductCard
                      key={product.id}
                      product={product}
                      quantity={cartItem.quantity}
                      onRemove={handleRemoveFromCart}
                    />
                  ) : null;
                })}
              </div>
            ) : (
              <div className="no-products">
                <p>
                  {currentLanguage === 'ru' 
                    ? 'Ваша корзина пуста. Перейдите в магазин и добавьте товары в корзину.'
                    : 'Your cart is empty. Go to the store and add some products to cart.'
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

export default CartPage;