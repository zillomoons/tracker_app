import { useAppSelector } from '../../app/hooks';
import { selectUser } from './profileSlice';
import s from './profile.module.css';

export const Profile = () => {
  const { username, email } = useAppSelector(selectUser);
  return (
    <>
      <h2>Profile</h2>
      <div className={s.profileField}>
        <label>Photo</label>
        <input type='file' />
      </div>
      <div className={s.profileField}>
        <label>Name</label>
        <span>{username}</span>
        <button>Edit</button>
      </div>
      <div className={s.profileField}>
        <label>Email</label>
        <span>{email}</span>
        <button>Edit</button>
      </div>

      <button>Delete account</button>
    </>
  );
};
