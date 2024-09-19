import { CategoriesI } from "./Categories";
import { TasksI, TaskI } from "./Tasks";

export interface TodoListRepositoryI {
  getTasks: () => Promise<TasksI>;
  postTask: (body: TaskI) => Promise<TaskI>;
  putTask: (id: string, body: TaskI) => Promise<unknown>;
  getCategories: () => Promise<CategoriesI[]>;
}
