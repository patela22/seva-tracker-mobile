import React from 'react';
import { Text, View } from 'react-native';

import moment from 'moment';

import Calendar from '../../assets/Date_today.svg';
import Time from '../../assets/Time.svg';
import { Task } from '../../types/task';
import { TaskLabel } from '../../types/taskLabel';
import { GetCategoryPill } from '../GetCategoryPill';

function statusToString(status: string) {
  switch (status) {
    case 'INCOMPLETE':
      return 'bg-sevatracker-pink';
    case 'COMPLETE':
      return 'bg-sevatracker-green';
    case 'INPROGRESS':
      return 'bg-sevatracker-yellow';
    case 'OVERDUE':
      return 'bg-sevatracker-orange';
    default:
      return 'border border-sevatracker-gray bg-sevatracker-gray';
  }
}

export function TaskInfoComponent({
  task,
  taskLabels
}: {
  task: Task;
  taskLabels: TaskLabel[] | undefined;
}) {
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
    <View className="border-sevatracker-gray bg-sevatracker-white mb-6 rounded-2xl border p-4">
      <View className="mb-2 flex flex-col justify-between">
        <View className="flex-row items-center">
          <View className="flex w-[60vw] flex-row flex-wrap items-center space-x-2">
            <Text className="font-sevatracker-manrope-semibold text-xl">
              {task.task_title}
            </Text>
          </View>
          <View className="border-sevatracker-lightgray ml-auto flex flex-row items-center space-x-2 rounded-full border px-2 py-1">
            <View
              className={`h-4 w-4 rounded-full ${statusToString(task.task_status)}`}
            />
            <Text className="font-sevatracker-manrope">{`${task.task_status?.charAt(0)}${task.task_status?.slice(1).toLowerCase()}`}</Text>
          </View>
        </View>

        <View className="mt-3 flex flex-row space-x-2">
          <View className="flex flex-row items-center space-x-2">
            <Calendar />
            <Text className="font-sevatracker-manrope">
              {moment(task.start_date).format('MMMM DD')}
            </Text>
          </View>
          <View className="flex flex-row items-center space-x-2">
            <Time />
            <Text className="font-sevatracker-manrope">{time}</Text>
          </View>
        </View>
      </View>
      <View className="space-y-2">
        <GetCategoryPill category={task.task_type} />
        <View>
          {taskLabels &&
            taskLabels.map((label) => (
              <View
                key={label.label_name + label.task_id}
                className="border-sevatracker-lightgray mr-auto flex flex-row items-center rounded-full border px-2 py-1"
              >
                <Text className="font-sevatracker-manrope ml-1 self-start py-1">
                  {label.label_name}
                </Text>
              </View>
            ))}
        </View>
      </View>
    </View>
  );
}
