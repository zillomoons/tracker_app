import { FormEvent, useState } from 'react';
import { recoverPass } from '../../features/auth/authSlice';
import { useAppDispatch } from '../../app/hooks';

export const RecoverPass = () => {
  const [message, setMessage] = useState('');

  const dispatch = useAppDispatch();
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = new FormData(e.currentTarget).get('email') as string;
    console.log(email);
    await dispatch(recoverPass(email));
    setMessage(
      'Link to reset password has been successfully send to your email.'
    );
  };
  return (
    <>
      <h2>Recover your password</h2>
      <p>You will receive an email to recover your password.</p>
      <form onSubmit={handleSubmit} className='grid'>
        <input type='email' required name='email' />
        <button type='submit'>Send</button>
      </form>
      <p>{message}</p>
    </>
  );
};
