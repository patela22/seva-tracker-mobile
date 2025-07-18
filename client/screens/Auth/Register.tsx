import React, { useState } from 'react';
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  View
} from 'react-native';

import { useNavigation } from '@react-navigation/native';

import { MainLayout } from '../../layouts/MainLayout';
import { AppStackNavigation } from '../../navigation/types';
import { useAuth } from '../../services/auth';

export default function Register() {
  const navigation = useNavigation<AppStackNavigation>();
  const [form, setForm] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    phone: '',
    address: ''
  });

  const { signUpMutation } = useAuth();

  const handleSignUp = async () => {
    if (!form.email || !form.password) {
      alert('Email and password are required');
      return;
    }

    signUpMutation(
      { email: form.email, password: form.password },
      {
        onSuccess: () => {
          console.log('Registration successful, navigating to Main');
          navigation.navigate('Main');
        }
      }
    );
  };

  return (
    <MainLayout>
      <View className="h-[100vh]">
        <View className="bg-sevatracker-white mt-auto h-[80vh] w-[100vw] rounded-3xl shadow-lg ">
          <SafeAreaView className="flex-1">
            <ScrollView>
              <View className="mx-auto my-10 w-[80vw]">
                <Text className="font-sevatracker-manrope-bold text-sevatracker-blue mb-10 text-xl">
                  Register for an account
                </Text>
                <View className="flex flex-row">
                  <View className="w-[40vw]">
                    <Text className="font-sevatracker-manrope-bold mr-auto mt-5 text-2xs">
                      FIRST NAME
                    </Text>
                    <TextInput
                      className="border-sevatracker-lightgray my-2.5 w-full rounded border-b py-2"
                      value={form.firstName}
                      onChangeText={(firstName) =>
                        setForm({ ...form, firstName })
                      }
                      placeholder="john"
                    />
                  </View>
                  <View className="ml-2 w-[40vw]">
                    <Text className="font-sevatracker-manrope-bold mr-auto mt-5 text-2xs">
                      LAST NAME
                    </Text>
                    <TextInput
                      className="border-sevatracker-lightgray my-2.5 w-full rounded border-b py-2"
                      value={form.lastName}
                      onChangeText={(lastName) =>
                        setForm({ ...form, lastName })
                      }
                      placeholder="doe"
                    />
                  </View>
                </View>
                <Text className="font-sevatracker-manrope-bold mr-auto mt-5 text-2xs">
                  EMAIL
                </Text>
                <TextInput
                  className="border-sevatracker-lightgray my-2.5 w-full rounded border-b py-2"
                  value={form.email}
                  onChangeText={(email) => setForm({ ...form, email })}
                  placeholder="email@email.com"
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
                <Text className="font-sevatracker-manrope-bold mr-auto mt-5 text-2xs">
                  PASSWORD
                </Text>
                <TextInput
                  className="border-sevatracker-lightgray my-2.5 w-full rounded border-b py-2"
                  value={form.password}
                  onChangeText={(password) => setForm({ ...form, password })}
                  placeholder="1234"
                  secureTextEntry
                />
                <Text className="font-sevatracker-manrope-bold mr-auto mt-5 text-2xs">
                  PHONE NUMBER
                </Text>
                <TextInput
                  className="border-sevatracker-lightgray my-2.5 w-full rounded border-b py-2"
                  value={form.phone}
                  onChangeText={(phone) => setForm({ ...form, phone })}
                  placeholder="(000) 000-0000"
                  keyboardType="phone-pad"
                />
              </View>
              <View className="mx-auto mb-8">
                <Pressable
                  onPress={handleSignUp}
                  className="bg-sevatracker-blue mb-2 h-9 w-[80vw] items-center justify-center rounded-md"
                >
                  <Text className="font-sevatracker-manrope-semibold text-sevatracker-white self-center text-base">
                    Sign Up
                  </Text>
                </Pressable>
                <Pressable
                  onPress={() => navigation.navigate('Login')}
                  className="border-sevatracker-lightgray h-9 w-[80vw] items-center justify-center self-center rounded-md border"
                >
                  <Text className="font-sevatracker-manrope-semibold text-sevatracker-blue self-center text-base">
                    Have an Account? Log in
                  </Text>
                </Pressable>
              </View>
            </ScrollView>
          </SafeAreaView>
        </View>
      </View>
    </MainLayout>
  );
}
