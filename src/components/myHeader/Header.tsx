import { Link } from 'react-router-dom';
import { DropDown } from '../dropdown/DropDown';
import { useState } from 'react';
import { PiUserCircleLight } from 'react-icons/pi';

export function Header() {
  const [showDropDown, setShowDropDown] = useState(false);
  const toggleDropDown = () => setShowDropDown(!showDropDown);
  return (
    <header>
      <div className='wrapper'>
        <Link to='/'>Habit Tracker</Link>
        <div className='flex flex-row'>
          <PiUserCircleLight />
          <DropDown
            showDropDown={showDropDown}
            toggleDropDown={toggleDropDown}
          />
        </div>
      </div>
    </header>
  );
}
