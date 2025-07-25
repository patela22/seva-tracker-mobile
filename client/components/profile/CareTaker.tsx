import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import { AppStackNavigation } from '../../navigation/types';
import { GroupRole, Role } from '../../types/group';
import { User } from '../../types/user';
import { SmallProfileImage } from './Group';

interface CareProps {
  user: User | undefined;
  role: GroupRole | undefined;
}

export function CareTaker({ user, role }: CareProps) {
  if (!user) return null;
  const navigation = useNavigation<AppStackNavigation>();
  // const { user: signedInUser, group } = useSevaTrackerContext();
  // const [activeUser, setActiveUser] = useState(signedInUser.userID);

  const handlePress = () => {
    navigation.navigate('Profile');
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <View className="mb-2 flex flex-row items-center rounded-xl border border-sevatracker-lightgray bg-sevatracker-white py-3 pl-1">
        <SmallProfileImage user={user} />
        <View className="flex h-fit max-h-fit min-h-fit flex-row items-center">
          <View className="ml-8">
            <Text className="flex-wrap text-left font-sevatracker-manrope-semibold text-lg text-sevatracker-black">
              {user.first_name} {user.last_name}
            </Text>
            <View className="flex w-[60vw] flex-row">
              <View className="flex flex-col">
                <Text className="items-center justify-center text-left font-sevatracker-manrope-semibold text-xs text-sevatracker-black">
                  {`${role?.role} ${role?.role !== Role.PATIENT ? 'CARETAKER' : ''}`}
                </Text>
                <Text className="items-center justify-center text-left font-sevatracker-manrope text-xs  text-sevatracker-black">
                  {user.phone ? user.phone : user.email}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}
