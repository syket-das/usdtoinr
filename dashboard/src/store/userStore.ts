'use client';
import { create } from 'zustand';
import axios from 'axios';
import { URL } from '@/constants/data';
let localStorage;

if (typeof window !== 'undefined') {
  localStorage = window.localStorage;
}

const useUserStore = create((set) => ({
  user: null,
  users: [],
  userErr: null,
  clearUserErr: () => set({ userErr: null }),
  getUser: async () => {
    try {
      const { data } = await axios.get(`${URL}/api/v1/users/profile`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
      });
      set({ user: data.data });
    } catch (error) {
      set({ userErr: error });
    }
  },

  getUsers: async () => {
    try {
      const { data } = await axios.get(`${URL}/api/v1/users/all`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
      });
      set({ users: data.data });
    } catch (error) {
      set({ userErr: error });
    }
  },
}));

export default useUserStore;
