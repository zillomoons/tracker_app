import { ChangeEvent, FormEvent, useCallback, useState } from 'react';
import { useAppDispatch } from '../../app/hooks';
import { DayOfWeek, createHabit } from '../../features/habits/habitsSlice';
import { useNavigate } from 'react-router-dom';
import { WEEKDAYS } from '../../lib/calendar';
import React from 'react';

export function AddHabitForm() {
  const [title, setTitle] = useState('');
  const [formError, setFormError] = useState('');
  const [frequency, setFrequency] = useState<DayOfWeek[]>([]);
  const [addRequestStatus, setAddRequestStatus] = useState('idle');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const canSave =
    [title, frequency.length].every(Boolean) && addRequestStatus === 'idle';

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (canSave) {
      try {
        setAddRequestStatus('pending');
        await dispatch(createHabit({ title, frequency }));
        setTitle('');
        navigate('/');
      } catch (err) {
        console.error(err);
        setFormError('Failed to add habit.');
      } finally {
        setAddRequestStatus('idle');
      }
    }
  };

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setFrequency((prevState) =>
        prevState.concat(e.target.value as DayOfWeek)
      );
    } else {
      setFrequency((prevState) =>
        prevState.filter((val) => val !== e.target.value)
      );
    }
  }, []);
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
      <HabitFreqField handleChange={handleChange} />
      <button type='submit' disabled={!canSave}>
        Add Habit
      </button>
      {formError && <p>{formError}</p>}
    </form>
  );
}

type HabitFreqProps = {
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

export const HabitFreqField = React.memo(({ handleChange }: HabitFreqProps) => {
  return (
    <fieldset>
      {WEEKDAYS.map((day, i) => (
        <label htmlFor={day} key={i}>
          <input id={day} type='checkbox' value={day} onChange={handleChange} />
          {day}
        </label>
      ))}
    </fieldset>
  );
});
