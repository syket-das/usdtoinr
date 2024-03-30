import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Button,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { COLORS } from '../constants';
import { SafeAreaView } from 'react-native-safe-area-context';
import useMoneyStore from '../store/moneyStore';
import Toast from 'react-native-simple-toast';
import useBankStore from '../store/bankStore';
import QRCode from 'react-native-qrcode-svg';
import useUserStore from '../store/userStore';
import { WebView } from 'react-native-webview';
import * as Linking from 'expo-linking';

const AddMoneyRequest = () => {
  const { user, getUser } = useUserStore((state) => state);
  const [link, setLink] = useState('');

  const { addMoneyRequest } = useMoneyStore((state) => state);

  const { adminBanks, getAdminBanks } = useBankStore((state) => state);

  const [selectedBankId, setSelectedBankId] = useState(null);

  const [data, setData] = useState({
    usdt: 0,
    transactionId: '',
    accountNumber: '',
    method: '',
    message: '',
  });

  useEffect(() => {
    getAdminBanks();
  }, []);

  const handleAddMoneyRequest = async () => {
    if (
      data.usdt === 0 ||
      data.transactionId === '' ||
      data.accountNumber === '' ||
      data.method === ''
    ) {
      Toast.show(
        'Please fill all the fields. make sure you selected an account',
        Toast.SHORT
      );
      return;
    }

    try {
      console.log(data);
      await addMoneyRequest(data);

      setData({
        usdt: 0,
        transactionId: '',
        accountNumber: '',
        method: '',
        message: '',
      });
    } catch (error) {
      console.log(error);
    }
  };

  const createInvoice = async () => {
    if (Number(data.usdt) == 0) {
      Toast.show('Please enter usdt amount', Toast.SHORT);
      return;
    }

    const price = Number(data.usdt);
    const email = user.email;

    try {
      const response = await fetch(
        'https://payid19.com/api/v1/create_invoice',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            public_key: '5JOYa4SCMUiiPH9NKVYoa49wW',
            private_key: 'Zlk6IU7x8Av9QsSvJaUWlOjyJChpJoR14FLhoLns',
            price_amount: price,
            email: email,
          }),
        }
      );
      const data = await response.json();

      console.log(data);

      if (data.status === 'error') {
        Toast.show(data.message, Toast.SHORT);
        return;
      }

      setLink(data.message);
      Linking.openURL(data.message);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <View className="flex-1 items-center justify-center">
        <TextInput
          className="border border-gray-400 rounded-lg p-2 w-3/4"
          placeholder="Enter usdt amount"
          value={data.usdt}
          onChangeText={(text) => setData({ ...data, usdt: text })}
          keyboardType="numeric"
        />
        <TouchableOpacity
          onPress={() => createInvoice()}
          className="bg-blue-500 p-2 rounded-lg  w-3/4 mt-4"
        >
          <Text className="text-white text-center">Create Invoice</Text>
        </TouchableOpacity>
      </View>

      <View className="flex-1 items-center justify-center">
        {link ? (
          <WebView
            style={{
              flex: 1,
              height: 1500,
              width: '100%',
            }}
            source={{
              uri: link,
            }}
          />
        ) : null}
      </View>
    </SafeAreaView>
  );
};

export default AddMoneyRequest;
