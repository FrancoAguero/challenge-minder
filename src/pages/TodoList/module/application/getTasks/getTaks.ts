import { TodoListRepositoryI } from "../../domain/TodoListRepositoryI";

export default function getTasks(repository: TodoListRepositoryI) {
  return repository.getTasks();
}
