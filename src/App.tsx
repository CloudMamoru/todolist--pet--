import { useState } from 'react';
import './App.css';
import { TaskType, Todolist } from './Todolist';
import { v1 } from 'uuid';

export type FilterValuesType = 'all' | 'completed' | 'active';

function App() {
  let [tasks, setTasks] = useState<Array<TaskType>>([
    { id: v1(), title: 'CSS', isDone: true },
    { id: v1(), title: 'JS', isDone: true },
    { id: v1(), title: 'React', isDone: false },
    { id: v1(), title: 'Redux', isDone: false },
  ]);
  let [filter, setFilter] = useState<FilterValuesType>('all');

  function removeTask(id: number) {
    let filteredTasks = tasks.filter((el) => el.id !== id);
    setTasks(filteredTasks);
  }

  function changeFilter(value: FilterValuesType) {
    setFilter(value);
  }

  let tasksForTodoList = tasks;
  if (filter === 'completed') {
    tasksForTodoList = tasks.filter((t) => t.isDone === true);
  } else if (filter === 'active') {
    tasksForTodoList = tasks.filter((t) => t.isDone === false);
  }

  return (
    <div className='App'>
      <Todolist
        title='Music'
        changeFilter={changeFilter}
        removeTask={removeTask}
        tasks={tasksForTodoList}
      />
    </div>
  );
}

export default App;
