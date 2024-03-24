import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Button,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SimpleLineIcons } from '@expo/vector-icons';
import Modal from 'react-native-modal';
import { COLORS } from '../constants';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import useBankStore from '../store/bankStore';
import Toast from 'react-native-simple-toast';
import { LinearGradient } from 'expo-linear-gradient';

const BankAccount = () => {
  const { bankAccounts, getBankAccounts, addBankAccount, removeBankAccount } =
    useBankStore();

  const [isModalVisible, setModalVisible] = useState(false);
  const [data, setData] = useState({
    bankName: '',
    accountHolderName: '',
    accountNumber: '',
    branchName: '',
    ifscCode: '',
    branchName: '',
  });

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  useEffect(() => {
    getBankAccounts();
  }, []);

  const handleAddBankAccount = async () => {
    if (!data.bankName || !data.accountNumber) {
      Toast.show('Bank Name and Account Number are required', Toast.LONG);
      return;
    }

    const response = await addBankAccount(data);
    if (response) {
      Toast.show('Bank Account Added Successfully', Toast.LONG, Toast.TOP);
      toggleModal();
      getBankAccounts();
    }
  };

  const handleRemoveBankAccount = async (id) => {
    const response = await removeBankAccount(id);
    if (response) {
      getBankAccounts();
    }
  };

  return (
    <SafeAreaView className="px-4 my-8">
      <KeyboardAwareScrollView>
        <View className="flex-row justify-between items-center">
          <Text className="text-lg">Manage Banks</Text>
          <TouchableOpacity
            onPress={toggleModal}
            className="bg-green-700 px-4 py-2 rounded-lg"
          >
            <SimpleLineIcons name="plus" size={24} color="white" />
            <Text className="text-white">Add</Text>
          </TouchableOpacity>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} className="mt-4">
          {bankAccounts.map((bank) => (
            <LinearGradient
              key={bank.id}
              colors={['#13f1fc', '#0470dc']}
              style={{ padding: 10, margin: 10, borderRadius: 10 }}
            >
              <View className=" p-4 rounded-lg mb-4">
                <View className="flex-row justify-between items-center">
                  <Text className="text-2xl  text-white">{bank.bankName}</Text>
                  <TouchableOpacity
                    onPress={() => handleRemoveBankAccount(bank.id)}
                    className=" rounded-lg"
                  >
                    <SimpleLineIcons name="trash" size={24} color={'red'} />
                  </TouchableOpacity>
                </View>

                <Text className="text-sm text-white">
                  Account Holder: {bank.accountHolderName}
                </Text>
                <Text className="text-sm text-white">
                  Account Number: {bank.accountNumber}
                </Text>
                <Text className="text-sm text-white">
                  Branch: {bank.branch}
                </Text>
                <Text className="text-sm text-white">IFSC: {bank.ifsc}</Text>
              </View>
            </LinearGradient>
          ))}
        </ScrollView>

        <Modal isVisible={isModalVisible}>
          <ScrollView
            style={{
              flex: 1,
              backgroundColor: 'white',
              padding: 20,
              borderRadius: 10,
              margin: 0,
              marginTop: 100,
            }}
          >
            <View className="flex-row justify-between items-center">
              <Text className="text-lg">Add Bank Account</Text>
              <TouchableOpacity onPress={toggleModal}>
                <SimpleLineIcons name="close" size={24} color={COLORS.black} />
              </TouchableOpacity>
            </View>
            <View className="mt-4 mb-2">
              <Text className="text-sm">Bank Name (Required) </Text>
              <TextInput
                placeholder="Bank Name"
                className="border-b border-gray-400"
                value={data.bankName}
                onChangeText={(text) => setData({ ...data, bankName: text })}
              />
            </View>
            <View className="mt-4 mb-2">
              <Text className="text-sm">Account Holder Name (Optional)</Text>
              <TextInput
                placeholder="Account Name"
                className="border-b border-gray-400"
                value={data.accountHolderName}
                onChangeText={(text) =>
                  setData({ ...data, accountHolderName: text })
                }
              />
            </View>
            <View className="mt-4 mb-2">
              <Text className="text-sm">Account Number (Required)</Text>
              <TextInput
                placeholder="Account Number"
                className="border-b border-gray-400"
                value={data.accountNumber}
                onChangeText={(text) =>
                  setData({ ...data, accountNumber: text })
                }
              />
            </View>
            <View className="mt-4 mb-2">
              <Text className="text-sm">Branch (Optional)</Text>
              <TextInput
                placeholder="Bank Branch"
                className="border-b border-gray-400"
                value={data.branchName}
                onChangeText={(text) => setData({ ...data, branchName: text })}
              />
            </View>

            <View className="mt-4 mb-2">
              <Text className="text-sm">IFSC Code (Optional)</Text>
              <TextInput
                placeholder="IFSC Code"
                className="border-b border-gray-400"
                value={data.ifscCode}
                onChangeText={(text) => setData({ ...data, ifscCode: text })}
              />
            </View>

            <View className="mt-4">
              <Button onPress={handleAddBankAccount} title="Add Bank Account" />
            </View>
          </ScrollView>
        </Modal>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default BankAccount;
