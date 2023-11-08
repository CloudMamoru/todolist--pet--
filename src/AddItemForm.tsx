import { IconButton, TextField } from '@mui/material';
import { ChangeEvent, useState, KeyboardEvent } from 'react';
import ControlPointIcon from '@mui/icons-material/ControlPoint';

type PropsType = {
  addItem: (title: string) => void;
};

function AddItemForm(props: PropsType) {
  const [title, setTitle] = useState('');
  const [error, setError] = useState<string | null>(null);

  const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
  };

  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    setError(null);
    if (e.key === 'Enter') {
      addItem();
    }
  };

  const addItem = () => {
    if (title.trim() !== '') {
      props.addItem(title.trim());
      setTitle('');
    } else {
      setError('Title is required');
    }
  };

  return (
    <div>
      <TextField
        type='text'
        variant='outlined'
        label='Type value'
        value={title}
        onChange={onNewTitleChangeHandler}
        onKeyDown={onKeyPressHandler}
        className={error ? 'error' : ''}
        error={!!error}
        helperText={error}
      />
      <IconButton color='primary' onClick={addItem}>
        <ControlPointIcon />
      </IconButton>
    </div>
  );
}

export default AddItemForm;
