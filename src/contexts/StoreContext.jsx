import React, { createContext, useContext, useState, useCallback, useMemo } from 'react'

const StoreContext = createContext()

export const useStore = () => {
  const context = useContext(StoreContext)
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider')
  }
  return context
}

export const StoreProvider = ({ children }) => {
  const [cart, setCart] = useState([])
  const [favorites, setFavorites] = useState(new Set())

  const addToCart = useCallback((product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id)
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      } else {
        return [...prevCart, { ...product, quantity: 1 }]
      }
    })
  }, [])

  const removeFromCart = useCallback((productId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId))
  }, [])

  const updateCartQuantity = useCallback((productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId)
      return
    }
    
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === productId
          ? { ...item, quantity }
          : item
      )
    )
  }, [removeFromCart])

  const toggleCart = useCallback((product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id)
      if (existingItem) {
        // If item exists in cart, remove it
        return prevCart.filter(item => item.id !== product.id)
      } else {
        // If item doesn't exist in cart, add it
        return [...prevCart, { ...product, quantity: 1 }]
      }
    })
  }, [])

  const clearCart = useCallback(() => {
    setCart([])
  }, [])

  const toggleFavorite = useCallback((productId) => {
    setFavorites(prevFavorites => {
      const newFavorites = new Set(prevFavorites)
      if (newFavorites.has(productId)) {
        newFavorites.delete(productId)
      } else {
        newFavorites.add(productId)
      }
      return newFavorites
    })
  }, [])

  const isFavorite = useCallback((productId) => {
    return favorites.has(productId)
  }, [favorites])

  const isInCart = useCallback((productId) => {
    return cart.some(item => item.id === productId)
  }, [cart])

  const getTotalCartItems = useCallback(() => {
    return cart.reduce((total, item) => total + item.quantity, 0)
  }, [cart])

  const getTotalCartValue = useCallback(() => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0)
  }, [cart])

  const getFavoritesCount = useCallback(() => {
    return favorites.size
  }, [favorites])

  // Memoize the context value to prevent unnecessary re-renders
  const value = useMemo(() => ({
    cart,
    favorites,
    addToCart,
    removeFromCart,
    updateCartQuantity,
    toggleCart,
    clearCart,
    toggleFavorite,
    isFavorite,
    isInCart,
    getTotalCartItems,
    getTotalCartValue,
    getFavoritesCount
  }), [
    cart,
    favorites,
    addToCart,
    removeFromCart,
    updateCartQuantity,
    toggleCart,
    clearCart,
    toggleFavorite,
    isFavorite,
    isInCart,
    getTotalCartItems,
    getTotalCartValue,
    getFavoritesCount
  ])

  return (
    <StoreContext.Provider value={value}>
      {children}
    </StoreContext.Provider>
  )
}