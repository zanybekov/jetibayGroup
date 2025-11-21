import React, { createContext, useContext, useState, useEffect } from 'react'

const ThemeContext = createContext()

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Check localStorage first, then system preference
    try {
      const savedTheme = localStorage.getItem('theme')
      if (savedTheme !== null) {
        return savedTheme === 'dark'
      }
      return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
    } catch (error) {
      return false
    }
  })

  // Apply theme immediately on mount
  React.useEffect(() => {
    document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light')
    document.body.setAttribute('data-theme', isDarkMode ? 'dark' : 'light')
  }, [])

  useEffect(() => {
    // Apply theme to document
    document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light')
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light')
    
    // Also apply to body for compatibility
    document.body.setAttribute('data-theme', isDarkMode ? 'dark' : 'light')
    
    // Dispatch a custom event to notify all components of theme change
    window.dispatchEvent(new CustomEvent('themeChange', { detail: { isDarkMode } }))
  }, [isDarkMode])

  const toggleTheme = () => {
    setIsDarkMode(prev => !prev)
  }

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}