import { v1 } from 'uuid';
import { TasksStateType } from '../App';
import {
  addTaskAC,
  changeTaskStatusAC,
  changeTaskTitleAC,
  removeTaskAC,
  tasksReducer,
} from './tasks-reducer';
import { addTodolistAC, removeTodolistAC } from './todolists-reducer';

test('correct task should be deleted from correct array', () => {
  let startState: TasksStateType = {
    todolistId1: [
      { id: '1', title: 'CSS', isDone: true },
      { id: '2', title: 'JS', isDone: true },
      { id: '3', title: 'React', isDone: false },
    ],
    todolistId2: [
      { id: '1', title: 'Milk', isDone: true },
      { id: '2', title: 'Eggs', isDone: false },
      { id: '3', title: 'Nuts', isDone: false },
    ],
  };

  const action = removeTaskAC('todolistId2', '2');

  const endState = tasksReducer(startState, action);

  expect(endState['todolistId1'].length).toBe(3);
  expect(endState['todolistId2'].length).toBe(2);
  expect(endState['todolistId2'].every((t) => t.id != '2')).toBeTruthy();
});

test('correct task should be added to correct array', () => {
  let startState: TasksStateType = {
    todolistId1: [
      { id: '1', title: 'CSS', isDone: true },
      { id: '2', title: 'JS', isDone: true },
      { id: '3', title: 'React', isDone: false },
    ],
    todolistId2: [
      { id: '1', title: 'Milk', isDone: true },
      { id: '2', title: 'Eggs', isDone: false },
      { id: '3', title: 'Nuts', isDone: false },
    ],
  };

  const action = addTaskAC('todolistId2', 'juce');

  const endState = tasksReducer(startState, action);

  expect(endState['todolistId1'].length).toBe(3);
  expect(endState['todolistId2'].length).toBe(4);
  expect(endState['todolistId2'][0].id).toBeDefined(); // Была определена
  expect(endState['todolistId2'][0].title).toBe('juce');
  expect(endState['todolistId2'][0].isDone).toBe(false);
});

test('status of specified task should be changed', () => {
  let startState: TasksStateType = {
    todolistId1: [
      { id: '1', title: 'CSS', isDone: true },
      { id: '2', title: 'JS', isDone: false },
      { id: '3', title: 'React', isDone: false },
    ],
    todolistId2: [
      { id: '1', title: 'Milk', isDone: true },
      { id: '2', title: 'Eggs', isDone: false },
      { id: '3', title: 'Nuts', isDone: false },
    ],
  };

  const action = changeTaskStatusAC('todolistId2', '2', true);

  const endState = tasksReducer(startState, action);

  expect(endState['todolistId2'][1].isDone).toBeTruthy();
  expect(endState['todolistId1'][1].isDone).toBeFalsy();
});

test('title of specified task should be changed', () => {
  let startState: TasksStateType = {
    todolistId1: [
      { id: '1', title: 'CSS', isDone: true },
      { id: '2', title: 'JS', isDone: false },
      { id: '3', title: 'React', isDone: false },
    ],
    todolistId2: [
      { id: '1', title: 'Milk', isDone: true },
      { id: '2', title: 'Eggs', isDone: false },
      { id: '3', title: 'Nuts', isDone: false },
    ],
  };

  const action = changeTaskTitleAC('todolistId2', '2', 'MilkyWay');

  const endState = tasksReducer(startState, action);

  expect(endState['todolistId2'][1].title).toBe('MilkyWay');
  expect(endState['todolistId1'][1].title).toBe('JS');
});

test('new property with new array should be added when new todolist is added', () => {
  let startState: TasksStateType = {
    todolistId1: [
      { id: '1', title: 'CSS', isDone: true },
      { id: '2', title: 'JS', isDone: false },
      { id: '3', title: 'React', isDone: false },
    ],
    todolistId2: [
      { id: '1', title: 'Milk', isDone: true },
      { id: '2', title: 'Eggs', isDone: false },
      { id: '3', title: 'Nuts', isDone: false },
    ],
  };

  const action = addTodolistAC('new todolist');

  const endState = tasksReducer(startState, action);

  const keys = Object.keys(endState);
  const newKey = keys.find((k) => k !== 'todolistId1' && k !== 'todolistId2');
  if (!newKey) {
    throw Error('new key should be added');
  }

  expect(keys.length).toBe(3);
  expect(endState[newKey]).toStrictEqual([]);
});

test('property with todolistId should be deleted', () => {
  let startState: TasksStateType = {
    todolistId1: [
      { id: '1', title: 'CSS', isDone: true },
      { id: '2', title: 'JS', isDone: false },
      { id: '3', title: 'React', isDone: false },
    ],
    todolistId2: [
      { id: '1', title: 'Milk', isDone: true },
      { id: '2', title: 'Eggs', isDone: false },
      { id: '3', title: 'Nuts', isDone: false },
    ],
  };

  const action = removeTodolistAC('todolistId2');
  const endState = tasksReducer(startState, action);

  const keys = Object.keys(endState);

  expect(keys.length).toBe(1);
  expect(endState['todolistId2']).toBeUndefined();
});
