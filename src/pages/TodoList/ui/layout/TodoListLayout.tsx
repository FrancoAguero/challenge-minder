import TodoListRepository from "../../module/infrastructure/TodoListRepository";
import { TodoListProvider } from "../context/TodoListProvider";
import TodoView from "../TodoView";

export default function TodoListLayout() {
  const repository = TodoListRepository();
  return (
    <TodoListProvider repository={repository}>
      <TodoView />
    </TodoListProvider>
  );
}
