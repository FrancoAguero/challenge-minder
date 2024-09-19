import { TaskI } from "../../domain/Tasks";
import { TodoListRepositoryI } from "../../domain/TodoListRepositoryI";

export default function putTask(
  repository: TodoListRepositoryI,
  id: string,
  body: TaskI
) {
  return repository.putTask(id, body);
}
