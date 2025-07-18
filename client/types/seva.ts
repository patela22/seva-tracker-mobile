export interface SevaTask {
  id: string;
  title: string; // short seva description
  date: string; // ISO date string for scheduled day
  completed: boolean;
  userId: string; // to associate tasks with users
}
