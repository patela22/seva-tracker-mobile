import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import { MainLayout } from '../../layouts/MainLayout';
import { AppStackNavigation } from '../../navigation/types';
import { getCurrentAuthUser } from '../../services/auth';

export default function Dashboard() {
  const navigation = useNavigation<AppStackNavigation>();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const initializeApp = async () => {
      // Check for existing user and navigate accordingly
      try {
        const user = await getCurrentAuthUser();
        if (user) {
          console.log('User found, navigating to Main');
          navigation.navigate('Main');
        } else {
          console.log('No user found, navigating to Login');
          navigation.navigate('Login');
        }
      } catch (error) {
        console.log('Error checking auth:', error);
        navigation.navigate('Login');
      } finally {
        setIsChecking(false);
      }
    };

    initializeApp();
  }, [navigation]);

  if (isChecking) {
    return (
      <MainLayout>
        <View className="bg-sevatracker-white flex-1 items-center justify-center">
          <Text className="font-sevatracker-manrope text-lg">
            Checking authentication...
          </Text>
        </View>
      </MainLayout>
    );
  }

  return null;
}
