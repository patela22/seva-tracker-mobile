import React from 'react';
import { Text, View } from 'react-native';

import { clsx } from 'clsx';

import {
  CategoryIconsMap,
  TaskTypeDescriptions,
  TypeToCategoryMap
} from '../types/type';

export function GetCategoryPill({ category }: { category: string }) {
  console.log('category', TypeToCategoryMap[category]);
  switch (TypeToCategoryMap[category]) {
    case 'Spiritual Practice':
      return (
        <View
          className={clsx(
            'border-sevatracker-lightgray mr-auto flex flex-row items-center space-x-2 rounded-full border px-2 py-1',
            'bg-sevatracker-pink/20'
          )}
        >
          <View>{CategoryIconsMap[TypeToCategoryMap[category]]}</View>
          <Text
            className={clsx(
              'font-sevatracker-manrope',
              'text-sevatracker-pink'
            )}
          >
            {TaskTypeDescriptions[category]}
          </Text>
        </View>
      );
    case 'Community & Temple':
      return (
        <View
          className={clsx(
            'border-sevatracker-lightgray mr-auto flex flex-row items-center space-x-2 rounded-full border px-2 py-1',
            'bg-sevatracker-orange/20'
          )}
        >
          <View>{CategoryIconsMap[TypeToCategoryMap[category]]}</View>
          <Text
            className={clsx(
              'font-sevatracker-manrope',
              'text-sevatracker-orange'
            )}
          >
            {TaskTypeDescriptions[category]}
          </Text>
        </View>
      );
    case 'Service & Charity':
      return (
        <View
          className={clsx(
            'border-sevatracker-lightgray mr-auto flex flex-row items-center space-x-2 rounded-full border px-2 py-1',
            'bg-sevatracker-purple/20'
          )}
        >
          <View>{CategoryIconsMap[TypeToCategoryMap[category]]}</View>
          <Text
            className={clsx(
              'font-sevatracker-manrope',
              'text-sevatracker-purple'
            )}
          >
            {TaskTypeDescriptions[category]}
          </Text>
        </View>
      );
    case 'Study & Learning':
      return (
        <View
          className={clsx(
            'border-sevatracker-lightgray mr-auto flex flex-row items-center space-x-2 rounded-full border px-2 py-1',
            'bg-sevatracker-green/20'
          )}
        >
          <View>{CategoryIconsMap[TypeToCategoryMap[category]]}</View>
          <Text
            className={clsx(
              'font-sevatracker-manrope',
              'text-sevatracker-green'
            )}
          >
            {TaskTypeDescriptions[category]}
          </Text>
        </View>
      );
    default:
      return (
        <View
          className={clsx(
            'border-sevatracker-lightgray mr-auto flex flex-row items-center space-x-2 rounded-full border px-2 py-1',
            'bg-sevatracker-coral/20'
          )}
        >
          <View>{CategoryIconsMap[TypeToCategoryMap[category]]}</View>
          <Text
            className={clsx(
              'font-sevatracker-manrope',
              'text-sevatracker-coral'
            )}
          >
            {TaskTypeDescriptions[category]}
          </Text>
        </View>
      );
  }
}
