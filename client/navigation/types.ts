import { NavigationProp } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

export type AppStackParamList = {
  Main: undefined;
  Home: undefined;
  Login: undefined;
  Dashboard: undefined;
  Register: undefined;
  Profile: undefined;
  PatientView: undefined;
  ProfileScreens: undefined;
  FileUploadScreen: undefined;
  Landing: undefined;
  SingleFile: { url: string; name: string; label: string };
  Calendar: undefined;
  TaskType: undefined;
  TaskDisplay: { id: number };
  TaskList: undefined;
  SevaList: undefined;
  CalendarContainer: undefined;
  CalendarTopNav: undefined;
  TaskCreation: { taskType: string };
  AddTaskDetails: {
    taskCreation: string;
  };
  Settings: undefined;
  CareGroup: undefined;
};

export const AppStack = createNativeStackNavigator<AppStackParamList>();

export type AppStackNavigation = NavigationProp<AppStackParamList>;
