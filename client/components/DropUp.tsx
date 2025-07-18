import React, { useState } from 'react';
import { Text, View } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { clsx } from 'clsx';
import _ from 'lodash';

import ArrowUp from '../assets/ArrowUp.svg';
import { AppStackNavigation } from '../navigation/types';
import { Status } from '../types/type';
import { StatusColor } from './GetStatusPill';

export function DropUp({
  selected,
  items,
  updateTaskStatusMutation
}: {
  selected: string;
  items?: { label: Status; value: Status }[];
  setLabel?: (label: string) => void;
  taskId: string;
  updateTaskStatusMutation: (status: Status) => void;
}) {
  const navigation = useNavigation<AppStackNavigation>();

  const [isOpen, setIsOpen] = useState(false);

  const handleSelectItem = async (selectedStatus: Status) => {
    setIsOpen(false);

    try {
      updateTaskStatusMutation(selectedStatus);
      if (selectedStatus === Status.COMPLETE) {
        navigation.navigate('FileUploadScreen');
      }
    } catch (error) {
      console.error('Error updating task status:', error);
    }
  };

  const getButtonText = (status: Status) => {
    if (status === Status.COMPLETE) {
      return 'Mark Seva Done';
    }
    return `Mark as ${_.toUpper(status.at(0))}${_.toLower(status.substring(1))}`;
  };

  return (
    <View className="mb-3 bg-sevatracker-white">
      <View
        className={clsx(
          'flex h-14 w-full flex-row items-center rounded-lg border border-sevatracker-lightgray'
        )}
        onTouchEnd={() => setIsOpen(!isOpen)}
      >
        <Text className="pl-5 font-sevatracker-manrope-semibold text-sm">
          Actions
        </Text>
        <View className="absolute right-3">
          {isOpen ? (
            <View className="rotate-180">
              <ArrowUp />
            </View>
          ) : (
            <ArrowUp />
          )}
        </View>
      </View>
      {isOpen && (
        <View className="absolute bottom-full mb-3 flex rounded-lg border border-sevatracker-lightgray bg-sevatracker-white">
          {items?.map((item, index) => {
            if (selected === item.label) return;
            return (
              <View
                key={index}
                className={clsx(
                  'flex h-14 w-[90vw] flex-row items-center border-b border-sevatracker-lightgray',
                  items.length - 1 === index ? 'border-b-0' : ''
                )}
                onTouchEnd={() => handleSelectItem(item.label)}
              >
                <Text className="w-40 bg-sevatracker-white pl-2 font-sevatracker-manrope-semibold text-sm">
                  {getButtonText(item.label)}
                </Text>
                <View
                  className={clsx(
                    'ml-auto mr-5 h-6 w-6 rounded-full',
                    StatusColor[item.label],
                    'border border-sevatracker-lightgray'
                  )}
                />
              </View>
            );
          })}
          {selected === 'Select Label' && (
            <View
              className="h-14 w-full justify-center border-t border-sevatracker-blue/20"
              onTouchEnd={() => {
                setIsOpen(false);
              }}
            >
              <Text className="w-40 text-ellipsis bg-sevatracker-white pl-2 font-sevatracker-manrope-semibold text-sm">
                {selected}
              </Text>
            </View>
          )}
        </View>
      )}
    </View>
  );
}
