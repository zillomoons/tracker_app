import { useEffect, useRef, useState } from 'react';
import { ProgressView } from './ProgressView';
import { HabitsContainer } from './HabitsContainer';
import { supabase } from '../config/supabaseClient';

export type Habit = {
  id: string;
  userId: string;
  title: string;
  created_at: Date;
};

const Main = () => {
  const progressRef = useRef<HTMLDivElement>(null);
  const habitsRef = useRef<HTMLDivElement>(null);
  const handleClickProgress = () => {
    progressRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  const handleClickHabits = () => {
    habitsRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const [fetchError, setFetchError] = useState('');
  const [habits, setHabits] = useState<Habit[]>([]);

  useEffect(() => {
    const fetchHabits = async () => {
      const { data, error } = await supabase.from('habits').select();
      if (error) {
        setFetchError('Could not fetch habits');
        setHabits([]);
        console.log(error);
      }
      if (data) {
        setHabits(data);
        setFetchError('');
      }
    };
    void fetchHabits();
  }, []);

  return (
    <main className='dashboard'>
      <div className='dashboard__main'>
        {fetchError && <p>{fetchError}</p>}
        <ProgressView ref={progressRef} habits={habits} />
        <HabitsContainer ref={habitsRef} habits={habits} />
      </div>
      <div className='mobile-only dashboardMobileTabBar'>
        <button
          onClick={handleClickHabits}
          type='button'
          className='dashboardMobileTabBar__button'
        >
          Habits
        </button>
        <button
          onClick={handleClickProgress}
          type='button'
          className='dashboardMobileTabBar__button'
        >
          Progress
        </button>
      </div>
    </main>
  );
};

export default Main;
