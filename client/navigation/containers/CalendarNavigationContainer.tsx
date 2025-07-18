import React from 'react';

import TimelineCalendarScreen from '../../screens/Calendar';
import FileUploadScreen from '../../screens/FileUpload';
import SevaListScreen from '../../screens/SevaListScreen';
import SingleTaskScreen from '../../screens/SingleTask';
import { AppStack } from '../types';

export function CalendarNavigationContainer() {
  return (
    <AppStack.Navigator
      screenOptions={{
        headerShown: false,
        freezeOnBlur: true
      }}
    >
      <AppStack.Screen name="Calendar" component={TimelineCalendarScreen} />
      <AppStack.Screen name="TaskDisplay" component={SingleTaskScreen} />
      <AppStack.Screen name="FileUploadScreen" component={FileUploadScreen} />
      <AppStack.Screen
        name="SevaList"
        options={{ headerShown: false }}
        component={SevaListScreen}
      />
    </AppStack.Navigator>
  );
}
