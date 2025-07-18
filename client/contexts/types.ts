import { Role } from '../types/group';
import { SevaTask } from '../types/seva';

export interface User {
  userID: string;
  userEmail: string;
}

export interface Group {
  groupID: number;
  role: Role;
}

export interface SevaTaskContext {
  sevaTasks: SevaTask[];
  isLoading: boolean;
}
