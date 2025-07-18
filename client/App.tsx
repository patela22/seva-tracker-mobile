import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';

import {
  Manrope_400Regular,
  Manrope_600SemiBold,
  Manrope_700Bold,
  Manrope_800ExtraBold,
  useFonts
} from '@expo-google-fonts/manrope';
import {
  Montserrat_400Regular,
  Montserrat_600SemiBold,
  Montserrat_700Bold
} from '@expo-google-fonts/montserrat';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider as PaperProvider } from 'react-native-paper';

import { SevaTrackerProvider } from './contexts/SevaTrackerContext';
import { Router } from './navigation/Router';

const queryClient = new QueryClient();

export default function App() {
  const [isAppReady, setIsAppReady] = useState(false);
  const [fontsLoaded] = useFonts({
    Manrope_400Regular,
    Manrope_600SemiBold,
    Manrope_700Bold,
    Manrope_800ExtraBold,
    Montserrat_400Regular,
    Montserrat_600SemiBold,
    Montserrat_700Bold
  });

  useEffect(() => {
    const setupApp = async () => {
      // App setup without notifications
      setIsAppReady(true);
    };

    setupApp();
  }, []);

  if (!fontsLoaded || !isAppReady) {
    return (
      <View className="bg-sevatracker-white w-full flex-1 items-center justify-center">
        <ActivityIndicator size="large" color="#3B82F6" />
        <Text className="mt-4 text-lg">Loading Seva Tracker...</Text>
      </View>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <SevaTrackerProvider>
        <View className="bg-sevatracker-white absolute -z-10 h-20 w-[100vw]" />
        <PaperProvider>
          <Router />
        </PaperProvider>
      </SevaTrackerProvider>
    </QueryClientProvider>
  );
}
