import { FormEvent, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { updateHabit } from '../../features/habits/habitsSlice';

export function EditHabitForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const habit = useAppSelector((state) =>
    state.habits.habits.find((habit) => habit.id === Number(id))
  );
  const dispatch = useAppDispatch();

  const [title, setTitle] = useState('');
  const [formError, setFormError] = useState('');

  useEffect(() => {
    if (!habit) {
      navigate('/', { replace: true });
    } else {
      setTitle(habit.title);
    }
  }, [navigate, habit]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!title) {
      setFormError('Please fill in title');
      return;
    }
    void dispatch(updateHabit({ id: Number(id), title }));
    navigate('/', { replace: true });
  };

  return (
    <div>
      <h1>Edit habit</h1>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input type='submit' />
      </form>
      {formError && <p>{formError}</p>}
    </div>
  );
}
