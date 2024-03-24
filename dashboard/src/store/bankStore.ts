'use client';
import { create } from 'zustand';
import axios from 'axios';
import { URL } from '@/constants/data';

// local storage is used to store the authToken

let localStorage;

if (typeof window !== 'undefined') {
  localStorage = window.localStorage;
}

const useBankStore = create((set) => ({
  adminBanks: [],
  getAdminBanks: async () => {
    try {
      const response = await axios.get(
        `${URL}/api/v1/bank/admin/bank-accounts`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`,
          },
        }
      );

      set({ adminBanks: response.data.data });
    } catch (error) {
      console.log(error);
    }
  },

  addAdminBank: async (data) => {
    try {
      await axios.post(
        `${URL}/api/v1/bank/admin/add-bank`,

        data,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`,
          },
        }
      );
    } catch (error) {
      throw new Error(error);
    }
  },
  removeAdminBank: async (id) => {
    try {
      await axios.delete(`${URL}/api/v1/bank/admin/remove-bank/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
      });
    } catch (error) {
      throw new Error(error);
    }
  },
}));

export default useBankStore;
