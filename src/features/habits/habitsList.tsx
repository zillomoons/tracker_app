import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchHabits, selectAllHabits } from './habitsSlice';
import { fetchCheckins } from '../checkins/checkinsSlice';
import { Table } from '../../components/Table';

export const HabitsList = React.memo(() => {
  const habits = useAppSelector(selectAllHabits);
  const habitStatus = useAppSelector((state) => state.habits.status);
  const error = useAppSelector((state) => state.habits.error);
  const dispatch = useAppDispatch();
  const [orderBy, setOrderBy] = useState('created_at');

  useEffect(() => {
    if (habitStatus === 'idle') {
      void dispatch(fetchHabits(orderBy));
    }
    if (habitStatus === 'succeeded') {
      void dispatch(fetchCheckins());
    }
  }, [orderBy, dispatch, habitStatus]);

  let content;

  if (habitStatus === 'loading') {
    content = <div>Loading...</div>;
  } else if (habitStatus === 'succeeded') {
    content = <Table title='Week Progress' habits={habits} />;
  } else if (habitStatus === 'failed') {
    content = <div>{error}</div>;
  }

  return (
    <>
      <div>
        {/* <p>Order by:</p>
        <button onClick={() => setOrderBy('created_at')}>Time created</button>
        <button onClick={() => setOrderBy('title')}>Title</button>
        <p>{orderBy}</p> */}
      </div>
      <div>{content}</div>
    </>
  );
});
