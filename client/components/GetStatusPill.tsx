import React from 'react';
import { Text, View } from 'react-native';

export function GetStatusPill({ status }: { status: string }) {
  switch (status) {
    case 'INCOMPLETE': {
      return (
        <View className="h-8 w-fit flex-row items-center justify-center space-x-2 rounded-3xl border border-sevatracker-lightgray px-2">
          <View className="h-5 w-5 rounded-full bg-sevatracker-coral" />
          <Text className="font-sevatracker-manrope text-sm">Incomplete</Text>
        </View>
      );
    }
    case 'INPROGRESS': {
      return (
        <View className="h-8 w-fit flex-row items-center justify-center space-x-2 rounded-3xl border border-sevatracker-lightgray px-2">
          <View className="h-5 w-5 rounded-full bg-sevatracker-yellow" />
          <Text className="font-sevatracker-manrope text-sm">In Progress</Text>
        </View>
      );
    }
    case 'COMPLETE': {
      return (
        <View className="h-8 w-fit flex-row items-center justify-center space-x-2 rounded-3xl border border-sevatracker-lightgray px-2">
          <View className="h-5 w-5 rounded-full bg-sevatracker-green" />
          <Text className="font-sevatracker-manrope text-sm">Done</Text>
        </View>
      );
    }
    case 'OVERDUE': {
      return (
        <View className="h-8 w-fit flex-row items-center justify-center space-x-2 rounded-3xl border border-sevatracker-lightgray px-2">
          <View className="h-5 w-5 rounded-full bg-sevatracker-orange" />
          <Text className="font-sevatracker-manrope text-sm">Past Due</Text>
        </View>
      );
    }
    case 'TODO': {
      return (
        <View className="h-8 w-fit flex-row items-center justify-center space-x-2 rounded-3xl border border-sevatracker-lightgray px-2">
          <View className="h-5 w-5 rounded-full border border-sevatracker-lightgray" />
          <Text className="font-sevatracker-manrope-semibold text-sm">
            To Do
          </Text>
        </View>
      );
    }
  }
}

export const StatusColor: Record<string, string> = {
  TODO: '',
  OVERDUE: 'bg-sevatracker-orange',
  COMPLETE: 'bg-sevatracker-green',
  INPROGRESS: 'bg-sevatracker-yellow',
  INCOMPLETE: 'bg-sevatracker-coral'
};
