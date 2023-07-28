import { Link } from 'react-router-dom';

export function Header() {
  return (
    <header>
      <div className='wrapper'>
        <Link to='/'>Habit Tracker</Link>
        <Link to='/settings'>Settings</Link>
      </div>
    </header>
  );
}
