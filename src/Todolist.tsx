import { ChangeEvent } from 'react';
import { FilterValuesType, TaskType } from './App';
import AddItemForm from './AddItemForm';
import EditableSpan from './EditableSpan';

type PropsType = {
  id: string; // Todоlist id
  title: string; // Todоlist title
  filter: FilterValuesType; // Todоlist filter
  tasks: Array<TaskType>; // Array tasks
  removeTodolist: (todolistId: string) => void;
  changeFilter: (todolistId: string, value: FilterValuesType) => void;
  changeTodolistTitle: (todolistId: string, title: string) => void;
  addTask: (todolistId: string, title: string) => void;
  removeTask: (todolistId: string, id: string) => void;
  changeTaskStatus: (todolistId: string, id: string, isDone: boolean) => void;
  changeTaskTitle: (todolistId: string, id: string, title: string) => void;
};

export function Todolist(props: PropsType) {
  const onAllClickHandler = () => props.changeFilter(props.id, 'all');
  const onActiveClickHandler = () => props.changeFilter(props.id, 'active');
  const onCompletedClickHandler = () => props.changeFilter(props.id, 'completed');
  const removeTodolist = () => props.removeTodolist(props.id);
  const addTask = (title: string) => props.addTask(props.id, title);
  const changeTodolistTitle = (title: string) =>
    props.changeTodolistTitle(props.id, title);

  return (
    <div>
      <h3>
        <EditableSpan title={props.title} onChange={changeTodolistTitle} />
        <button onClick={removeTodolist}>x </button>
      </h3>
      <AddItemForm addItem={addTask} />
      <ul>
        {props.tasks.map((t) => {
          const onClickHandler = () => {
            props.removeTask(props.id, t.id);
          };
          const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
            props.changeTaskStatus(props.id, t.id, e.currentTarget.checked);
          };
          const onChangeTitleHandler = (value: string) => {
            props.changeTaskTitle(props.id, t.id, value);
          };

          return (
            <li key={t.id} className={t.isDone ? 'is-done' : ''}>
              <input
                type='checkbox'
                checked={t.isDone}
                onChange={onChangeStatusHandler}
              />
              <EditableSpan title={t.title} onChange={onChangeTitleHandler} />
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
