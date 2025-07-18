import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { User } from '../types/user';
import { getUserData, saveUserData } from './localStorage';

// Mock user operations using local storage
const getUser = async (userId: string): Promise<User> => {
  const userData = await getUserData();

  // Return mock user data or stored data
  if (userData && userData[userId]) {
    return userData[userId];
  }

  // Return default mock user
  return {
    user_id: userId,
    first_name: 'Demo',
    last_name: 'User',
    email: 'demo@example.com',
    phone: '555-0123',
    address: '123 Demo Street',
    profile_picture: '',
    device_id: ''
  };
};

const getUsers = async (userIds: string[]): Promise<User[]> => {
  const users = await Promise.all(userIds.map((id) => getUser(id)));
  return users;
};

const addUser = async (user: User): Promise<User> => {
  const userData = (await getUserData()) || {};
  userData[user.user_id] = user;
  await saveUserData(userData);
  console.log('User added locally:', user);
  return user;
};

const updateUser = async (user: User): Promise<User> => {
  const userData = (await getUserData()) || {};
  userData[user.user_id] = user;
  await saveUserData(userData);
  console.log('User updated locally:', user);
  return user;
};

export const useUser = (userId: string) => {
  const queryClient = useQueryClient();

  const { data: user, isLoading: userIsLoading } = useQuery<User>({
    queryKey: ['user', userId],
    queryFn: () => getUser(userId),
    enabled: !!userId
  });

  const { mutate: updateUserMutation } = useMutation({
    mutationFn: (user: User) => updateUser(user),
    onSuccess: (data) => {
      queryClient.setQueryData(['user', userId], data);
    }
  });

  const { mutate: addUserMutation } = useMutation({
    mutationFn: (user: User) => addUser(user),
    onSuccess: (data) => {
      queryClient.setQueryData(['user', userId], data);
    }
  });

  return { user, userIsLoading, updateUserMutation, addUserMutation };
};

export const useUsers = (userIds: string[]) => {
  const { data: users, isLoading: usersAreLoading } = useQuery<User[]>({
    queryKey: ['users', userIds],
    queryFn: () => getUsers(userIds),
    enabled: userIds.length > 0
  });

  return { users, usersAreLoading };
};
