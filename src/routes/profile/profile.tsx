import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';
import { selectAuth } from '../../features/auth/authSlice';
import { useEffect } from 'react';

export const Profile = () => {
  // const { username, email } = useAppSelector(selectUser);
  const { session } = useAppSelector(selectAuth);
  const navigate = useNavigate();
  useEffect(() => {
    if (!session) {
      navigate('/auth/login');
    }
  }, [session, navigate]);
  return (
    <>
      <h2>Profile</h2>
      <div>
        <label>Photo</label>
        <input type='file' />
      </div>
      <div>
        <label>Name</label>
        <span>{session?.user.user_metadata.userName}</span>
        <button>Edit</button>
      </div>
      <div>
        <label>Email</label>
        <span>{session?.user.email}</span>
        <button>Edit</button>
      </div>

      <button>Delete account</button>
    </>
  );
};
