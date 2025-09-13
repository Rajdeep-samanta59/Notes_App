import React, { createContext, useEffect, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(() => {
    try {
      return localStorage.getItem('accessToken') || null;
    } catch (err) {
      console.warn('localStorage not available', err);
      return null;
    }
  });
  const [user, setUser] = useState(() => {
    try {
      const s = localStorage.getItem('user');
      return s ? JSON.parse(s) : null;
    } catch (err) {
      console.warn('localStorage parse failed', err);
      return null;
    }
  });
  const [refreshToken, setRefreshToken] = useState(() => {
    try {
      return localStorage.getItem('refreshToken') || null;
    } catch (err) {
      console.warn('localStorage not available', err);
      return null;
    }
  });

  useEffect(() => {
    try {
      if (accessToken) localStorage.setItem('accessToken', accessToken);
      else localStorage.removeItem('accessToken');
    } catch (err) {
      console.warn('localStorage write failed', err);
    }
  }, [accessToken]);

  useEffect(() => {
    try {
      if (user) localStorage.setItem('user', JSON.stringify(user));
      else localStorage.removeItem('user');
    } catch (err) {
      console.warn('localStorage write failed', err);
    }
  }, [user]);

  useEffect(() => {
    try {
      if (refreshToken) localStorage.setItem('refreshToken', refreshToken);
      else localStorage.removeItem('refreshToken');
    } catch (err) {
      console.warn('localStorage write failed', err);
    }
  }, [refreshToken]);

  const login = ({ accessToken: token, refreshToken: rToken, user: u }) => {
    setAccessToken(token || null);
    setRefreshToken(rToken || null);
    setUser(u || null);
  };

  const logout = () => {
    setAccessToken(null);
    setRefreshToken(null);
    setUser(null);
    try {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('user');
    } catch (err) {
      console.warn('localStorage remove failed', err);
    }
  };

  const value = {
    accessToken,
    user,
    refreshToken,
    login,
    logout,
    isAuthenticated: Boolean(accessToken),
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
