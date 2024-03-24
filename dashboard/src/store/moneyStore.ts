// @ts-nocheck

'use client';
import { create } from 'zustand';
import axios from 'axios';
import { URL } from '@/constants/data';

let localStorage;

if (typeof window !== 'undefined') {
  localStorage = window.localStorage;
}

const useMoneyStore = create((set, get) => ({
  addMoneyRequests: [],
  withdrawMoneyRequests: [],

  getAddMoneyRequests: async () => {
    try {
      const { data } = await axios.get(`${URL}/api/v1/money/requests/all`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
      });
      set({ addMoneyRequests: data.data });
    } catch (error) {
      console.log(error);
    }
  },

  getWithdrawMoneyRequests: async () => {
    try {
      const { data } = await axios.get(
        `${URL}/api/v1/money/withdraw-requests/all`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`,
          },
        }
      );
      set({ withdrawMoneyRequests: data.data });
    } catch (error) {
      console.log(error);
    }
  },

  approveAddMoneyRequest: async (id: string) => {
    try {
      await axios.put(
        `${URL}/api/v1/money/requests/${id}/approve`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`,
          },
        }
      );

      get().getAddMoneyRequests();
    } catch (error) {
      console.log(error);
    }
  },

  rejectAddMoneyRequest: async (id: string) => {
    try {
      await axios.put(
        `${URL}/api/v1/money/requests/${id}/reject`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`,
          },
        }
      );

      get().getAddMoneyRequests();
    } catch (error) {
      console.log(error);
    }
  },

  completeAddMoneyRequest: async (id: string) => {
    try {
      await axios.put(
        `${URL}/api/v1/money/requests/${id}/complete`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`,
          },
        }
      );

      get().getAddMoneyRequests();
    } catch (error) {
      console.log(error);
    }
  },
  approveWithdrawMoneyRequest: async (id: string) => {
    try {
      await axios.put(
        `${URL}/api/v1/money/withdraw-requests/${id}/approve`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`,
          },
        }
      );

      get().getWithdrawMoneyRequests();
    } catch (error) {
      console.log(error);
    }
  },

  rejectWithdrawMoneyRequest: async (id: string) => {
    try {
      await axios.put(
        `${URL}/api/v1/money/withdraw-requests/${id}/reject`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`,
          },
        }
      );

      get().getWithdrawMoneyRequests();
    } catch (error) {
      console.log(error);
    }
  },

  completeWithdrawMoneyRequest: async (id: string) => {
    try {
      await axios.put(
        `${URL}/api/v1/money/withdraw-requests/${id}/complete`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`,
          },
        }
      );

      get().getWithdrawMoneyRequests();
    } catch (error) {
      console.log(error);
    }
  },
}));

export default useMoneyStore;
