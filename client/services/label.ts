import { useQuery } from '@tanstack/react-query';

import { getLabels } from './localStorage';

interface Label {
  label_id: number;
  label_name: string;
  group_id: number;
}

interface TaskLabel {
  task_id: number;
  label_name: string;
}

// Mock label operations using local storage
const getLabelsByGroup = async (groupId: number): Promise<Label[]> => {
  const labels = await getLabels();
  return labels.filter((label) => label.group_id === groupId);
};

const getLabelsByTasks = async (taskIds: number[]): Promise<TaskLabel[]> => {
  // For simplicity, return empty array for task labels in POC
  // In a real implementation, you'd store task-label relationships
  return [];
};

export const useLabelsByGroup = (groupId: number) => {
  const { data: labels, isLoading: labelsIsLoading } = useQuery<Label[]>({
    queryKey: ['labels', groupId],
    queryFn: () => getLabelsByGroup(groupId),
    enabled: !!groupId
  });

  return { labels, labelsIsLoading };
};

export const useLabelsByTasks = (taskIds: number[]) => {
  const { data: labels, isLoading: labelsIsLoading } = useQuery<TaskLabel[]>({
    queryKey: ['taskLabels', taskIds],
    queryFn: () => getLabelsByTasks(taskIds),
    enabled: taskIds.length > 0
  });

  return { labels, labelsIsLoading };
};
