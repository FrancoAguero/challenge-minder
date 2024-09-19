import { TaskI } from "../../domain/Tasks";
import { TodoListRepositoryI } from "../../domain/TodoListRepositoryI";

export default function postTask(repository: TodoListRepositoryI, body: TaskI) {
  return repository.postTask(body);
}
