import { View, Text, TextInput } from 'react-native';
import React, { useState } from 'react';
import { FontAwesome } from '@expo/vector-icons';
import { COLORS } from '../constants';
import { LinearGradient } from 'expo-linear-gradient';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useEffect } from 'react';
import useExchangeRateStore from '../store/exchangeRateStore';

const Calculator = () => {
  const { exchangeRates, getExchangeRates } = useExchangeRateStore(
    (state) => state
  );

  useEffect(() => {
    getExchangeRates();
  }, []);

  const lastIndex = exchangeRates.length - 1;
  const rate = exchangeRates[lastIndex]?.rate || 0;

  const [usdt, setUsdt] = useState('0');
  const [inr, setInr] = useState('0');

  return (
    <View>
      <View className="flex-row justify-between items-center gap-x-4">
        <View className="flex-1">
          <Text className="mb-2 font-bold text-green-600 ml-2">USDT</Text>
          <TextInput
            className="border-2 border-gray-300 rounded-lg  p-2"
            value={usdt}
            onChangeText={(text) => {
              setUsdt(text);
              setInr((Number(text) * rate).toString());
            }}
            keyboardType="number-pad"
          />
        </View>

        <Text className="text-2xl font-bold mt-4 ">
          <FontAwesome name="exchange" size={24} color={COLORS.primary} />
        </Text>
        <View className="flex-1">
          <Text className="mb-2 font-bold text-blue-700 ml-2">INR</Text>
          <TextInput
            keyboardType="number-pad"
            className="border-2 border-gray-300 rounded-lg   p-2"
            value={inr}
            onChangeText={(text) => {
              setInr(text);
              setUsdt((Number(text) / rate).toString());
            }}
          />
        </View>
      </View>
    </View>
  );
};

export default Calculator;
