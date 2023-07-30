import React from 'react';
import { IoMdArrowDropdown } from 'react-icons/io';
import { Link } from 'react-router-dom';

export const DropDown = React.memo(
  ({
    toggleDropDown,
    showDropDown,
  }: {
    showDropDown: boolean;
    toggleDropDown: () => void;
  }) => {
    return (
      <div className='dropdown-container'>
        <IoMdArrowDropdown onClick={toggleDropDown} />
        {showDropDown && (
          <ul className='dropdown-menu'>
            <li onClick={toggleDropDown}>
              <Link to='/settings'>Settings</Link>
            </li>
            <li onClick={toggleDropDown}>SignOut</li>
          </ul>
        )}
      </div>
    );
  }
);
