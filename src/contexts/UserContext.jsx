import React, { createContext, useState, useContext, useEffect } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  // Check for existing user in localStorage on initial load
  useEffect(() => {
    const savedUser = localStorage.getItem('jetibayUser');
    if (savedUser) {
      const userData = JSON.parse(savedUser);
      setCurrentUser(userData);
      setIsAdmin(userData.email === 'admin@example.com'); // Simple admin check
    }
  }, []);

  // Save user to localStorage whenever it changes
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('jetibayUser', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('jetibayUser');
    }
  }, [currentUser]);

  const registerUser = (email, password) => {
    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new Error('Invalid email format');
    }

    // Simple password validation
    if (!password || password.length < 6) {
      throw new Error('Password must be at least 6 characters');
    }

    // Create user object (in a real app, you would hash the password)
    const newUser = {
      id: Date.now(),
      email: email,
      password: password, // In a real app, this should be hashed
      registeredAt: new Date().toISOString()
    };

    setCurrentUser(newUser);
    // Simple admin check - in a real app, this would be more secure
    setIsAdmin(email === 'admin@example.com');
    
    return newUser;
  };

  const logout = () => {
    setCurrentUser(null);
    setIsAdmin(false);
  };

  return (
    <UserContext.Provider value={{
      currentUser,
      isAdmin,
      registerUser,
      logout
    }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export default UserContext;