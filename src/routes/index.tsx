import { useEffect, useState } from 'react';
import { supabase } from '../config/supabaseClient';

type Habit = {
  id: string;
  userId: string;
  title: string;
  created_at: Date;
};

export default function Index() {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [fetchError, setFetchError] = useState('');
  useEffect(() => {
    const fetchHabits = async () => {
      const { data, error } = await supabase.from('habits').select();
      if (error) {
        setFetchError('Could not fetch habits');
        setHabits([]);
      }
      if (data) {
        setHabits(data);
        setFetchError('');
      }
    };
    void fetchHabits();
  }, []);
  return (
    <>
      <h1>Habits</h1>
      {fetchError && <p>{fetchError}</p>}
      {habits && habits.map((habit) => <div key={habit.id}>{habit.title}</div>)}
    </>
  );
}
