import { ChangeEvent } from 'react';
import { FilterValuesType, TaskType } from './App';
import AddItemForm from './AddItemForm';
import EditableSpan from './EditableSpan';
import { Button, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import Checkbox from '@mui/material/Checkbox';

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
        <IconButton onClick={removeTodolist}>
          <DeleteIcon />
        </IconButton>
      </h3>
      <AddItemForm addItem={addTask} />
      <div>
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
            <div key={t.id} className={t.isDone ? 'is-done' : ''}>
              <Checkbox
                checked={t.isDone}
                onChange={onChangeStatusHandler}
                inputProps={{ 'aria-label': 'controlled' }}
              />
              <EditableSpan title={t.title} onChange={onChangeTitleHandler} />
              <IconButton onClick={onClickHandler}>
                <DeleteIcon />
              </IconButton>
            </div>
          );
        })}
      </div>
      <div>
        <Button
          color='primary'
          variant={props.filter === 'all' ? 'contained' : 'text'}
          onClick={onAllClickHandler}
        >
          All
        </Button>
        <Button
          color='success'
          variant={props.filter === 'active' ? 'contained' : 'text'}
          onClick={onActiveClickHandler}
        >
          Active
        </Button>
        <Button
          color='error'
          variant={props.filter === 'completed' ? 'contained' : 'text'}
          onClick={onCompletedClickHandler}
        >
          Completed
        </Button>
      </div>
    </div>
  );
}
