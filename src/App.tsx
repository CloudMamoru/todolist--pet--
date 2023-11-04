import './App.css';
import { Todolist, TaskType } from './Todolist';

let task1: Array<TaskType> = [
  { id: 1, title: 'CSS', isDone: true },
  { id: 2, title: 'JS', isDone: true },
  { id: 3, title: 'React', isDone: false },
];

let task2: Array<TaskType> = [
  { id: 1, title: 'Python', isDone: false },
  { id: 2, title: 'Django', isDone: true },
  { id: 3, title: 'DRF', isDone: true },
];

function App() {
  return (
    <div className='App'>
      <Todolist title='Music' tasks={task1} />
      <Todolist title='Rock' tasks={task2} />
    </div>
  );
}

export default App;
