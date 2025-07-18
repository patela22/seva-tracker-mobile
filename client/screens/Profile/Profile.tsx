import React, { useState } from 'react';
import { ActivityIndicator, Pressable, Text, View } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import { useSevaTrackerContext } from '../../contexts/SevaTrackerContext';
import { MainLayout } from '../../layouts/MainLayout';
import { AppStackNavigation } from '../../navigation/types';
import { useAuth } from '../../services/auth';

export default function Profile() {
  const navigation = useNavigation<AppStackNavigation>();
  const { user: signedInUser } = useSevaTrackerContext();
  const { signOutMutation } = useAuth();

  // Mock user data for POC
  const mockUser = {
    user_id: signedInUser.userID || 'demo_user',
    first_name: 'Demo',
    last_name: 'User',
    email: signedInUser.userEmail || 'demo@example.com',
    phone: '555-0123',
    address: '123 Demo Street'
  };

  const handleSignOut = () => {
    signOutMutation();
    navigation.navigate('Login');
  };

  return (
    <View>
      <View className="bg-sevatracker-white h-[8vh]" />
      <MainLayout>
        <View className="p-6">
          <Text className="font-sevatracker-manrope-bold text-sevatracker-blue mb-8 text-center text-2xl">
            Profile
          </Text>

          {/* User Info Card */}
          <View className="bg-white border-gray-200 mb-6 rounded-lg border p-6 shadow-sm">
            <Text className="font-sevatracker-manrope-bold text-sevatracker-black mb-4 text-lg">
              User Information
            </Text>

            <View className="mb-3">
              <Text className="font-sevatracker-manrope-semibold text-gray-600 text-sm">
                Name
              </Text>
              <Text className="font-sevatracker-manrope text-sevatracker-black text-base">
                {mockUser.first_name} {mockUser.last_name}
              </Text>
            </View>

            <View className="mb-3">
              <Text className="font-sevatracker-manrope-semibold text-gray-600 text-sm">
                Email
              </Text>
              <Text className="font-sevatracker-manrope text-sevatracker-black text-base">
                {mockUser.email}
              </Text>
            </View>

            <View className="mb-3">
              <Text className="font-sevatracker-manrope-semibold text-gray-600 text-sm">
                Phone
              </Text>
              <Text className="font-sevatracker-manrope text-sevatracker-black text-base">
                {mockUser.phone}
              </Text>
            </View>

            <View className="mb-3">
              <Text className="font-sevatracker-manrope-semibold text-gray-600 text-sm">
                Address
              </Text>
              <Text className="font-sevatracker-manrope text-sevatracker-black text-base">
                {mockUser.address}
              </Text>
            </View>
          </View>

          {/* Group Info Card */}
          <View className="bg-white border-gray-200 mb-6 rounded-lg border p-6 shadow-sm">
            <Text className="font-sevatracker-manrope-bold text-sevatracker-black mb-4 text-lg">
              Group Information
            </Text>

            <View className="mb-3">
              <Text className="font-sevatracker-manrope-semibold text-gray-600 text-sm">
                Group Name
              </Text>
              <Text className="font-sevatracker-manrope text-sevatracker-black text-base">
                My Seva Group
              </Text>
            </View>

            <View className="mb-3">
              <Text className="font-sevatracker-manrope-semibold text-gray-600 text-sm">
                Role
              </Text>
              <Text className="font-sevatracker-manrope text-sevatracker-black text-base">
                Primary Member
              </Text>
            </View>
          </View>

          {/* Sign Out Button */}
          <Pressable
            onPress={handleSignOut}
            className="bg-red-500 items-center rounded-lg p-4"
          >
            <Text className="font-sevatracker-manrope-semibold text-white text-base">
              Sign Out
            </Text>
          </Pressable>
        </View>
      </MainLayout>
    </View>
  );
}
