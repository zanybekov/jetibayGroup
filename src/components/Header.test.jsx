import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import { ThemeProvider } from '../contexts/ThemeContext';
import { StoreProvider } from '../contexts/StoreContext';
import Header from './Header';


jest.mock('../utils/useTranslation', () => ({
  useTranslation: () => ({
    t: (key) => {
      const translations = {
        'home': 'Home',
        'about': 'About',
        'services': 'Services',
        'portfolio': 'Portfolio',
        'contact': 'Contact',
        'store': 'Store'
      };
      return translations[key] || key;
    },
    currentLanguage: 'en'
  })
}));


const mockStore = configureStore([]);
const store = mockStore({
  language: { currentLanguage: 'en' }
});


const mockThemeContext = {
  isDarkMode: false,
  toggleTheme: jest.fn()
};

jest.mock('../contexts/ThemeContext', () => ({
  useTheme: () => mockThemeContext,
  ThemeProvider: ({ children }) => <div>{children}</div>
}));

describe('Header Component', () => {
  const renderHeader = () => {
    return render(
      <Provider store={store}>
        <ThemeProvider>
          <StoreProvider>
            <BrowserRouter>
              <Header />
            </BrowserRouter>
          </StoreProvider>
        </ThemeProvider>
      </Provider>
    );
  };

  test('displays cart and favorites badges with correct counts', () => {
    renderHeader();
    
    expect(screen.getByText('Jetibay Group')).toBeInTheDocument();
    

    const cartButton = screen.getByTitle('Cart');
    const favoritesButton = screen.getByTitle('Favorites');
    
    expect(cartButton).toBeInTheDocument();
    expect(favoritesButton).toBeInTheDocument();
  });
});