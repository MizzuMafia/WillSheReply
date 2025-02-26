// src/services/apiService.js
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Create API service with base URL
const apiClient = axios.create({
  baseURL: 'https://your-api.example.com', // Replace with your actual backend URL
  timeout: 10000
});

// Request interceptor to add auth token
apiClient.interceptors.request.use(
  async (config) => {
    try {
      const token = await AsyncStorage.getItem('authToken');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error('Error setting auth token:', error);
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    // Handle token refresh or specific error cases
    if (error.response?.status === 401) {
      // Token expired, redirect to login
      // You can implement token refresh logic here if needed
    }
    return Promise.reject(error);
  }
);

// AI chat service
export const sendChatMessage = async (messageData) => {
  try {
    const response = await apiClient.post('/api/chat', messageData);
    return response.data;
  } catch (error) {
    console.error('Chat API error:', error);
    throw error;
  }
};

// Other API functions can be added here
export const getUserProfile = async () => {
  try {
    const response = await apiClient.get('/api/user/profile');
    return response.data;
  } catch (error) {
    console.error('Profile API error:', error);
    throw error;
  }
};