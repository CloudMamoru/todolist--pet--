import { useState } from 'react';
import './App.css';
import { TaskType, Todolist } from './Todolist';
import { v1 } from 'uuid';

export type FilterValuesType = 'all' | 'completed' | 'active';

type TodolistType = {
  id: string;
  title: string;
  filter: FilterValuesType;
};

function App() {
  // Redux:
  let todolistId1 = v1();
  let todolistId2 = v1();

  // ALl todolists:
  let [todolists, setTodolists] = useState<Array<TodolistType>>([
    { id: todolistId1, title: 'What to learn', filter: 'all' },
    { id: todolistId2, title: 'What to buy', filter: 'all' },
  ]);

  // Object tasks:
  let [tasksObj, setTasksObj] = useState({
    [todolistId1]: [
      { id: v1(), title: 'CSS', isDone: true },
      { id: v1(), title: 'JS', isDone: true },
      { id: v1(), title: 'React', isDone: false },
      { id: v1(), title: 'Redux', isDone: false },
    ],
    [todolistId2]: [
      { id: v1(), title: 'Milk', isDone: true },
      { id: v1(), title: 'Eggs', isDone: false },
      { id: v1(), title: 'Nuts', isDone: false },
      { id: v1(), title: 'Meat', isDone: false },
    ],
  });

  // Dispatch:
  // Add
  function addTask(todolistId: string, title: string) {
    let task = { id: v1(), title: title, isDone: false };
    let tasks = tasksObj[todolistId];
    tasksObj[todolistId] = [task, ...tasks];
    setTasksObj({ ...tasksObj });
  }

  // Remove
  function removeTask(todolistId: string, id: string) {
    let tasks = tasksObj[todolistId];
    let filteredTasks = tasks.filter((t) => t.id !== id);
    tasksObj[todolistId] = filteredTasks;
    setTasksObj({ ...tasksObj });
  }

  // Change status
  function changeTaskStatus(todolistId: string, id: string, isDone: boolean) {
    let tasks = tasksObj[todolistId];

    let task = tasks.find((t) => t.id === id);
    if (task) {
      task.isDone = isDone;
      setTasksObj({ ...tasksObj });
    }
  }

  // Filter
  function changeFilter(todolistId: string, value: FilterValuesType) {
    let todolist = todolists.find((tl) => tl.id === todolistId);
    if (todolist) todolist.filter = value;
    setTodolists([...todolists]);
  }

  // Lists delete
  let removeTodolist = (todolistId: string) => {
    let filteredTodolist = todolists.filter((tl) => tl.id !== todolistId);
    setTodolists(filteredTodolist);
    delete tasksObj[todolistId];
    setTasksObj({ ...tasksObj });
  };

  return (
    <div className='App'>
      {todolists.map((tl) => {
        let tasksForTodoList = tasksObj[tl.id];
        if (tl.filter === 'completed') {
          tasksForTodoList = tasksForTodoList.filter((t) => t.isDone === true);
        } else if (tl.filter === 'active') {
          tasksForTodoList = tasksForTodoList.filter((t) => t.isDone === false);
        }

        return (
          <Todolist
            key={tl.id}
            id={tl.id}
            title={tl.title}
            changeFilter={changeFilter}
            removeTask={removeTask}
            tasks={tasksForTodoList}
            addTask={addTask}
            changeTaskStatus={changeTaskStatus}
            removeTodolist={removeTodolist}
            filter={tl.filter}
          />
        );
      })}
    </div>
  );
}

export default App;
