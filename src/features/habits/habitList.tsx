import { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  fetchHabits,
  selectAllHabits,
  selectHabitError,
  selectHabitStatus,
} from './habitsSlice';
import { WEEKDAYS, currDateString, currentDate } from '../../lib/calendar';
import { HabitRow } from './habitRow';
import { fetchCheckins } from '../checkins/checkinsSlice';
import { ArrowButtons } from '../../components/shared/ArrowButtons';

export const HabitList = () => {
  const habits = useAppSelector(selectAllHabits);
  const habitStatus = useAppSelector(selectHabitStatus);
  const error = useAppSelector(selectHabitError);
  const dispatch = useAppDispatch();
  const [orderBy] = useState('created_at');
  const [selectDate, setSelectDate] = useState(currentDate);
  const step = 7;
  const goPrev = () => setSelectDate(selectDate.day(selectDate.day() - step));
  const goNext = () => setSelectDate(selectDate.day(selectDate.day() + step));

  useEffect(() => {
    if (habitStatus === 'idle') {
      void dispatch(fetchHabits(orderBy));
    }
    if (habitStatus === 'succeeded') {
      void dispatch(fetchCheckins());
    }
  }, [orderBy, dispatch, habitStatus]);

  const renderWeekdays = WEEKDAYS.map((day) => <span key={day}>{day}</span>);
  if (habitStatus === 'loading') {
    return <div>Loading...</div>;
  }
  if (habitStatus === 'failed') {
    return <div>{error}</div>;
  }
  return (
    <>
      <div className='flex'>
        <ArrowButtons
          goPrev={goPrev}
          goNext={goNext}
          isNextDisabled={selectDate.toDate().toDateString() === currDateString}
        />
        <span>
          {selectDate.startOf('w').format('ddd, MMM D')}
          {' - '}
          {selectDate.endOf('w').format('ddd, MMM D')}
        </span>
      </div>
      <div className='habit-grid-row list-heading'>
        <div className='habit-grid-head'></div>
        <div className='habit-grid-main grid grid-col-7'>{renderWeekdays}</div>
      </div>
      {habits.map((habit) => (
        <HabitRow key={habit.id} habit={habit} selectDate={selectDate} />
      ))}
    </>
  );
};
