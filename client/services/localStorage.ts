import { Platform } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

// Keys for different data types
const KEYS = {
  USER: 'user_data',
  TASKS: 'tasks_data',
  SEVA_TASKS: 'seva_tasks_data',
  GROUPS: 'groups_data',
  LABELS: 'labels_data',
  ROLES: 'roles_data',
  CURRENT_USER: 'current_user'
};

// Web-compatible storage interface
const storage = {
  async setItem(key: string, value: string): Promise<void> {
    if (Platform.OS === 'web') {
      try {
        localStorage.setItem(key, value);
      } catch (error) {
        console.error('Error saving to localStorage:', error);
      }
    } else {
      await AsyncStorage.setItem(key, value);
    }
  },

  async getItem(key: string): Promise<string | null> {
    if (Platform.OS === 'web') {
      try {
        return localStorage.getItem(key);
      } catch (error) {
        console.error('Error reading from localStorage:', error);
        return null;
      }
    } else {
      return await AsyncStorage.getItem(key);
    }
  },

  async removeItem(key: string): Promise<void> {
    if (Platform.OS === 'web') {
      try {
        localStorage.removeItem(key);
      } catch (error) {
        console.error('Error removing from localStorage:', error);
      }
    } else {
      await AsyncStorage.removeItem(key);
    }
  },

  async clear(): Promise<void> {
    if (Platform.OS === 'web') {
      try {
        localStorage.clear();
      } catch (error) {
        console.error('Error clearing localStorage:', error);
      }
    } else {
      await AsyncStorage.clear();
    }
  }
};

// Generic storage functions
export const setItem = async (key: string, value: any): Promise<void> => {
  try {
    await storage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error('Error saving to storage:', error);
  }
};

export const getItem = async <T>(key: string): Promise<T | null> => {
  try {
    const value = await storage.getItem(key);
    return value ? JSON.parse(value) : null;
  } catch (error) {
    console.error('Error reading from storage:', error);
    return null;
  }
};

export const removeItem = async (key: string): Promise<void> => {
  try {
    await storage.removeItem(key);
  } catch (error) {
    console.error('Error removing from storage:', error);
  }
};

export const clearAll = async (): Promise<void> => {
  try {
    await storage.clear();
  } catch (error) {
    console.error('Error clearing storage:', error);
  }
};

// User storage functions
export const saveCurrentUser = async (user: any): Promise<void> => {
  await setItem(KEYS.CURRENT_USER, user);
};

export const getCurrentUser = async (): Promise<any | null> => {
  return await getItem(KEYS.CURRENT_USER);
};

export const saveUserData = async (userData: any): Promise<void> => {
  await setItem(KEYS.USER, userData);
};

export const getUserData = async (): Promise<any | null> => {
  return await getItem(KEYS.USER);
};

// Task storage functions
export const saveTasks = async (tasks: any[]): Promise<void> => {
  await setItem(KEYS.TASKS, tasks);
};

export const getTasks = async (): Promise<any[]> => {
  const tasks = await getItem<any[]>(KEYS.TASKS);
  return tasks || [];
};

// Seva tasks storage functions
export const saveSevaTasks = async (sevaTasks: any[]): Promise<void> => {
  await setItem(KEYS.SEVA_TASKS, sevaTasks);
};

export const getSevaTasks = async (): Promise<any[]> => {
  const sevaTasks = await getItem<any[]>(KEYS.SEVA_TASKS);
  return sevaTasks || [];
};

// Groups storage functions
export const saveGroups = async (groups: any[]): Promise<void> => {
  await setItem(KEYS.GROUPS, groups);
};

export const getGroups = async (): Promise<any[]> => {
  const groups = await getItem<any[]>(KEYS.GROUPS);
  return groups || [];
};

// Labels storage functions
export const saveLabels = async (labels: any[]): Promise<void> => {
  await setItem(KEYS.LABELS, labels);
};

export const getLabels = async (): Promise<any[]> => {
  const labels = await getItem<any[]>(KEYS.LABELS);
  return labels || [];
};

// Roles storage functions
export const saveRoles = async (roles: any[]): Promise<void> => {
  await setItem(KEYS.ROLES, roles);
};

export const getRoles = async (): Promise<any[]> => {
  const roles = await getItem<any[]>(KEYS.ROLES);
  return roles || [];
};

// Initialize with mock data
export const initializeMockData = async (): Promise<void> => {
  const existingTasks = await getTasks();
  const existingSevaTasks = await getSevaTasks();
  const existingGroups = await getGroups();
  const existingLabels = await getLabels();
  const existingRoles = await getRoles();

  // Initialize with empty arrays if no data exists
  if (existingTasks.length === 0) {
    await saveTasks([]);
  }

  if (existingSevaTasks.length === 0) {
    await saveSevaTasks([]);
  }

  if (existingGroups.length === 0) {
    const mockGroups = [
      {
        group_id: 1,
        group_name: 'My Seva Group',
        date_created: new Date().toISOString()
      }
    ];
    await saveGroups(mockGroups);
  }

  if (existingLabels.length === 0) {
    const mockLabels = [
      { label_id: 1, label_name: 'Spiritual', group_id: 1 },
      { label_id: 2, label_name: 'Service', group_id: 1 },
      { label_id: 3, label_name: 'Personal', group_id: 1 }
    ];
    await saveLabels(mockLabels);
  }

  if (existingRoles.length === 0) {
    const mockRoles = [{ group_id: 1, user_id: 'mock_user', role: 'PRIMARY' }];
    await saveRoles(mockRoles);
  }
};
