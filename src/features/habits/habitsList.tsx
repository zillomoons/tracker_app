import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Link } from 'react-router-dom';
import { deleteHabit, fetchHabits } from './habitsSlice';

export const HabitsList = React.memo(() => {
  const habits = useAppSelector((state) => state.habits);
  const dispatch = useAppDispatch();
  const [orderBy, setOrderBy] = useState('created_at');

  useEffect(() => {
    dispatch(fetchHabits(orderBy));
  }, [orderBy, dispatch]);

  const handleDelete = (id: number) => {
    dispatch(deleteHabit(id));
  };
  return (
    <>
      <div>
        <p>Order by:</p>
        <button onClick={() => setOrderBy('created_at')}>Time created</button>
        <button onClick={() => setOrderBy('title')}>Title</button>
        <p>{orderBy}</p>
      </div>
      <div>
        {habits.map((habit) => (
          <div key={habit.id} className='habitItem'>
            <div>{habit.title}</div>
            <Link to={'/habits/' + habit.id.toString()}>Edit</Link>
            <button onClick={() => handleDelete(habit.id)}>Delete</button>
          </div>
        ))}
      </div>
    </>
  );
});
