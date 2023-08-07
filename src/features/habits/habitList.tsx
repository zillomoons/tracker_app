import { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  fetchHabits,
  selectAllHabits,
  selectHabitError,
  selectHabitStatus,
} from './habitsSlice';
import { WEEKDAYS, currDateString } from '../../lib/calendar';
import { HabitRow } from './habitRow';
import { fetchCheckins } from '../checkins/checkinsSlice';

export const HabitList = () => {
  const habits = useAppSelector(selectAllHabits);
  const habitStatus = useAppSelector(selectHabitStatus);
  const error = useAppSelector(selectHabitError);
  const dispatch = useAppDispatch();
  const [orderBy] = useState('created_at');

  useEffect(() => {
    if (habitStatus === 'idle') {
      void dispatch(fetchHabits(orderBy));
    }
    if (habitStatus === 'succeeded') {
      void dispatch(fetchCheckins());
    }
  }, [orderBy, dispatch, habitStatus]);

  const renderWeekdays = WEEKDAYS.map((day) => {
    const today = currDateString.slice(0, 3) === day;
    const spanStyle = today ? 'current-day' : '';
    return (
      <span key={day} className={spanStyle}>
        {day}
      </span>
    );
  });
  if (habitStatus === 'loading') {
    return <div>Loading...</div>;
  }
  if (habitStatus === 'failed') {
    return <div>{error}</div>;
  }
  return (
    <>
      <div className='habit-grid-row list-heading'>
        <div className='habit-grid-head'></div>
        <div className='habit-grid-main grid grid-col-7'>{renderWeekdays}</div>
        <div className='habit-grid-end'></div>
      </div>
      {habits.map((habit) => (
        <HabitRow key={habit.id} habit={habit} />
      ))}
    </>
  );
};
