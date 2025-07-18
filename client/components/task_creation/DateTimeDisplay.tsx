import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

interface DateTimeDisplayProps {
  title: string;
  elements: string[];
  actions: (() => void)[];
}

export function DateTimeDisplay({
  title,
  elements,
  actions
}: DateTimeDisplayProps) {
  return (
    <View className="mx-4 mt-3 flex h-12 flex-row items-center justify-between space-x-2 rounded-lg border border-sevatracker-gray bg-sevatracker-white px-4 py-2">
      <Text className="font-sevatracker-montserrat text-sm">{title}</Text>
      <View className="flex flex-row">
        {elements.map((element, index) => (
          <TouchableOpacity
            key={index}
            onPress={actions[index]}
            className="ml-2 justify-center rounded-lg border border-sevatracker-blue/20 bg-sevatracker-blue/20 p-1"
          >
            <Text className="font-sevatracker-montserrat-semibold text-sm text-sevatracker-blue">
              {element}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}
