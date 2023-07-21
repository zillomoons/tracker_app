import { Link } from 'react-router-dom';
import { HabitsList } from '../features/habits';

export default function Index() {
  console.log('index render');
  return (
    <>
      <h1>Habits</h1>
      <button className='addHabit'>
        <Link to='/add-habit'>Add Habit</Link>
      </button>
      <HabitsList />
    </>
  );
}
