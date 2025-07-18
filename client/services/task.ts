import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import moment from 'moment';

import { Task } from '../types/task';
import { getTasks, saveTasks } from './localStorage';

const api_url = 'http://localhost:8080'; // Keep for reference but not used

// Mock task operations using local storage
const getFilteredTasks = async (filters: TaskQueryParams): Promise<Task[]> => {
  const allTasks = await getTasks();

  // Apply filters if needed
  let filteredTasks = allTasks;

  if (filters.groupID) {
    filteredTasks = filteredTasks.filter(
      (task) => task.group_id === filters.groupID
    );
  }

  if (filters.taskStatus) {
    filteredTasks = filteredTasks.filter(
      (task) => task.task_status === filters.taskStatus
    );
  }

  if (filters.taskType) {
    filteredTasks = filteredTasks.filter(
      (task) => task.task_type === filters.taskType
    );
  }

  return filteredTasks;
};

const addNewTask = async (newTask: Task): Promise<Task> => {
  const allTasks = await getTasks();

  // Generate a simple ID
  const newId = Math.max(0, ...allTasks.map((t) => t.task_id)) + 1;

  const taskToAdd: Task = {
    ...newTask,
    task_id: newId,
    task_status: 'INCOMPLETE'
  };

  const updatedTasks = [...allTasks, taskToAdd];
  await saveTasks(updatedTasks);

  console.log('Added task locally:', taskToAdd);
  return taskToAdd;
};

const updateTaskStatus = async (
  taskId: number,
  status: string
): Promise<Task> => {
  const allTasks = await getTasks();

  const updatedTasks = allTasks.map((task) =>
    task.task_id === taskId ? { ...task, task_status: status } : task
  );

  await saveTasks(updatedTasks);

  const updatedTask = updatedTasks.find((task) => task.task_id === taskId);
  if (!updatedTask) {
    throw new Error('Task not found');
  }

  return updatedTask;
};

const deleteTask = async (taskId: number): Promise<void> => {
  const allTasks = await getTasks();
  const updatedTasks = allTasks.filter((task) => task.task_id !== taskId);
  await saveTasks(updatedTasks);
};

export interface TaskQueryParams {
  groupID?: number;
  taskStatus?: string;
  taskType?: string;
  startDate?: string;
  endDate?: string;
}

export const useFilteredTasks = (filters: TaskQueryParams) => {
  const {
    data: tasks,
    isLoading: tasksIsLoading,
    refetch: refetchTask
  } = useQuery<Task[]>({
    queryKey: ['filteredTaskList', filters],
    queryFn: () => getFilteredTasks(filters)
  });

  return {
    tasks,
    tasksIsLoading,
    refetchTask
  };
};

export const useTasksByAssignedUsers = (userIDs: string[]) => {
  const {
    data: tasks,
    isLoading: tasksIsLoading,
    refetch: refetchTask
  } = useQuery<Task[]>({
    queryKey: ['tasksByAssignedUsers', userIDs],
    queryFn: async () => {
      const allTasks = await getTasks();
      return allTasks.filter((task) => userIDs.includes(task.assigned_to));
    },
    enabled: userIDs.length > 0
  });

  return {
    tasks,
    tasksIsLoading,
    refetchTask
  };
};

export const useTaskByAssigned = (userId: string) => {
  const { data: taskByUser, isLoading: taskByUserIsLoading } = useQuery<Task[]>(
    {
      queryKey: ['tasks', userId],
      queryFn: async () => {
        const allTasks = await getTasks();
        return allTasks.filter((task) => task.assigned_to === userId);
      },
      enabled: !!userId
    }
  );

  return { taskByUser, taskByUserIsLoading };
};

export const useUpdateTaskStatus = () => {
  const queryClient = useQueryClient();

  const { mutate: updateTaskStatusMutation } = useMutation({
    mutationFn: ({ taskId, status }: { taskId: number; status: string }) =>
      updateTaskStatus(taskId, status),
    onSuccess: () => {
      console.log('Task Status Updated Successfully');
      queryClient.invalidateQueries({ queryKey: ['filteredTaskList'] });
      queryClient.invalidateQueries({ queryKey: ['tasksByAssignedUsers'] });
    },
    onError: (err) => {
      console.error('ERROR: Failed to Update Task Status. Code:', err);
    }
  });

  return updateTaskStatusMutation;
};

export const addNewTaskMutation = () => {
  const queryClient = useQueryClient();

  const { mutate: addTaskMutation } = useMutation({
    mutationFn: (newTask: Task) => addNewTask(newTask),
    onSuccess: () => {
      console.log('Task Added Successfully');
      queryClient.invalidateQueries({ queryKey: ['filteredTaskList'] });
    },
    onError: (err) => {
      console.error('ERROR: Failed to Add Task. Code:', err);
    }
  });

  return addTaskMutation;
};

export const useDeleteTask = () => {
  const queryClient = useQueryClient();

  const { mutate: deleteTaskMutation } = useMutation({
    mutationFn: (taskId: number) => deleteTask(taskId),
    onSuccess: () => {
      console.log('Task Deleted Successfully');
      queryClient.invalidateQueries({ queryKey: ['filteredTaskList'] });
    },
    onError: (err) => {
      console.error('ERROR: Failed to Delete Task. Code:', err);
    }
  });

  return deleteTaskMutation;
};
