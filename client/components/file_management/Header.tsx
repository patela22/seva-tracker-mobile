import React from 'react';
import { SafeAreaView, Text, View } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import { AppStackNavigation } from '../../navigation/types';
import { BackButton } from '../nav_buttons/BackButton';

export function Header() {
  const navigation = useNavigation<AppStackNavigation>();
  return (
    <SafeAreaView className="bg-sevatracker-white/80">
      <View className="sevatracker-manrope-bold flex flex-row items-center justify-between border-b border-sevatracker-lightgray bg-sevatracker-white pb-4">
        <View className="pl-3">
          <BackButton />
        </View>
        <Text className="mx-auto font-sevatracker-manrope-bold text-xl text-sevatracker-blue">
          View Files
        </Text>
        <View
          className="right-3 mr-3 h-12 w-12 items-center justify-center rounded-xl bg-sevatracker-blue font-sevatracker-manrope"
          onTouchEnd={() => navigation.navigate('FileUploadScreen')}
        >
          <Text className="text-4xl text-sevatracker-white">+</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
