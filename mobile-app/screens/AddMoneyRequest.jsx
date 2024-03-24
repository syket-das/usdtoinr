import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { COLORS } from '../constants';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '../components/Button';
import useMoneyStore from '../store/moneyStore';
import Toast from 'react-native-simple-toast';
import useBankStore from '../store/bankStore';

const AddMoneyRequest = () => {
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
            Add Money Request
          </Text>

          <Text
            style={{
              fontSize: 16,
              color: 'red',
              marginBottom: 12,
            }}
          >
            Please select a bank account where you have sent the money
          </Text>

          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {adminBanks.map((bank) => (
              <TouchableOpacity
                onPress={() => {
                  setSelectedBankId(bank.id);
                  setData({ ...data, method: bank.bankName });
                }}
                className=" p-4 m-2 rounded-lg"
                key={bank.id}
                style={{
                  borderColor: selectedBankId === bank.id ? 'green' : 'gray',
                  backgroundColor: COLORS.white,
                  borderWidth: 4,
                }}
              >
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: 500,
                    color: COLORS.black,
                  }}
                >
                  {bank.bankName}
                </Text>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: 400,
                    color: COLORS.black,
                  }}
                >
                  Account Number: {bank.accountNumber}
                </Text>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: 400,
                    color: COLORS.black,
                  }}
                >
                  Account Holder Name: {bank.accountHolderName}
                </Text>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: 400,
                    color: COLORS.black,
                  }}
                >
                  Branch: {bank.branchName}
                </Text>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: 400,
                    color: COLORS.black,
                  }}
                >
                  IFSC: {bank.ifscCode}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
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
            Transaction Id
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
              placeholder="Enter transaction id "
              placeholderTextColor={COLORS.black}
              keyboardType="default"
              style={{
                width: '100%',
              }}
              value={data.transactionId}
              onChangeText={(text) => setData({ ...data, transactionId: text })}
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
            Account Number
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
              placeholder="Enter your account number"
              placeholderTextColor={COLORS.black}
              keyboardType="default"
              style={{
                width: '100%',
              }}
              value={data.accountNumber}
              onChangeText={(text) => setData({ ...data, accountNumber: text })}
            />
          </View>
        </View>

        <Button
          onPress={handleAddMoneyRequest}
          title="Add Money"
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

export default AddMoneyRequest;
