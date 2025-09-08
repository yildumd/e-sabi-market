// client/src/services/authService.js
import { authAPI } from './api';

export const authService = {
  register: async (userData) => {
    try {
      const response = await authAPI.register(userData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Registration failed' };
    }
  },

  registerVendor: async (formData) => {
    try {
      const response = await authAPI.registerVendor(formData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Vendor registration failed' };
    }
  },

  login: async (credentials) => {
    try {
      const response = await authAPI.login(credentials);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Login failed' };
    }
  }
};