import React from 'react';
import { Pressable, Text } from 'react-native';

import { getDocumentAsync } from 'expo-document-picker';

import { useSevaTrackerContext } from '../contexts/SevaTrackerContext';
import { useFile } from '../services/file';

export function DocPickerButton() {
  const { user, group } = useSevaTrackerContext();
  const { uploadFileMutation } = useFile();

  const pickDocument = async () => {
    try {
      await getDocumentAsync({
        type: '*/*',
        copyToCacheDirectory: false
      }).then((res) => {
        if (!res.canceled) {
          uploadFileMutation({
            file: res.assets[0],
            userId: user.userID,
            groupId: group.groupID
          });
        }
      });
    } catch (err) {
      console.log('err', err);
    }
  };

  return (
    <Pressable
      onPress={pickDocument}
      className="mb-2 mt-2 w-40 self-center rounded-md border border-sevatracker-gray "
    >
      <Text className="self-center text-lg text-sevatracker-black">
        Pick Document
      </Text>
    </Pressable>
  );
}
