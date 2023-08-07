import { Link } from 'react-router-dom';
import { RxExit } from 'react-icons/rx';
import { FaRegUserCircle } from 'react-icons/fa';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectAuth, signOut } from '../../features/auth/authSlice';

export function Header() {
  const dispatch = useAppDispatch();
  const onSignOut = () => {
    void dispatch(signOut());
  };
  const { session } = useAppSelector(selectAuth);
  const userAvatar = '';
  return (
    <header>
      <div className='wrapper'>
        <h3 className='hand-script'>
          <Link to='/'>Habit Tracker</Link>
        </h3>

        {session && (
          <div className='flex'>
            <Link to='/profile'>
              {userAvatar ? (
                <img src={userAvatar} alt='grogu' className='user-image' />
              ) : (
                <FaRegUserCircle />
              )}
            </Link>
            <RxExit onClick={onSignOut} />
          </div>
        )}
      </div>
    </header>
  );
}
