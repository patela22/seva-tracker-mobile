import React from 'react';

import TimelineCalendarScreen from '../../screens/Calendar';
import Home from '../../screens/Home';
import SevaListScreen from '../../screens/SevaListScreen';
import SingleTaskScreen from '../../screens/SingleTask';
import { AppStack } from '../types';

export function HomeNavigationContainer() {
  return (
    <AppStack.Navigator
      screenOptions={{
        headerShown: false,
        freezeOnBlur: true
      }}
    >
      <AppStack.Screen
        name="Home"
        options={{ headerShown: false }}
        component={Home}
      />
      <AppStack.Screen name="Calendar" component={TimelineCalendarScreen} />
      <AppStack.Screen
        name="SevaList"
        options={{ headerShown: false }}
        component={SevaListScreen}
      />
      <AppStack.Screen
        name="TaskDisplay"
        options={{ headerShown: false }}
        component={SingleTaskScreen}
      />
    </AppStack.Navigator>
  );
}
