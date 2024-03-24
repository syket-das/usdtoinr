import { View, Text, Dimensions, FlatList } from 'react-native';
import React, { useEffect } from 'react';
import MoneyAddComponent from './MoneyAddComponent';
import useMoneyStore from '../store/moneyStore';
import WithdrawComponent from './WithdrawComponent';

const WithdrawMoneyRequest = () => {
  const { withdrawMoneyRequests, getWithdrawMoneyRequests } = useMoneyStore(
    (state) => state
  );

  useEffect(() => {
    getWithdrawMoneyRequests();
  }, []);
  return (
    <View>
      <FlatList
        className="mt-4"
        data={[...withdrawMoneyRequests]}
        renderItem={({ item }) => <WithdrawComponent props={item} />}
      />
    </View>
  );
};

export default WithdrawMoneyRequest;
