import { TodoListRepositoryI } from "../../domain/TodoListRepositoryI";

export default function getCategories(repository: TodoListRepositoryI) {
  return repository.getCategories();
}
