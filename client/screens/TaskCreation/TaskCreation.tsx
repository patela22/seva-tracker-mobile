import React, { useState } from 'react';
import { SafeAreaView, Text, View } from 'react-native';

import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { clsx } from 'clsx';
import {
  GestureHandlerRootView,
  ScrollView
} from 'react-native-gesture-handler';

import FinancialBg from '../../assets/task-creation/financial-bg.svg';
import HomeBg from '../../assets/task-creation/home-bg.svg';
import OtherBg from '../../assets/task-creation/other-bg.svg';
import PersonalBg from '../../assets/task-creation/personal-bg.svg';
import SpiritualBg from '../../assets/task-creation/spiritual-bg.svg';
import { BackButton } from '../../components/nav_buttons/BackButton';
import { ForwardButton } from '../../components/nav_buttons/ForwardButton';
import { AddressComponent } from '../../components/task_creation/AddressComponent';
import { RadioGroup } from '../../components/task_creation/RadioGroup';
import { TextInputLine } from '../../components/task_creation/TextInputLine';
import { TextInputParagraph } from '../../components/task_creation/TextInputParagraph';
import { AppStackNavigation } from '../../navigation/types';
import { TaskCreationJson } from '../../types/task-creation-json';

const TaskTitleToTextColorMap: { [key: string]: string } = {
  'Daily Meditation': 'text-sevatracker-pink',
  'Prayer & Chanting': 'text-sevatracker-pink',
  'Charitable Giving': 'text-sevatracker-purple',
  'Community Service': 'text-sevatracker-purple',
  'Scripture Study': 'text-sevatracker-yellow',
  'Temple Visit': 'text-sevatracker-yellow',
  'Seva Activities': 'text-sevatracker-green',
  Fasting: 'text-sevatracker-green',
  'Kirtan & Devotional Music': 'text-sevatracker-blue',
  Other: 'text-sevatracker-coral'
};

const TaskTitleToBgColorMap: { [key: string]: string } = {
  'Daily Meditation': 'bg-sevatracker-pink',
  'Prayer & Chanting': 'bg-sevatracker-pink',
  'Charitable Giving': 'bg-sevatracker-purple',
  'Community Service': 'bg-sevatracker-purple',
  'Scripture Study': 'bg-sevatracker-yellow',
  'Temple Visit': 'bg-sevatracker-yellow',
  'Seva Activities': 'bg-sevatracker-green',
  Fasting: 'bg-sevatracker-green',
  'Kirtan & Devotional Music': 'bg-sevatracker-blue',
  Other: 'bg-sevatracker-coral'
};

type ParamList = {
  mt: {
    taskType: string;
  };
};

export default function TaskCreation() {
  const route = useRoute<RouteProp<ParamList, 'mt'>>();
  const navigation = useNavigation<AppStackNavigation>();
  const { taskType } = route.params;
  const header = TaskCreationJson.types.find((t) =>
    taskType.includes(t.Header)
  )?.Header;

  const renderBackground = (header: string) => {
    switch (header) {
      case 'Daily Meditation':
        return <SpiritualBg />;
      case 'Prayer & Chanting':
        return <SpiritualBg />;
      case 'Charitable Giving':
        return <PersonalBg />;
      case 'Community Service':
        return <PersonalBg />;
      case 'Scripture Study':
        return <HomeBg />;
      case 'Temple Visit':
        return <HomeBg />;
      case 'Seva Activities':
        return <FinancialBg />;
      case 'Fasting':
        return <FinancialBg />;
      case 'Kirtan & Devotional Music':
        return <PersonalBg />;
      case 'Other':
        return <OtherBg />;
      default:
        return null;
    }
  };

  const body = TaskCreationJson.types.find((t) =>
    taskType.includes(t.Header)
  )?.Body;

  const compList: { key: string; value: string }[] = [];
  body?.forEach((item) => {
    Object.entries(item).forEach(([key, value]) => {
      compList.push({ key, value });
    });
  });

  const [values, setValues] = useState<{ [key: string]: string }>({
    Type: header ?? ''
  });
  const handleChange = (key: string, value: string) => {
    setValues((prevValues) => ({
      ...prevValues,
      [key]: value
    }));
  };

  return (
    <SafeAreaView className="bg-sevatracker-white flex-1">
      <GestureHandlerRootView>
        <View className="border-sevatracker-gray bg-sevatracker-white flex w-full flex-row items-center border-b">
          <BackButton />
          <Text className="font-sevatracker-manrope-bold text-sevatracker-blue mx-auto my-7 pr-20 text-lg">
            Step 2 of 3
          </Text>
        </View>

        <ScrollView className="mt-3 h-full min-w-full">
          <View className="absolute -z-20">
            {renderBackground(header ?? '')}
          </View>
          <Text
            className={clsx(
              'font-sevatracker-manrope-bold mx-5 text-2xl',
              TaskTitleToTextColorMap[header as string]
            )}
          >
            {header}
          </Text>
          {compList.map((item, index) => (
            <View key={index}>
              {item.key === 'Address' && <AddressComponent />}
              {item.value === 'TextInputLine' && (
                <TextInputLine
                  title={item.key}
                  onChange={(value) => handleChange(item.key, value)}
                />
              )}
              {item.value === 'TextInputParagraph' && (
                <TextInputParagraph
                  title={item.key}
                  onChange={(value) => handleChange(item.key, value)}
                />
              )}
              {item.value.startsWith('RadioGroup') && (
                <RadioGroup
                  title={item.key}
                  options={item.value.substring(12).split(' ')}
                  themeColor={TaskTitleToBgColorMap[header as string]}
                  onChange={(value) => handleChange(item.key, value)}
                />
              )}
            </View>
          ))}
          <View className="m-2 flex flex-row justify-end">
            <ForwardButton
              onPress={() => {
                navigation.navigate('AddTaskDetails', {
                  taskCreation: JSON.stringify(values)
                });
              }}
            />
          </View>
        </ScrollView>
      </GestureHandlerRootView>
    </SafeAreaView>
  );
}
