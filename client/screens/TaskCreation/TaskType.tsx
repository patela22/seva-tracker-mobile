import React, { useCallback, useMemo, useRef, useState } from 'react';
import { SafeAreaView, View } from 'react-native';

import BottomSheet, {
  BottomSheetBackdrop,
  TouchableOpacity
} from '@gorhom/bottom-sheet';
import { BottomSheetDefaultBackdropProps } from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types';
import { useNavigation } from '@react-navigation/native';
import { clsx } from 'clsx';
import DropDownPicker from 'react-native-dropdown-picker';
import {
  GestureHandlerRootView,
  ScrollView
} from 'react-native-gesture-handler';
import { Button, Text } from 'react-native-paper';

import BookStudy from '../../assets/calendar/book-study.svg';
import ServiceCharity from '../../assets/calendar/service-charity.svg';
import SpiritualPractice from '../../assets/calendar/spiritual&practice.svg';
import TempleCommunity from '../../assets/calendar/temple-community.svg';
import Other from '../../assets/task-creation/other.svg';
import { BackButton } from '../../components/nav_buttons/BackButton';
import { CloseButton } from '../../components/nav_buttons/CloseButton';
import { AppStackNavigation } from '../../navigation/types';
import { Category, CategoryToTypeMap } from '../../types/type';

export default function TaskType() {
  const navigation = useNavigation<AppStackNavigation>();
  const [open, setOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<null | Category>(
    null
  );
  const filters = Object.values(Category).map((filter) => ({
    label: filter,
    value: filter
  }));

  const bottomSheetSnapPoints = useMemo(() => ['50%'], []);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const closeBottomSheet = () => {
    if (bottomSheetRef.current) {
      bottomSheetRef.current.close();
    }
  };
  const snapToIndex = (index: number) =>
    bottomSheetRef.current?.snapToIndex(index);
  const renderBackdrop = useCallback(
    (props: BottomSheetDefaultBackdropProps) => (
      <BottomSheetBackdrop
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        {...props}
      />
    ),
    []
  );

  function getCategoryIcon(category: Category): JSX.Element | null {
    switch (category) {
      case Category.SPIRITUAL:
        return <SpiritualPractice />;
      case Category.SERVICE:
        return <ServiceCharity />;
      case Category.COMMUNITY:
        return <TempleCommunity />;
      case Category.STUDY:
        return <BookStudy />;
      case Category.OTHER:
        return <Other />;
      default:
        return null;
    }
  }

  return (
    <SafeAreaView className="bg-sevatracker-white flex-1">
      <GestureHandlerRootView>
        <View className="border-sevatracker-gray bg-sevatracker-white flex w-full flex-row items-center border-b">
          <BackButton />
          <Text className="font-sevatracker-manrope-bold text-sevatracker-blue mx-auto my-7 pr-20 text-lg">
            Step 1 of 3
          </Text>
        </View>
        <View className="my-2" />
        <ScrollView className="h-[90%]">
          <View className="flex w-full flex-row items-start justify-between px-4">
            <Text className="font-sevatracker-manrope-bold mx-1 text-[24px]">
              Choose Type of Task
            </Text>

            <Button
              className=" bg-sevatracker-blue text-sevatracker-white h-14 items-center justify-center rounded-lg"
              textColor="white"
              onPress={() => snapToIndex(0)}
            >
              FILTER
            </Button>
          </View>

          <View className="flex w-[90vw] justify-between p-3">
            {selectedCategory ? (
              <View>
                <Text
                  className={clsx(
                    'font-sevatracker-montserrat-bold text-xs uppercase tracking-wide',
                    'p-3'
                  )}
                >
                  {selectedCategory}
                </Text>
                <View className="w-[100vw] flex-row flex-wrap">
                  {CategoryToTypeMap[selectedCategory].map((item2, index2) => (
                    <TouchableOpacity
                      key={index2}
                      onPress={() =>
                        navigation.navigate('TaskCreation', {
                          taskType: JSON.stringify(item2)
                        })
                      }
                    >
                      <View className="border-sevatracker-gray m-2 h-24 w-40 items-start rounded-lg border p-2">
                        {getCategoryIcon(selectedCategory)}
                        <Text className="font-sevatracker-manrope-bold m-1 mt-3">
                          {item2}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            ) : (
              Object.values(Category).map((item, index) => (
                <View key={index}>
                  <Text
                    className={clsx(
                      'font-sevatracker-montserrat-bold text-xs uppercase tracking-wide',
                      index > 0 ? 'p-3' : ''
                    )}
                  >
                    {item}
                  </Text>
                  <View className="w-[100vw] flex-row flex-wrap">
                    {CategoryToTypeMap[item].map((item2, index2) => (
                      <TouchableOpacity
                        key={index2}
                        onPress={() =>
                          navigation.navigate('TaskCreation', {
                            taskType: JSON.stringify(item2)
                          })
                        }
                      >
                        <View className="border-sevatracker-gray m-2 h-24 w-40 items-start rounded-lg border p-2">
                          {getCategoryIcon(item)}
                          <Text className="font-sevatracker-manrope-bold m-1 mt-3">
                            {item2}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
              ))
            )}
          </View>
        </ScrollView>

        <BottomSheet
          ref={bottomSheetRef}
          index={-1}
          snapPoints={bottomSheetSnapPoints}
          enablePanDownToClose={true}
          backdropComponent={renderBackdrop}
        >
          <View>
            <View className="flex flex-row justify-between">
              <Text className="m-5 text-2xl font-bold">Filter</Text>
              <CloseButton onPress={closeBottomSheet} />
            </View>

            <DropDownPicker
              open={open}
              value={selectedCategory}
              items={filters}
              setOpen={setOpen}
              setValue={setSelectedCategory}
              placeholder="Category"
              onSelectItem={() => {
                closeBottomSheet();
              }}
              style={{
                width: '95%',
                marginLeft: 'auto',
                marginRight: 'auto',
                borderRadius: 0,
                borderColor: 'transparent',
                borderBottomColor: 'black'
              }}
            />
          </View>
        </BottomSheet>
      </GestureHandlerRootView>
    </SafeAreaView>
  );
}
