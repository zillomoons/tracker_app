import { ChangeEvent, FormEvent, useState } from 'react';
import { supabase } from '../../config/supabaseClient';
import { createPortal } from 'react-dom';
import { Modal } from '../../components/Modal';

export const SignUp = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [showModal, setShowModal] = useState(false);

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
    try {
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            userName: formData.username,
          },
        },
      });
      if (error) {
        console.log(error);
      } else {
        console.log(data); // {user: {...}, session: null}
        setShowModal(true);
        setFormData({ username: '', password: '', email: '' });
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      {showModal &&
        createPortal(
          <Modal isOpened={showModal} onClose={() => setShowModal(false)}>
            Check your email for verification link. You may close this tab.
          </Modal>,
          document.getElementById('modal')!
        )}

      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit} className='grid auth-form'>
        <label htmlFor='username'>Username</label>
        <input
          type='text'
          id='username'
          name='username'
          required
          value={formData.username}
          onChange={handleChange}
        />
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
          required
          value={formData.password}
          onChange={handleChange}
        />
        <button type='submit'>Submit</button>
      </form>
    </>
  );
};
