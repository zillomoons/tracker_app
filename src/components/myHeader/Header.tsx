import { Link } from 'react-router-dom';
import s from './Header.module.css';

export function Header() {
  return (
    <header className={s.header}>
      <Link to='/'>Habit Tracker</Link>
      <Link to='/settings'>Settings</Link>
    </header>
  );
}
