import { axiosTodoListInstance } from "../../../../app/api/axios";
import { endpoints } from "../../../../app/api/endpoints";
import { TaskI } from "../domain/Tasks";
import { TodoListRepositoryI } from "../domain/TodoListRepositoryI";
import { GetCategoriesDto } from "./getCategories/getCategories";
import { GetTaskDto } from "./getTasks/getTasksDto";
import getTasksMapper from "./getTasks/getTasksMapper";

export default function TodoListRepository(): TodoListRepositoryI {
  return {
    getTasks: async function getTask() {
      try {
        const { data } = await axiosTodoListInstance({
          endpoint: endpoints.getTasks,
        }).get<GetTaskDto[]>();

        const response = getTasksMapper(data);

        return response;
      } catch (error) {
        throw Error("Hubo un error al obtener las listas de tareas");
      }
    },
    postTask: async function postTask(body) {
      try {
        const { data } = await axiosTodoListInstance({
          endpoint: endpoints.getTasks,
        }).post<TaskI>(body);

        return data;
      } catch (error) {
        throw Error("Hubo un error al obtener las listas de tareas");
      }
    },
    putTask: async function putTask(id, body) {
      try {
        const res = await axiosTodoListInstance({
          endpoint: endpoints.getTasks + `/${id}`,
        }).put(body);

        return res;
      } catch (error) {
        throw Error("Hubo un error al obtener las listas de tareas");
      }
    },
    getCategories: async function getCategories() {
      try {
        const { data } = await axiosTodoListInstance({
          endpoint: endpoints.getCategories,
        }).get<GetCategoriesDto[]>();

        return data;
      } catch (error) {
        throw Error("Hubo un error al obtener las listas de categorias");
      }
    },
  };
}
