import React, { useState } from 'react';
import {
  WEEKDAYS,
  generateWeekdays,
  isDateOutOfRange,
  isFutureDate,
} from '../lib/calendar';
import { DayOfWeek, Habit } from '../features/habits/habitsSlice';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { createPortal } from 'react-dom';
import {
  Checkin,
  createCheckin,
  deleteCheckin,
  selectCheckinsByHabitId,
} from '../features/checkins/checkinsSlice';
import cn from '../lib/cn';
import { LiaTrashAltSolid, LiaEditSolid } from 'react-icons/lia';
import { RootState } from '../app/store';
import { EditHabitForm } from './EditHabitForm';
import { Modal } from './Modal';
import { DeleteHabit } from './DeleteHabit';

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

export const TableRow = React.memo(({ habit }: { habit: Habit }) => {
  const checkins = useAppSelector((state: RootState) =>
    selectCheckinsByHabitId(state, habit.id)
  );
  const weekdays = generateWeekdays();
  const [showModal, setShowModal] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  return (
    <>
      {showModal &&
        createPortal(
          <EditHabitForm
            id={habit.id}
            visible={showModal}
            onClose={() => setShowModal(false)}
          />,
          document.getElementById('modal')!
        )}
      <Modal
        isOpened={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
      >
        <DeleteHabit
          id={habit.id}
          habitName={habit.title}
          onClose={() => setIsDeleteModalOpen(false)}
        />
      </Modal>
      <tr>
        <td className='row-title'>
          <span>{habit.title}</span>
          <LiaEditSolid onClick={() => setShowModal(true)} />
          <LiaTrashAltSolid onClick={() => setIsDeleteModalOpen(true)} />
        </td>
        {weekdays.map(({ date }) => (
          <TableCell key={date} date={date} habit={habit} checkins={checkins} />
        ))}
      </tr>
    </>
  );
});

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
    const outOfReachStyle = isDateOutOfRange(habit.createdAt, date)
      ? { display: 'none' }
      : undefined;
    const disabled = isFutureDate(date) || !isActive;

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
          style={outOfReachStyle}
          className={cn('checkin-cell', isChecked ? 'checked' : '')}
        >
          <span className='sr-only'>{date}</span>
        </button>
      </td>
    );
  }
);
