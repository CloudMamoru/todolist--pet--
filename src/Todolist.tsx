import { ChangeEvent, useState, KeyboardEvent } from 'react';
import { FilterValuesType } from './App';

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

type PropsType = {
  id: string;
  title: string;
  tasks: Array<TaskType>;
  filter: FilterValuesType;
  removeTask: (todolistId: string, id: string) => void;
  addTask: (todolistId: string, title: string) => void;
  changeFilter: (todolistId: string, value: FilterValuesType) => void;
  changeTaskStatus: (todolistId: string, id: string, isDone: boolean) => void;
  removeTodolist: (todolistId: string) => void;
};

export function Todolist(props: PropsType) {
  const [title, setTitle] = useState('');
  const [error, setError] = useState<string | null>(null);

  const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
  };
  const addTask = () => {
    if (title.trim() !== '') {
      props.addTask(props.id, title);
      setTitle('');
    } else {
      setError('Title is required');
    }
  };
  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    setError(null);
    if (e.key === 'Enter') {
      addTask();
    }
  };
  const onAllClickHandler = () => props.changeFilter(props.id, 'all');
  const onActiveClickHandler = () => props.changeFilter(props.id, 'active');
  const onCompletedClickHandler = () => props.changeFilter(props.id, 'completed');
  const removeTodolist = () => props.removeTodolist(props.id);

  return (
    <div>
      <h3>
        {props.title} <button onClick={removeTodolist}>x </button>
      </h3>
      <div>
        <input
          type='text'
          value={title}
          onChange={onNewTitleChangeHandler}
          onKeyDown={onKeyPressHandler}
          className={error ? 'error' : ''}
        />
        <button onClick={addTask}>+</button>
        {error && <div className='error-message'>Field is required </div>}
      </div>
      <ul>
        {props.tasks.map((t) => {
          const onClickHandler = () => {
            props.removeTask(props.id, t.id);
          };
          const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
            props.changeTaskStatus(props.id, t.id, e.currentTarget.checked);
          };

          return (
            <li key={t.id} className={t.isDone ? 'is-done' : ''}>
              <input type='checkbox' checked={t.isDone} onChange={onChangeHandler} />
              <span>{t.title}</span>
              <button onClick={onClickHandler}>x</button>
            </li>
          );
        })}
      </ul>
      <div>
        <button
          className={props.filter === 'all' ? 'active-filter' : ''}
          onClick={onAllClickHandler}
        >
          All
        </button>
        <button
          className={props.filter === 'active' ? 'active-filter' : ''}
          onClick={onActiveClickHandler}
        >
          Active
        </button>
        <button
          className={props.filter === 'completed' ? 'active-filter' : ''}
          onClick={onCompletedClickHandler}
        >
          Completed
        </button>
      </div>
    </div>
  );
}
