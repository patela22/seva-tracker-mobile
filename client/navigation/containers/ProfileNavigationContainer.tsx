import React from 'react';

import TimelineCalendarScreen from '../../screens/Calendar';
import FileUploadScreen from '../../screens/FileUpload';
import { CareGroup } from '../../screens/Profile/CareGroup';
import PatientView from '../../screens/Profile/PatientView';
import Profile from '../../screens/Profile/Profile';
import Settings from '../../screens/Profile/Settings';
import SevaListScreen from '../../screens/SevaListScreen';
import SingleFile from '../../screens/SingleFile';
import SingleTaskScreen from '../../screens/SingleTask';
import { AppStack } from '../types';

export function ProfileNavigationContainer() {
  return (
    <AppStack.Navigator
      screenOptions={{
        headerShown: false,
        freezeOnBlur: true
      }}
    >
      <AppStack.Screen name="Profile" component={Profile} />
      <AppStack.Screen name="PatientView" component={PatientView} />
      <AppStack.Screen name="Settings" component={Settings} />
      <AppStack.Screen name="FileUploadScreen" component={FileUploadScreen} />
      <AppStack.Screen name="Calendar" component={TimelineCalendarScreen} />
      <AppStack.Screen name="TaskDisplay" component={SingleTaskScreen} />
      <AppStack.Screen name="CareGroup" component={CareGroup} />
      <AppStack.Screen name="SingleFile" component={SingleFile} />
      <AppStack.Screen
        name="SevaList"
        options={{ headerShown: false }}
        component={SevaListScreen}
      />
    </AppStack.Navigator>
  );
}
