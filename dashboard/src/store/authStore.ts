'use client';
import { create } from 'zustand';
import axios from 'axios';
import { URL } from '@/constants/data';

let localStorage;

if (typeof window !== 'undefined') {
  localStorage = window.localStorage;
}

const useAuthStore = create((set) => ({
  authToken: localStorage?.getItem('authToken') || null,
  authErr: null,
  clearAuthErr: () => set({ authErr: null }),
  login: async (email, pass) => {
    try {
      const response = await axios.post(`${URL}/api/v1/auth/login`, {
        email: email,
        password: pass,
      });

      localStorage.setItem('authToken', response.data.accessToken);
      set({ authToken: response.data.accessToken });
    } catch (error) {
      set({ authErr: error });
      throw new Error(error);
    }
  },

  register: async (name, email, pass) => {
    try {
      const response = await axios.post(`${URL}/api/v1/auth/register`, {
        name: name,
        email: email,
        password: pass,
      });
      localStorage.setItem('authToken', response.data.accessToken);
      set({ authToken: response.data.accessToken });
    } catch (error) {
      set({ authErr: error });
    }
  },

  logout: () => {
    localStorage.removeItem('authToken');
    set({ authToken: null });
  },
}));

export default useAuthStore;
