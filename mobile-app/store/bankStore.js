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

const useBankStore = create((set) => ({
  bankAccounts: [],
  adminBanks: [],
  getAdminBanks: async () => {
    try {
      const response = await axios.get(
        `${URL}/api/v1/bank/admin/bank-accounts`,
        {
          headers: {
            Authorization: `Bearer ${await getAuthToken()}`,
          },
        }
      );

      set({ adminBanks: response.data.data });
    } catch (error) {
      console.log(error);
    }
  },
  getBankAccounts: async () => {
    try {
      const { data } = await axios.get(`${URL}/api/v1/bank/bank-accounts`, {
        headers: {
          Authorization: `Bearer ${await getAuthToken()}`,
        },
      });
      set({ bankAccounts: data.data });
    } catch (error) {
      console.log(error);
    }
  },
  addBankAccount: async (d) => {
    try {
      const { data } = await axios.post(`${URL}/api/v1/bank/add-bank`, d, {
        headers: {
          Authorization: `Bearer ${await getAuthToken()}`,
        },
      });

      return data;
    } catch (error) {
      console.log(error);
    }
  },

  removeBankAccount: async (id) => {
    try {
      const response = await axios.delete(
        `${URL}/api/v1/bank/remove-bank/${id}`,
        {
          headers: {
            Authorization: `Bearer ${await getAuthToken()}`,
          },
        }
      );
      return response;
    } catch (error) {
      console.log(error);
    }
  },
}));

export default useBankStore;
