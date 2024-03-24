import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from 'react-native';
import React from 'react';
import MoneyAddComponent from '../components/MoneyAddComponent';
import TopTabNav from '../navigations/TopTabNav';

const Money = () => {
  return (
    <View className="bg-white flex-1">
      <TopTabNav />
    </View>
  );
};

export default Money;
