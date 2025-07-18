import { Alert } from 'react-native';

import { useMutation } from '@tanstack/react-query';

import { getCurrentUser, saveCurrentUser } from './localStorage';

interface AuthProps {
  email: string;
  password: string;
}

interface MockUser {
  uid: string;
  email: string;
}

// Simple mock authentication
const logIn = async ({ email, password }: AuthProps): Promise<MockUser> => {
  // Simple validation for POC
  if (!email || !password) {
    throw new Error('Email and password are required');
  }

  // Mock user creation based on email
  const mockUser: MockUser = {
    uid: `user_${email.replace(/[^a-zA-Z0-9]/g, '_')}`,
    email: email
  };

  // Save the user locally
  await saveCurrentUser(mockUser);

  return mockUser;
};

const signUp = async ({ email, password }: AuthProps): Promise<MockUser> => {
  // Simple validation for POC
  if (!email || !password) {
    throw new Error('Email and password are required');
  }

  // Mock user creation
  const mockUser: MockUser = {
    uid: `user_${email.replace(/[^a-zA-Z0-9]/g, '_')}`,
    email: email
  };

  // Save the user locally
  await saveCurrentUser(mockUser);

  return mockUser;
};

const signOut = async (): Promise<void> => {
  // Clear the current user from local storage
  await saveCurrentUser(null);
};

export const useAuth = () => {
  const { mutate: logInMutation } = useMutation({
    mutationFn: (authProps: AuthProps) => logIn(authProps),
    onSuccess: (user) => {
      console.log('Login successful:', user);
      // The navigation will be handled by the component calling this
    },
    onError: (error: Error) => {
      Alert.alert('Login Failed', error.message);
    }
  });

  const { mutate: signUpMutation } = useMutation({
    mutationFn: (authProps: AuthProps) => signUp(authProps),
    onSuccess: (user) => {
      console.log('Sign up successful:', user);
      // The navigation will be handled by the component calling this
    },
    onError: (error: Error) => {
      Alert.alert('Error Signing Up: ', error.message);
    }
  });

  const { mutate: signOutMutation } = useMutation({
    mutationFn: () => signOut(),
    onSuccess: () => {
      console.log('Sign out successful');
    },
    onError: (error: Error) => {
      Alert.alert('Error Signing Out: ', error.message);
    }
  });

  return {
    logInMutation,
    signUpMutation,
    signOutMutation
  };
};

// Mock version of onAuthStateChanged
export const onAuthStateChanged = (
  callback: (user: MockUser | null) => void
): void => {
  // Check for existing user on app start
  getCurrentUser().then((user) => {
    callback(user);
  });
};

// Helper to get current auth state
export const getCurrentAuthUser = async (): Promise<MockUser | null> => {
  return await getCurrentUser();
};
