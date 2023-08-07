import { Session } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { supabase } from './config/supabaseClient';
import Root from './routes/root';
import Index from './routes';
import { Profile } from './routes/profile';
import { Login, RecoverPass, ResetPass, SignUp } from './routes/auth';
import { useAppDispatch } from './app/hooks';
import { getSession } from './features/auth/authSlice';

const App = () => {
  const [, setSession] = useState<Session | null>(null);
  const dispatch = useAppDispatch();
  useEffect(() => {
    void dispatch(getSession());
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, [dispatch]);

  return (
    <Routes>
      <Route element={<Root />}>
        <Route path='/' element={<Index />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/auth/login' element={<Login />} />
        <Route path='/auth/signup' element={<SignUp />} />
        <Route path='/auth/recover-pass' element={<RecoverPass />} />
        <Route path='/auth/reset-pass' element={<ResetPass />} />
      </Route>
    </Routes>
  );
};

export default App;
