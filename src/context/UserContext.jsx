import React, { createContext, useContext, useState, useEffect } from 'react';

const DEFAULT_USER = {
  name: 'Alex Morgan',
  email: 'alex.morgan@campus.edu',
  role: 'Student Developer',
  studentId: 'CS-2024-8841',
  avatarInitials: 'AM',
  phone: '+1 555-0192',
  address: '404 Silicon Way, Hall B, Room 302'
};

const UserContext = createContext(null);

export function UserProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('shopsphere_user');
      return saved ? JSON.parse(saved) : DEFAULT_USER;
    } catch (e) {
      console.error('Failed to parse user from localStorage', e);
      return DEFAULT_USER;
    }
  });

  const [isAuthenticated, setIsAuthenticated] = useState(true);

  // Sync to localStorage on clean state changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('shopsphere_user', JSON.stringify(user));
    }
  }, [user]);

  const updateUser = (updatedFields) => {
    setUser((prev) => ({
      ...prev,
      ...updatedFields,
      avatarInitials: (updatedFields.name || prev.name)
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
    }));
  };

  const login = (email, password) => {
    const loggedUser = {
      ...DEFAULT_USER,
      email: email || DEFAULT_USER.email,
      name: email.split('@')[0] || 'Campus User'
    };
    setUser(loggedUser);
    setIsAuthenticated(true);
    return true;
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('shopsphere_user');
  };

  return (
    <UserContext.Provider value={{ user, setUser, updateUser, isAuthenticated, login, logout }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}
