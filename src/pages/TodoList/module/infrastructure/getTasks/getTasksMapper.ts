import { GetTaskDto, TasksI } from "./getTasksDto";

export default function getTasksMapper(data: GetTaskDto[]): TasksI {
  return {
    completed: data.filter((task) => task.completed),
    pending: data.filter((task) => !task.completed),
  };
}
