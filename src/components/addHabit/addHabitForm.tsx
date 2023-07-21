import { ChangeEvent, FormEvent, useState } from 'react';
import { useAppDispatch } from '../../app/hooks';
import { createHabit } from '../../features/habits/habitsSlice';
import { useNavigate } from 'react-router-dom';

export function AddHabitForm() {
  const [title, setTitle] = useState('');
  const [formError, setFormError] = useState('');
  const [frequency, setFrequency] = useState<number[]>([]);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!title || !frequency.length) {
      setFormError('Please fill in title and weekly frequency');
      return;
    }
    dispatch(createHabit(title, frequency));
    setTitle('');
    navigate('/');
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setFrequency((prevState) => prevState.concat(+e.target.value));
    } else {
      setFrequency((prevState) =>
        prevState.filter((val) => val !== +e.target.value)
      );
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor='habitTitle'>Title: </label>
      <input
        type='text'
        id='habitTitle'
        name='habitTitle'
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <div className='frequency'>
        <label htmlFor='freq-mon'>
          <input
            id='freq-mon'
            type='checkbox'
            value={0}
            onChange={handleChange}
          />
          Mon
        </label>
        <label htmlFor='freq-tue'>
          <input
            id='freq-tue'
            type='checkbox'
            value={1}
            onChange={handleChange}
          />
          Tue
        </label>
        <label htmlFor='freq-wed'>
          <input
            id='freq-wed'
            type='checkbox'
            value={2}
            onChange={handleChange}
          />
          Wed
        </label>
        <label htmlFor='freq-thu'>
          <input
            id='freq-thu'
            type='checkbox'
            value={3}
            onChange={handleChange}
          />
          Thu
        </label>
        <label htmlFor='freq-fri'>
          <input
            id='freq-fri'
            type='checkbox'
            value={4}
            onChange={handleChange}
          />
          Fri
        </label>
        <label htmlFor='freq-sat'>
          <input
            id='freq-sat'
            type='checkbox'
            value={5}
            onChange={handleChange}
          />
          Sat
        </label>
        <label htmlFor='freq-sun'>
          <input
            id='freq-sun'
            type='checkbox'
            value={6}
            onChange={handleChange}
          />
          Sun
        </label>
      </div>
      <button type='submit'>Save</button>
      {formError && <p>{formError}</p>}
    </form>
  );
}
