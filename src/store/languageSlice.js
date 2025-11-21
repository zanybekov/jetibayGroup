import { createSlice } from '@reduxjs/toolkit'

// Get initial language from localStorage or default to 'ru'
const getInitialLanguage = () => {
  try {
    const savedLanguage = localStorage.getItem('jetibay-language')
    return savedLanguage && ['ru', 'en'].includes(savedLanguage) ? savedLanguage : 'ru'
  } catch (error) {
    return 'ru'
  }
}

const initialState = {
  currentLanguage: getInitialLanguage(),
  languages: {
    ru: 'Русский',
    en: 'English'
  }
}

const languageSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    setLanguage: (state, action) => {
      state.currentLanguage = action.payload
      // Persist to localStorage
      try {
        localStorage.setItem('jetibay-language', action.payload)
      } catch (error) {
        console.warn('Could not save language to localStorage:', error)
      }
    }
  }
})

export const { setLanguage } = languageSlice.actions
export default languageSlice.reducer