import React, { useState } from 'react';
import { Text, View } from 'react-native';

import { clsx } from 'clsx';

import ArrowDown from '../assets/filledarrowdown.svg';

export function CWDropdown({
  selected,
  items,
  setLabel
}: {
  selected: string;
  items?: { label: string; value: string }[];
  setLabel: ({ label, value }: { label: string; value: string }) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <View className="mb-3 bg-sevatracker-white">
      {isOpen && (
        <View className="absolute bottom-14 z-50 flex flex-row flex-wrap rounded-lg border border-sevatracker-blue/20 bg-sevatracker-white">
          {selected !== 'Select' && (
            <View
              className="h-14 w-full justify-center rounded-lg border-t border-sevatracker-blue/20"
              onTouchEnd={() => {
                setLabel({ label: 'Select', value: '' });
                setIsOpen(false);
              }}
            >
              <Text className="w-40 text-ellipsis bg-sevatracker-white pl-2 font-sevatracker-manrope text-lg">
                {''}
              </Text>
            </View>
          )}
          {items?.map(
            (item, index) =>
              item.label !== selected && (
                <View
                  key={index}
                  className="h-14 w-full justify-center rounded-lg border-t border-sevatracker-blue/20 bg-sevatracker-white"
                  onTouchEnd={() => {
                    setLabel(item);
                    setIsOpen(false);
                  }}
                >
                  <Text className="w-40 text-ellipsis bg-sevatracker-white pl-2 font-sevatracker-montserrat-semibold text-sm text-sevatracker-blue">
                    {item.label}
                  </Text>
                </View>
              )
          )}
        </View>
      )}
      <View
        className={clsx(
          'flex h-14 w-full flex-row items-center rounded-lg bg-sevatracker-blue/20'
        )}
        onTouchEnd={() => setIsOpen(!isOpen)}
      >
        <Text className="w-40 pl-2 font-sevatracker-montserrat-semibold text-sm text-sevatracker-blue">
          {selected}
        </Text>
        <View className="absolute right-3">
          {isOpen ? (
            <View className="rotate-180">
              <ArrowDown color="black" />
            </View>
          ) : (
            <ArrowDown color="black" />
          )}
        </View>
      </View>
    </View>
  );
}
