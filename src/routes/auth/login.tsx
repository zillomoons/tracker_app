import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  login,
  selectAuth,
  selectAuthError,
  selectAuthStatus,
} from '../../features/auth/authSlice';

export const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const dispatch = useAppDispatch();
  const authStatus = useAppSelector(selectAuthStatus);
  const authError = useAppSelector(selectAuthError);
  const navigate = useNavigate();
  const { session } = useAppSelector(selectAuth);

  useEffect(() => {
    if (session) {
      navigate('/');
    }
  }, [session, navigate]);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setFormData((prevData) => {
      return {
        ...prevData,
        [e.target.name]: e.target.value,
      };
    });
  }
  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    await dispatch(
      login({ email: formData.email, password: formData.password })
    );
    setFormData({ password: '', email: '' });
    navigate('/');
  }
  return (
    <>
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className='grid auth-form'>
        <label htmlFor='email'>Email</label>
        <input
          type='email'
          id='email'
          name='email'
          required
          value={formData.email}
          onChange={handleChange}
        />
        <label htmlFor='password'>Password</label>
        <input
          type='password'
          id='password'
          name='password'
          value={formData.password}
          required
          onChange={handleChange}
        />
        <button type='submit'>Submit</button>
      </form>
      <p>
        Don't have account yet? <Link to='/auth/signup'>Sign Up</Link>
      </p>
      <p>
        Have forgotten password?{' '}
        <Link to='/auth/recover-pass'>Recover password.</Link>
      </p>

      {authStatus === 'loading' && <p>Loading...</p>}
      {authError && <p>{authError}</p>}
    </>
  );
};
