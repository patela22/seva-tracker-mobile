import React from 'react';
import { Text, View } from 'react-native';

import moment from 'moment';

import { useSevaTrackerContext } from '../../contexts/SevaTrackerContext';
import { useTaskByAssigned } from '../../services/task';

export function UserTaskStatusCard({ userID }: { userID: string }) {
  const { user: signedInUser } = useSevaTrackerContext();
  const { taskByUser, taskByUserIsLoading } = useTaskByAssigned(userID);

  if (taskByUserIsLoading) {
    return <Text>Loading...</Text>;
  }

  return (
    <View className="flex h-20 w-80 flex-row items-center justify-center self-center rounded-xl border border-sevatracker-gray bg-sevatracker-white">
      <View className="mx-auto items-center border-r border-sevatracker-gray pl-5 pr-5 text-center">
        <Text className="font-sevatracker-montserrat-bold text-xs">
          {userID === signedInUser.userID ? 'YOUR TASKS' : 'TASKS'}
        </Text>
        <Text className="text-2xl">{taskByUser?.length ?? 0}</Text>
      </View>
      <View className="mx-auto items-center border-r border-sevatracker-gray pl-5 pr-5 text-center">
        <Text className="font-sevatracker-montserrat-bold text-xs">
          THIS WEEK
        </Text>
        <Text className="text-2xl">
          {taskByUser?.filter((task) =>
            moment(task.start_date).isSame(moment(), 'week')
          ).length ?? 0}
        </Text>
      </View>
      <View className="mx-auto items-center pl-5 pr-5 text-center">
        <Text className="font-sevatracker-montserrat-bold text-xs">
          PAST DUE
        </Text>
        <Text className="text-2xl">
          {taskByUser?.filter((task) => task.task_status === 'OVERDUE')
            .length ?? 0}
        </Text>
      </View>
    </View>
  );
}
