import React, { createContext, useContext, useEffect, useState } from 'react';

import { getCurrentAuthUser } from '../services/auth';
import { getCurrentUser, initializeMockData } from '../services/localStorage';
import { useSevaTasks } from '../services/seva';
import { SevaTask } from '../types/seva';
import { Group, User } from './types';

type SevaTrackerContextData = {
  user: User;
  group: Group;
  sevaTasks: SevaTask[];
  sevaTasksIsLoading: boolean;
  refreshUser: () => void;
};

const SevaTrackerContext = createContext({} as SevaTrackerContextData);

export function SevaTrackerProvider({
  children
}: {
  children: JSX.Element | JSX.Element[];
}) {
  const [user, setUser] = useState({} as User);
  const [group, setGroup] = useState({} as Group);
  const [isInitialized, setIsInitialized] = useState(false);

  const { sevaTasks, sevaTasksIsLoading } = useSevaTasks(user.userID || '');

  const refreshUser = async () => {
    try {
      const authUser = await getCurrentAuthUser();
      if (authUser) {
        const signedInUser: User = {
          userID: authUser.uid,
          userEmail: authUser.email
        };
        setUser(signedInUser);

        // Set a mock group for the user
        setGroup({
          groupID: 1, // Use a simple number for local storage
          role: 'PRIMARY'
        });
      } else {
        // Clear user if no auth user
        setUser({} as User);
        setGroup({} as Group);
      }
    } catch (error) {
      console.error('Error refreshing user:', error);
      // Set default empty user on error
      setUser({} as User);
      setGroup({} as Group);
    }
  };

  useEffect(() => {
    const initializeApp = async () => {
      try {
        // Initialize mock data on app start
        await initializeMockData();

        // Initial user check
        await refreshUser();
      } catch (error) {
        console.error('Error initializing app:', error);
      } finally {
        setIsInitialized(true);
      }
    };

    if (!isInitialized) {
      initializeApp();
    }
  }, [isInitialized]);

  // Only set up polling after initial load, and less frequently
  useEffect(() => {
    if (!isInitialized) return;

    // Set up a less frequent polling mechanism for auth changes
    const interval = setInterval(refreshUser, 5000); // Every 5 seconds instead of 1

    return () => clearInterval(interval);
  }, [isInitialized]);

  const SevaTrackerContextStore: SevaTrackerContextData = {
    user: user,
    group: group,
    sevaTasks: sevaTasks || [],
    sevaTasksIsLoading: sevaTasksIsLoading,
    refreshUser
  };

  return (
    <SevaTrackerContext.Provider value={SevaTrackerContextStore}>
      {children}
    </SevaTrackerContext.Provider>
  );
}

export function useSevaTrackerContext() {
  return useContext(SevaTrackerContext);
}
