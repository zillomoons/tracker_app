import { Link } from 'react-router-dom';
import { RxExit } from 'react-icons/rx';
import { FaRegUserCircle } from 'react-icons/fa';

export function Header() {
  const signOut = () => console.log('sign out');
  const userAvatar = '';
  return (
    <header>
      <div className='wrapper'>
        <h3 className='hand-script'>
          <Link to='/'>Habit Tracker</Link>
        </h3>
        <div className='flex'>
          <Link to='/settings'>
            {userAvatar ? (
              <img src={userAvatar} alt='grogu' className='user-image' />
            ) : (
              <FaRegUserCircle />
            )}
          </Link>
          <RxExit onClick={signOut} />
        </div>
      </div>
    </header>
  );
}
