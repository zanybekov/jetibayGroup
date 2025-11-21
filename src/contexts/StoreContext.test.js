import React from 'react';
import { renderHook, act } from '@testing-library/react';
import { StoreProvider, useStore } from './StoreContext';

// Test the StoreContext functionality
describe('StoreContext', () => {
  test('should add and remove items from favorites', () => {
    const wrapper = ({ children }) => (
      <StoreProvider>{children}</StoreProvider>
    );

    const { result } = renderHook(() => useStore(), { wrapper });

    // Initially, favorites should be empty
    expect(result.current.getFavoritesCount()).toBe(0);

    // Add an item to favorites
    act(() => {
      result.current.toggleFavorite(1);
    });

    // Favorites count should be 1
    expect(result.current.getFavoritesCount()).toBe(1);

    // Add another item to favorites
    act(() => {
      result.current.toggleFavorite(2);
    });

    // Favorites count should be 2
    expect(result.current.getFavoritesCount()).toBe(2);

    // Remove an item from favorites
    act(() => {
      result.current.toggleFavorite(1);
    });

    // Favorites count should be 1
    expect(result.current.getFavoritesCount()).toBe(1);

    // Check if an item is favorite
    expect(result.current.isFavorite(2)).toBe(true);
    expect(result.current.isFavorite(1)).toBe(false);
  });

  test('should add items to cart', () => {
    const wrapper = ({ children }) => (
      <StoreProvider>{children}</StoreProvider>
    );

    const { result } = renderHook(() => useStore(), { wrapper });

    // Initially, cart should be empty
    expect(result.current.getTotalCartItems()).toBe(0);

    // Add an item to cart
    act(() => {
      result.current.addToCart({ id: 1, name: 'Test Product', price: 100 });
    });

    // Cart count should be 1
    expect(result.current.getTotalCartItems()).toBe(1);

    // Add the same item again (should increase quantity)
    act(() => {
      result.current.addToCart({ id: 1, name: 'Test Product', price: 100 });
    });

    // Cart count should be 2
    expect(result.current.getTotalCartItems()).toBe(2);

    // Add a different item
    act(() => {
      result.current.addToCart({ id: 2, name: 'Another Product', price: 200 });
    });

    // Cart count should be 3
    expect(result.current.getTotalCartItems()).toBe(3);
  });
});