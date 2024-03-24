import { create } from 'zustand';
import axios from 'axios';
import { URL } from '../constants/data';
import AsyncStorage from '@react-native-async-storage/async-storage';

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

const useUserStore = create((set) => ({
  user: null,
  userErr: null,
  clearUserErr: () => set({ userErr: null }),
  getUser: async () => {
    try {
      const authToken = await getAuthToken();

      const { data } = await axios.get(`${URL}/api/v1/users/profile`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      set({ user: data.data });
    } catch (error) {
      set({ userErr: error });
    }
  },
}));

export default useUserStore;
