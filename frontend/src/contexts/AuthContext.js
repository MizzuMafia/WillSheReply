import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

// Create the Auth Context
const AuthContext = createContext();

// Define API URL - Change this to your backend URL
const API_URL = 'http://10.0.2.2:5000/api/auth'; // 10.0.2.2 points to localhost on Android emulator

export const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState(null);
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);

  // Load token from storage when app starts
  useEffect(() => {
    const loadTokenAndUser = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken');
        const userJSON = await AsyncStorage.getItem('userData');
        
        if (token && userJSON) {
          setUserToken(token);
          setUserData(JSON.parse(userJSON));
          // Set axios default header
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        }
      } catch (e) {
        console.log('Failed to load token or user data', e);
      } finally {
        setIsLoading(false);
      }
    };

    loadTokenAndUser();
  }, []);

  // Login function
  const login = async (username, password) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Call login API
      const response = await axios.post(`${API_URL}/login`, {
        username,
        password
      });
      
      // Extract token and user data
      const { token, ...user } = response.data;
      
      // Store token and user data
      await AsyncStorage.setItem('userToken', token);
      await AsyncStorage.setItem('userData', JSON.stringify(user));
      
      // Update state
      setUserToken(token);
      setUserData(user);
      
      // Set axios default header
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      return { success: true };
    } catch (e) {
      // Handle error
      const errorMessage = e.response?.data?.message || 'Login failed';
      setError(errorMessage);
      return { success: false, message: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  // Register function
  const register = async (username, password) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Call register API
      const response = await axios.post(`${API_URL}/register`, {
        username,
        password
      });
      
      // Extract token and user data
      const { token, ...user } = response.data;
      
      // Store token and user data
      await AsyncStorage.setItem('userToken', token);
      await AsyncStorage.setItem('userData', JSON.stringify(user));
      
      // Update state
      setUserToken(token);
      setUserData(user);
      
      // Set axios default header
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      return { success: true };
    } catch (e) {
      // Handle error
      const errorMessage = e.response?.data?.message || 'Registration failed';
      setError(errorMessage);
      return { success: false, message: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const logout = async () => {
    try {
      // Remove token and user data from storage
      await AsyncStorage.removeItem('userToken');
      await AsyncStorage.removeItem('userData');
      
      // Update state
      setUserToken(null);
      setUserData(null);
      
      // Remove auth header
      delete axios.defaults.headers.common['Authorization'];
    } catch (e) {
      console.log('Logout error', e);
    }
  };

  // Create the context value object
  const authContext = {
    login,
    register,
    logout,
    isLoading,
    userToken,
    userData,
    error
  };

  return (
    <AuthContext.Provider value={authContext}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for using auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};