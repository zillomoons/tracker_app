import { FormEvent } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { resetPass, selectAuthError } from '../../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';

export const ResetPass = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const authError = useAppSelector(selectAuthError);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    await dispatch(resetPass({ email, password }));
    navigate('/', { replace: true });
  };
  return (
    <>
      <h2>Reset password</h2>
      <p>Update your password.</p>
      <form onSubmit={handleSubmit} className='grid'>
        <input type='email' required name='email' placeholder='Email' />
        <input
          type='password'
          required
          name='password'
          placeholder='Password'
        />
        <button type='submit'>Send</button>
      </form>
      {authError && <p>{authError}</p>}
    </>
  );
};
