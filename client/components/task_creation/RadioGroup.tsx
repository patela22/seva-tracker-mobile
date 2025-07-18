import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import { clsx } from 'clsx';

import BhajanSinging from '../../assets/task-creation/bhajan-singing.svg';
import ClothingDonation from '../../assets/task-creation/clothing-donation.svg';
import Devotion from '../../assets/task-creation/devotion.svg';
import EkadashiFasting from '../../assets/task-creation/ekadashi-fasting.svg';
import FoodDonation from '../../assets/task-creation/food-donation.svg';
import FruitFasting from '../../assets/task-creation/fruit-fasting.svg';
import GroupKirtan from '../../assets/task-creation/group-kirtan.svg';
import InstrumentalKirtan from '../../assets/task-creation/instrumental-kirtan.svg';
import JapaBeads from '../../assets/task-creation/japa-beads.svg';
import Lamp from '../../assets/task-creation/lamp.svg';
import LovingKindnessMeditation from '../../assets/task-creation/loving-kindness-meditation.svg';
import MantraChanting from '../../assets/task-creation/mantra-chanting.svg';
import MindfulnessMeditation from '../../assets/task-creation/mindfulness-meditation.svg';
import MoneyDonation from '../../assets/task-creation/money-donation.svg';
import PrayerGesture from '../../assets/task-creation/prayer-gesture.svg';
import ScriptureDiscussion from '../../assets/task-creation/scripture-discussion.svg';
import ScriptureListening from '../../assets/task-creation/scripture-listening.svg';
import ScriptureReading from '../../assets/task-creation/scripture-reading.svg';
import SoloKirtan from '../../assets/task-creation/solo-kirtan.svg';
import TranscendentalMeditation from '../../assets/task-creation/transcendental-meditation.svg';
import WaterFasting from '../../assets/task-creation/water-fasting.svg';
import WaterOffering from '../../assets/task-creation/water-offering.svg';

interface RadioGroupProps {
  title: string;
  options: string[];
  themeColor?: string;
  onChange?: (value: string) => void;
}

export function RadioGroup({
  title,
  options,
  themeColor,
  onChange
}: RadioGroupProps) {
  const [selectedOption, setSelectedOption] = useState('');

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
    if (onChange) {
      onChange(option);
    }
  };

  const renderIcon = (option: string) => {
    switch (option) {
      case 'Mindfulness':
        return (
          <MindfulnessMeditation
            color={option === selectedOption ? '#FFFFFF' : '#FC2C51'}
          />
        );
      case 'Transcendental':
        return (
          <TranscendentalMeditation
            color={option === selectedOption ? '#FFFFFF' : '#FC2C51'}
          />
        );
      case 'Loving-kindness':
        return (
          <LovingKindnessMeditation
            color={option === selectedOption ? '#FFFFFF' : '#FC2C51'}
          />
        );
      case 'Japa':
        return (
          <Devotion color={option === selectedOption ? '#FFFFFF' : '#990099'} />
        );
      case 'Bhajan':
        return (
          <BhajanSinging
            color={option === selectedOption ? '#FFFFFF' : '#990099'}
          />
        );
      case 'Mantra':
        return (
          <MantraChanting
            color={option === selectedOption ? '#FFFFFF' : '#990099'}
          />
        );
      case 'Money':
        return (
          <MoneyDonation
            color={option === selectedOption ? '#FFFFFF' : '#FC2C51'}
          />
        );
      case 'Food':
        return (
          <FoodDonation
            color={option === selectedOption ? '#FFFFFF' : '#FC2C51'}
          />
        );
      case 'Clothing':
        return (
          <ClothingDonation
            color={option === selectedOption ? '#FFFFFF' : '#FC2C51'}
          />
        );
      case 'Reading':
        return (
          <ScriptureReading
            color={option === selectedOption ? '#FFFFFF' : '#FC2C51'}
          />
        );
      case 'Listening':
        return (
          <ScriptureListening
            color={option === selectedOption ? '#FFFFFF' : '#FC2C51'}
          />
        );
      case 'Discussion':
        return (
          <ScriptureDiscussion
            color={option === selectedOption ? '#FFFFFF' : '#FC2C51'}
          />
        );
      case 'Water':
        return (
          <WaterFasting
            color={option === selectedOption ? '#FFFFFF' : '#FC2C51'}
          />
        );
      case 'Fruit':
        return (
          <FruitFasting
            color={option === selectedOption ? '#FFFFFF' : '#FC2C51'}
          />
        );
      case 'Ekadashi':
        return (
          <EkadashiFasting
            color={option === selectedOption ? '#FFFFFF' : '#FC2C51'}
          />
        );
      case 'Group':
        return (
          <GroupKirtan
            color={option === selectedOption ? '#FFFFFF' : '#FC2C51'}
          />
        );
      case 'Solo':
        return (
          <SoloKirtan
            color={option === selectedOption ? '#FFFFFF' : '#FC2C51'}
          />
        );
      case 'Instrumental':
        return (
          <InstrumentalKirtan
            color={option === selectedOption ? '#FFFFFF' : '#FC2C51'}
          />
        );
      default:
        return null;
    }
  };

  return (
    <View className="m-2 mb-0">
      <Text className="font-sevatracker-montserrat-semibold m-2">
        {title.toUpperCase()}
      </Text>
      <View className="flex flex-row flex-wrap justify-between">
        {options.map((option, index) => {
          return (
            <TouchableOpacity
              key={index}
              className={clsx(
                'border-sevatracker-gray m-2 flex h-12 min-w-[100px] flex-1 flex-row items-center space-x-2 rounded-md border px-2 py-2',
                option === selectedOption ? themeColor : 'bg-sevatracker-white'
              )}
              onPress={() => {
                handleOptionSelect(option);
              }}
            >
              <View className="flex-shrink-0">{renderIcon(option)}</View>
              <Text
                className={clsx(
                  'font-sevatracker-montserrat-semibold flex-1 text-xs',
                  option === selectedOption
                    ? 'text-sevatracker-white'
                    : 'text-sevatracker-black'
                )}
                numberOfLines={2}
                adjustsFontSizeToFit={true}
                minimumFontScale={0.8}
              >
                {option}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}
