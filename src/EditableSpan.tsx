import { TextField } from '@mui/material';
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
    <TextField
      onBlur={activateViewMode}
      value={title}
      onChange={onChangeTitleHandler}
      variant='standard'
      autoFocus
    />
  ) : (
    <span onDoubleClick={activateEditMode}>{props.title}</span>
  );
}

export default EditableSpan;
