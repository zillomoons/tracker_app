import { useAppSelector } from '../app/hooks';

import { useEffect, useState } from 'react';
import { AddHabitForm } from '../components/AddHabitForm';
import { createPortal } from 'react-dom';
import { FiPlus } from 'react-icons/fi';
import { HabitList } from '../features/habits/habitList';
import { currentDate, defineTimeOfDay } from '../lib/calendar';
import { selectAuth } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';

export default function Index() {
  const { session } = useAppSelector(selectAuth);
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const currentHour = parseInt(currentDate.format('H'));
  const timeOfDay = defineTimeOfDay(currentHour);
  useEffect(() => {
    if (!session) {
      navigate('/auth/login');
    }
  }, [session, navigate]);

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
          Good {timeOfDay}, {session?.user.user_metadata.userName}
        </h1>
        <button className='primary-btn flex' onClick={() => setShowModal(true)}>
          <FiPlus /> Add Habit
        </button>
      </div>
      <HabitList />
    </>
  );
}
