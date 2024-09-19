import { createContext, PropsWithChildren, useContext, useMemo } from "react";
import { TodoListRepositoryI } from "../../module/domain/TodoListRepositoryI";
import { TaskI } from "../../module/domain/Tasks";

import getTasksApplication from "../../module/application/getTasks/getTaks";
import getCategoriesApplication from "../../module/application/getCategories/getCategories";
import postTaskApplication from "../../module/application/postTask/postTask";
import putTaskApplication from "../../module/application/putTask/putTask";

export const TodoListContext = createContext({} as TodoListRepositoryI);

export const TodoListProvider = ({
  repository,
  children,
}: PropsWithChildren<{ repository: TodoListRepositoryI }>) => {
  const value = useMemo(() => {
    function getTasks() {
      return getTasksApplication(repository);
    }

    function getCategories() {
      return getCategoriesApplication(repository);
    }

    function postTask(body: TaskI) {
      return postTaskApplication(repository, body);
    }

    function putTask(id: string, body: TaskI) {
      return putTaskApplication(repository, id, body);
    }
    return { getTasks, getCategories, postTask, putTask };
  }, [repository]);
  return (
    <TodoListContext.Provider value={value}>
      {children}
    </TodoListContext.Provider>
  );
};

export const useTodoList = () => {
  const context = useContext(TodoListContext);
  if (context === undefined) {
    throw new Error(
      "useTodoList tiene que ser usado dentro del TodoListProvider"
    );
  }
  return context;
};
