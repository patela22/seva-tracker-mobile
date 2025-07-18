import React, { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Pressable, Text, View } from 'react-native';

import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import { BottomSheetDefaultBackdropProps } from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types';
import { useNavigation } from '@react-navigation/native';
import _, { Dictionary } from 'lodash';
import moment from 'moment';
import { CalendarProvider, CalendarUtils } from 'react-native-calendars';
import { Event } from 'react-native-calendars/src/timeline/EventBlock';
import { MarkedDates } from 'react-native-calendars/src/types';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { CalendarTaskListTopNav } from '../components/calendar/CalendarTaskListTopNav';
import { CWExpanableCalendar } from '../components/calendar/ExpandableCalendar';
import { useSevaTrackerContext } from '../contexts/SevaTrackerContext';
import { MainLayout } from '../layouts/MainLayout';
import { AppStackNavigation } from '../navigation/types';
import { useToggleSevaDone } from '../services/seva';
import { SevaTask } from '../types/seva';

// Simple timeline component for seva tasks
function SevaTimelineList({
  events,
  currentDayTasks
}: {
  events: Dictionary<Event[]> | undefined;
  currentDayTasks: SevaTask[];
}) {
  const { toggleSevaDoneMutation, isTogglingSeva } = useToggleSevaDone();

  const handleToggleComplete = (sevaTask: SevaTask) => {
    toggleSevaDoneMutation({
      taskId: sevaTask.id,
      completed: !sevaTask.completed
    });
  };

  if (!events || Object.keys(events).length === 0) {
    return (
      <View className="flex-1 items-center justify-center p-8">
        <Text className="text-sevatracker-gray text-center">
          No seva tasks scheduled for this day.
        </Text>
      </View>
    );
  }

  return (
    <View className="flex-1 p-4">
      <Text className="font-sevatracker-montserrat-bold mb-4 text-lg">
        Today's Seva Tasks
      </Text>
      {currentDayTasks.map((sevaTask) => (
        <Pressable
          key={sevaTask.id}
          className="bg-sevatracker-white border-sevatracker-gray mb-3 rounded-lg border p-4"
          onPress={() => handleToggleComplete(sevaTask)}
          disabled={isTogglingSeva}
        >
          <Text className="font-sevatracker-manrope-semibold text-base">
            {sevaTask.title}
          </Text>
          <View className="mt-2 flex-row items-center justify-between">
            <View className="flex-row items-center">
              <Pressable
                onPress={() => handleToggleComplete(sevaTask)}
                disabled={isTogglingSeva}
              >
                <View
                  className={`mr-2 h-3 w-3 rounded-full ${
                    sevaTask.completed
                      ? 'bg-sevatracker-green'
                      : 'bg-sevatracker-gray'
                  }`}
                />
              </Pressable>
              <Text className="text-sevatracker-gray text-sm">
                {sevaTask.completed ? 'Completed' : 'Pending'}
              </Text>
            </View>
            {sevaTask.completed && (
              <Text className="text-green-600 text-xs">✓ Done</Text>
            )}
          </View>
        </Pressable>
      ))}
    </View>
  );
}

// Simple QuickTask component for seva tasks
function SevaQuickTask({
  currentDayTasks,
  bottomSheetRef,
  navigation
}: {
  currentDayTasks: SevaTask[];
  bottomSheetRef: React.RefObject<BottomSheet>;
  navigation: AppStackNavigation;
}) {
  const { toggleSevaDoneMutation, isTogglingSeva } = useToggleSevaDone();

  const handleToggleComplete = (sevaTask: SevaTask) => {
    toggleSevaDoneMutation({
      taskId: sevaTask.id,
      completed: !sevaTask.completed
    });
  };

  const renderBackdrop = React.useCallback(
    (props: BottomSheetDefaultBackdropProps) => (
      <BottomSheetBackdrop
        {...props}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        opacity={0.5}
        pressBehavior="close"
      />
    ),
    []
  );

  const snapPoints = React.useMemo(() => ['70%'], []);

  return (
    <BottomSheet
      index={-1}
      snapPoints={snapPoints}
      ref={bottomSheetRef}
      enablePanDownToClose={true}
      backdropComponent={renderBackdrop}
      backgroundStyle={{ backgroundColor: 'white' }}
    >
      <View className="p-6">
        <Text className="mb-4 text-2xl font-bold">Today's Seva Tasks</Text>
        {currentDayTasks.length === 0 ? (
          <Text className="text-sevatracker-gray py-8 text-center">
            No seva tasks for today
          </Text>
        ) : (
          <View>
            {currentDayTasks.map((sevaTask) => (
              <Pressable
                key={sevaTask.id}
                className="bg-sevatracker-white border-sevatracker-gray mb-3 rounded-lg border p-4"
                onPress={() => handleToggleComplete(sevaTask)}
                disabled={isTogglingSeva}
              >
                <Text className="font-sevatracker-manrope-semibold text-base">
                  {sevaTask.title}
                </Text>
                <View className="mt-2 flex-row items-center justify-between">
                  <View className="flex-row items-center">
                    <Pressable
                      onPress={() => handleToggleComplete(sevaTask)}
                      disabled={isTogglingSeva}
                    >
                      <View
                        className={`mr-2 h-3 w-3 rounded-full ${
                          sevaTask.completed
                            ? 'bg-sevatracker-green'
                            : 'bg-sevatracker-gray'
                        }`}
                      />
                    </Pressable>
                    <Text className="text-sevatracker-gray text-sm">
                      {sevaTask.completed ? 'Completed' : 'Pending'}
                    </Text>
                  </View>
                  {sevaTask.completed && (
                    <Text className="text-green-600 text-xs">✓ Done</Text>
                  )}
                </View>
              </Pressable>
            ))}
          </View>
        )}
      </View>
    </BottomSheet>
  );
}

export default function TimelineCalendarScreen() {
  const navigation = useNavigation<AppStackNavigation>();
  const { sevaTasks, sevaTasksIsLoading } = useSevaTrackerContext();
  const [currentDate, setCurrentDate] = useState<string>(
    moment(new Date()).format('YYYY-MM-DD')
  );
  const [month, setCurrentMonth] = useState<string>();

  const [events, setEvents] = useState<Dictionary<Event[]>>();
  const [marked, setMarked] = useState<MarkedDates>({});
  const [currentDaySevaTasks, setCurrentDaySevaTasks] = useState<SevaTask[]>();

  const bottomSheetRef = useRef<BottomSheet>(null);

  useEffect(() => {
    setCurrentDate(moment(new Date()).format('YYYY-MM-DD'));
    setCurrentMonth(moment(currentDate).format('YYYY-MM-DD'));
  }, []);

  useEffect(() => {
    setCurrentDaySevaTasks(
      sevaTasks?.filter(
        (sevaTask) =>
          moment(new Date(sevaTask.date)).format('YYYY-MM-DD') ===
          moment(currentDate).format('YYYY-MM-DD')
      )
    );
  }, [currentDate, sevaTasks]);

  useEffect(() => {
    setMarked({});

    // Create events from seva tasks
    const sevaEvents =
      sevaTasks?.map((sevaTask) => ({
        id: sevaTask.id,
        start: moment(new Date(sevaTask.date)).format('YYYY-MM-DD 00:00:00'),
        end: moment(new Date(sevaTask.date)).format('YYYY-MM-DD 00:30:00'),
        title: sevaTask.title,
        color: '#ffffff',
        summary: sevaTask.completed ? 'Completed' : 'Pending'
      })) || [];

    setEvents(
      _.groupBy(sevaEvents, (e) =>
        CalendarUtils.getCalendarDateString(e?.start)
      )
    );

    // Create marked dates with colors based on completion status
    let markedList = {} as MarkedDates;
    const tasksByDate = _.groupBy(sevaTasks, (task) =>
      moment(new Date(task.date)).format('YYYY-MM-DD')
    );

    Object.keys(tasksByDate).forEach((date) => {
      const tasksForDate = tasksByDate[date];
      const completedCount = tasksForDate.filter(
        (task) => task.completed
      ).length;
      const totalCount = tasksForDate.length;

      let dotColor = '#808080'; // grey - no tasks

      if (totalCount > 0) {
        if (completedCount === totalCount) {
          dotColor = '#4CAF50'; // green - all completed
        } else if (completedCount > 0) {
          dotColor = '#FF9800'; // orange - partial completed
        } else {
          dotColor = '#F44336'; // red - none completed
        }
      }

      markedList = {
        ...markedList,
        [date]: {
          marked: true,
          dotColor: dotColor,
          activeOpacity: 1
        }
      };
    });

    setMarked(markedList);
  }, [month, sevaTasks]);

  const onDateChanged = (date: string) => {
    setCurrentDate(date);
    if (moment(date).format('MM') !== moment(month).format('MM')) {
      setCurrentMonth(date);
    }
  };

  if (sevaTasksIsLoading) {
    return (
      <MainLayout>
        <View className="bg-sevatracker-white w-[100vw] flex-1 items-center justify-center">
          <ActivityIndicator size="large" />
          <Text>Loading...</Text>
        </View>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <View className="h-full">
        <CalendarTaskListTopNav navigator={navigation} current="Calendar" />

        <GestureHandlerRootView className="flex-1">
          <CalendarProvider
            date={moment(currentDate).format('YYYY-MM-DD')}
            onDateChanged={onDateChanged}
            showTodayButton
            disabledOpacity={0.6}
            theme={{
              backgroundColor: 'white',
              selectedDayBackgroundColor: '#1A56C4',
              selectedDotColor: '#ffffff',
              dotColor: '#ffffff',
              todayButtonTextColor: '#1A56C4',
              inactiveDotColor: '#1A56C4'
            }}
          >
            <CWExpanableCalendar marked={marked} current={currentDate} />
            <SevaTimelineList
              events={events}
              currentDayTasks={currentDaySevaTasks ?? []}
            />
          </CalendarProvider>

          {/* FAB Button */}
          <Pressable
            className="bg-sevatracker-blue absolute bottom-5 right-5 z-50 h-12 w-12 items-center justify-center rounded-full shadow-lg"
            onPress={() => {
              console.log('+ button pressed');
              navigation.navigate('TaskType');
            }}
          >
            <Text className="text-sevatracker-white text-3xl">+</Text>
          </Pressable>

          {/* Bottom Sheet for Quick Tasks */}
          <SevaQuickTask
            currentDayTasks={currentDaySevaTasks ?? []}
            navigation={navigation}
            bottomSheetRef={bottomSheetRef}
          />
        </GestureHandlerRootView>
      </View>
    </MainLayout>
  );
}
