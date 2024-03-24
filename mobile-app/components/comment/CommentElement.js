import { View, Text, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';

const CommentElement = () => {
  return (
    <View className=" mx-4 mb-4">
      <View className="flex-row items-center gap-2">
        <Image
          className="w-6 h-6 rounded-full"
          source={require('../../assets/images/cover.jpg')}
        />
        <Text className="font-bold">John Doe</Text>

        <Text className="text-xs text-gray-500">2h ago</Text>

        <Ionicons name="chevron-down-outline" size={18} />
      </View>
      <View className="flex-row  mt-1">
        <Text className="mt-2 text-xs flex-1 ">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
          voluptates, voluptatibus, Lorem ipsum dolor sit, amet consectetur
          adipisicing elit. Rerum officiis suscipit autem quaerat esse et?
          Facilis, ducimus hic enim quae unde non magni asperiores voluptatum
          illo natus et suscipit aperiam.
        </Text>

        <View className="flex-col justify-between mt-2">
          <View className="flex-col  items-center bg-slate-200 px-2 py-1 rounded-lg">
            <View className="flex-col  items-center gap-1">
              <Ionicons
                name="heart"
                size={18}
                style={{
                  color: 'red',
                }}
              />
              <Text className="text-xs">1K</Text>
            </View>

            <View className="h-[1px] w-full bg-slate-400 my-2"></View>

            <Ionicons name="heart-dislike-outline" size={18} />
          </View>
        </View>
      </View>
      <View>
        <TouchableOpacity className="flex-row justify-between  items-center gap-2 mt-2">
          <Text className="text-xs text-gray-500">Reply </Text>
        </TouchableOpacity>

        <TouchableOpacity className="flex-row   items-center gap-2 mt-0">
          <View className="-rotate-90">
            <Ionicons name="pin-outline" size={18} color={'#cccccc'} />
          </View>
          <Text className="text-xs text-gray-500">View 8 replies </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CommentElement;
