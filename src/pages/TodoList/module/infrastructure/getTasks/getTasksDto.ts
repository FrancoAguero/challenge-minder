export interface GetTaskDto {
  id: string;
  title: string;
  description: string;
  category_id: string;
  completed: boolean;
}

export interface TasksI {
  completed: GetTaskDto[];
  pending: GetTaskDto[];
}
