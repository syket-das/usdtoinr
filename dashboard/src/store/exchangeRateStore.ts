'use client';
import { create } from 'zustand';
import axios from 'axios';
import { URL } from '@/constants/data';

// local storage is used to store the token

let localStorage;

if (typeof window !== 'undefined') {
  localStorage = window.localStorage;
}

const useExchangeRateStore = create((set) => ({
  exchangeRates: [],
  getExchangeRates: async () => {
    try {
      const { data } = await axios.get(`${URL}/api/v1/exchange-rate/all`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
      });
      set({ exchangeRates: data.data });
    } catch (error) {
      console.log(error);
    }
  },

  addExchangeRate: async (exchangeRate) => {
    try {
      const { data } = await axios.post(
        `${URL}/api/v1/exchange-rate/add`,
        exchangeRate,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`,
          },
        }
      );
      set((state) => {
        return { exchangeRates: [...state.exchangeRates, data.data] };
      });
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  },
}));

export default useExchangeRateStore;
