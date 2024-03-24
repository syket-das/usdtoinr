import { create } from 'zustand';
import axios from 'axios';
import { URL } from '../constants/data';
import AsyncStorage from '@react-native-async-storage/async-storage';

const setAuthToken = async (value) => {
  try {
    await AsyncStorage.setItem('authToken', value);
  } catch (e) {
    // saving error
  }
};

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

const removeAuthToken = async () => {
  try {
    await AsyncStorage.removeItem('authToken');
  } catch (e) {
    console.log(e);
  }
};

const useAuthStore = create((set) => ({
  authToken: async () => {
    try {
      const value = await getAuthToken();
      if (value !== null) {
        return value;
      }
    } catch (e) {
      console.log(e);
    }
  },
  authErr: null,
  clearAuthErr: () => set({ authErr: null }),
  login: async (email, pass) => {
    try {
      const { data } = await axios({
        method: 'POST',
        url: `${URL}/api/v1/auth/login`,
        data: {
          email: email,
          password: pass,
        },
      });

      await setAuthToken(data.accessToken);
      set({ authToken: data.accessToken });
    } catch (error) {
      console.log('error', error);
      set({ authErr: error });
      throw new Error(error?.response?.data?.message || 'Login failed!!');
    }
  },

  register: async (name, email, pass, phone) => {
    try {
      const response = await axios.post(`${URL}/api/v1/auth/register`, {
        name: name,
        email: email,
        password: pass,
        phone: phone,
      });

      await setAuthToken(response.data.accessToken);

      set({ authToken: response.data.accessToken });
    } catch (error) {
      set({ authErr: error });
      throw new Error(
        error?.response?.data?.message || 'Registration failed!!'
      );
    }
  },

  logout: () => {
    removeAuthToken();
    set({ authToken: null });
  },
}));

export default useAuthStore;
