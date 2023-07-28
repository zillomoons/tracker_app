import React from 'react';
import {
  WEEKDAYS,
  generateWeekdays,
  isDateOutOfRange,
  isFutureDate,
} from '../lib/calendar';
import { DayOfWeek, Habit, deleteHabit } from '../features/habits/habitsSlice';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  Checkin,
  createCheckin,
  deleteCheckin,
  selectAllCheckins,
} from '../features/checkins/checkinsSlice';
import cn from '../lib/cn';
import { MdEdit, MdDelete } from 'react-icons/md';

export const Table = ({
  title,
  habits,
}: {
  title: string;
  habits: Habit[];
}) => {
  return (
    <div className='table-container'>
      <table>
        <caption>{title}</caption>
        <thead>
          <tr>
            <th></th>
            {WEEKDAYS.map((day) => (
              <th key={day}>{day}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {habits.map((habit) => (
            <TableRow key={habit.id} habit={habit} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export const TableRow = ({ habit }: { habit: Habit }) => {
  const dispatch = useAppDispatch();
  const allCheckins = useAppSelector(selectAllCheckins);
  const checkinsById = allCheckins.filter((c) => c.habitId === habit.id);
  const weekdays = generateWeekdays();
  const onDelete = () => {
    void dispatch(deleteHabit({ id: habit.id }));
  };
  return (
    <tr>
      <td>
        {habit.title}{' '}
        <i onClick={onDelete}>
          <MdDelete />
        </i>
      </td>
      {weekdays.map(({ date }) => (
        <TableCell
          key={date}
          date={date}
          habit={habit}
          checkins={checkinsById}
        />
      ))}
    </tr>
  );
};

export const TableCell = React.memo(
  ({
    date,
    checkins,
    habit,
  }: {
    date: string;
    habit: Habit;
    checkins: Checkin[];
  }) => {
    const dispatch = useAppDispatch();
    const checkinsDates = checkins.map(({ createdAt }) => createdAt);
    const isChecked = checkinsDates.includes(date);
    const isActive = habit.frequency.includes(date.slice(0, 3) as DayOfWeek);
    const disabled =
      isFutureDate(date) ||
      !isActive ||
      isDateOutOfRange(habit.createdAt, date);

    const onClickHandle = () => {
      if (isChecked) {
        const checkinId = checkins.find(
          (checkin) => checkin.createdAt === date
        )?.id;
        checkinId && void dispatch(deleteCheckin({ id: checkinId }));
      } else {
        void dispatch(
          createCheckin({ habitId: habit.id, created_at: new Date(date) })
        );
      }
    };
    return (
      <td data-date={date} data-status={isActive}>
        <button
          disabled={disabled}
          onClick={onClickHandle}
          className={cn('checkin-cell', isChecked ? 'checked' : '')}
        >
          <span className='hidden'>{date}</span>
        </button>
      </td>
    );
  }
);
