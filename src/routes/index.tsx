import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  fetchHabits,
  selectAllHabits,
  selectHabitError,
  selectHabitStatus,
} from '../features/habits/habitsSlice';
import { useState, useEffect } from 'react';
import { fetchCheckins } from '../features/checkins/checkinsSlice';
import { AddHabitForm } from '../components/AddHabitForm';
import { createPortal } from 'react-dom';
import { FiPlus } from 'react-icons/fi';
import { HabitList } from '../features/habits/habitList';
import { selectUser } from '../features/profile/profileSlice';
import { currenDate, defineTimeOfDay } from '../lib/calendar';

export default function Index() {
  const habits = useAppSelector(selectAllHabits);
  const habitStatus = useAppSelector(selectHabitStatus);
  const user = useAppSelector(selectUser);
  const error = useAppSelector(selectHabitError);
  const dispatch = useAppDispatch();
  const [orderBy] = useState('created_at');
  const [showModal, setShowModal] = useState(false);
  const currentHour = parseInt(currenDate.format('H'));
  const timeOfDay = defineTimeOfDay(currentHour);

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
    content = <HabitList habits={habits} />;
  } else if (habitStatus === 'failed') {
    content = <div>{error}</div>;
  }
  return (
    <>
      {createPortal(
        <AddHabitForm
          isVisible={showModal}
          onClose={() => setShowModal(false)}
        />,
        document.getElementById('modal')!
      )}
      <div className='flex dashboard-heading'>
        <h1>
          Good {timeOfDay}, {user.username}
        </h1>
        <button className='primary-btn flex' onClick={() => setShowModal(true)}>
          <FiPlus /> Add Habit
        </button>
      </div>

      {content}
    </>
  );
}
