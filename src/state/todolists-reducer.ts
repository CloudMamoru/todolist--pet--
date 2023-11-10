import { v1 } from 'uuid';
import { FilterValuesType, TodolistType } from '../App';

// Action types:
export type RemoveTodolistActionType = {
  type: 'REMOVE-TODOLIST';
  id: string;
};
export type AddTodolistActionType = {
  type: 'ADD-TODOLIST';
  title: string;
  todolistId: string;
};
export type ChangeTodolistTitleActionType = {
  type: 'CHANGE-TODOLIST-TITLE';
  id: string;
  title: string;
};
export type ChangeTodolistFilterActionType = {
  type: 'CHANGE-TODOLIST-FILTER';
  id: string;
  filter: FilterValuesType;
};
type ActionsTypes =
  | RemoveTodolistActionType
  | AddTodolistActionType
  | ChangeTodolistTitleActionType
  | ChangeTodolistFilterActionType;

// Reducer:
export const todolistsReducer = (
  state: Array<TodolistType>,
  action: ActionsTypes
): Array<TodolistType> => {
  switch (action.type) {
    case 'REMOVE-TODOLIST': {
      return state.filter((tl) => tl.id !== action.id);
    }
    case 'ADD-TODOLIST': {
      return [
        ...state,
        {
          id: action.todolistId,
          title: action.title,
          filter: 'all',
        },
      ];
    }
    case 'CHANGE-TODOLIST-TITLE': {
      const todolist = state.find((tl) => tl.id === action.id);
      if (todolist) {
        todolist.title = action.title;
      }
      return [...state];
    }
    case 'CHANGE-TODOLIST-FILTER': {
      const todolist = state.find((tl) => tl.id === action.id);
      if (todolist) {
        todolist.filter = action.filter;
      }
      return [...state];
    }
    default:
      throw new Error("I don't understand this action type");
  }
};

// Action creators:
export const removeTodolistAC = (id: string): RemoveTodolistActionType => {
  return { type: 'REMOVE-TODOLIST', id: id };
};

export const addTodolistAC = (title: string): AddTodolistActionType => {
  return { type: 'ADD-TODOLIST', title: title, todolistId: v1() };
};

export const changeTodolistTitleAC = (
  id: string,
  title: string
): ChangeTodolistTitleActionType => {
  return { type: 'CHANGE-TODOLIST-TITLE', id: id, title: title };
};

export const changeTodolistFilterAC = (
  id: string,
  filter: FilterValuesType
): ChangeTodolistFilterActionType => {
  return { type: 'CHANGE-TODOLIST-FILTER', id: id, filter: filter };
};
