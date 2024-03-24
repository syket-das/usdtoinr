import { create } from 'zustand';
import axios from 'axios';
import { URL } from '../constants/data';
import AsyncStorage from '@react-native-async-storage/async-storage';

// local storage is used to store the token

const getAuthToken = async () => {
  try {
    const value = await AsyncStorage.getItem('authToken');
    if (value !== null) {
      return value;
    }
  } catch (e) {
    console.log(e);
  }
};

const useMoneyStore = create((set) => ({
  addMoneyRequests: [],
  withdrawMoneyRequests: [],

  addMoneyRequest: async (d) => {
    try {
      const authToken = await getAuthToken();
      const { data } = await axios.post(
        `${URL}/api/v1/money/add`,
        {
          ...d,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      console.log(data);
    } catch (error) {
      throw new Error(error);
    }
  },

  withdrawMoneyRequest: async (d) => {
    try {
      const authToken = await getAuthToken();
      const { data } = await axios.post(
        `${URL}/api/v1/money/withdraw`,
        {
          ...d,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      console.log(data);
    } catch (error) {
      throw new Error(error);
    }
  },

  getAddMoneyRequests: async () => {
    try {
      const authToken = await getAuthToken();
      const { data } = await axios.get(`${URL}/api/v1/money/requests`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
      });
      set({ addMoneyRequests: data.data });
    } catch (error) {
      throw new Error(error);
    }
  },

  getWithdrawMoneyRequests: async () => {
    try {
      const authToken = await getAuthToken();
      const { data } = await axios.get(
        `${URL}/api/v1/money/withdraw-requests`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      set({ withdrawMoneyRequests: data.data });
    } catch (error) {
      throw new Error(error);
    }
  },
}));

export default useMoneyStore;
