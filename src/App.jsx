import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import store from './store/store'
import { ThemeProvider } from './contexts/ThemeContext'
import { StoreProvider } from './contexts/StoreContext'
import { UserProvider } from './contexts/UserContext'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'   
import HomePage from './pages/HomePage.jsx'
import AboutPage from './pages/AboutPage.jsx'
import ServicesPage from './pages/ServicesPage.jsx'
import PortfolioPage from './pages/PortfolioPage.jsx'
import ContactPage from './pages/ContactPage.jsx'
import QRCodePage from './pages/QRCodePage.jsx'
import StorePage from './pages/StorePage.jsx'
import FavoritesPage from './pages/FavoritesPage.jsx'
import CartPage from './pages/CartPage.jsx'
import UserProfilePage from './pages/UserProfilePage.jsx'
import BlogPage from './pages/BlogPage.jsx'
import UnsubscribePage from './pages/UnsubscribePage.jsx'
import { useTranslation } from './utils/useTranslation'
import AIAssistant from './components/AIAssistant.jsx'
import './App.css'

function SEOHead() {
  const { t, currentLanguage } = useTranslation()
  const location = useLocation()

  React.useEffect(() => {
    let pageTitle = 'Jetibay Group - '
    switch (location.pathname) {
      case '/':
        pageTitle += currentLanguage === 'ru' 
          ? 'Строительная компания в Кыргызстане'
          : 'Construction Company in Kyrgyzstan'
        break
      case '/about':
        pageTitle += currentLanguage === 'ru' ? 'О нас' : 'About Us'
        break
      case '/services':
        pageTitle += currentLanguage === 'ru' ? 'Услуги' : 'Services'
        break
      case '/portfolio':
        pageTitle += currentLanguage === 'ru' ? 'Портфолио' : 'Portfolio'
        break
      case '/contact':
        pageTitle += currentLanguage === 'ru' ? 'Контакты' : 'Contact'
        break
      case '/store':
        pageTitle += currentLanguage === 'ru' ? 'Магазин' : 'Store'
        break
      case '/favorites':
        pageTitle += currentLanguage === 'ru' ? 'Избранные' : 'Favorites'
        break
      case '/cart':
        pageTitle += currentLanguage === 'ru' ? 'Корзина' : 'Cart'
        break
      case '/qr':
        pageTitle += currentLanguage === 'ru' ? 'QR Код' : 'QR Code'
        break
      case '/blog':
        pageTitle += currentLanguage === 'ru' ? 'Блог и Новости' : 'Blog and News'
        break
      case '/unsubscribe':
        pageTitle += currentLanguage === 'ru' ? 'Отписаться' : 'Unsubscribe'
        break
      default:
        pageTitle += currentLanguage === 'ru' 
          ? 'Строительная компания в Кыргызстане'
          : 'Construction Company in Kyrgyzstan'
    }

    document.title = pageTitle
    const metaDescription = document.querySelector('meta[name="description"]')
    if (metaDescription) {
      metaDescription.setAttribute('content', t('metaDescription'))
    }
    document.documentElement.lang = currentLanguage
  }, [currentLanguage, t, location])

  return null
}

function AppContent() {
  return (
    <div className="App">
      <SEOHead />
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/portfolio" element={<PortfolioPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/store" element={<StorePage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/qr" element={<QRCodePage />} />
        <Route path="/profile" element={<UserProfilePage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/unsubscribe" element={<UnsubscribePage />} />
      </Routes>
      <Footer />
      <AIAssistant />
    </div>
  )
}

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <StoreProvider>
          <UserProvider>
            <Router>
              <AppContent />
            </Router>
          </UserProvider>
        </StoreProvider>
      </ThemeProvider>
    </Provider>
  )
}

export default App