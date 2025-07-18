import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { SevaTask } from '../types/seva';
import {
  getSevaTasks as getSevaTasksFromStorage,
  saveSevaTasks
} from './localStorage';

// Get all seva tasks for a user from local storage
const getSevaTasks = async (userId: string): Promise<SevaTask[]> => {
  const allSevaTasks = await getSevaTasksFromStorage();
  // Filter tasks by userId
  return allSevaTasks.filter((task) => task.userId === userId);
};

// Add a new seva task to local storage
const addSevaTask = async (
  sevaTask: Omit<SevaTask, 'id'>
): Promise<SevaTask> => {
  const allSevaTasks = await getSevaTasksFromStorage();

  // Generate a simple ID
  const newId = `seva_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

  const newSevaTask: SevaTask = {
    id: newId,
    ...sevaTask
  };

  // Add the new task to the array
  const updatedTasks = [...allSevaTasks, newSevaTask];

  // Save back to storage
  await saveSevaTasks(updatedTasks);

  return newSevaTask;
};

// Toggle the completed status of a seva task
const toggleSevaDone = async (
  taskId: string,
  completed: boolean
): Promise<void> => {
  const allSevaTasks = await getSevaTasksFromStorage();

  // Find and update the task
  const updatedTasks = allSevaTasks.map((task) =>
    task.id === taskId ? { ...task, completed } : task
  );

  // Save back to storage
  await saveSevaTasks(updatedTasks);
};

// React Query hooks
export const useSevaTasks = (userId: string) => {
  const {
    data: sevaTasks,
    isLoading: sevaTasksIsLoading,
    refetch: refetchSevaTasks
  } = useQuery<SevaTask[]>({
    queryKey: ['sevaTasks', userId],
    queryFn: () => getSevaTasks(userId),
    enabled: !!userId
  });

  return {
    sevaTasks,
    sevaTasksIsLoading,
    refetchSevaTasks
  };
};

export const useAddSevaTask = () => {
  const queryClient = useQueryClient();

  const { mutate: addSevaTaskMutation, isLoading: isAddingSevaTask } =
    useMutation({
      mutationFn: (sevaTask: Omit<SevaTask, 'id'>) => addSevaTask(sevaTask),
      onSuccess: (_, variables) => {
        console.log('Seva Task Added Successfully');
        queryClient.invalidateQueries({
          queryKey: ['sevaTasks', variables.userId]
        });
      },
      onError: (err) => {
        console.error('ERROR: Failed to Add Seva Task. Code:', err);
      }
    });

  return {
    addSevaTaskMutation,
    isAddingSevaTask
  };
};

export const useToggleSevaDone = () => {
  const queryClient = useQueryClient();

  const { mutate: toggleSevaDoneMutation, isLoading: isTogglingSeva } =
    useMutation({
      mutationFn: ({
        taskId,
        completed
      }: {
        taskId: string;
        completed: boolean;
      }) => toggleSevaDone(taskId, completed),
      onSuccess: () => {
        console.log('Seva Task Status Updated Successfully');
        queryClient.invalidateQueries({ queryKey: ['sevaTasks'] });
      },
      onError: (err) => {
        console.error('ERROR: Failed to Update Seva Task Status. Code:', err);
      }
    });

  return {
    toggleSevaDoneMutation,
    isTogglingSeva
  };
};

// Export the CRUD functions as requested
export { getSevaTasks, addSevaTask, toggleSevaDone };
