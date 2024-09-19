export interface TasksI {
  completed: TaskI[];
  pending: TaskI[];
}

export interface TaskI {
  id: string;
  title: string;
  description: string;
  category_id: string;
  completed: boolean;
}
