import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';

const Create = ({ navigation }) => {
  return (
    <View className="flex justify-center items-center gap-4 h-full">
      <TouchableOpacity
        className="bg-green-500 p-4 rounded-lg w-full max-w-xs"
        onPress={() => navigation.navigate('AddMoney')}
      >
        <Text className="text-white text-center">Add Money</Text>
      </TouchableOpacity>
      <TouchableOpacity
        className="bg-blue-500 p-4 rounded-lg w-full max-w-xs"
        onPress={() => navigation.navigate('WithdrawMoney')}
      >
        <Text className="text-white text-center">Withdraw Money</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Create;
