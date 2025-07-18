import React from 'react';
import { Text, View } from 'react-native';

import { Header } from '../components/home/Header';
import { TaskList } from '../components/home/TaskList';
import { useSevaTrackerContext } from '../contexts/SevaTrackerContext';
import { MainLayout } from '../layouts/MainLayout';
import { useUser } from '../services/user';

export default function Home() {
  const { user: signedInUser } = useSevaTrackerContext();
  const { user } = useUser(signedInUser.userID);

  return (
    <MainLayout>
      <View className="mx-auto mt-10 w-[90vw]">
        <Header user={user} />
        <TaskList />
      </View>
      <View className="bg-sevatracker-white mx-auto mt-5 h-[20vh] w-[90vw]">
        <View className="border-sevatracker-blue/10 bg-sevatracker-blue/10 mx-auto h-[20vh] w-[90vw] rounded-lg border">
          <Text className="font-sevatracker-montserrat-bold ml-5 mt-5 text-base">
            Seva Progress Overview
          </Text>
          <Text className="my-auto text-center">
            Your spiritual journey progress will be shown here.
          </Text>
        </View>
      </View>
    </MainLayout>
  );
}
