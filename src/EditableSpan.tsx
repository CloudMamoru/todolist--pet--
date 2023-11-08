import { ChangeEvent, useState } from 'react';

type PropsType = {
  title: string;
  onChange: (value: string) => void;
};

function EditableSpan(props: PropsType) {
  let [editMode, setEditMode] = useState<boolean>(false);
  let [title, setTitle] = useState('');

  const activateEditMode = () => {
    setEditMode(true);
    setTitle(props.title);
  };
  const activateViewMode = () => {
    setEditMode(false);
    props.onChange(title);
  };
  const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
  };

  return editMode ? (
    <input
      onBlur={activateViewMode}
      value={title}
      onChange={onChangeTitleHandler}
      autoFocus
    />
  ) : (
    <span onDoubleClick={activateEditMode}>{props.title}</span>
  );
}

export default EditableSpan;
