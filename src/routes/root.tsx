import { Outlet } from 'react-router-dom';
import { Header } from '../components/myHeader';

export default function Root() {
  return (
    <>
      <Header />
      <div className='wrapper'>
        <Outlet />
      </div>
    </>
  );
}
