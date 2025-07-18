import React from 'react';
import { Text, View } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { toUpper } from 'lodash';
import moment from 'moment';

import Time from '../../assets/Time.svg';
import { useSevaTrackerContext } from '../../contexts/SevaTrackerContext';
import { AppStackNavigation } from '../../navigation/types';
import { useTaskByAssigned } from '../../services/task';
import { Task } from '../../types/task';
import { CategoryIconsMap, TypeToCategoryMap } from '../../types/type';

export function TaskList() {
  const { user: signedInUser } = useSevaTrackerContext();
  const { taskByUser } = useTaskByAssigned(signedInUser.userID);
  const navigation = useNavigation<AppStackNavigation>();

  return (
    <View className="border-sevatracker-blue/10 bg-sevatracker-white mt-10 overflow-hidden rounded-lg border">
      <View
        className="bg-sevatracker-blue/10 flex flex-row items-center overflow-hidden"
        onTouchEnd={() => {
          navigation.navigate('SevaList');
        }}
      >
        <Text className="font-sevatracker-montserrat-semibold text-sevatracker-blue py-2 pl-2 text-xs">
          {`${toUpper(moment().day(new Date().getDay()).format('dddd'))}, ${toUpper(moment().format('MMM Do'))} - TODAY`}
        </Text>
        <View className="ml-auto mr-1">
          <Text className="font-sevatracker-manrope-bold text-sevatracker-blue ml-auto py-4 pr-2 text-center text-xs underline underline-offset-2">
            View All
          </Text>
        </View>
      </View>
      {taskByUser &&
      taskByUser.filter(
        (task) =>
          moment().format('DD MM YYYY') ===
          moment(task.start_date).format('DD MM YYYY')
      ).length > 0 ? (
        <View>
          {taskByUser
            .filter(
              (task) =>
                moment().format('DD MM YYYY') ===
                moment(task.start_date).format('DD MM YYYY')
            )
            .map((task) => (
              <View
                key={task.task_id}
                onTouchEnd={() => {
                  navigation.navigate('TaskDisplay', {
                    id: task.task_id
                  });
                }}
              >
                <TaskSmallCard task={task} />
              </View>
            ))}
        </View>
      ) : (
        <View className="h-10 items-center justify-center">
          <Text className="font-sevatracker-manrope ml-2 text-sm">
            You have no assigned tasks today.
          </Text>
        </View>
      )}
    </View>
  );
}

function TaskSmallCard({ task }: { task: Task }) {
  const time = `${
    moment(task?.start_date).format('HH DD YYYY') ===
    moment(task?.end_date).format('HH DD YYYY')
      ? moment(task?.start_date).format('h:mm A')
      : `${
          moment(task?.start_date).format('A') ===
          moment(task?.end_date).format('A')
            ? moment(task?.start_date).format('h:mm')
            : moment(task?.start_date).format('h:mm A')
        } - ${moment(task?.end_date).format('h:mm A')}`
  }`;
  return (
    <View className="border-sevatracker-blue/10 border-x-0 border-b-0 border-t pt-2">
      <View className="mb-3 flex flex-row items-center justify-center">
        <Text className="font-sevatracker-manrope-semibold ml-3 mr-auto text-base">
          {task.task_title}
        </Text>
      </View>
      <View className="mb-2 flex flex-row items-center justify-center">
        <View className="ml-2">
          <Time width={20} height={20} />
        </View>
        <View>
          <Text className="font-sevatracker-manrope-semibold ml-2 mt-auto text-xs">
            {task.quick_task ? `Quick Task` : time}
          </Text>
        </View>
        <View className="ml-auto mr-4">
          {CategoryIconsMap[TypeToCategoryMap[task.task_type]]}
        </View>
      </View>
    </View>
  );
}
