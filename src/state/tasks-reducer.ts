import { v1 } from 'uuid';
import { FilterValuesType, TasksStateType } from '../App';
import { AddTodolistActionType, RemoveTodolistActionType } from './todolists-reducer';

// Action types:
export type RemoveTaskActionType = {
  type: 'REMOVE-TASK';
  todolistId: string;
  taskId: string;
};
export type AddTaskActionType = {
  type: 'ADD-TASK';
  todolistId: string;
  title: string;
};
export type ChangeTaskStatusActionType = {
  type: 'CHANGE-TASK-STATUS';
  todolistId: string;
  taskId: string;
  isDone: boolean;
};
export type ChangeTaskTitleActionType = {
  type: 'CHANGE-TASK-TITLE';
  todolistId: string;
  taskId: string;
  title: string;
};
type ActionsTypes =
  | RemoveTaskActionType
  | AddTaskActionType
  | ChangeTaskStatusActionType
  | ChangeTaskTitleActionType
  | AddTodolistActionType
  | RemoveTodolistActionType;

// Reducer:
export const tasksReducer = (
  state: TasksStateType,
  action: ActionsTypes
): TasksStateType => {
  switch (action.type) {
    case 'ADD-TASK': {
      const stateCopy = { ...state };
      const tasks = stateCopy[action.todolistId];
      const newTask = { id: v1(), title: action.title, isDone: false };
      stateCopy[action.todolistId] = [newTask, ...tasks];
      return stateCopy;
    }
    case 'REMOVE-TASK': {
      const stateCopy = { ...state };
      const tasks = stateCopy[action.todolistId];
      const filteredTasks = tasks.filter((t) => t.id !== action.taskId);
      stateCopy[action.todolistId] = filteredTasks;
      return stateCopy;
    }
    case 'CHANGE-TASK-STATUS': {
      const stateCopy = { ...state };
      const tasks = stateCopy[action.todolistId];
      const task = tasks.find((t) => t.id === action.taskId);
      if (task) {
        task.isDone = action.isDone;
      }
      return stateCopy;
    }
    case 'CHANGE-TASK-TITLE': {
      const stateCopy = { ...state };
      const tasks = stateCopy[action.todolistId];
      const task = tasks.find((t) => t.id === action.taskId);
      if (task) {
        task.title = action.title;
      }
      return stateCopy;
    }
    case 'ADD-TODOLIST': {
      const stateCopy = { ...state };
      stateCopy[action.todolistId] = [];
      return stateCopy;
    }
    case 'REMOVE-TODOLIST': {
      const stateCopy = { ...state };
      delete stateCopy[action.id];
      return stateCopy;
    }
    default:
      throw new Error("I don't understand this action type");
  }
};

// Action creators:
export const removeTaskAC = (
  todolistId: string,
  taskId: string
): RemoveTaskActionType => {
  return { type: 'REMOVE-TASK', todolistId, taskId };
};

export const addTaskAC = (todolistId: string, title: string): AddTaskActionType => {
  return { type: 'ADD-TASK', todolistId, title };
};

export const changeTaskTitleAC = (
  todolistId: string,
  taskId: string,
  title: string
): ChangeTaskTitleActionType => {
  return { type: 'CHANGE-TASK-TITLE', todolistId, taskId, title };
};

export const changeTaskStatusAC = (
  todolistId: string,
  taskId: string,
  isDone: boolean
): ChangeTaskStatusActionType => {
  return { type: 'CHANGE-TASK-STATUS', todolistId, taskId, isDone };
};
