import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header>
      <Link to='/'>Habit Tracker</Link>
      <Link to='/settings'>Settings</Link>
    </header>
  );
};

export default Header;
