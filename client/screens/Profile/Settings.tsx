import React from 'react';
import { Text, View } from 'react-native';

import { MainLayout } from '../../layouts/MainLayout';

export default function Settings() {
  return (
    <MainLayout>
      <View className="flex-1 items-center justify-center bg-sevatracker-white">
        <Text className="font-sevatracker-manrope text-lg text-sevatracker-black">
          Settings coming soon...
        </Text>
      </View>
    </MainLayout>
  );
}
