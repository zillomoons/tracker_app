import React, { useState } from 'react';
import {
  generateWeekdays,
  isDateOutOfRange,
  isFutureDate,
} from '../../lib/calendar';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  Checkin,
  createCheckin,
  deleteCheckin,
  selectCheckinsByHabitId,
} from '../checkins/checkinsSlice';
import { EditHabitForm } from '../../components/EditHabitForm';
import { createPortal } from 'react-dom';
import { RootState } from '../../app/store';
import { DayOfWeek, Habit } from './habitsSlice';
import { DeleteHabit } from '../../components/DeleteHabit';
import { Modal } from '../../components/Modal';
import { LiaEditSolid, LiaTrashAltSolid } from 'react-icons/lia';
import cn from '../../lib/cn';

export const HabitRow = React.memo(({ habit }: { habit: Habit }) => {
  const checkins = useAppSelector((state: RootState) =>
    selectCheckinsByHabitId(state, habit.id)
  );
  const weekdays = generateWeekdays();
  const [showModal, setShowModal] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  return (
    <>
      {createPortal(
        <EditHabitForm
          id={habit.id}
          isVisible={showModal}
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
      <div className='habit-grid-row'>
        <div className='habit-grid-head'>
          <span>{habit.title}</span>
          <LiaEditSolid onClick={() => setShowModal(true)} />
          <LiaTrashAltSolid onClick={() => setIsDeleteModalOpen(true)} />
        </div>
        <div className='habit-grid-main grid grid-col-7'>
          {weekdays.map(({ date }, i) => (
            <HabitCell key={i} date={date} habit={habit} checkins={checkins} />
          ))}
        </div>
        <div className='habit-grid-end'></div>
      </div>
    </>
  );
});

export const HabitCell = React.memo(
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
    const outOfReachStyle = isDateOutOfRange(habit.createdAt, date);

    const disabled = isFutureDate(date) || !isActive || outOfReachStyle;
    const checkinStyle = cn(
      'checkin-cell',
      isChecked ? 'checked' : outOfReachStyle ? 'out-of-reach' : ''
    );
    // const today = currDateString === date && isActive;
    // const spanStyle = today ? 'current-day' : '';

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
      <div>
        {/* <span className={spanStyle}>{date.slice(0, 3)}</span> */}
        <button
          data-date={date}
          data-status={isActive}
          disabled={disabled}
          onClick={onClickHandle}
          className={checkinStyle}
        ></button>
      </div>
    );
  }
);
