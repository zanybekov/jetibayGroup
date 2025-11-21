import { useSelector } from 'react-redux'
import { translations } from './translations'

export const useTranslation = () => {
  const currentLanguage = useSelector(state => state.language.currentLanguage)
  
  const t = (key, ruFallback = '', enFallback = '') => {
    // If key exists in translations, use it
    if (key && translations[currentLanguage] && translations[currentLanguage][key]) {
      return translations[currentLanguage][key]
    }
    
    // Use fallback based on current language
    if (currentLanguage === 'ru' && ruFallback) {
      return ruFallback
    } else if (currentLanguage === 'en' && enFallback) {
      return enFallback
    } else if (ruFallback) {
      return ruFallback
    }
    
    // Return key as last resort
    return key || ''
  }
  
  return { t, currentLanguage }
}