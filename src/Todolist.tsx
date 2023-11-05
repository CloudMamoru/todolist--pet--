import { FilterValuesType } from './App';

export type TaskType = {
  id: number;
  title: string;
  isDone: boolean;
};

type PropsType = {
  title: string;
  removeTask: (id: number) => void;
  tasks: Array<TaskType>;
  changeFilter: (value: FilterValuesType) => void;
};

export function Todolist(props: PropsType) {
  return (
    <div>
      <h3>{props.title}</h3>
      <div>
        <input type='text' />
        <button>+</button>
      </div>
      <ul>
        {props.tasks.map((t, id) => (
          <li key={id}>
            <input type='checkbox' checked={t.isDone} />
            <span>{t.title}</span>
            <button
              onClick={() => {
                props.removeTask(t.id);
              }}
            >
              x
            </button>
          </li>
        ))}
      </ul>
      <div>
        <button onClick={() => props.changeFilter('all')}>All</button>
        <button onClick={() => props.changeFilter('active')}>Active</button>
        <button onClick={() => props.changeFilter('completed')}>Completed</button>
      </div>
    </div>
  );
}
