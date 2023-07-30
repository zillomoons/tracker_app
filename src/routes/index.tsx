import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  fetchHabits,
  selectAllHabits,
  selectHabitError,
  selectHabitStatus,
} from '../features/habits/habitsSlice';
import { useState, useEffect } from 'react';
import { Table } from '../components/Table';
import { fetchCheckins } from '../features/checkins/checkinsSlice';
import { AddHabitForm } from '../components/AddHabitForm';
import { createPortal } from 'react-dom';

export default function Index() {
  const habits = useAppSelector(selectAllHabits);
  const habitStatus = useAppSelector(selectHabitStatus);
  const error = useAppSelector(selectHabitError);
  const dispatch = useAppDispatch();
  const [orderBy, setOrderBy] = useState('created_at');
  const [showModal, setShowModal] = useState(false);

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
      {showModal &&
        createPortal(
          <AddHabitForm
            visible={showModal}
            onClose={() => setShowModal(false)}
          />,
          document.getElementById('modal')!
        )}
      <h1>Habits</h1>
      <button onClick={() => setShowModal(true)}>Add Habit</button>
      {content}
    </>
  );
}
