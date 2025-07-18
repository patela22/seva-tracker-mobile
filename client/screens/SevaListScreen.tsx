import React, { useMemo, useState } from 'react';
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import moment from 'moment';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import Search from '../assets/calendar/search.svg';
import { AddSevaModal } from '../components/AddSevaModal';
import { CalendarTaskListTopNav } from '../components/calendar/CalendarTaskListTopNav';
import { useSevaTrackerContext } from '../contexts/SevaTrackerContext';
import { MainLayout } from '../layouts/MainLayout';
import { AppStackNavigation } from '../navigation/types';
import { useToggleSevaDone } from '../services/seva';
import { SevaTask } from '../types/seva';

// Component to display a seva task card
function SevaTaskCard({ sevaTask }: { sevaTask: SevaTask }) {
  const { toggleSevaDoneMutation, isTogglingSeva } = useToggleSevaDone();

  const handleToggleComplete = () => {
    toggleSevaDoneMutation({
      taskId: sevaTask.id,
      completed: !sevaTask.completed
    });
  };

  return (
    <Pressable
      className="bg-sevatracker-white border-sevatracker-gray mb-4 rounded-2xl border p-4"
      onPress={handleToggleComplete}
      disabled={isTogglingSeva}
    >
      <View className="mb-2 flex flex-col justify-between">
        <View className="flex-row items-center">
          <View className="flex w-[60vw] flex-row flex-wrap items-center space-x-2">
            <Text className="font-sevatracker-manrope-semibold text-xl">
              {sevaTask.title}
            </Text>
          </View>
          <View className="border-sevatracker-lightgray ml-auto flex flex-row items-center space-x-2 rounded-full border px-2 py-1">
            <Pressable onPress={handleToggleComplete} disabled={isTogglingSeva}>
              <View
                className={`h-4 w-4 rounded-full ${
                  sevaTask.completed
                    ? 'bg-sevatracker-green'
                    : 'bg-sevatracker-gray'
                }`}
              />
            </Pressable>
            <Text className="font-sevatracker-manrope">
              {sevaTask.completed ? 'Completed' : 'Pending'}
            </Text>
          </View>
        </View>

        <View className="mt-3 flex flex-row space-x-2">
          <View className="flex flex-row items-center space-x-2">
            <Text className="font-sevatracker-manrope">
              📅 {moment(sevaTask.date).format('MMMM DD, YYYY')}
            </Text>
          </View>
        </View>
      </View>

      {/* Visual feedback for completed tasks */}
      {sevaTask.completed && (
        <View className="bg-green-50 mt-2 rounded-lg p-2">
          <Text className="text-green-700 text-center text-sm">
            ✓ Seva completed! Well done on your spiritual practice.
          </Text>
        </View>
      )}
    </Pressable>
  );
}

export default function SevaListScreen() {
  const navigator = useNavigation<AppStackNavigation>();
  const { sevaTasks, sevaTasksIsLoading } = useSevaTrackerContext();
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddSevaModalVisible, setIsAddSevaModalVisible] = useState(false);

  // Filter seva tasks based on search query
  const filteredSevaTasks = useMemo(() => {
    if (!sevaTasks) return [];

    if (!searchQuery.trim()) return sevaTasks;

    return sevaTasks.filter((sevaTask) =>
      sevaTask.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [sevaTasks, searchQuery]);

  // Categorize seva tasks
  const categorizedSevaTasks = useMemo(() => {
    const today = moment().startOf('day');

    const completed = filteredSevaTasks.filter((task) => task.completed);
    const pending = filteredSevaTasks.filter((task) => !task.completed);
    const overdue = pending.filter((task) => moment(task.date).isBefore(today));
    const upcoming = pending.filter((task) => moment(task.date).isAfter(today));
    const todayTasks = pending.filter((task) =>
      moment(task.date).isSame(today, 'day')
    );

    return { completed, overdue, todayTasks, upcoming };
  }, [filteredSevaTasks]);

  // Render section helper
  const renderSection = (tasks: SevaTask[], title: string) => {
    if (tasks.length === 0) return null;

    return (
      <View className="mb-5 mt-3">
        <Text className="font-sevatracker-manrope-bold text-sevatracker-black mb-3 text-lg">
          {title}
        </Text>
        {tasks.map((sevaTask) => (
          <SevaTaskCard key={sevaTask.id} sevaTask={sevaTask} />
        ))}
      </View>
    );
  };

  if (sevaTasksIsLoading) {
    return (
      <View className="bg-sevatracker-white w-full flex-1 items-center justify-center text-3xl">
        <ActivityIndicator size="large" />
        <Text>Loading seva tasks...</Text>
      </View>
    );
  }

  return (
    <MainLayout>
      <CalendarTaskListTopNav navigator={navigator} current="SevaList" />
      <GestureHandlerRootView>
        <ScrollView className="mb-28 flex w-[100vw] pl-4 pr-4 pt-4">
          {/* Search Bar */}
          <View className="mb-5 flex-row items-center">
            <TextInput
              className="border-sevatracker-gray bg-sevatracker-white font-sevatracker-montserrat text-sevatracker-black mr-4 h-14 flex-1 overflow-hidden rounded-md border px-8"
              placeholder="Search seva tasks..."
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            <View className="pointer-events-none absolute inset-y-5 ml-3 flex items-center pr-3">
              <Search />
            </View>
          </View>

          {/* No tasks message */}
          {filteredSevaTasks.length === 0 && !sevaTasksIsLoading && (
            <View className="items-center justify-center py-16">
              <Text className="text-sevatracker-gray text-center text-lg">
                {searchQuery.trim()
                  ? `No seva tasks found for "${searchQuery}"`
                  : 'No seva tasks yet. Add your first seva!'}
              </Text>
            </View>
          )}

          {/* Task Sections */}
          {renderSection(categorizedSevaTasks.overdue, 'OVERDUE')}
          {renderSection(categorizedSevaTasks.todayTasks, 'TODAY')}
          {renderSection(categorizedSevaTasks.upcoming, 'UPCOMING')}
          {renderSection(categorizedSevaTasks.completed, 'COMPLETED')}
        </ScrollView>

        {/* FAB Button */}
        <Pressable
          className="bg-sevatracker-blue absolute bottom-5 right-5 h-12 w-12 items-center justify-center rounded-full shadow-lg"
          onPress={() => setIsAddSevaModalVisible(true)}
        >
          <Text className="text-sevatracker-white text-3xl">+</Text>
        </Pressable>
      </GestureHandlerRootView>

      {/* Add Seva Modal */}
      {isAddSevaModalVisible && (
        <AddSevaModal
          isVisible={isAddSevaModalVisible}
          setVisible={setIsAddSevaModalVisible}
        />
      )}
    </MainLayout>
  );
}
