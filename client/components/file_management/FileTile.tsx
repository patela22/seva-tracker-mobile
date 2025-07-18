import React from 'react';
import { Text, View } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { WebView } from 'react-native-webview';

import { AppStackNavigation } from '../../navigation/types';

interface FileTileProps {
  name: string;
  label: string;
  url: string;
}

export function FileTile({ name, label, url }: FileTileProps): JSX.Element {
  const navigation = useNavigation<AppStackNavigation>();
  return (
    <View
      className="mx-5 my-3 bg-sevatracker-white"
      onTouchEnd={() => navigation.navigate('SingleFile', { url, name, label })}
    >
      <View className="flex-1 flex-row rounded-md border border-sevatracker-gray p-4">
        <View className="mr-4 h-[7vh] w-[7vh]">
          <WebView
            source={{ uri: url }}
            className="h-full w-full flex-1 rounded-md border border-sevatracker-gray"
          />
        </View>
        <View className="flex w-[60vw] flex-col justify-center">
          <View>
            <Text className="font-sevatracker-manrope-semibold text-xs text-sevatracker-black">
              {name}
            </Text>
          </View>
          {label && (
            <View className="mr-auto mt-1 w-fit rounded-lg border border-sevatracker-gray px-2">
              <Text className="mt-auto font-sevatracker-manrope-semibold text-xs text-sevatracker-black">
                {label}
              </Text>
            </View>
          )}
        </View>
      </View>
    </View>
  );
}
