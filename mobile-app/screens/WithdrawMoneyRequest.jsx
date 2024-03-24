import { View, Text, TextInput, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import Button from '../components/Button';
import { SafeAreaView } from 'react-native-safe-area-context';
import useMoneyStore from '../store/moneyStore';
import useBankStore from '../store/bankStore';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { LinearGradient } from 'expo-linear-gradient';
import COLORS from '../constants/colors';
import Toast from 'react-native-simple-toast';

const WithdrawMoneyRequest = ({ navigation }) => {
  const { withdrawMoneyRequest } = useMoneyStore((state) => state);
  const { bankAccounts, getBankAccounts, addBankAccount, removeBankAccount } =
    useBankStore();

  const [selectedId, setSelectedId] = useState(null);

  const [data, setData] = useState({
    usdt: 0,
    accountNumber: '',
    method: '',
    message: '',
    accountHolder: '',
    ifscCode: '',
    branchName: '',
  });

  const handleWithdrawMoneyRequest = async () => {
    try {
      if (data.usdt === 0 || data.method === '' || data.accountNumber === '') {
        Toast.show(
          'Please enter details and select a bank account',
          Toast.LONG,
          Toast.TOP
        );
        return;
      }

      await withdrawMoneyRequest(data);

      setData({
        usdt: 0,
        accountNumber: '',
        method: '',
        message: '',
        accountHolder: '',
        ifscCode: '',
        branchName: '',
      });

      setSelectedId(null);

      Toast.show('Withdraw Request Sent Successfully', Toast.LONG, Toast.TOP);
      navigation.navigate('Money');
    } catch (error) {
      console.log(error);
      Toast.show('Something went wrong', Toast.LONG, Toast.TOP);
    }
  };

  useEffect(() => {
    getBankAccounts();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ flex: 1, marginHorizontal: 22 }}
      >
        <View style={{ marginVertical: 22 }}>
          <Text
            style={{
              fontSize: 22,
              fontWeight: 'bold',
              marginVertical: 12,
              color: COLORS.black,
            }}
          >
            Withdraw Money Request
          </Text>

          <Text
            style={{
              fontSize: 16,
              color: 'red',
            }}
          >
            Please note that Current exchange rate will be applied and the money
            will be sent to the given account.
          </Text>
        </View>

        <View>
          <Text
            style={{
              fontSize: 16,
              fontWeight: 400,
              marginVertical: 8,
            }}
          >
            Select Your Bank Account
          </Text>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="mt-4"
        >
          {bankAccounts.map((bank) => (
            <TouchableOpacity
              style={{
                padding: 10,
                margin: 10,
                borderRadius: 10,
                borderColor:
                  selectedId === bank.id ? COLORS.primary : COLORS.grey,
                borderWidth: 3,
              }}
              key={bank.id}
              onPress={() => {
                setSelectedId(bank.id);
                setData({
                  ...data,
                  accountNumber: bank.accountNumber,
                  method: bank.bankName,
                  accountHolder: bank.accountHolderName,
                  ifscCode: bank.ifscCode,
                  branchName: bank.branchName,
                });
              }}
            >
              <View className="flex-row justify-between items-center">
                <Text className="text-lg ">{bank.bankName}</Text>
              </View>
              <Text className="">{bank.accountNumber}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={{ marginBottom: 12 }}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: 400,
              marginVertical: 8,
            }}
          >
            USDT
          </Text>

          <View
            style={{
              width: '100%',
              height: 48,
              borderColor: COLORS.black,
              borderWidth: 1,
              borderRadius: 8,
              alignItems: 'center',
              justifyContent: 'center',
              paddingLeft: 22,
            }}
          >
            <TextInput
              placeholder="Enter usdt amount "
              placeholderTextColor={COLORS.black}
              keyboardType="numeric"
              style={{
                width: '100%',
              }}
              value={
                data.usdt === 0
                  ? 0
                  : data.usdt.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })
              }
              onChangeText={(text) => setData({ ...data, usdt: text })}
            />
          </View>
        </View>

        <View style={{ marginBottom: 12 }}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: 400,
              marginVertical: 8,
            }}
          >
            Message
          </Text>

          <View
            style={{
              width: '100%',
              height: 100,
              borderColor: COLORS.black,
              borderWidth: 1,
              borderRadius: 8,
              alignItems: 'center',
              justifyContent: 'center',
              paddingLeft: 22,
            }}
          >
            <TextInput
              multiline
              placeholder="any message for admin"
              placeholderTextColor={COLORS.black}
              keyboardType="default"
              style={{
                width: '100%',
                height: 100,
                paddingEnd: 22,
              }}
              value={data.message}
              onChangeText={(text) => setData({ ...data, message: text })}
            />
          </View>
        </View>
        <Button
          onPress={handleWithdrawMoneyRequest}
          title="Withdraw Money"
          filled
          style={{
            marginTop: 18,
            marginBottom: 4,
          }}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default WithdrawMoneyRequest;
