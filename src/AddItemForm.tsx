import { ChangeEvent, useState, KeyboardEvent } from 'react';

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
      <input
        type='text'
        value={title}
        onChange={onNewTitleChangeHandler}
        onKeyDown={onKeyPressHandler}
        className={error ? 'error' : ''}
      />
      <button onClick={addItem}>+</button>
      {error && <div className='error-message'>Field is required </div>}
    </div>
  );
}

export default AddItemForm;
