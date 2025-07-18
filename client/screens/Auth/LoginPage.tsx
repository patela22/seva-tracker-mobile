import React, { useState } from 'react';
import {
  Alert,
  Pressable,
  SafeAreaView,
  Text,
  TextInput,
  View
} from 'react-native';

import { useNavigation } from '@react-navigation/native';

import { MainLayout } from '../../layouts/MainLayout';
import { AppStackNavigation } from '../../navigation/types';
import { useAuth } from '../../services/auth';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { logInMutation } = useAuth();

  const navigation = useNavigation<AppStackNavigation>();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Email and password are required');
      return;
    }

    logInMutation(
      { email, password },
      {
        onSuccess: () => {
          console.log('Login successful, navigating to Main');
          navigation.navigate('Main');
        }
      }
    );
  };

  const handleSignUp = async () => {
    navigation.navigate('Register');
  };

  return (
    <MainLayout>
      <View className="h-[100vh]">
        <View className="bg-sevatracker-white mt-auto h-[60vh] w-[100vw] rounded-3xl shadow-lg">
          <SafeAreaView>
            <View className="mx-auto my-10 w-[80vw]">
              <Text className="font-sevatracker-manrope-bold text-sevatracker-blue mb-10 text-xl">
                Log in to your account
              </Text>
              <Text className="font-sevatracker-manrope-bold mr-auto mt-5 text-2xs">
                EMAIL
              </Text>
              <TextInput
                className="border-sevatracker-lightgray my-2.5 w-full rounded border-b py-2"
                value={email}
                onChangeText={setEmail}
                placeholder="email@email.com"
                keyboardType="email-address"
                autoCapitalize="none"
              />
              <Text className="font-sevatracker-manrope-bold mr-auto mt-5 text-2xs">
                PASSWORD
              </Text>
              <TextInput
                className="border-sevatracker-lightgray my-2.5 w-full rounded border-b py-2"
                value={password}
                onChangeText={setPassword}
                placeholder="1234"
                secureTextEntry
              />
            </View>
            <View className="mx-auto mb-8 mt-auto">
              <Pressable
                onPress={handleLogin}
                className="bg-sevatracker-blue mb-2 h-9 w-[80vw] items-center justify-center rounded-md"
              >
                <Text className="font-sevatracker-manrope-semibold text-sevatracker-white self-center text-base">
                  Login
                </Text>
              </Pressable>
              <Pressable
                onPress={handleSignUp}
                className="border-sevatracker-lightgray h-9 w-[80vw] items-center justify-center self-center rounded-md border"
              >
                <Text className="font-sevatracker-manrope-semibold text-sevatracker-blue self-center text-base">
                  Need to Register? Sign Up
                </Text>
              </Pressable>
            </View>
          </SafeAreaView>
        </View>
      </View>
    </MainLayout>
  );
}
