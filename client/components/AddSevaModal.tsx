import React, { useState } from 'react';
import { Modal, Pressable, Text, TextInput, View } from 'react-native';

import moment from 'moment';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { Button } from 'react-native-paper';

import { useSevaTrackerContext } from '../contexts/SevaTrackerContext';
import { useAddSevaTask } from '../services/seva';
import { SevaTask } from '../types/seva';

interface AddSevaModalProps {
  isVisible: boolean;
  setVisible: (val: boolean) => void;
}

export function AddSevaModal({ isVisible, setVisible }: AddSevaModalProps) {
  const { user } = useSevaTrackerContext();
  const { addSevaTaskMutation, isAddingSevaTask } = useAddSevaTask();

  const [title, setTitle] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);

  const handleAddSeva = () => {
    if (!title.trim()) return;

    const newSevaTask: Omit<SevaTask, 'id'> = {
      title: title.trim(),
      date: selectedDate.toISOString(),
      completed: false,
      userId: user.userID
    };

    addSevaTaskMutation(newSevaTask);

    // Reset form and close modal
    setTitle('');
    setSelectedDate(new Date());
    setVisible(false);
  };

  const handleCancel = () => {
    setTitle('');
    setSelectedDate(new Date());
    setVisible(false);
  };

  return (
    <Modal
      visible={isVisible}
      transparent={true}
      animationType="fade"
      onRequestClose={handleCancel}
    >
      <Pressable
        className="bg-black/50 flex-1 items-center justify-center"
        onPress={handleCancel}
      >
        <Pressable
          className="bg-sevatracker-white w-[90%] max-w-md rounded-3xl p-8 pb-10"
          onPress={(e) => e.stopPropagation()}
        >
          <Text className="font-sevatracker-manrope-bold text-sevatracker-blue mb-8 text-center text-2xl">
            Add New Seva
          </Text>

          <View className="mb-6">
            <Text className="font-sevatracker-manrope-semibold text-sevatracker-black mb-3 text-sm">
              Seva Description
            </Text>
            <TextInput
              className="border-sevatracker-gray font-sevatracker-manrope min-h-[80px] rounded-lg border p-4 text-base"
              placeholder="Enter seva description..."
              value={title}
              onChangeText={setTitle}
              multiline
              numberOfLines={3}
              textAlignVertical="top"
            />
          </View>

          <View className="mb-8">
            <Text className="font-sevatracker-manrope-semibold text-sevatracker-black mb-3 text-sm">
              Date
            </Text>
            <View className="border-sevatracker-gray rounded-lg border">
              <Button
                mode="text"
                onPress={() => setDatePickerVisible(true)}
                textColor="black"
                style={{ paddingVertical: 12 }}
              >
                {moment(selectedDate).format('MMMM DD, YYYY')}
              </Button>
            </View>
          </View>

          <View className="mb-4 mt-6">
            <View className="flex-row space-x-4">
              <View className="flex-1">
                <Button
                  mode="outlined"
                  onPress={handleCancel}
                  textColor="black"
                  disabled={isAddingSevaTask}
                  style={{
                    paddingVertical: 8,
                    borderColor: '#6B7280',
                    borderRadius: 8
                  }}
                  labelStyle={{ fontSize: 16 }}
                >
                  Cancel
                </Button>
              </View>
              <View className="flex-1">
                <Button
                  mode="contained"
                  onPress={handleAddSeva}
                  disabled={!title.trim() || isAddingSevaTask}
                  loading={isAddingSevaTask}
                  style={{
                    paddingVertical: 8,
                    borderRadius: 8
                  }}
                  buttonColor="#3B82F6"
                  labelStyle={{ fontSize: 16 }}
                >
                  Add Seva
                </Button>
              </View>
            </View>
          </View>

          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={(date) => {
              setSelectedDate(date);
              setDatePickerVisible(false);
            }}
            onCancel={() => setDatePickerVisible(false)}
            date={selectedDate}
          />
        </Pressable>
      </Pressable>
    </Modal>
  );
}
