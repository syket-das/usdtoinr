import {
  View,
  Text,
  StatusBar,
  TextInput,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import {
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
  Entypo,
} from '@expo/vector-icons';
import RateBarChart from '../components/charts/RateBarChart';
import Calculator from '../components/Calculator';
import useExchangeRateStore from '../store/exchangeRateStore';
import useUserStore from '../store/userStore';
import { SafeAreaView } from 'react-native-safe-area-context';
import RateLineChart from '../components/charts/RateLineChart';
const Home = ({ navigation }) => {
  const { exchangeRates, getExchangeRates } = useExchangeRateStore(
    (state) => state
  );

  const { user, userErr, getUser, clearUserErr } = useUserStore(
    (state) => state
  );

  const [totalCompletedAmountAdded, setTotalCompletedAmountAdded] = useState(0);
  const [totalCompletedAmountWithdrawn, setTotalCompletedAmountWithdrawn] =
    useState(0);

  useEffect(() => {
    if (user) {
      let totalAdded = 0;
      let totalWithdrawn = 0;
      user.addMoneyRequests.forEach((req) => {
        if (req.status === 'COMPLETED') {
          totalAdded += Number(req.usdt);
        }
      });
      user.withdrawMoneyRequests.forEach((req) => {
        if (req.status === 'COMPLETED') {
          totalWithdrawn += Number(req.usdt);
        }
      });
      setTotalCompletedAmountAdded(Number(totalAdded));
      setTotalCompletedAmountWithdrawn(Number(totalWithdrawn));
    }
  }, [user]);

  useEffect(() => {
    getExchangeRates();
    getUser();
  }, []);

  return (
    <SafeAreaView className="px-4 relative ">
      <ScrollView className="" showsVerticalScrollIndicator={false}>
        <StatusBar barStyle="light-content" />
        <View className="flex-row justify-between mt-8">
          <View>
            <View className="flex-row items-center">
              <Text className=" text-2xl font-bold">Hello,</Text>
              <Text className=" text-2xl font-bold ml-1">
                {user?.name.split(' ')[0]}
              </Text>
            </View>
          </View>
          <View className="flex-row items-center gap-x-2">
            <Text className=" font-bold ">
              <MaterialCommunityIcons name="currency-usd" size={24} />
              <Text className=" text-3xl text-teal-600">
                {totalCompletedAmountAdded - totalCompletedAmountWithdrawn}
              </Text>
            </Text>
          </View>
        </View>

        <View className="mt-8 p-4 bg-gray-200 rounded-lg">
          <View className="flex-row items-center justify-between">
            <Text className=" text-lg font-bold mb-4">USDT | INR </Text>
            <Text className=" text-2xl text-red-600 font-bold mb-4">
              {/* last rate */}
              {exchangeRates.length > 0
                ? exchangeRates[exchangeRates.length - 1].rate
                : '0'}

              <Entypo name="arrow-up" size={24} />
            </Text>
          </View>

          <RateBarChart />
        </View>

        <View className="mt-8">
          <View className="flex-row items-center justify-between">
            <Text className=" text-lg font-bold mb-4">Exchange Calculator</Text>
          </View>
          <Calculator />
        </View>

        <View className="mt-8">
          <View className="mx-4 justify-between items-center flex-row gap-x-4 ">
            <TouchableOpacity
              onPress={() => navigation.navigate('AddMoney')}
              className=" items-center justify-between bg-blue-500 p-4 rounded-lg flex-1"
            >
              <MaterialIcons name="arrow-downward" size={24} color="white" />
              <Text className=" text-white">Add</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.navigate('WithdrawMoney')}
              className=" items-center justify-between bg-green-500  p-4 rounded-lg  flex-1"
            >
              <MaterialIcons name="arrow-upward" size={24} color="white" />
              <Text className=" text-white">Withdraw</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.navigate('Money')}
              className=" items-center justify-between bg-yellow-500 p-4 rounded-lg flex-1"
            >
              <MaterialIcons name="history" size={24} color="white" />
              <Text className=" text-white">History</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View className="my-[50px]" />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
