import { View, Text, FlatList, Dimensions } from 'react-native';
import React, { useEffect } from 'react';
import MoneyAddComponent from './MoneyAddComponent';
import useMoneyStore from '../store/moneyStore';

const AddMoneyRequests = () => {
  const { getAddMoneyRequests, addMoneyRequests } = useMoneyStore(
    (state) => state
  );

  useEffect(() => {
    getAddMoneyRequests();
  }, []);

  return (
    <View>
      <FlatList
        className="mt-4"
        data={[...addMoneyRequests]}
        renderItem={({ item }) => <MoneyAddComponent props={item} />}
      />
    </View>
  );
};

export default AddMoneyRequests;
