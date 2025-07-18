import React from 'react';
import { Text, View } from 'react-native';

import { clsx } from 'clsx';

import { AppStackNavigation } from '../../navigation/types';

export function CalendarTaskListTopNav({
  navigator,
  current
}: {
  navigator: AppStackNavigation;
  current: string;
}): JSX.Element {
  return (
    <View className="flex flex-row items-center justify-between px-[20vw] py-5">
      <View
        onTouchEnd={() => {
          navigator.navigate('Calendar');
        }}
      >
        <Text
          className={clsx(
            'font-sevatracker-montserrat-semibold text-xs text-sevatracker-gray',
            current === 'Calendar' && 'text-sevatracker-blue underline'
          )}
        >
          CALENDAR
        </Text>
      </View>
      <View
        onTouchEnd={() => {
          navigator.navigate('SevaList');
        }}
      >
        <Text
          className={clsx(
            'font-sevatracker-montserrat-semibold text-xs text-sevatracker-gray',
            (current === 'TaskList' || current === 'SevaList') &&
              'text-sevatracker-blue underline'
          )}
        >
          MY SEVA
        </Text>
      </View>
    </View>
  );
}
