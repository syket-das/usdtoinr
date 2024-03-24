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

const useExchangeRateStore = create((set) => ({
  exchangeRates: [],
  getExchangeRates: async () => {
    try {
      const { data } = await axios.get(`${URL}/api/v1/exchange-rate/all`, {
        headers: {
          Authorization: `Bearer ${await getAuthToken()}`,
        },
      });
      set({ exchangeRates: data.data });
    } catch (error) {
      console.log(error);
    }
  },
}));

export default useExchangeRateStore;
